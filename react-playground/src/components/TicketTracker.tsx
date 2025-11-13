import React, { useState } from "react";
import { TicketTrackerData, TicketStatusStep } from "../types/ticket-tracker";
import CityWorkerAnimation from "./CityWorkerAnimation";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Calendar,
  ChevronDown,
  ChevronUp,
  Volume2,
  Loader2,
} from "lucide-react";
import { Button } from "./ui/button";
import { generateStatusUpdate, textToSpeech } from "../services/openai";
import { getLanguageName } from "../utils/languages";

interface TicketTrackerProps {
  trackerData: TicketTrackerData;
  serviceType: string;
  ticketNumber: string;
  userLanguage?: string;
  apiKey?: string;
}

const TicketTracker: React.FC<TicketTrackerProps> = ({
  trackerData,
  serviceType,
  ticketNumber,
  userLanguage,
  apiKey,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isPlayingUpdate, setIsPlayingUpdate] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-red-600 bg-red-100";
      case "high":
        return "text-orange-600 bg-orange-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handlePlayStatusUpdate = async () => {
    if (!apiKey || !userLanguage) {
      return;
    }

    setIsPlayingUpdate(true);
    try {
      // Generate status update message in user's language
      const statusMessage = await generateStatusUpdate(
        serviceType,
        trackerData.currentStatus,
        trackerData.estimatedCompletionDate,
        trackerData.daysRemaining,
        userLanguage,
        apiKey
      );

      // Convert to speech
      const speechBlob = await textToSpeech(statusMessage, apiKey);

      // Play audio
      const audioUrl = URL.createObjectURL(speechBlob);
      const audio = new Audio(audioUrl);

      audio.onended = () => {
        setIsPlayingUpdate(false);
        URL.revokeObjectURL(audioUrl);
      };

      audio.onerror = () => {
        setIsPlayingUpdate(false);
        URL.revokeObjectURL(audioUrl);
      };

      await audio.play();
    } catch (error) {
      console.error("Error playing status update:", error);
      setIsPlayingUpdate(false);
    }
  };

  const currentStepIndex = trackerData.steps.findIndex((step) => step.isActive);

  return (
    <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-lg dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
            🍕 Ticket Tracker
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Track your {serviceType} request in real-time
          </p>
        </div>
        <div className="flex gap-2">
          {userLanguage && apiKey && (
            <Button
              variant="outline"
              size="sm"
              onClick={handlePlayStatusUpdate}
              disabled={isPlayingUpdate}
              className="bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900 dark:hover:bg-indigo-800"
            >
              {isPlayingUpdate ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Playing...
                </>
              ) : (
                <>
                  <Volume2 className="mr-2 h-4 w-4" />
                  Hear Update ({getLanguageName(userLanguage)})
                </>
              )}
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Progress
          </span>
          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {trackerData.progressPercentage}%
          </span>
        </div>

        <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-1000 ease-out"
            style={{ width: `${trackerData.progressPercentage}%` }}
          >
            <div className="absolute inset-0 animate-pulse bg-white opacity-30" />
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800">
          <div className="mb-1 flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
              Days Elapsed
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {trackerData.daysElapsed}
          </p>
        </div>

        <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800">
          <div className="mb-1 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
              Days Remaining
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {trackerData.daysRemaining}
          </p>
        </div>

        <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800">
          <div className="mb-1 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
              Priority
            </span>
          </div>
          <p
            className={`text-sm font-bold uppercase ${getPriorityColor(
              trackerData.priority
            )} inline-block rounded px-2 py-1`}
          >
            {trackerData.priority}
          </p>
        </div>
      </div>

      {/* Estimated Completion */}
      <div className="mb-6 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
        <div className="mb-2 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-indigo-600" />
          <span className="font-semibold text-gray-900 dark:text-white">
            Estimated Completion
          </span>
        </div>
        <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
          {formatDate(trackerData.estimatedCompletionDate)}
        </p>
        {trackerData.actualCompletionDate && (
          <p className="mt-1 text-sm text-green-600 dark:text-green-400">
            ✓ Completed on {formatDate(trackerData.actualCompletionDate)}
          </p>
        )}
      </div>

      {/* Alerts */}
      {trackerData.alerts && trackerData.alerts.length > 0 && (
        <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
          <div className="flex items-start gap-2">
            <AlertCircle className="mt-0.5 h-5 w-5 text-yellow-600" />
            <div>
              <p className="mb-1 font-semibold text-yellow-900 dark:text-yellow-200">
                Updates
              </p>
              {trackerData.alerts.map((alert, idx) => (
                <p
                  key={idx}
                  className="text-sm text-yellow-800 dark:text-yellow-300"
                >
                  • {alert}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Status Steps */}
      {isExpanded && (
        <div className="space-y-4">
          <h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Status Timeline
          </h4>

          {trackerData.steps.map((step, index) => (
            <StatusStep
              key={step.status}
              step={step}
              isLast={index === trackerData.steps.length - 1}
              isFirst={index === 0}
            />
          ))}
        </div>
      )}

      {/* Ticket Info Footer */}
      <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700">
        <p className="text-center text-xs text-gray-500 dark:text-gray-400">
          Ticket #{ticketNumber} • Last updated:{" "}
          {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

// Individual Status Step Component
interface StatusStepProps {
  step: TicketStatusStep;
  isLast: boolean;
  isFirst: boolean;
}

const StatusStep: React.FC<StatusStepProps> = ({ step, isLast, isFirst }) => {
  const getStatusIcon = () => {
    if (step.isCompleted) {
      return <CheckCircle2 className="h-6 w-6 text-green-500" />;
    } else if (step.isActive) {
      return (
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-blue-500 opacity-75" />
          <Clock className="relative h-6 w-6 text-blue-500" />
        </div>
      );
    } else {
      return <Clock className="h-6 w-6 text-gray-300" />;
    }
  };

  return (
    <div className="relative">
      {/* Connector line */}
      {!isLast && (
        <div
          className={`absolute left-[19px] top-12 h-20 w-0.5 ${
            step.isCompleted ? "bg-green-500" : "bg-gray-300"
          }`}
        />
      )}

      <div
        className={`flex gap-4 ${
          step.isActive ? "bg-blue-50 dark:bg-blue-900/20" : ""
        } ${
          step.isActive || step.isCompleted ? "pb-4" : ""
        } rounded-lg p-3 transition-all duration-300`}
      >
        {/* Status Icon */}
        <div className="mt-1 flex-shrink-0">{getStatusIcon()}</div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h5
                className={`font-semibold ${
                  step.isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : step.isCompleted
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {step.label}
              </h5>
              <p
                className={`mt-1 text-sm ${
                  step.isActive
                    ? "text-gray-700 dark:text-gray-300"
                    : step.isCompleted
                    ? "text-gray-600 dark:text-gray-400"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              >
                {step.description}
              </p>

              {step.timestamp && (
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {new Date(step.timestamp).toLocaleString()}
                </p>
              )}

              {step.assignedTo && (
                <p className="mt-1 text-xs text-indigo-600 dark:text-indigo-400">
                  Assigned to: {step.assignedTo}
                </p>
              )}

              {step.notes && (
                <p className="mt-2 text-xs italic text-gray-600 dark:text-gray-400">
                  Note: {step.notes}
                </p>
              )}
            </div>

            {/* Worker Animation */}
            {step.workerAnimation && (step.isActive || step.isCompleted) && (
              <div className="flex-shrink-0">
                <CityWorkerAnimation
                  type={step.workerAnimation}
                  isActive={step.isActive}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketTracker;
