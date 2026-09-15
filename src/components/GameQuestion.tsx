import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle, Clock, RotateCcw } from "lucide-react";

interface Question {
  questionId: string;
  corpus: string;
  options: Array<{text: string; isCorrect: boolean}>;
}
const DEFAULT_INTRO_GIF = "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif";
interface GameQuestionProps {
  question: Question;
  onAnswer: (correct: boolean) => void;
  onRestart: () => void;
  currentScore: number;
  totalQuestions: number;
  currentQuestionIndex: number;
  questionTime: number;
}

export const GameQuestion = ({ question, onAnswer, onRestart, currentScore, totalQuestions, currentQuestionIndex, questionTime }: GameQuestionProps) => {
  const [showGif, setShowGif] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [questionCountdown, setQuestionCountdown] = useState(questionTime);

  // Reset state when question changes
  useEffect(() => {
    // setShowGif(true);
    setShowGif(currentQuestionIndex === 0)
    setSelectedAnswer(null);
    setAnswered(false);
    setCountdown(3);
    setQuestionCountdown(questionTime);
  }, [question.questionId, questionTime , currentQuestionIndex]);

  useEffect(() => {
    if (showGif && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setShowGif(false);
    }
  }, [showGif, countdown]);

  // Question timer
  useEffect(() => {
    if (!showGif && !answered && questionCountdown > 0) {
      const timer = setTimeout(() => setQuestionCountdown(questionCountdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (questionCountdown === 0 && !answered) {
      // Auto-submit as incorrect when time runs out
      setAnswered(true);
      setTimeout(() => {
        onAnswer(false);
      }, 1500);
    }
  }, [showGif, answered, questionCountdown, onAnswer]);

  const handleAnswer = (answerIndex: number) => {
    if (answered) return;
    
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    
    const correct = question.options[answerIndex]?.isCorrect || false;
    
    setTimeout(() => {
      onAnswer(correct);
    }, 1500);
  };

  if (showGif) {
     const introGif = DEFAULT_INTRO_GIF;
    return (
      <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 sting-bg">
        <div className="energy-particles"></div>
        <div className="electric-border max-w-xs sm:max-w-md w-full bounce-entrance">
          <div className="electric-border-inner p-4 sm:p-6 md:p-8 text-center">
          <div className="mb-4">
            <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-electric-cyan mx-auto mb-2" />

            <h3 className="text-lg sm:text-xl font-bold text-sting-gold">Get Ready!</h3>
            <img src={introGif} alt="Get Ready" className="absolute inset-0 w-full h-full object-cover" ></img>
            <p className="text-sting-white/70 text-sm sm:text-base">Question {currentQuestionIndex + 1} coming up...</p>
          </div>
          
          <div className="mb-4 sm:mb-6 relative">
            <div className="w-full h-32 sm:h-40 bg-gradient-to-br from-sting-gold/20 to-electric-cyan/20 rounded-lg glass-card flex items-center justify-center">
              <div className="text-3xl sm:text-4xl font-bold text-sting-gold energy-pulse">
                {countdown}
              </div>
            </div>
          </div>
          
          <div className="text-xs sm:text-sm text-sting-white/60">
            Auto-starting in {countdown} seconds...
          </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 sting-bg">
      <div className="energy-particles"></div>
      <div className="max-w-xs sm:max-w-2xl md:max-w-4xl w-full">
        {/* Progress Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-sting-white/70">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-sting-gold">
                Revenue: ${currentScore}M
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={onRestart}
                className="glass-button border-sting-orange text-sting-orange hover:bg-sting-orange/10 px-3 py-1 h-auto text-xs"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Restart
              </Button>
            </div>
          </div>
          <div className="w-full bg-neutral/30 rounded-full h-2">
            <div 
              className="sting-gradient h-2 rounded-full transition-all duration-500"
              style={{ width: `${currentQuestionIndex / totalQuestions * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="electric-border slide-up">
          <div className="electric-border-inner p-4 sm:p-6 md:p-8 text-center">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-sting-white leading-tight flex-1">
              {question.corpus}
            </h2>
            <div className="ml-4 text-right">
              <div className="text-sm text-sting-white/70">Time Left</div>
              <div className={`text-2xl font-bold ${questionCountdown <= 10 ? 'text-red-500' : 'text-sting-gold'}`}>
                {questionCountdown}s
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = option.isCorrect;
              const showResult = answered;
              
              let buttonClass = "glass-button p-3 sm:p-4 md:p-6 text-left h-auto hover:bg-sting-gold/10 border-2 border-sting-white/20 transition-[var(--transition-smooth)] text-sm sm:text-base";
              
              if (showResult) {
                if (isSelected && isCorrect) {
                  buttonClass = "glass-card p-3 sm:p-4 md:p-6 text-left h-auto bg-correct/20 border-2 border-correct text-correct text-sm sm:text-base";
                } else if (isSelected && !isCorrect) {
                  buttonClass = "glass-card p-3 sm:p-4 md:p-6 text-left h-auto bg-incorrect/20 border-2 border-incorrect text-incorrect text-sm sm:text-base";
                } else if (isCorrect) {
                  buttonClass = "glass-card p-3 sm:p-4 md:p-6 text-left h-auto bg-correct/10 border-2 border-correct/50 text-correct text-sm sm:text-base";
                }
              }
              
              return (
                <Button
                  key={index}
                  variant="outline"
                  // className={buttonClass}
                  className={`${buttonClass} whitespace-normal`}
                  onClick={() => handleAnswer(index)}
                  disabled={answered}
                >
                  <div className="flex items-center gap-2 sm:gap-3 w-full">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-sting-gold/20 flex items-center justify-center font-bold text-sting-gold text-xs sm:text-sm md:text-base">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="flex-1 text-left">{option.text}</span>
                    {showResult && isSelected && (
                      isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-correct" />
                      ) : (
                        <XCircle className="w-5 h-5 text-incorrect" />
                      )
                    )}
                    {showResult && !isSelected && isCorrect && (
                      <CheckCircle className="w-5 h-5 text-correct" />
                    )}
                  </div>
                </Button>
              );
            })}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};