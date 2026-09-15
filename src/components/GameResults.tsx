import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, TrendingUp, RotateCcw, Star } from "lucide-react";
import { useEffect, useState } from "react";

interface GameResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export const GameResults = ({ score, totalQuestions, onRestart }: GameResultsProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const percentage = (score / totalQuestions) * 100;
  
  const getPerformanceLevel = () => {
    if (percentage === 100) return { level: "LEGENDARY", color: "text-revenue-max", icon: "🏆" };
    if (percentage >= 75) return { level: "EXCELLENT", color: "text-correct", icon: "🌟" };
    if (percentage >= 50) return { level: "GOOD", color: "text-revenue-medium", icon: "👍" };
    return { level: "NEEDS WORK", color: "text-incorrect", icon: "📈" };
  };

  const performance = getPerformanceLevel();

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sting-bg">
      <div className="energy-particles"></div>
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-pepsi-blue rounded-full animate-[confetti-fall_3s_linear_infinite]"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: i % 2 === 0 ? 'hsl(var(--sting-gold))' : 'hsl(var(--electric-cyan))'
              }}
            />
          ))}
        </div>
      )}

      <div className="electric-border max-w-2xl w-full bounce-entrance">
        <div className="electric-border-inner p-8 text-center energy-pulse">
        <div className="mb-6">
          <div className="text-6xl mb-4">{performance.icon}</div>
          <h1 className="text-4xl font-bold sting-gradient bg-clip-text text-transparent mb-2">
            MISSION COMPLETE!
          </h1>
          <p className={`text-xl font-bold ${performance.color}`}>
            {performance.level}
          </p>
        </div>

        {/* Revenue Display */}
        <div className="mb-8 p-6 rounded-2xl sting-gradient text-sting-black glass-card">
          <TrendingUp className="w-12 h-12 mx-auto mb-4" />
          <div className="text-3xl font-bold mb-2">
            {score} Correct Questions
          </div>
          <div className="text-lg opacity-90">
            Out of {totalQuestions} possible
          </div>
          <div className="mt-4 w-full bg-sting-black/20 rounded-full h-3">
            <div 
              className="bg-sting-black h-3 rounded-full transition-all duration-2000"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="text-sm mt-2 opacity-75">
            {percentage.toFixed(0)}% Target Achieved
          </div>
        </div>

        {/* Performance Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-4">
            <Star className="w-6 h-6 text-correct mx-auto mb-2" />
            <div className="text-2xl font-bold text-correct">{score}</div>
            <div className="text-sm text-foreground/70">Correct Answers</div>
          </div>
          
          <div className="glass-card p-4">
            <Trophy className="w-6 h-6 text-incorrect mx-auto mb-2" />
            <div className="text-2xl font-bold text-incorrect">{totalQuestions - score}</div>
            <div className="text-sm text-foreground/70">Missed Opportunities</div>
          </div>
          
          <div className="glass-card p-4">
            <TrendingUp className="w-6 h-6 text-sting-gold mx-auto mb-2" />
            <div className="text-2xl font-bold text-sting-gold">{percentage.toFixed(0)}%</div>
            <div className="text-sm text-foreground/70">Success Rate</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={onRestart}
            size="lg"
            className="sting-gradient text-sting-black hover:shadow-[var(--glow-sting)] transition-[var(--transition-bounce)] flex-1 glass-button"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Play Again
          </Button>
        </div>

        <div className="mt-6 text-sm text-sting-white/60">
          <p>⚡ Great job powering through the energy challenge!</p>
          {percentage < 100 && (
            <p className="mt-1 text-sting-gold">Try again and maximize with your Sting Power! 💪</p>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};