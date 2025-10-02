import { QuestionnaireAnswers } from "../types/adu-planning";

const STORAGE_KEY = "adu-questionnaire-answers";

/**
 * Save questionnaire answers to localStorage
 */
export function saveQuestionnaireAnswers(answers: QuestionnaireAnswers): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    console.log("Questionnaire answers saved to localStorage");
  } catch (error) {
    console.error("Failed to save questionnaire answers:", error);
    throw new Error("Failed to save questionnaire data");
  }
}

/**
 * Load questionnaire answers from localStorage
 */
export function loadQuestionnaireAnswers(): QuestionnaireAnswers {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log("Questionnaire answers loaded from localStorage");
      return parsed;
    }
  } catch (error) {
    console.error("Failed to load questionnaire answers:", error);
  }
  return {};
}

/**
 * Clear questionnaire answers from localStorage
 */
export function clearQuestionnaireAnswers(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log("Questionnaire answers cleared from localStorage");
  } catch (error) {
    console.error("Failed to clear questionnaire answers:", error);
  }
}

/**
 * Get a specific answer by question ID
 */
export function getAnswerById(
  questionId: string
): string | number | boolean | any[] | undefined {
  const answers = loadQuestionnaireAnswers();
  return answers[questionId];
}

/**
 * Update a single answer
 */
export function updateAnswer(
  questionId: string,
  value: string | number | boolean | any[]
): void {
  const answers = loadQuestionnaireAnswers();
  answers[questionId] = value;
  saveQuestionnaireAnswers(answers);
}

/**
 * Check if questionnaire has been started
 */
export function hasQuestionnaireData(): boolean {
  const answers = loadQuestionnaireAnswers();
  return Object.keys(answers).length > 0;
}

/**
 * Export answers as JSON for download
 */
export function exportAnswersAsJSON(): string {
  const answers = loadQuestionnaireAnswers();
  return JSON.stringify(answers, null, 2);
}

/**
 * Import answers from JSON string
 */
export function importAnswersFromJSON(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    saveQuestionnaireAnswers(parsed);
    return true;
  } catch (error) {
    console.error("Failed to import questionnaire answers:", error);
    return false;
  }
}
