import React, { useState } from "react";
import { ApplicationQuestionnaire } from "../components/ADUPlanning/ApplicationQuestionnaire";
import { QuestionnaireAnswers } from "../types/adu-planning";
import {
  clearQuestionnaireAnswers,
  exportAnswersAsJSON,
  hasQuestionnaireData,
} from "../utils/questionnaire-storage";
import { loadMockQuestionnaire } from "../utils/load-mock-questionnaire";
import { Button } from "../components/ui/button";
import { CheckCircledIcon, DownloadIcon, TrashIcon, FileTextIcon } from "@radix-ui/react-icons";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";

/**
 * QuestionnaireDemo Page
 * Demonstrates the ApplicationQuestionnaire component usage
 */
export default function QuestionnaireDemo() {
  const [isComplete, setIsComplete] = useState(false);
  const [completedAnswers, setCompletedAnswers] =
    useState<QuestionnaireAnswers | null>(null);
  const [showQuestionnaire, setShowQuestionnaire] = useState(
    !hasQuestionnaireData()
  );

  const handleComplete = (answers: QuestionnaireAnswers) => {
    setCompletedAnswers(answers);
    setIsComplete(true);
    setShowQuestionnaire(false);
    console.log("Questionnaire completed with answers:", answers);
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all questionnaire data? This cannot be undone."
      )
    ) {
      clearQuestionnaireAnswers();
      setIsComplete(false);
      setCompletedAnswers(null);
      setShowQuestionnaire(true);
    }
  };

  const handleDownload = () => {
    const json = exportAnswersAsJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `adu-questionnaire-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleContinue = () => {
    setShowQuestionnaire(true);
    setIsComplete(false);
  };

  const handleLoadMockData = (type: "dadu" | "aadu" | "minimal") => {
    const mockData = loadMockQuestionnaire(type);
    setCompletedAnswers(mockData);
    setIsComplete(false);
    setShowQuestionnaire(true);
    window.location.reload(); // Reload to show the summary
  };

  if (isComplete) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <CheckCircledIcon className="h-6 w-6" />
              Questionnaire Completed!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-green-50 border-green-200">
              <CheckCircledIcon className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-900">Success</AlertTitle>
              <AlertDescription className="text-green-800">
                Your application details have been saved. You can now proceed with
                your ADU planning process.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Total questions answered:{" "}
                <strong>{Object.keys(completedAnswers || {}).length}</strong>
              </p>
              <p className="text-sm text-gray-600">
                Your answers are automatically saved to your browser's local
                storage.
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button onClick={handleDownload} variant="outline">
                <DownloadIcon className="h-4 w-4 mr-2" />
                Download Answers (JSON)
              </Button>
              <Button onClick={handleContinue} variant="outline">
                Edit Answers
              </Button>
              <Button onClick={handleReset} variant="destructive">
                <TrashIcon className="h-4 w-4 mr-2" />
                Clear All Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!showQuestionnaire && hasQuestionnaireData()) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Resume Questionnaire</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              We found saved questionnaire data. Would you like to continue where
              you left off, or start fresh?
            </p>
            <div className="flex gap-2">
              <Button onClick={handleContinue}>Continue</Button>
              <Button onClick={handleReset} variant="outline">
                Start Fresh
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!showQuestionnaire && !hasQuestionnaireData()) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Questionnaire Demo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Start a new questionnaire or load mock data to see how the summary view works.
            </p>
            <div className="space-y-2">
              <Button onClick={handleContinue} className="w-full">
                Start New Questionnaire
              </Button>
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 mb-2">
                  Or load mock data for testing:
                </p>
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => handleLoadMockData("dadu")}
                    variant="outline"
                    className="w-full"
                  >
                    <FileTextIcon className="h-4 w-4 mr-2" />
                    Load DADU Example
                  </Button>
                  <Button
                    onClick={() => handleLoadMockData("aadu")}
                    variant="outline"
                    className="w-full"
                  >
                    <FileTextIcon className="h-4 w-4 mr-2" />
                    Load AADU Example
                  </Button>
                  <Button
                    onClick={() => handleLoadMockData("minimal")}
                    variant="outline"
                    className="w-full"
                  >
                    <FileTextIcon className="h-4 w-4 mr-2" />
                    Load Minimal Example
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ADU Application Detail Questionnaire
          </h1>
          <p className="text-lg text-gray-600">
            Complete this questionnaire to prepare your ADU permit application
          </p>
        </div>

        <ApplicationQuestionnaire onComplete={handleComplete} />
      </div>
    </div>
  );
}

