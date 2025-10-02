import React, { useState, useEffect } from "react";
import {
  applicationDetailQuestionnaire,
  Question,
  TableColumn,
} from "../../data/more-adu-planning-data";
import {
  QuestionnaireAnswers,
  TableRowData,
} from "../../types/adu-planning";
import {
  saveQuestionnaireAnswers,
  loadQuestionnaireAnswers,
  exportAnswersAsJSON,
} from "../../utils/questionnaire-storage";
import { loadMockQuestionnaire } from "../../utils/load-mock-questionnaire";
import {
  mockCompletedQuestionnaire,
  mockAADUQuestionnaire,
  mockMinimalQuestionnaire,
} from "../../data/mock-questionnaire-data";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { InfoCircledIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { QuestionnaireSummary } from "./QuestionnaireSummary";

interface ApplicationQuestionnaireProps {
  onComplete?: (answers: QuestionnaireAnswers) => void;
  initialAnswers?: QuestionnaireAnswers;
  showSummaryIfComplete?: boolean; // If true, shows summary view when data exists
}

/**
 * ApplicationQuestionnaire Component
 * Renders a comprehensive questionnaire based on applicationDetailQuestionnaire data
 */
export function ApplicationQuestionnaire({
  onComplete,
  initialAnswers,
  showSummaryIfComplete = true,
}: ApplicationQuestionnaireProps) {
  const [answers, setAnswers] = useState<QuestionnaireAnswers>(() => {
    return initialAnswers || loadQuestionnaireAnswers();
  });

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});
  const [isEditing, setIsEditing] = useState(false);
  const [showMockDataMenu, setShowMockDataMenu] = useState(false);

  // Check if questionnaire has substantial data (more than just a few answers)
  const hasCompletedData = Object.keys(answers).length >= 5;
  const showSummary = showSummaryIfComplete && hasCompletedData && !isEditing;

  // Auto-save to localStorage whenever answers change
  useEffect(() => {
    saveQuestionnaireAnswers(answers);
  }, [answers]);

  const currentSection = applicationDetailQuestionnaire[currentSectionIndex];
  const isLastSection =
    currentSectionIndex === applicationDetailQuestionnaire.length - 1;
  const isFirstSection = currentSectionIndex === 0;

  /**
   * Update answer for a specific question
   */
  const updateAnswer = (
    questionId: string,
    value: string | number | boolean | TableRowData[]
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
    // Clear validation error when user updates
    if (validationErrors[questionId]) {
      setValidationErrors((prev) => {
        const updated = { ...prev };
        delete updated[questionId];
        return updated;
      });
    }
  };

  /**
   * Validate current section before proceeding
   */
  const validateSection = (): boolean => {
    const errors: { [key: string]: string } = {};
    currentSection.questions.forEach((question) => {
      if (question.required) {
        const answer = answers[question.id];
        if (
          answer === undefined ||
          answer === null ||
          answer === "" ||
          (Array.isArray(answer) && answer.length === 0)
        ) {
          errors[question.id] = "This field is required";
        }
      }
    });
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Navigate to next section
   */
  const handleNext = () => {
    if (validateSection()) {
      if (isLastSection) {
        onComplete?.(answers);
      } else {
        setCurrentSectionIndex((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  /**
   * Navigate to previous section
   */
  const handlePrevious = () => {
    if (!isFirstSection) {
      setCurrentSectionIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /**
   * Handle exporting the questionnaire answers
   */
  const handleExport = () => {
    const json = exportAnswersAsJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `questionnaire-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /**
   * Handle edit button click
   */
  const handleEdit = () => {
    setIsEditing(true);
    setCurrentSectionIndex(0);
  };

  /**
   * Handle loading mock data
   */
  const handleLoadMockData = (type: "dadu" | "aadu" | "minimal") => {
    let mockData;
    switch (type) {
      case "dadu":
        mockData = mockCompletedQuestionnaire;
        break;
      case "aadu":
        mockData = mockAADUQuestionnaire;
        break;
      case "minimal":
        mockData = mockMinimalQuestionnaire;
        break;
    }
    
    setAnswers(mockData);
    saveQuestionnaireAnswers(mockData);
    setShowMockDataMenu(false);
    setCurrentSectionIndex(0);
    
    // Show confirmation
    alert(`Mock ${type.toUpperCase()} data loaded successfully! You can now review or modify the answers.`);
  };

  // Show summary view if data exists and not editing
  if (showSummary) {
    return (
      <QuestionnaireSummary 
        answers={answers} 
        onEdit={handleEdit}
        onExport={handleExport}
      />
    );
  }

  /**
   * Render a single question based on its type
   */
  const renderQuestion = (question: Question) => {
    const value = answers[question.id];
    const error = validationErrors[question.id];

    return (
      <div key={question.id} className="space-y-2 mb-6">
        <Label htmlFor={question.id} className="text-base font-medium">
          {question.label}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </Label>

        {/* Help Text */}
        {question.helpText && (
          <p className="text-sm text-gray-600">{question.helpText}</p>
        )}

        {/* Tip Display */}
        {question.tip && (
          <Alert className="bg-blue-50 border-blue-200">
            <InfoCircledIcon className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-900">
              Tip {question.tip.number}: {question.tip.name}
            </AlertTitle>
            <AlertDescription className="text-blue-800">
              {question.tip.description}
            </AlertDescription>
          </Alert>
        )}

        {/* Question Input */}
        {question.type === "text" && (
          <Input
            id={question.id}
            type="text"
            value={(value as string) || ""}
            onChange={(e) => updateAnswer(question.id, e.target.value)}
            placeholder={question.placeholder}
            className={error ? "border-red-500" : ""}
          />
        )}

        {question.type === "number" && (
          <Input
            id={question.id}
            type="number"
            value={(value as number) || ""}
            onChange={(e) =>
              updateAnswer(question.id, parseFloat(e.target.value) || 0)
            }
            placeholder={question.placeholder}
            className={error ? "border-red-500" : ""}
          />
        )}

        {question.type === "textarea" && (
          <Textarea
            id={question.id}
            value={(value as string) || ""}
            onChange={(e) => updateAnswer(question.id, e.target.value)}
            placeholder={question.placeholder}
            rows={4}
            className={error ? "border-red-500" : ""}
          />
        )}

        {question.type === "boolean" && (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={question.id}
              checked={(value as boolean) || false}
              onCheckedChange={(checked) =>
                updateAnswer(question.id, checked === true)
              }
            />
            <Label htmlFor={question.id} className="font-normal cursor-pointer">
              Yes
            </Label>
          </div>
        )}

        {question.type === "select" && (
          <Select
            value={(value as string) || ""}
            onValueChange={(val) => updateAnswer(question.id, val)}
          >
            <SelectTrigger
              id={question.id}
              className={error ? "border-red-500" : ""}
            >
              <SelectValue placeholder="--Select--" />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {question.type === "table" && (
          <TableInput
            columns={question.columns || []}
            value={(value as TableRowData[]) || []}
            onChange={(rows) => updateAnswer(question.id, rows)}
            error={error}
          />
        )}

        {/* Validation Error */}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Mock Data Loader - Show at beginning if no/minimal data */}
      {!hasCompletedData && currentSectionIndex === 0 && (
        <Card className="mb-6 border-purple-200 bg-purple-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg text-purple-900">
                  Quick Start with Sample Data
                </CardTitle>
                <p className="text-sm text-purple-700 mt-1">
                  Load a pre-filled example to explore the questionnaire or as a starting point
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMockDataMenu(!showMockDataMenu)}
                className="bg-white"
              >
                {showMockDataMenu ? "Hide Options" : "Load Sample"}
              </Button>
            </div>
          </CardHeader>
          {showMockDataMenu && (
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button
                  onClick={() => handleLoadMockData("dadu")}
                  variant="outline"
                  className="flex flex-col items-start h-auto py-4 px-4 bg-white hover:bg-purple-50"
                >
                  <span className="font-semibold text-purple-900">DADU Example</span>
                  <span className="text-xs text-gray-600 mt-1 text-left">
                    Complete 800 sq ft detached ADU with all details filled
                  </span>
                </Button>
                <Button
                  onClick={() => handleLoadMockData("aadu")}
                  variant="outline"
                  className="flex flex-col items-start h-auto py-4 px-4 bg-white hover:bg-purple-50"
                >
                  <span className="font-semibold text-purple-900">AADU Example</span>
                  <span className="text-xs text-gray-600 mt-1 text-left">
                    Basement conversion to attached ADU
                  </span>
                </Button>
                <Button
                  onClick={() => handleLoadMockData("minimal")}
                  variant="outline"
                  className="flex flex-col items-start h-auto py-4 px-4 bg-white hover:bg-purple-50"
                >
                  <span className="font-semibold text-purple-900">Minimal Example</span>
                  <span className="text-xs text-gray-600 mt-1 text-left">
                    Basic required fields only
                  </span>
                </Button>
              </div>
              <p className="text-xs text-purple-600 mt-3">
                💡 Sample data will be saved to your browser. You can edit any field after loading.
              </p>
            </CardContent>
          )}
        </Card>
      )}

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Section {currentSectionIndex + 1} of{" "}
            {applicationDetailQuestionnaire.length}
          </span>
          <span className="text-sm text-gray-600">
            {currentSection.title}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${
                ((currentSectionIndex + 1) /
                  applicationDetailQuestionnaire.length) *
                100
              }%`,
            }}
          />
        </div>
      </div>

      {/* Current Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{currentSection.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {currentSection.questions.length === 0 ? (
            <p className="text-gray-500 italic">
              No questions in this section yet.
            </p>
          ) : (
            currentSection.questions.map(renderQuestion)
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={isFirstSection}
        >
          Previous
        </Button>
        <Button onClick={handleNext}>
          {isLastSection ? "Complete" : "Next"}
        </Button>
      </div>
    </div>
  );
}

/**
 * TableInput Component
 * Handles table-type questions with dynamic rows
 */
interface TableInputProps {
  columns: TableColumn[];
  value: TableRowData[];
  onChange: (rows: TableRowData[]) => void;
  error?: string;
}

function TableInput({ columns, value, onChange, error }: TableInputProps) {
  const addRow = () => {
    const newRow: TableRowData = {};
    columns.forEach((col) => {
      newRow[col.id] = col.type === "number" ? 0 : "";
    });
    onChange([...value, newRow]);
  };

  const removeRow = (index: number) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateCell = (
    rowIndex: number,
    columnId: string,
    cellValue: string | number
  ) => {
    const updated = [...value];
    updated[rowIndex] = {
      ...updated[rowIndex],
      [columnId]: cellValue,
    };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table
          className={`w-full border-collapse border ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        >
          <thead>
            <tr className="bg-gray-100">
              {columns.map((col) => (
                <th
                  key={col.id}
                  className="border border-gray-300 px-4 py-2 text-left text-sm font-medium"
                >
                  {col.label}
                </th>
              ))}
              <th className="border border-gray-300 px-4 py-2 w-20">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {value.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="border border-gray-300 px-4 py-8 text-center text-gray-500 italic"
                >
                  No rows added yet. Click "Add Row" to get started.
                </td>
              </tr>
            ) : (
              value.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col) => (
                    <td key={col.id} className="border border-gray-300 px-2 py-2">
                      {col.type === "select" ? (
                        <Select
                          value={(row[col.id] as string) || ""}
                          onValueChange={(val) =>
                            updateCell(rowIndex, col.id, val)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            {col.options?.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : col.type === "number" ? (
                        <Input
                          type="number"
                          value={(row[col.id] as number) || 0}
                          onChange={(e) =>
                            updateCell(
                              rowIndex,
                              col.id,
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-full"
                        />
                      ) : (
                        <Input
                          type="text"
                          value={(row[col.id] as string) || ""}
                          onChange={(e) =>
                            updateCell(rowIndex, col.id, e.target.value)
                          }
                          className="w-full"
                        />
                      )}
                    </td>
                  ))}
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRow(rowIndex)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Button variant="outline" size="sm" onClick={addRow}>
        <PlusIcon className="h-4 w-4 mr-2" />
        Add Row
      </Button>
    </div>
  );
}

export default ApplicationQuestionnaire;

