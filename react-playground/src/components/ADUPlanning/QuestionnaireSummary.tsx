import React from "react";
import {
  applicationDetailQuestionnaire,
  getQuestionById,
} from "../../data/more-adu-planning-data";
import { QuestionnaireAnswers, TableRowData } from "../../types/adu-planning";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  CheckCircle2,
  Edit,
  Download,
  FileText,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface QuestionnaireSummaryProps {
  answers: QuestionnaireAnswers;
  onEdit?: () => void;
  onExport?: () => void;
}

/**
 * QuestionnaireSummary Component
 * Displays a read-only summary of completed questionnaire answers
 */
export function QuestionnaireSummary({
  answers,
  onEdit,
  onExport,
}: QuestionnaireSummaryProps) {
  const totalQuestions = applicationDetailQuestionnaire.reduce(
    (acc, section) => acc + section.questions.length,
    0
  );
  const answeredQuestions = Object.keys(answers).length;
  const completionPercentage = Math.round(
    (answeredQuestions / totalQuestions) * 100
  );

  /**
   * Format answer value for display
   */
  const formatAnswer = (value: any): string => {
    if (value === null || value === undefined || value === "") {
      return "—";
    }
    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }
    if (typeof value === "number") {
      return value.toString();
    }
    if (Array.isArray(value)) {
      return `${value.length} entries`;
    }
    return String(value);
  };

  /**
   * Get label for select option value
   */
  const getSelectLabel = (questionId: string, value: string): string => {
    const question = getQuestionById(questionId);
    if (!question?.options) return value;
    const option = question.options.find((opt) => opt.value === value);
    return option?.label || value;
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-8 w-8 text-green-600 mt-1" />
              <div>
                <CardTitle className="text-2xl text-green-900">
                  Questionnaire Completed
                </CardTitle>
                <p className="text-green-700 mt-1">
                  {answeredQuestions} of {totalQuestions} questions answered (
                  {completionPercentage}%)
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {onEdit && (
                <Button
                  onClick={onEdit}
                  variant="outline"
                  size="sm"
                  className="bg-white"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Answers
                </Button>
              )}
              {onExport && (
                <Button
                  onClick={onExport}
                  variant="outline"
                  size="sm"
                  className="bg-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Application Name Highlight */}
      {answers["application-name"] && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <CardTitle>Application Name</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold text-gray-900">
              {answers["application-name"]}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Important Tip Notice */}
      {answers["residential-renters"] === true && (
        <Alert className="bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-900">
            Tenant Relocation Assistance Required
          </AlertTitle>
          <AlertDescription className="text-amber-800">
            Your project involves residential renters. The Tenant Relocation
            Assistance Ordinance (TRAO) may apply to your project.
          </AlertDescription>
        </Alert>
      )}

      {/* Section Summaries */}
      {applicationDetailQuestionnaire.map((section) => {
        // Check if section has any answered questions
        const sectionAnswers = section.questions.filter(
          (q) => answers[q.id] !== undefined
        );
        
        if (sectionAnswers.length === 0) {
          return null; // Skip empty sections
        }

        return (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle className="text-xl">{section.title}</CardTitle>
              <p className="text-sm text-gray-600">
                {sectionAnswers.length} of {section.questions.length} questions
                answered
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {section.questions.map((question) => {
                  const answer = answers[question.id];
                  if (answer === undefined) return null;

                  return (
                    <div
                      key={question.id}
                      className="border-b border-gray-200 last:border-0 pb-4 last:pb-0"
                    >
                      <dt className="text-sm font-medium text-gray-700 mb-1">
                        {question.label}
                        {question.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </dt>
                      <dd className="text-base text-gray-900">
                        {question.type === "table" && Array.isArray(answer) ? (
                          <TableDisplay
                            columns={question.columns || []}
                            rows={answer as TableRowData[]}
                          />
                        ) : question.type === "select" ? (
                          getSelectLabel(question.id, answer as string)
                        ) : question.type === "textarea" ? (
                          <div className="whitespace-pre-wrap bg-gray-50 p-3 rounded-md border border-gray-200">
                            {formatAnswer(answer)}
                          </div>
                        ) : (
                          formatAnswer(answer)
                        )}
                      </dd>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Summary Stats */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Summary Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-blue-700">Project Value</p>
              <p className="text-xl font-semibold text-blue-900">
                {answers["project-value"]
                  ? `$${Number(answers["project-value"]).toLocaleString()}`
                  : "—"}
              </p>
            </div>
            <div>
              <p className="text-sm text-blue-700">Building Type</p>
              <p className="text-xl font-semibold text-blue-900">
                {answers["new-building"]
                  ? "New Construction"
                  : answers["additions-changes"]
                  ? "Addition/Alteration"
                  : "—"}
              </p>
            </div>
            <div>
              <p className="text-sm text-blue-700">Property Use</p>
              <p className="text-xl font-semibold text-blue-900">
                {answers["primary-property-use"]
                  ? getSelectLabel(
                      "primary-property-use",
                      answers["primary-property-use"] as string
                    )
                  : "—"}
              </p>
            </div>
            <div>
              <p className="text-sm text-blue-700">Parking Spaces</p>
              <p className="text-xl font-semibold text-blue-900">
                {answers["proposed-onsite-parking"] !== undefined
                  ? `${answers["proposed-onsite-parking"]} proposed`
                  : "—"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * TableDisplay Component
 * Displays table data in a formatted table
 */
interface TableDisplayProps {
  columns: Array<{ id: string; label: string }>;
  rows: TableRowData[];
}

function TableDisplay({ columns, rows }: TableDisplayProps) {
  if (rows.length === 0) {
    return (
      <p className="text-gray-500 italic text-sm">No entries added</p>
    );
  }

  return (
    <div className="overflow-x-auto mt-2">
      <table className="min-w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((col) => (
              <th
                key={col.id}
                className="border border-gray-300 px-3 py-2 text-left font-medium text-gray-700"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td
                  key={col.id}
                  className="border border-gray-300 px-3 py-2 text-gray-900"
                >
                  {row[col.id] !== undefined ? String(row[col.id]) : "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QuestionnaireSummary;

