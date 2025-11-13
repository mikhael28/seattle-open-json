import { useState, useRef, useEffect } from "react";
import { CustomerSupportTicket } from "../../../src/data/customer-support-types";
import { Button } from "../components/ui/button";
import {
  Mic,
  MicOff,
  Loader2,
  Save,
  Trash2,
  PlayCircle,
  Calendar,
  MapPin,
  Building,
  FileText,
  AlertCircle,
  Settings,
  Volume2,
  FastForward,
  Globe,
} from "lucide-react";
import {
  transcribeAudio,
  extractTicketInfo,
  textToSpeech,
  generateResolutionMessage,
  detectLanguage,
  translateToEnglish,
  translateMessage,
} from "../services/openai";
import { TicketTrackerData } from "../types/ticket-tracker";
import {
  generateTrackerData,
  advanceTicketStatus,
} from "../utils/ticket-tracker-utils";
import TicketTracker from "../components/TicketTracker";
import { SUPPORTED_LANGUAGES, getLanguageByCode } from "../utils/languages";

interface MyTicket extends Partial<CustomerSupportTicket> {
  id: string;
  audioTranscription?: string;
  audioTranscriptionEnglish?: string;
  estimatedResolutionDate?: string;
  estimatedResolutionDays?: number;
  tracker?: TicketTrackerData;
  userLanguage?: string;
}

