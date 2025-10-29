import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Settings,
  Loader2,
  Bot,
  User,
  Maximize2,
  Minimize2,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import type {
  CivicEntity,
  BuildingPermit,
  PlanComment,
  PlanReview,
} from "seattle-open-json";

interface ActivityResult {
  source: "parksCatalog" | "mobileRecreationProgramming" | "youthPrograms";
  title: string;
  summary?: string;
  location?: string;
  schedule?: string;
  cost?: string;
  url?: string;
  metadata?: Record<string, unknown>;
}

interface PermitDetails {
  permitNumber: string;
  buildingPermit?: BuildingPermit;
  planComments: PlanComment[];
  planReviews: PlanReview[];
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  kind?: "text" | "toolResult";
  toolName?: string;
  toolData?: unknown;
  rawToolOutput?: string;
  toolMeta?: unknown;
}

interface ChatAssistantProps {
  context?: string;
  onClose?: () => void;
}

type ToolCall = {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
};

type ConversationMessage = {
  role: "user" | "assistant" | "tool";
  content: string;
  name?: string;
  tool_call_id?: string;
  tool_calls?: ToolCall[];
};

const OPENAI_API_KEY_STORAGE = "openai_api_key";
const CHAT_HISTORY_STORAGE = "chat_history";
const MCP_SERVER_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://seattle-open-json-production.up.railway.app"
    : "http://localhost:3100";

