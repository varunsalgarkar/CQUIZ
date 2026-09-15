import { useState, useEffect } from "react";
import { GameStart } from "./GameStart";
import { GameQuestion } from "./GameQuestion";
import { GameResults } from "./GameResults";
import { fetchQuizData, getQuestionsFromSection, getRandomQuestions, Question, QuizData } from "@/data/gameData";

type GameState = "start" | "playing" | "results";

export const StingGame = () => {
  const [gameState, setGameState] = useState<GameState>("start");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questionsCount, setQuestionsCount] = useState(5);
  const [questionTime, setQuestionTime] = useState(20);
  const [gameQuestions, setGameQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  // Load quiz data on component mount
  useEffect(() => {
    const loadQuizData = async () => {
      setLoading(true);
      const data = await fetchQuizData();
      setQuizData(data);
      setLoading(false);
    };
    
    loadQuizData();
  }, []);

  const handleStart = async (sectionId?: string) => {
    if (!quizData) return;
    
    setLoading(true);
    let questionsToUse: Question[] = [];
    
    if (sectionId) {
      // Use questions from specific section
      setSelectedSection(sectionId);
      const sectionQuestions = getQuestionsFromSection(quizData, sectionId);
      questionsToUse = getRandomQuestions(sectionQuestions, questionsCount);
    } else {
      // Use questions from all sections randomly
      const allQuestions = quizData.sections.flatMap(section => section.questions);
      questionsToUse = getRandomQuestions(allQuestions, questionsCount);
    }
    
    setGameQuestions(questionsToUse);
    setGameState("playing");
    setCurrentQuestionIndex(0);
    setScore(0);
    setLoading(false);
  };

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setScore(score + 1);
    }

    // Move to next question or end game
    if (currentQuestionIndex + 1 < gameQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const finalScore = correct ? score + 1 : score;
      setTimeout(() => {
        setGameState("results");
        if (window.opener) {
          window.opener.postMessage(
            { source: "quiz", type: "score-update", payload: { score: finalScore, total: gameQuestions.length } },
            "*"
          );
          setTimeout(() => window.close(), 3000);
        }
      }, 1000);
    }
  };

  const handleRestart = () => {
    setGameState("start");
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center sting-bg">
        <div className="text-sting-gold text-lg">Loading questions...</div>
      </div>
    );
  }

  if (gameState === "start") {
    return (
      <GameStart 
        onStart={handleStart} 
        questionsCount={questionsCount}
        onQuestionsCountChange={setQuestionsCount}
        questionTime={questionTime}
        onQuestionTimeChange={setQuestionTime}
      />
    );
  }

  if (gameState === "results") {
    return (
      <GameResults
        score={score}
        totalQuestions={gameQuestions.length}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <GameQuestion
      question={gameQuestions[currentQuestionIndex]}
      onAnswer={handleAnswer}
      onRestart={handleRestart}
      currentScore={score}
      totalQuestions={gameQuestions.length}
      currentQuestionIndex={currentQuestionIndex}
      questionTime={questionTime}
    />
  );
};