const MyTickets = () => {
  const [tickets, setTickets] = useState<MyTicket[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTranscription, setCurrentTranscription] = useState("");

  // Language selection state
  const [userLanguage, setUserLanguage] = useState<string | null>(null);
  const [isSelectingLanguage, setIsSelectingLanguage] = useState(true);
  const [isDetectingLanguage, setIsDetectingLanguage] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingIntervalRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  // Load API key and language from localStorage on mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("openai_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    } else {
      setShowApiKeyInput(true);
    }

    const savedLanguage = localStorage.getItem("user_language");
    if (savedLanguage) {
      setUserLanguage(savedLanguage);
      setIsSelectingLanguage(false);
    }

    const savedTickets = localStorage.getItem("my_tickets");
    if (savedTickets) {
      setTickets(JSON.parse(savedTickets));
    }
  }, []);

  // Save tickets to localStorage whenever they change
  useEffect(() => {
    if (tickets.length > 0) {
      localStorage.setItem("my_tickets", JSON.stringify(tickets));
    }
  }, [tickets]);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("openai_api_key", apiKey.trim());
      setShowApiKeyInput(false);
      setError(null);
    } else {
      setError("Please enter a valid API key");
    }
  };

  const handleLanguageDetection = async (audioBlob: Blob) => {
    if (!apiKey) {
      setError("Please configure your OpenAI API key first");
      setShowApiKeyInput(true);
      return;
    }

    setIsDetectingLanguage(true);
    setError(null);

    try {
      // Transcribe without language hint to detect language
      const transcription = await transcribeAudio(audioBlob, apiKey);

      // Detect language from transcription
      const detectedLang = await detectLanguage(transcription, apiKey);

      // Save detected language
      setUserLanguage(detectedLang);
      localStorage.setItem("user_language", detectedLang);
      setIsSelectingLanguage(false);

      // Provide audio feedback in detected language
      const lang = getLanguageByCode(detectedLang);
      const confirmationMessage = await translateMessage(
        `Thank you! I detected you are speaking ${
          lang?.name || "your language"
        }. You can now record your service request.`,
        detectedLang,
        apiKey
      );

      const speechBlob = await textToSpeech(confirmationMessage, apiKey);
      await playAudio(speechBlob);
    } catch (err) {
      console.error("Error detecting language:", err);
      setError(
        err instanceof Error ? err.message : "Failed to detect language"
      );
    } finally {
      setIsDetectingLanguage(false);
    }
  };

  const changeLanguage = () => {
    setIsSelectingLanguage(true);
    setUserLanguage(null);
    localStorage.removeItem("user_language");
  };

  const startRecording = async () => {
    try {
      setError(null);
      setCurrentTranscription("");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        // Handle language selection vs ticket creation
        if (isSelectingLanguage) {
          await handleLanguageDetection(audioBlob);
        } else {
          await processAudio(audioBlob);
        }

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);

      // Start duration counter
      recordingIntervalRef.current = window.setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Error starting recording:", err);
      setError(
        "Failed to start recording. Please ensure microphone permissions are granted."
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
        recordingIntervalRef.current = null;
      }
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    if (!apiKey) {
      setError("Please configure your OpenAI API key first");
      setShowApiKeyInput(true);
      return;
    }

    if (!userLanguage) {
      setError("Please select your language first");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Step 1: Transcribe audio in user's language
      const lang = getLanguageByCode(userLanguage);
      const transcription = await transcribeAudio(
        audioBlob,
        apiKey,
        lang?.whisperCode
      );
      setCurrentTranscription(transcription);

      // Step 2: Translate to English for city staff (if not already English)
      let transcriptionEnglish = transcription;
      if (userLanguage !== "en") {
        transcriptionEnglish = await translateToEnglish(
          transcription,
          userLanguage,
          apiKey
        );
      }

      // Step 3: Extract ticket information from English transcription
      const ticketData = await extractTicketInfo(transcriptionEnglish, apiKey);

      // Step 4: Create ticket
      const newTicket: MyTicket = {
        id: `TICKET-${Date.now()}`,
        serviceRequestNumber: `MY-${Math.random()
          .toString(36)
          .substr(2, 9)
          .toUpperCase()}`,
        serviceRequestType: ticketData.serviceRequestType,
        location: ticketData.location,
        cityDepartment: "Customer Service Bureau",
        createdDate: new Date().toISOString(),
        methodReceived: "Voice Audio Recording",
        status: "Pending Submission",
        audioTranscription: transcription, // Original in user's language
        audioTranscriptionEnglish: transcriptionEnglish, // English for staff
        userLanguage: userLanguage,
        estimatedResolutionDays: ticketData.estimatedResolutionDays || 7,
        // Default coordinates for Seattle
        latitude: 47.6062,
        longitude: -122.3321,
        xValue: 0,
        yValue: 0,
        latitudeLongitude: "POINT (-122.3321 47.6062)",
        zipCode: "",
        councilDistrict: "",
        policePrecinct: "",
        communityReportingArea: "",
      };

      // Calculate estimated resolution date
      const resolutionDate = new Date();
      resolutionDate.setDate(
        resolutionDate.getDate() + (newTicket.estimatedResolutionDays || 7)
      );
      newTicket.estimatedResolutionDate = resolutionDate.toISOString();

      // Generate tracker data for the ticket
      newTicket.tracker = generateTrackerData(
        ticketData.serviceRequestType,
        newTicket.createdDate!,
        newTicket.estimatedResolutionDays || 7
      );

      setTickets((prev) => [newTicket, ...prev]);

      // Step 5: Generate and play speech response in user's language
      const resolutionMessage = generateResolutionMessage(
        ticketData.serviceRequestType,
        ticketData.estimatedResolutionDays || 7
      );

      // Translate message to user's language
      const translatedMessage = await translateMessage(
        resolutionMessage,
        userLanguage,
        apiKey
      );

      const speechBlob = await textToSpeech(translatedMessage, apiKey);
      await playAudio(speechBlob);
    } catch (err) {
      console.error("Error processing audio:", err);
      setError(err instanceof Error ? err.message : "Failed to process audio");
    } finally {
      setIsProcessing(false);
    }
  };

  const playAudio = (audioBlob: Blob): Promise<void> => {
    return new Promise((resolve) => {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      currentAudioRef.current = audio;

      setIsSpeaking(true);

      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
        resolve();
      };

      audio.onerror = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
        resolve();
      };

      audio.play();
    });
  };

  const deleteTicket = (id: string) => {
    setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
  };

  const advanceTicket = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((ticket) => {
        if (
          ticket.id === ticketId &&
          ticket.tracker &&
          ticket.serviceRequestType
        ) {
          return {
            ...ticket,
            tracker: advanceTicketStatus(
              ticket.tracker,
              ticket.serviceRequestType
            ),
          };
        }
        return ticket;
      })
    );
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto max-w-6xl p-6">
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Tickets</h1>
          <div className="flex gap-2">
            {userLanguage && !isSelectingLanguage && (
              <Button variant="outline" size="sm" onClick={changeLanguage}>
                <Globe className="mr-2 h-4 w-4" />
                {getLanguageByCode(userLanguage)?.nativeName || "Language"}
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowApiKeyInput(!showApiKeyInput)}
            >
              <Settings className="mr-2 h-4 w-4" />
              API Settings
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground">
          Report service requests using voice. Speak naturally and we'll create
          your ticket.
        </p>
      </div>

      {/* API Key Configuration */}
      {showApiKeyInput && (
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 text-blue-600" />
            <div className="flex-1">
              <h3 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">
                OpenAI API Key Required
              </h3>
              <p className="mb-3 text-sm text-blue-800 dark:text-blue-200">
                This feature requires an OpenAI API key for speech recognition,
                text processing, and text-to-speech. Get your key from{" "}
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline"
                >
                  platform.openai.com/api-keys
                </a>
              </p>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="flex-1 rounded-md border px-3 py-2 text-sm"
                />
                <Button onClick={saveApiKey} size="sm">
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 text-red-600" />
            <div className="flex-1">
              <h3 className="mb-1 font-semibold text-red-900 dark:text-red-100">
                Error
              </h3>
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Language Selection Interface */}
      {isSelectingLanguage && (
        <div className="mb-8 rounded-lg border-2 border-indigo-300 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 dark:from-indigo-950 dark:to-purple-950">
          <div className="mb-6 text-center">
            <Globe className="mx-auto mb-4 h-16 w-16 text-indigo-600" />
            <h2 className="mb-2 text-2xl font-bold">Language Selection</h2>
            <p className="text-muted-foreground">
              Select your language / Seleccione su idioma / 选择您的语言
            </p>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <div
                key={lang.code}
                className="rounded-lg border-2 bg-white p-4 text-center shadow-sm transition-all hover:shadow-md dark:bg-gray-800"
              >
                <p className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
                  {lang.nativeName}
                </p>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                  {lang.prompt}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="max-w-2xl text-center">
              <p className="mb-4 text-lg font-semibold">
                🎤 Click the microphone and speak in your language
              </p>
              <p className="text-sm text-muted-foreground">
                We'll automatically detect which language you're speaking
              </p>
            </div>

            <div>
              {isRecording ? (
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-red-500 opacity-75"></div>
                  <button
                    onClick={stopRecording}
                    className="relative transform rounded-full bg-red-500 p-8 text-white transition-all hover:scale-105 hover:bg-red-600"
                  >
                    <MicOff className="h-12 w-12" />
                  </button>
                </div>
              ) : isDetectingLanguage ? (
                <div className="rounded-full bg-blue-500 p-8 text-white">
                  <Loader2 className="h-12 w-12 animate-spin" />
                </div>
              ) : isSpeaking ? (
                <div className="rounded-full bg-green-500 p-8 text-white">
                  <Volume2 className="h-12 w-12 animate-pulse" />
                </div>
              ) : (
                <button
                  onClick={startRecording}
                  disabled={!apiKey}
                  className="transform rounded-full bg-indigo-600 p-8 text-white transition-all hover:scale-105 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Mic className="h-12 w-12" />
                </button>
              )}
            </div>

            {isRecording && (
              <div className="text-center">
                <p className="text-lg font-semibold text-red-500">
                  Recording...
                </p>
                <p className="font-mono text-2xl">
                  {formatDuration(recordingDuration)}
                </p>
              </div>
            )}

            {isDetectingLanguage && (
              <div className="text-center">
                <p className="text-lg font-semibold text-blue-500">
                  Detecting your language...
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recording Interface */}
      {!isSelectingLanguage && (
        <div className="mb-8 rounded-lg border bg-card p-8">
          <div className="flex flex-col items-center">
            <div className="mb-6">
              {isRecording ? (
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-red-500 opacity-75"></div>
                  <button
                    onClick={stopRecording}
                    className="relative transform rounded-full bg-red-500 p-8 text-white transition-all hover:scale-105 hover:bg-red-600"
                  >
                    <MicOff className="h-12 w-12" />
                  </button>
                </div>
              ) : isProcessing ? (
                <div className="rounded-full bg-blue-500 p-8 text-white">
                  <Loader2 className="h-12 w-12 animate-spin" />
                </div>
              ) : isSpeaking ? (
                <div className="rounded-full bg-green-500 p-8 text-white">
                  <Volume2 className="h-12 w-12 animate-pulse" />
                </div>
              ) : (
                <button
                  onClick={startRecording}
                  disabled={!apiKey || isProcessing}
                  className="transform rounded-full bg-primary p-8 text-primary-foreground transition-all hover:scale-105 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Mic className="h-12 w-12" />
                </button>
              )}
            </div>

            <div className="text-center">
              {isRecording && (
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-red-500">
                    Recording...
                  </p>
                  <p className="font-mono text-2xl">
                    {formatDuration(recordingDuration)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Click the button to stop
                  </p>
                </div>
              )}
              {isProcessing && (
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-blue-500">
                    Processing your request...
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Transcribing audio and extracting ticket information
                  </p>
                </div>
              )}
              {isSpeaking && (
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-green-500">
                    Playing Response...
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Estimated resolution date information
                  </p>
                </div>
              )}
              {!isRecording && !isProcessing && !isSpeaking && (
                <div className="space-y-2">
                  <p className="text-lg font-semibold">Ready to Record</p>
                  <p className="max-w-md text-sm text-muted-foreground">
                    Click the microphone to start recording your service
                    request. Describe the issue and location clearly.
                  </p>
                </div>
              )}
            </div>

            {currentTranscription && (
              <div className="mt-6 w-full max-w-2xl rounded-lg bg-muted p-4">
                <p className="mb-2 text-sm font-semibold">Transcription:</p>
                <p className="text-sm italic text-muted-foreground">
                  "{currentTranscription}"
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tickets List */}
      {!isSelectingLanguage && (
        <div>
          <h2 className="mb-4 text-2xl font-bold">
            Your Tickets ({tickets.length})
          </h2>

          {tickets.length === 0 ? (
            <div className="rounded-lg border bg-card p-12 text-center">
              <FileText className="mx-auto mb-4 h-16 w-16 text-muted-foreground opacity-50" />
              <p className="mb-2 text-lg font-semibold">No tickets yet</p>
              <p className="text-muted-foreground">
                Use the voice recorder above to create your first service
                request ticket
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-lg"
                >
                  {/* Ticket Header */}
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <h3 className="text-2xl font-bold">
                            {ticket.serviceRequestType}
                          </h3>
                          <span className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur">
                            {ticket.status}
                          </span>
                        </div>
                        <p className="text-sm opacity-90">
                          Ticket #{ticket.serviceRequestNumber}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => advanceTicket(ticket.id)}
                          title="Simulate progress (Demo)"
                          className="border-white/30 bg-white/20 text-white hover:bg-white/30"
                        >
                          <FastForward className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => deleteTicket(ticket.id)}
                          className="border-white/30 bg-white/20 text-white hover:bg-white/30"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                      <div>
                        <MapPin className="mb-1 h-4 w-4 opacity-75" />
                        <p className="text-xs opacity-75">Location</p>
                        <p className="truncate text-sm font-semibold">
                          {ticket.location}
                        </p>
                      </div>

                      <div>
                        <Building className="mb-1 h-4 w-4 opacity-75" />
                        <p className="text-xs opacity-75">Department</p>
                        <p className="text-sm font-semibold">
                          {ticket.cityDepartment}
                        </p>
                      </div>

                      <div>
                        <Calendar className="mb-1 h-4 w-4 opacity-75" />
                        <p className="text-xs opacity-75">Created</p>
                        <p className="text-sm font-semibold">
                          {formatDate(ticket.createdDate)}
                        </p>
                      </div>

                      <div>
                        <Calendar className="mb-1 h-4 w-4 opacity-75" />
                        <p className="text-xs opacity-75">Est. Resolution</p>
                        <p className="text-sm font-semibold">
                          {formatDate(ticket.estimatedResolutionDate)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Ticket Tracker */}
                  {ticket.tracker && (
                    <div className="p-6">
                      <TicketTracker
                        trackerData={ticket.tracker}
                        serviceType={
                          ticket.serviceRequestType || "Service Request"
                        }
                        ticketNumber={ticket.serviceRequestNumber || ""}
                        userLanguage={
                          ticket.userLanguage || userLanguage || undefined
                        }
                        apiKey={apiKey}
                      />
                    </div>
                  )}

                  {/* Audio Transcription */}
                  {ticket.audioTranscription && (
                    <div className="px-6 pb-6">
                      <div className="rounded-lg border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-4 dark:border-purple-800 dark:from-purple-900/20 dark:to-pink-900/20">
                        <div className="flex items-start gap-3">
                          <Volume2 className="mt-0.5 h-5 w-5 text-purple-600 dark:text-purple-400" />
                          <div>
                            <p className="mb-1 text-sm font-semibold text-purple-900 dark:text-purple-100">
                              Original Voice Request
                            </p>
                            <p className="text-sm italic text-purple-800 dark:text-purple-200">
                              "{ticket.audioTranscription}"
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyTickets;