const toolDefinitions = [
  {
    type: "function",
    function: {
      name: "searchCivicEntities",
      description:
        "Search Seattle Civic Standard entities using keywords, entity types, tags, and neighborhoods.",
      parameters: {
        type: "object",
        properties: {
          search: {
            type: "string",
            description: "Optional keyword term to match across entity data.",
          },
          type: {
            type: ["string", "array"],
            items: { type: "string" },
            description:
              "Entity type or list of types (e.g. Park, CommunityCenter).",
          },
          tags: {
            type: ["string", "array"],
            items: { type: "string" },
            description: "Single tag or list of tags to filter results.",
          },
          neighborhood: {
            type: "string",
            description: "Optional Seattle neighborhood name.",
          },
          limit: {
            type: "integer",
            minimum: 1,
            maximum: 100,
            description: "Maximum number of results to return (default 25).",
          },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "searchActivities",
      description:
        "Find recreation activities, mobile programs, and youth opportunities by keyword.",
      parameters: {
        type: "object",
        properties: {
          keyword: {
            type: "string",
            description: "Required search term (e.g. pottery, soccer).",
          },
          sources: {
            type: "array",
            items: {
              type: "string",
              enum: [
                "parksCatalog",
                "mobileRecreationProgramming",
                "youthPrograms",
              ],
            },
            description:
              "Optional list of sources to search (defaults to all sources).",
          },
          limit: {
            type: "integer",
            minimum: 1,
            maximum: 50,
            description: "Maximum number of activities to return (default 10).",
          },
        },
        required: ["keyword"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "getPermitDetails",
      description:
        "Fetch building permit records along with plan comments and review cycles by permit number.",
      parameters: {
        type: "object",
        properties: {
          permitNumber: {
            type: "string",
            description: "Permit number identifier (e.g. 7019574-CN).",
          },
        },
        required: ["permitNumber"],
      },
    },
  },
] as const;

export const ChatAssistant: React.FC<ChatAssistantProps> = ({
  context,
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [tempApiKey, setTempApiKey] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
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
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(restoredMessages);
        setConversation(
          restoredMessages.map((msg) => ({
            role: msg.role,
            content: msg.rawToolOutput ?? msg.content,
          }))
        );
      } catch (e) {
        console.error("Failed to parse chat history:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (!isFullscreen) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isFullscreen]);

  // Save chat history to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(CHAT_HISTORY_STORAGE, JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [input]);

  const handleSaveApiKey = () => {
    localStorage.setItem(OPENAI_API_KEY_STORAGE, tempApiKey);
    setApiKey(tempApiKey);
    setShowSettings(false);
  };

  const handleClearHistory = () => {
    if (window.confirm("Clear all chat history?")) {
      setMessages([]);
      setConversation([]);
      localStorage.removeItem(CHAT_HISTORY_STORAGE);
    }
  };

  const parseMCPCommand = (
    input: string
  ): { toolName: string; args: any } | null => {
    // Try to match pattern: toolName {...json...}
    const jsonMatch = input.match(/^(\w+)\s+(\{.+\})$/s);
    if (jsonMatch) {
      try {
        const [, toolName, jsonStr] = jsonMatch;
        const args = JSON.parse(jsonStr);
        return { toolName, args };
      } catch (e) {
        // Invalid JSON, continue to other patterns
      }
    }

    // Try to match pattern: toolName key=value key2=value2
    const simpleMatch = input.match(/^(\w+)(?:\s+(.+))?$/);
    if (simpleMatch) {
      const [, toolName, argsStr] = simpleMatch;
      const validTools = [
        "searchCivicEntities",
        "searchActivities",
        "getPermitDetails",
      ];

      if (validTools.includes(toolName)) {
        const args: any = {};
        if (argsStr) {
          // Parse key=value pairs
          const pairs = argsStr.match(/(\w+)=(?:"([^"]*)"|(\S+))/g);
          if (pairs) {
            pairs.forEach((pair) => {
              const [key, ...valueParts] = pair.split("=");
              let value = valueParts.join("=");
              // Remove quotes if present
              value = value.replace(/^"(.*)"$/, "$1");
              args[key] = value;
            });
          }
        }
        return { toolName, args };
      }
    }

    return null;
  };

  const sendMessage = async () => {
    if (!input.trim()) {
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
      kind: "text",
    };

    const trimmedInput = userMessage.content;

    setMessages((prev) => [...prev, userMessage]);
    const updatedHistory = [
      ...conversation,
      { role: "user", content: trimmedInput } as ConversationMessage,
    ];
    setConversation(updatedHistory);
    setInput("");
    setIsLoading(true);

    // If no API key, try to parse as direct MCP command
    if (!apiKey) {
      const mcpCommand = parseMCPCommand(trimmedInput);

      if (mcpCommand) {
        try {
          // Show warning message
          const warningMessage: Message = {
            id: `${Date.now()}-warning`,
            role: "assistant",
            content:
              "⚠️ This is a showcase of manual MCP processing without AI assistance. Enter your OpenAI key in settings to see the full AI-powered functionality.",
            timestamp: new Date(),
            kind: "text",
          };
          setMessages((prev) => [...prev, warningMessage]);

          // Execute the MCP tool directly
          const toolResponse = await fetch(
            `${MCP_SERVER_BASE_URL}/mcp/tools/${mcpCommand.toolName}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(mcpCommand.args),
            }
          );

          if (!toolResponse.ok) {
            throw new Error(
              `Tool ${mcpCommand.toolName} failed: ${await toolResponse.text()}`
            );
          }

          const toolPayload = await toolResponse.json();

          // Display the tool result
          const toolDisplay: Message = {
            id: `${Date.now()}-mcp`,
            role: "assistant",
            content: `Direct MCP result (${mcpCommand.toolName})`,
            timestamp: new Date(),
            kind: "toolResult",
            toolName: mcpCommand.toolName,
            toolData: toolPayload.data ?? toolPayload,
            toolMeta: toolPayload.meta,
            rawToolOutput: JSON.stringify(
              toolPayload.data ?? toolPayload,
              null,
              2
            ),
          };
          setMessages((prev) => [...prev, toolDisplay]);

          // Add helpful next steps message
          const helpMessage: Message = {
            id: `${Date.now()}-help`,
            role: "assistant",
            content:
              'You can try other MCP commands:\n• searchCivicEntities search=park\n• searchActivities keyword=soccer\n• getPermitDetails permitNumber=7019574-CN\n\nOr use JSON format:\n• searchCivicEntities {"search": "community center", "limit": 5}',
            timestamp: new Date(),
            kind: "text",
          };
          setMessages((prev) => [...prev, helpMessage]);
        } catch (error) {
          console.error("MCP command error:", error);
          const errorMessage: Message = {
            id: `${Date.now()}-error`,
            role: "assistant",
            content: `Error executing MCP command: ${
              error instanceof Error ? error.message : "Unknown error"
            }. Make sure the MCP server is running at ${MCP_SERVER_BASE_URL}`,
            timestamp: new Date(),
            kind: "text",
          };
          setMessages((prev) => [...prev, errorMessage]);
        }
      } else {
        // Not a valid MCP command and no API key
        const infoMessage: Message = {
          id: `${Date.now()}-info`,
          role: "assistant",
          content:
            'To use natural language queries, please set your OpenAI API key in settings.\n\nOr try direct MCP commands:\n• searchCivicEntities search=park\n• searchActivities keyword=soccer\n• getPermitDetails permitNumber=7019574-CN\n\nJSON format also works:\n• searchCivicEntities {"search": "community center", "limit": 5}',
          timestamp: new Date(),
          kind: "text",
        };
        setMessages((prev) => [...prev, infoMessage]);
      }
      setIsLoading(false);
      return;
    }

    const systemPrompt = `You are a helpful assistant specializing in Seattle ADU (Accessory Dwelling Unit) planning and permitting. 
You help users navigate the complex process of planning, designing, and permitting ADUs in Seattle.
${context ? `Current context: ${context}` : ""}

You can call provided functions to look up Seattle Civic Standard data, recreation activities, and permit records. Use them whenever the user requests data you can retrieve via these tools.
Provide clear, actionable advice. Reference Seattle SDCI regulations when relevant. Be encouraging and supportive. Please don't return responses in Markdown format.`;

    const callOpenAI = async (chatMessages: ConversationMessage[]) => {
      const payloadMessages = [
        { role: "system", content: systemPrompt },
        ...chatMessages.map((msg) => {
          const payload: Record<string, unknown> = {
            role: msg.role,
            content: msg.content,
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
                arguments: call.function.arguments,
              },
            }));
          }

          return payload;
        }),
      ];

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: payloadMessages,
            temperature: 0.7,
            max_tokens: 1000,
            tools: toolDefinitions,
            tool_choice: "auto",
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to get response from OpenAI");
      }

      return response.json();
    };

    try {
      let workingConversation = [...updatedHistory];
      const initialResponse = await callOpenAI(workingConversation);
      const initialChoice = initialResponse?.choices?.[0];

      if (!initialChoice?.message) {
        throw new Error("OpenAI returned an empty response.");
      }

      const initialMessage = initialChoice.message;

      if (initialMessage.tool_calls && initialMessage.tool_calls.length > 0) {
        const assistantWithToolCalls: ConversationMessage = {
          role: "assistant",
          content: initialMessage.content ?? "",
          tool_calls: initialMessage.tool_calls.map((call: any) => ({
            id: call.id,
            type: (call.type ?? "function") as "function",
            function: {
              name: call.function.name,
              arguments: call.function.arguments,
            },
          })),
        };

        if (assistantWithToolCalls.content.trim().length > 0) {
          const acknowledgement: Message = {
            id: `${Date.now()}-ack`,
            role: "assistant",
            content: assistantWithToolCalls.content,
            timestamp: new Date(),
            kind: "text",
          };
          setMessages((prev) => [...prev, acknowledgement]);
        }

        workingConversation = [...workingConversation, assistantWithToolCalls];

        for (const toolCall of initialMessage.tool_calls) {
          const parsedArgs = (() => {
            try {
              return toolCall.function.arguments
                ? JSON.parse(toolCall.function.arguments)
                : {};
            } catch (err) {
              throw new Error(
                `Failed to parse arguments for ${toolCall.function.name}`
              );
            }
          })();

          const toolResponse = await fetch(
            `${MCP_SERVER_BASE_URL}/mcp/tools/${toolCall.function.name}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(parsedArgs ?? {}),
            }
          );

          if (!toolResponse.ok) {
            const errorPayload = await toolResponse.text();
            throw new Error(
              `Tool ${toolCall.function.name} failed: ${errorPayload}`
            );
          }

          const toolPayload = await toolResponse.json();
          const formattedToolContent = JSON.stringify(
            toolPayload.data ?? toolPayload,
            null,
            2
          );

          const toolMessage: ConversationMessage = {
            role: "tool",
            content: formattedToolContent,
            name: toolCall.function.name,
            tool_call_id: toolCall.id,
          };

          workingConversation = [...workingConversation, toolMessage];

          const toolDisplay: Message = {
            id: `${Date.now()}-${toolCall.id}`,
            role: "assistant",
            content: `Tool result (${toolCall.function.name})`,
            timestamp: new Date(),
            kind: "toolResult",
            toolName: toolCall.function.name,
            toolData: toolPayload.data ?? toolPayload,
            toolMeta: toolPayload.meta,
            rawToolOutput: formattedToolContent,
          };
          setMessages((prev) => [...prev, toolDisplay]);
        }

        const finalResponse = await callOpenAI(workingConversation);
        const finalChoice = finalResponse?.choices?.[0];

        if (!finalChoice?.message?.content) {
          throw new Error(
            "OpenAI failed to produce a final response after tool calls."
          );
        }

        const finalAssistant: Message = {
          id: `${Date.now()}-final`,
          role: "assistant",
          content: finalChoice.message.content,
          timestamp: new Date(),
          kind: "text",
        };

        setMessages((prev) => [...prev, finalAssistant]);
        workingConversation = [
          ...workingConversation,
          {
            role: "assistant",
            content: finalChoice.message.content,
          },
        ];
      } else {
        const finalContent = (initialMessage.content ?? "").trim();

        if (finalContent.length === 0) {
          throw new Error("Assistant returned an empty response.");
        }

        const assistantReply: Message = {
          id: `${Date.now()}-final`,
          role: "assistant",
          content: finalContent,
          timestamp: new Date(),
          kind: "text",
        };

        setMessages((prev) => [...prev, assistantReply]);
        workingConversation = [
          ...workingConversation,
          {
            role: "assistant",
            content: finalContent,
          },
        ];
      }

      setConversation(workingConversation);
    } catch (error) {
      console.error("Error handling chat flow:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Sorry, I encountered an error: ${
          error instanceof Error ? error.message : "Unknown error"
        }. Please check your API key and local MCP server.`,
        timestamp: new Date(),
        kind: "text",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderCivicEntityCard = (entity: CivicEntity) => {
    const location =
      typeof entity.location === "string"
        ? entity.location
        : entity.location?.address;
    const coordinates =
      typeof entity.location === "object" && entity.location?.coordinates
        ? `${entity.location.coordinates.lat.toFixed(
            4
          )}, ${entity.location.coordinates.lng.toFixed(4)}`
        : undefined;
    const contactSegments = [
      entity.contact?.phone ?? "--",
      entity.contact?.email ?? "--",
      entity.contact?.website ?? "--",
    ].filter(Boolean);

    console.log(entity);

    return (
      <div
        key={entity.id}
        className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-900/60">
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {entity.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {entity.type}
            </p>
          </div>
          {entity.neighborhood && (
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900/40 dark:text-blue-200">
              {entity.neighborhood}
            </span>
          )}
        </div>
        <div className="space-y-2 px-4 py-3 text-left text-sm text-gray-700 dark:text-gray-200">
          {entity.description && (
            <p className="max-h-24 overflow-y-auto pr-1 text-sm leading-relaxed">
              {entity.description}
            </p>
          )}
          {(location || coordinates) && (
            <div className="text-xs">
              <p className="font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300">
                Location
              </p>
              {location && (
                <p className="mt-0.5 text-gray-700 dark:text-gray-200">
                  {location}
                </p>
              )}
              {coordinates && (
                <p className="text-gray-500 dark:text-gray-400">
                  {coordinates}
                </p>
              )}
            </div>
          )}
          {contactSegments.length > 0 && (
            <div className="text-xs">
              <p className="font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300">
                Contact
              </p>
              <p className="mt-0.5 break-words text-gray-700 dark:text-gray-200">
                {contactSegments.join(" • ")}
              </p>
            </div>
          )}
          {entity.tags?.length ? (
            <div className="flex flex-wrap gap-1">
              {entity.tags.slice(0, 6).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-medium text-purple-700 dark:bg-purple-900/40 dark:text-purple-200"
                >
                  {tag}
                </span>
              ))}
              {entity.tags.length > 6 && (
                <span className="px-2 py-0.5 text-[10px] text-gray-500 dark:text-gray-400">
                  +{entity.tags.length - 6} more
                </span>
              )}
            </div>
          ) : null}
          {entity.cost && (
            <div className="text-xs text-gray-600 dark:text-gray-300">
              <span className="font-medium uppercase tracking-wide">Cost:</span>{" "}
              {entity.cost}
            </div>
          )}
          {entity.ageRange && (
            <div className="text-xs text-gray-600 dark:text-gray-300">
              <span className="font-medium uppercase tracking-wide">
                Age Range:
              </span>{" "}
              {entity.ageRange}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderActivityCard = (activity: ActivityResult, index: number) => {
    const getSourceColor = (source: string) => {
      switch (source) {
        case "parksCatalog":
          return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-200";
        case "mobileRecreationProgramming":
          return "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-200";
        case "youthPrograms":
          return "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-200";
        default:
          return "bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-200";
      }
    };

    const getSourceLabel = (source: string) => {
      switch (source) {
        case "parksCatalog":
          return "Parks Catalog";
        case "mobileRecreationProgramming":
          return "Mobile Recreation";
        case "youthPrograms":
          return "Youth Programs";
        default:
          return source;
      }
    };

    return (
      <div
        key={`${activity.source}-${index}`}
        className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-900/60">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
              {activity.title}
            </p>
            <span
              className={`rounded-full px-2 py-1 text-xs ${getSourceColor(
                activity.source
              )}`}
            >
              {getSourceLabel(activity.source)}
            </span>
          </div>
        </div>
        <div className="space-y-2 px-4 py-3 text-left text-sm text-gray-700 dark:text-gray-200">
          {activity.summary && (
            <p className="max-h-24 overflow-y-auto pr-1 text-sm leading-relaxed">
              {activity.summary}
            </p>
          )}
          {activity.location && (
            <div className="text-xs">
              <p className="font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300">
                Location
              </p>
              <p className="mt-0.5 text-gray-700 dark:text-gray-200">
                {activity.location}
              </p>
            </div>
          )}
          {activity.schedule && (
            <div className="text-xs">
              <p className="font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300">
                Schedule
              </p>
              <p className="mt-0.5 text-gray-700 dark:text-gray-200">
                {activity.schedule}
              </p>
            </div>
          )}
          {activity.cost && (
            <div className="text-xs text-gray-600 dark:text-gray-300">
              <span className="font-medium uppercase tracking-wide">Cost:</span>{" "}
              {activity.cost}
            </div>
          )}
          {activity.url && (
            <div className="text-xs">
              <a
                href={activity.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Learn More →
              </a>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderPermitCard = (permitDetails: PermitDetails) => {
    const { permitNumber, buildingPermit, planComments, planReviews } =
      permitDetails;

    return (
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-900/60">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Permit #{permitNumber}
            </h3>
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900/40 dark:text-blue-200">
              Building Permit
            </span>
          </div>
        </div>

        <div className="space-y-4 px-4 py-3 text-left text-sm text-gray-700 dark:text-gray-200">
          {buildingPermit ? (
            <div className="space-y-2">
              <div className="text-xs">
                <p className="font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300">
                  Status
                </p>
                <p className="mt-0.5 text-gray-700 dark:text-gray-200">
                  {buildingPermit.StatusCurrent || "Unknown"}
                </p>
              </div>
              {buildingPermit.OriginalAddress1 && (
                <div className="text-xs">
                  <p className="font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300">
                    Address
                  </p>
                  <p className="mt-0.5 text-gray-700 dark:text-gray-200">
                    {buildingPermit.OriginalAddress1}
                    {buildingPermit.OriginalCity &&
                      `, ${buildingPermit.OriginalCity}`}
                  </p>
                </div>
              )}
              {buildingPermit.IssuedDate && (
                <div className="text-xs">
                  <p className="font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300">
                    Issued Date
                  </p>
                  <p className="mt-0.5 text-gray-700 dark:text-gray-200">
                    {buildingPermit.IssuedDate}
                  </p>
                </div>
              )}
              {buildingPermit.CompletedDate && (
                <div className="text-xs">
                  <p className="font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300">
                    Completed Date
                  </p>
                  <p className="mt-0.5 text-gray-700 dark:text-gray-200">
                    {buildingPermit.CompletedDate}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              No building permit details found
            </p>
          )}

          {planComments.length > 0 && (
            <div className="border-t border-gray-200 pt-3 dark:border-gray-700">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300">
                Plan Comments ({planComments.length})
              </p>
              <div className="max-h-32 space-y-2 overflow-y-auto">
                {planComments.slice(0, 3).map((comment, index) => (
                  <div
                    key={index}
                    className="rounded bg-gray-50 p-2 text-xs dark:bg-gray-900/50"
                  >
                    <p className="font-medium text-gray-700 dark:text-gray-200">
                      {comment.ReviewType || "Comment"}
                    </p>
                    {comment.Comment && (
                      <p className="mt-1 line-clamp-2 text-gray-600 dark:text-gray-300">
                        {comment.Comment}
                      </p>
                    )}
                  </div>
                ))}
                {planComments.length > 3 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    +{planComments.length - 3} more comments
                  </p>
                )}
              </div>
            </div>
          )}

          {planReviews.length > 0 && (
            <div className="border-t border-gray-200 pt-3 dark:border-gray-700">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300">
                Plan Reviews ({planReviews.length})
              </p>
              <div className="max-h-32 space-y-2 overflow-y-auto">
                {planReviews.slice(0, 3).map((review, index) => (
                  <div
                    key={index}
                    className="rounded bg-gray-50 p-2 text-xs dark:bg-gray-900/50"
                  >
                    <p className="font-medium text-gray-700 dark:text-gray-200">
                      {review.ReviewType || "Review"}
                    </p>
                    {review.ReviewResultDesc && (
                      <p className="mt-1 text-gray-600 dark:text-gray-300">
                        Result: {review.ReviewResultDesc}
                      </p>
                    )}
                  </div>
                ))}
                {planReviews.length > 3 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    +{planReviews.length - 3} more reviews
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderToolResult = (message: Message) => {
    // Render Civic Entities
    if (message.toolName === "searchCivicEntities") {
      const entities = Array.isArray(message.toolData)
        ? (message.toolData as CivicEntity[])
        : [];

      return (
        <div className="inline-block w-[85%] max-w-full text-left">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-900/60">
              <div className="text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300">
                Civic Entities
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {entities.length} result{entities.length === 1 ? "" : "s"}
              </span>
            </div>
            <div className="max-h-64 space-y-3 overflow-y-auto px-4 py-3">
              {entities.length > 0 ? (
                entities.map(renderCivicEntityCard)
              ) : (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  No civic entities found for the given filters.
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Render Activities
    if (message.toolName === "searchActivities") {
      const activities = Array.isArray(message.toolData)
        ? (message.toolData as ActivityResult[])
        : [];

      return (
        <div className="inline-block w-[85%] max-w-full text-left">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-900/60">
              <div className="text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300">
                Activities
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {activities.length} result{activities.length === 1 ? "" : "s"}
              </span>
            </div>
            <div className="max-h-64 space-y-3 overflow-y-auto px-4 py-3">
              {activities.length > 0 ? (
                activities.map((activity, index) =>
                  renderActivityCard(activity, index)
                )
              ) : (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  No activities found for the given keyword.
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Render Permit Details
    if (message.toolName === "getPermitDetails") {
      const permitDetails = message.toolData as PermitDetails;

      return (
        <div className="inline-block w-[85%] max-w-full text-left">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-900/60">
              <div className="text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300">
                Permit Details
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {permitDetails.permitNumber}
              </span>
            </div>
            <div className="max-h-64 overflow-y-auto px-4 py-3">
              {permitDetails ? (
                renderPermitCard(permitDetails)
              ) : (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  No permit details found.
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Default fallback for other tool results
    return (
      <div className="inline-block w-[85%] max-w-full text-left">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-900/60">
            <div className="text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300">
              Tool Result
            </div>
            {message.toolName && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {message.toolName}
              </span>
            )}
          </div>
          <div className="px-4 py-3 text-left">
            <pre className="max-h-60 overflow-y-auto whitespace-pre-wrap break-words text-xs text-gray-700 dark:text-gray-200">
              {message.rawToolOutput ??
                JSON.stringify(message.toolData, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`flex flex-col border-l border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 ${
        isFullscreen ? "fixed inset-0 z-50 h-full w-full" : "h-full"
      }`}
    >
      {/* Header */}
      <div className="flex-shrink-0 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-3 dark:border-gray-700 dark:from-blue-950/20 dark:to-purple-950/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600" />
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">
              ADU Planning Assistant
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {onClose && (
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                title="Close assistant"
              >
                <X className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </button>
            )}
            <button
              onClick={() => setIsFullscreen((prev) => !prev)}
              className="rounded-lg p-1.5 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
              title={isFullscreen ? "Exit full screen" : "Enter full screen"}
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              ) : (
                <Maximize2 className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              )}
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="rounded-lg p-1.5 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
              title="Settings"
            >
              <Settings className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
        {!apiKey && (
          <p className="mt-2 text-xs text-orange-600 dark:text-orange-400">
            💡 Try MCP commands without an API key, or set your OpenAI key for
            AI-powered chat
          </p>
        )}
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="flex-shrink-0 border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                OpenAI API Key
              </label>
              <input
                type="password"
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Your key is stored locally and never sent to our servers
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveApiKey} size="sm" className="flex-1">
                Save Key
              </Button>
              <Button
                onClick={handleClearHistory}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                Clear History
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="py-12 text-center">
            <Bot className="mx-auto mb-3 h-12 w-12 text-gray-300 dark:text-gray-600" />
            {apiKey ? (
              <>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  Ask me anything about ADU planning!
                </p>
                <div className="space-y-1 text-xs text-gray-400 dark:text-gray-500">
                  <p>• What are the zoning requirements?</p>
                  <p>• How much does it cost to build an ADU?</p>
                  <p>• What permits do I need?</p>
                </div>
              </>
            ) : (
              <>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  Try MCP commands directly!
                </p>
                <div className="space-y-1 text-xs text-gray-400 dark:text-gray-500">
                  <p>• searchCivicEntities search=park</p>
                  <p>• searchActivities keyword=soccer</p>
                  <p>• getPermitDetails permitNumber=7019574-CN</p>
                  <p className="mt-2">
                    Or set your OpenAI key for AI-powered chat
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {messages.map((message) => {
          const isToolResult = message.kind === "toolResult";
          const messageTimestamp = message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          return (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                  message.role === "user" ? "bg-blue-600" : "bg-purple-600"
                }`}
              >
                {message.role === "user" ? (
                  <User className="h-5 w-5 text-white" />
                ) : (
                  <Bot className="h-5 w-5 text-white" />
                )}
              </div>
              <div
                className={`flex-1 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
              >
                {isToolResult ? (
                  renderToolResult(message)
                ) : (
                  <div
                    className={`inline-block max-w-[85%] rounded-2xl px-4 py-2 ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words text-sm">
                      {message.content}
                    </p>
                  </div>
                )}
                <p className="mt-1 px-1 text-xs text-gray-400 dark:text-gray-500">
                  {messageTimestamp}
                </p>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-600">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="inline-block rounded-2xl bg-gray-100 px-4 py-2 dark:bg-gray-800">
                <Loader2 className="h-4 w-4 animate-spin text-gray-600 dark:text-gray-300" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t border-gray-200 p-4 dark:border-gray-700">
        <div className="flex gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              apiKey
                ? "Ask about ADU planning..."
                : "Try: searchCivicEntities search=park"
            }
            disabled={isLoading}
            rows={1}
            className="max-h-32 flex-1 resize-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Press{" "}
          <kbd className="rounded bg-gray-200 px-1.5 py-0.5 text-xs dark:bg-gray-700">
            Enter
          </kbd>{" "}
          to send,{" "}
          <kbd className="rounded bg-gray-200 px-1.5 py-0.5 text-xs dark:bg-gray-700">
            Shift+Enter
          </kbd>{" "}
          for new line
        </p>
      </div>
    </div>
  );
};

export default ChatAssistant;
