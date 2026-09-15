export interface Question {
  questionId: string;
  corpus: string;
  options: Array<{text: string; isCorrect: boolean}>;
  gif?:string;
}

export interface Section {
  sectionId: string;
  title: string;
  questions: Question[];
}

export interface QuizData {
  quizTitle: string;
  description: string;
  sections: Section[];
}

// Function to fetch quiz data from JSON file
export const fetchQuizData = async (): Promise<QuizData> => {
  try {
    // BASE_URL (not a hardcoded "/") so this still resolves correctly
    // when the app is deployed under a subpath, e.g. GitHub Pages'
    // /CQUIZ/ instead of the site root. __BUILD_TIME__ busts any
    // cached copy of this file from a previous deploy.
    const response = await fetch(`${import.meta.env.BASE_URL}questions.json?v=${__BUILD_TIME__}`);
    if (!response.ok) {
      throw new Error('Failed to fetch quiz data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    // Fallback data if fetch fails
    return {
      quizTitle: "Sting Energy Quiz",
      description: "Test your energy knowledge",
      sections: [
        {
          sectionId: "section_1",
          title: "Category: Energy Drinks",
          questions: [
            {
              questionId: "q_1_1",
              corpus: "What year was Sting Energy Drink first launched?",
              options: [
                {"text": "2002", "isCorrect": true},
                {"text": "2004", "isCorrect": false},
                {"text": "2006", "isCorrect": false},
                {"text": "2008", "isCorrect": false}
              ],
              gif: "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif",
            }
          ]
        }
      ]
    };
  }
};

// Function to get questions from a specific section
export const getQuestionsFromSection = (quizData: QuizData, sectionId: string): Question[] => {
  const section = quizData.sections.find(s => s.sectionId === sectionId);
  return section ? section.questions : [];
};

// Function to get random questions without repetition
export const getRandomQuestions = (allQuestions: Question[], count: number): Question[] => {
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, allQuestions.length));
};

export const getRevenueMessage = (score: number, total: number): string => {
  const percentage = (score / total) * 100;
  
  if (percentage === 100) {
    return "⚡ PERFECT ENERGY! Maximum revenue achieved!";
  } else if (percentage >= 75) {
    return "🔥 High Energy! Strong revenue growth!";
  } else if (percentage >= 50) {
    return "⚡ Good Energy! Decent revenue generated!";
  } else {
    return "🔋 Low Energy! Need more power to boost revenue!";
  }
};