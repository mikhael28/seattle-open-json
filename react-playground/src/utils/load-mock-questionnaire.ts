import {
  mockCompletedQuestionnaire,
  mockAADUQuestionnaire,
  mockMinimalQuestionnaire,
} from "../data/mock-questionnaire-data";
import { saveQuestionnaireAnswers } from "./questionnaire-storage";
import { QuestionnaireAnswers } from "../types/adu-planning";

/**
 * Load mock questionnaire data into localStorage
 * Useful for testing and development
 */
export function loadMockQuestionnaire(
  type: "dadu" | "aadu" | "minimal" = "dadu"
): QuestionnaireAnswers {
  let mockData: QuestionnaireAnswers;

  switch (type) {
    case "aadu":
      mockData = mockAADUQuestionnaire;
      break;
    case "minimal":
      mockData = mockMinimalQuestionnaire;
      break;
    case "dadu":
    default:
      mockData = mockCompletedQuestionnaire;
      break;
  }

  saveQuestionnaireAnswers(mockData);
  console.log(`Mock ${type.toUpperCase()} questionnaire data loaded`);
  return mockData;
}

/**
 * Check if running in development mode
 */
export function isDevelopmentMode(): boolean {
  return process.env.NODE_ENV === "development";
}

/**
 * Add developer tools to window object in development
 */
export function addDeveloperTools() {
  if (isDevelopmentMode() && typeof window !== "undefined") {
    (window as any).loadMockQuestionnaire = loadMockQuestionnaire;
    console.log(
      "🛠️ Developer tools loaded. Use window.loadMockQuestionnaire('dadu'|'aadu'|'minimal') to load mock data"
    );
  }
}
