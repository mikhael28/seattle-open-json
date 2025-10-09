import React, { useState, useRef, useEffect } from 'react';
import { Send, Settings, X, Loader2, Bot, User } from 'lucide-react';
import { Button } from './ui/button';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  kind?: 'text' | 'toolResult';
  toolName?: string;
  toolData?: unknown;
  rawToolOutput?: string;
}

interface ChatAssistantProps {
  context?: string; // Optional context about current module/task
}

type ToolCall = {
  id: string;
  type: 'function';
  function: {
    name: string;
    arguments: string;
  };
};

type ConversationMessage = {
  role: 'user' | 'assistant' | 'tool';
  content: string;
  name?: string;
  tool_call_id?: string;
  tool_calls?: ToolCall[];
};

const OPENAI_API_KEY_STORAGE = 'openai_api_key';
const CHAT_HISTORY_STORAGE = 'chat_history';
const MCP_SERVER_BASE_URL = 'http://localhost:3100';

const toolDefinitions = [
  {
    type: 'function',
    function: {
      name: 'searchCivicEntities',
      description:
        'Search Seattle Civic Standard entities using keywords, entity types, tags, and neighborhoods.',
      parameters: {
        type: 'object',
        properties: {
          search: {
            type: 'string',
            description: 'Optional keyword term to match across entity data.',
          },
          type: {
            type: ['string', 'array'],
            items: { type: 'string' },
            description:
              'Entity type or list of types (e.g. Park, CommunityCenter).',
          },
          tags: {
            type: ['string', 'array'],
            items: { type: 'string' },
            description: 'Single tag or list of tags to filter results.',
          },
          neighborhood: {
            type: 'string',
            description: 'Optional Seattle neighborhood name.',
          },
          limit: {
            type: 'integer',
            minimum: 1,
            maximum: 100,
            description: 'Maximum number of results to return (default 25).',
          },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'searchActivities',
      description:
        'Find recreation activities, mobile programs, and youth opportunities by keyword.',
      parameters: {
        type: 'object',
        properties: {
          keyword: {
            type: 'string',
            description: 'Required search term (e.g. pottery, soccer).',
          },
          sources: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['parksCatalog', 'mobileRecreationProgramming', 'youthPrograms'],
            },
            description:
              'Optional list of sources to search (defaults to all sources).',
          },
          limit: {
            type: 'integer',
            minimum: 1,
            maximum: 50,
            description: 'Maximum number of activities to return (default 10).',
          },
        },
        required: ['keyword'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'getPermitDetails',
      description:
        'Fetch building permit records along with plan comments and review cycles by permit number.',
      parameters: {
        type: 'object',
        properties: {
          permitNumber: {
            type: 'string',
            description: 'Permit number identifier (e.g. 7019574-CN).',
          },
        },
        required: ['permitNumber'],
      },
    },
  },
] as const;

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ context }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load API key and chat history from localStorage
  useEffect(() => {
    const savedKey = localStorage.getItem(OPENAI_API_KEY_STORAGE);
    if (savedKey) {
      setApiKey(savedKey);
      setTempApiKey(savedKey);
    }

    const savedHistory = localStorage.getItem(CHAT_HISTORY_STORAGE);
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        const restoredMessages: Message[] = parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(restoredMessages);
        setConversation(restoredMessages.map((msg) => ({
          role: msg.role,
          content: msg.rawToolOutput ?? msg.content
        })));
      } catch (e) {
        console.error('Failed to parse chat history:', e);
      }
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(CHAT_HISTORY_STORAGE, JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  const handleSaveApiKey = () => {
    localStorage.setItem(OPENAI_API_KEY_STORAGE, tempApiKey);
    setApiKey(tempApiKey);
    setShowSettings(false);
  };

  const handleClearHistory = () => {
    if (window.confirm('Clear all chat history?')) {
      setMessages([]);
      setConversation([]);
      localStorage.removeItem(CHAT_HISTORY_STORAGE);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !apiKey) {
      if (!apiKey) {
        alert('Please set your OpenAI API key in settings first.');
        setShowSettings(true);
      }
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
      kind: 'text'
    };

    const trimmedInput = userMessage.content;

    setMessages(prev => [...prev, userMessage]);
    const updatedHistory = [...conversation, { role: 'user', content: trimmedInput } as ConversationMessage];
    setConversation(updatedHistory);
    setInput('');
    setIsLoading(true);

    const systemPrompt = `You are a helpful assistant specializing in Seattle ADU (Accessory Dwelling Unit) planning and permitting. 
You help users navigate the complex process of planning, designing, and permitting ADUs in Seattle.
${context ? `Current context: ${context}` : ''}

You can call provided functions to look up Seattle Civic Standard data, recreation activities, and permit records. Use them whenever the user requests data you can retrieve via these tools.
Provide clear, actionable advice. Reference Seattle SDCI regulations when relevant. Be encouraging and supportive.`;

    const callOpenAI = async (chatMessages: ConversationMessage[]) => {
      const payloadMessages = [
        { role: 'system', content: systemPrompt },
        ...chatMessages.map((msg) => {
          const payload: Record<string, unknown> = {
            role: msg.role,
            content: msg.content
          };

          if (msg.name) {
            payload.name = msg.name;
          }

          if (msg.tool_call_id) {
            payload.tool_call_id = msg.tool_call_id;
          }

          if (msg.tool_calls) {
            payload.tool_calls = msg.tool_calls.map((call) => ({
              id: call.id,
              type: call.type,
              function: {
                name: call.function.name,
                arguments: call.function.arguments
              }
            }));
          }

          return payload;
        })
      ];

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: payloadMessages,
          temperature: 0.7,
          max_tokens: 1000,
          tools: toolDefinitions,
          tool_choice: 'auto'
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to get response from OpenAI');
      }

      return response.json();
    };

    try {
      let workingConversation = [...updatedHistory];
      const initialResponse = await callOpenAI(workingConversation);
      const initialChoice = initialResponse?.choices?.[0];

      if (!initialChoice?.message) {
        throw new Error('OpenAI returned an empty response.');
      }

      const initialMessage = initialChoice.message;

      if (initialMessage.tool_calls && initialMessage.tool_calls.length > 0) {
        const assistantWithToolCalls: ConversationMessage = {
          role: 'assistant',
          content: initialMessage.content ?? '',
          tool_calls: initialMessage.tool_calls.map((call: any) => ({
            id: call.id,
            type: (call.type ?? 'function') as 'function',
            function: {
              name: call.function.name,
              arguments: call.function.arguments
            }
          }))
        };

        if (assistantWithToolCalls.content.trim().length > 0) {
          const acknowledgement: Message = {
            id: `${Date.now()}-ack`,
            role: 'assistant',
            content: assistantWithToolCalls.content,
            timestamp: new Date(),
            kind: 'text'
          };
          setMessages(prev => [...prev, acknowledgement]);
        }

        workingConversation = [...workingConversation, assistantWithToolCalls];

        for (const toolCall of initialMessage.tool_calls) {
          const parsedArgs = (() => {
            try {
              return toolCall.function.arguments
                ? JSON.parse(toolCall.function.arguments)
                : {};
            } catch (err) {
              throw new Error(`Failed to parse arguments for ${toolCall.function.name}`);
            }
          })();

          const toolResponse = await fetch(`${MCP_SERVER_BASE_URL}/mcp/tools/${toolCall.function.name}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(parsedArgs ?? {})
          });

          if (!toolResponse.ok) {
            const errorPayload = await toolResponse.text();
            throw new Error(`Tool ${toolCall.function.name} failed: ${errorPayload}`);
          }

          const toolPayload = await toolResponse.json();
          const formattedToolContent = JSON.stringify(toolPayload.data ?? toolPayload, null, 2);

          const toolMessage: ConversationMessage = {
            role: 'tool',
            content: formattedToolContent,
            name: toolCall.function.name,
            tool_call_id: toolCall.id
          };

          workingConversation = [...workingConversation, toolMessage];

          const toolDisplay: Message = {
            id: `${Date.now()}-${toolCall.id}`,
            role: 'assistant',
            content: `Tool result (${toolCall.function.name})`,
            timestamp: new Date(),
            kind: 'toolResult',
            toolName: toolCall.function.name,
            toolData: toolPayload.data ?? toolPayload,
            rawToolOutput: formattedToolContent
          };
          setMessages(prev => [...prev, toolDisplay]);
        }

        const finalResponse = await callOpenAI(workingConversation);
        const finalChoice = finalResponse?.choices?.[0];

        if (!finalChoice?.message?.content) {
          throw new Error('OpenAI failed to produce a final response after tool calls.');
        }

        const finalAssistant: Message = {
          id: `${Date.now()}-final`,
          role: 'assistant',
          content: finalChoice.message.content,
          timestamp: new Date(),
          kind: 'text'
        };

        setMessages(prev => [...prev, finalAssistant]);
        workingConversation = [...workingConversation, {
          role: 'assistant',
          content: finalChoice.message.content
        }];
      } else {
        const finalContent = (initialMessage.content ?? '').trim();

        if (finalContent.length === 0) {
          throw new Error('Assistant returned an empty response.');
        }

        const assistantReply: Message = {
          id: `${Date.now()}-final`,
          role: 'assistant',
          content: finalContent,
          timestamp: new Date(),
          kind: 'text'
        };

        setMessages(prev => [...prev, assistantReply]);
        workingConversation = [...workingConversation, {
          role: 'assistant',
          content: finalContent
        }];
      }

      setConversation(workingConversation);
    } catch (error) {
      console.error('Error handling chat flow:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please check your API key and local MCP server.`,
        timestamp: new Date(),
        kind: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600" />
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">ADU Planning Assistant</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title="Settings"
            >
              <Settings className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
        {!apiKey && (
          <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">
            ⚠️ Please set your OpenAI API key to start chatting
          </p>
        )}
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="flex-shrink-0 p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                OpenAI API Key
              </label>
              <input
                type="password"
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Your key is stored locally and never sent to our servers
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveApiKey} size="sm" className="flex-1">
                Save Key
              </Button>
              <Button onClick={handleClearHistory} variant="outline" size="sm" className="flex-1">
                Clear History
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <Bot className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
              Ask me anything about ADU planning!
            </p>
            <div className="text-xs text-gray-400 dark:text-gray-500 space-y-1">
              <p>• What are the zoning requirements?</p>
              <p>• How much does it cost to build an ADU?</p>
              <p>• What permits do I need?</p>
            </div>
          </div>
        )}

        {messages.map((message) => {
          const isToolResult = message.kind === 'toolResult';
          const messageTimestamp = message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          return (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              message.role === 'user' 
                ? 'bg-blue-600' 
                : 'bg-purple-600'
            }`}>
              {message.role === 'user' ? (
                <User className="h-5 w-5 text-white" />
              ) : (
                <Bot className="h-5 w-5 text-white" />
              )}
            </div>
            <div className={`flex-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              {isToolResult ? (
                <div className="inline-block max-w-[85%] text-left">
                  <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/60 flex items-center justify-between">
                      <div className="text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                        Tool Result
                      </div>
                      {message.toolName && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {message.toolName}
                        </span>
                      )}
                    </div>
                    <div className="px-4 py-3 text-left">
                      <pre className="text-xs text-gray-700 dark:text-gray-200 whitespace-pre-wrap break-words max-h-60 overflow-y-auto">
                        {message.rawToolOutput ?? JSON.stringify(message.toolData, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`inline-block max-w-[85%] px-4 py-2 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                }`}>
                  <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                </div>
              )}
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 px-1">
                {messageTimestamp}
              </p>
            </div>
          </div>
        );
        })}

        {isLoading && (
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="inline-block px-4 py-2 rounded-2xl bg-gray-100 dark:bg-gray-800">
                <Loader2 className="h-4 w-4 text-gray-600 dark:text-gray-300 animate-spin" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about ADU planning..."
            disabled={!apiKey || isLoading}
            rows={1}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg resize-none text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed max-h-32"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || !apiKey || isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Press <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Shift+Enter</kbd> for new line
        </p>
      </div>
    </div>
  );
};

export default ChatAssistant;

