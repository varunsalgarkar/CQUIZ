import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trophy, Zap, Target, Settings, X } from "lucide-react";
import { BrandLogo } from "./brandlogo";

interface GameStartProps {
  onStart: (sectionId?: string) => void;
  questionsCount: number;
  onQuestionsCountChange: (count: number) => void;
  questionTime: number;
  onQuestionTimeChange: (time: number) => void;
}

export const GameStart = ({ onStart, questionsCount, onQuestionsCountChange, questionTime, onQuestionTimeChange }: GameStartProps) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showDice, setShowDice] = useState(false);
  const [tempCount, setTempCount] = useState(questionsCount);
  const [tempTime, setTempTime] = useState(questionTime);
  const [diceRolling, setDiceRolling] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedEnergySection, setSelectedEnergySection] = useState<string | null>(null);
  const [showEnergySelector, setShowEnergySelector] = useState(false);

  const handleSaveSettings = () => {
    onQuestionsCountChange(tempCount);
    onQuestionTimeChange(tempTime);
    setShowSettings(false);
  };

  const sections = [
    { id: "section_1", title: "DANCE DASH", color: "#ff6b6b" },
    { id: "section_2", title: "MEMORY NUGGETS", color: "#4ecdc4" },
    { id: "section_3", title: "JIGSAW QUIZ", color: "#45b7d1" },
    { id: "section_4", title: "WELLNESS QUIZ", color: "#96ceb4" },
    { id: "section_5", title: "JIGSAW QUIZ", color: "#feca57" },
    { id: "section_6", title: "MEMORY NUGGETS", color: "#ff9ff3" }    
  ];

  const rollDice = () => {
    setDiceRolling(true);
    setTimeout(() => {
      const randomSection = sections[Math.floor(Math.random() * 6)];
      setSelectedSection(randomSection.id);
      setDiceRolling(false);
      
      // Just show the result, don't auto-start
    }, 2000);
  };

  const handleDiceClick = () => {
    setShowDice(true);
    rollDice();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sting-bg relative">
      <div className="energy-particles"></div>
      <BrandLogo src="/pep_logo.png" alt="Pep+ Logo"/>

      <div className="electric-border max-w-2xl w-full bounce-entrance relative">
        
        <div className="electric-border-inner p-8 text-center energy-pulse">
          <div className="mb-8">
            <h1 className="text-6xl font-bold mb-4 sting-gradient bg-clip-text text-transparent">
              CSR ACTION QUIZ
            </h1>
            <p className="text-xl text-sting-gold mb-2">
              Every Act of Kindness Counts!
            </p>
            <div className="flex items-center justify-center gap-2 text-electric-cyan">
              <Target className="w-5 h-5" />
              <span className="text-sm font-medium">Every correct answer = +1 Step Closer to the Prize</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div 
              className="glass-card p-4 cursor-pointer hover:bg-sting-white/5 transition-colors"
              onClick={handleDiceClick}
            >
              <Trophy className="w-8 h-8 text-sting-gold mx-auto mb-2" />
              <h3 className="font-semibold text-sting-gold">Challenge</h3>
              <p className="text-sm text-sting-white/70">Roll the dice for your category!</p>
            </div>
            
            <div 
              className="glass-card p-4 cursor-pointer hover:bg-sting-white/5 transition-colors"
              onClick={() => setShowEnergySelector(true)}
            >
              <Zap className="w-8 h-8 text-electric-cyan mx-auto mb-2" />
              <h3 className="font-semibold text-electric-cyan">Energy Boost</h3>
              <p className="text-sm text-sting-white/70">
                {selectedEnergySection ? 
                  sections.find(s => s.id === selectedEnergySection)?.title : 
                  "Choose your category!"
                }
              </p>
            </div>
            
            <div 
              className="glass-card p-4 cursor-pointer hover:bg-sting-white/5 transition-colors"
              onClick={() => setShowSettings(true)}
            >
              <Target className="w-8 h-8 text-correct mx-auto mb-2" />
              <h3 className="font-semibold text-correct">Goal</h3>
              <p className="text-sm text-sting-white/70">Win Big!</p>
            </div>
          </div>

          <Button
            onClick={() => onStart(selectedEnergySection || selectedSection || undefined)}
            size="lg"
            className="sting-gradient text-sting-black hover:bg-sting-black hover:text-sting-white hover:shadow-[var(--glow-sting)] transition-[var(--transition-bounce)] text-lg px-8 py-6 rounded-xl font-bold glass-button"
          >
            ⚡ START ENERGY QUEST
          </Button>
          
          <div className="mt-6 text-sm text-sting-white/60">
            <p>⚡ {questionsCount} questions • ⏱️ {questionTime}s per question • 💰 Answer all and win Prize</p>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="glass-card p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-sting-gold mb-4">Quiz Settings</h2>
              <Button
                onClick={() => setShowSettings(false)}
                variant="ghost"
                size="sm"
                className="text-sting-white hover:bg-sting-white/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-sting-white mb-2">
                    Number of Questions (3-10)
                  </label>
                  <input
                    type="number"
                    min="3"
                    max="10"
                    value={tempCount}
                    onChange={(e) => setTempCount(Math.max(3, Math.min(10, parseInt(e.target.value) || 3)))}
                    className="w-full px-3 py-2 bg-sting-black/30 border border-sting-white/20 rounded-lg text-sting-white focus:border-sting-gold focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-sting-white mb-2">
                    Time per Question (10-60 seconds)
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="60"
                    value={tempTime}
                    onChange={(e) => setTempTime(Math.max(10, Math.min(60, parseInt(e.target.value) || 20)))}
                    className="w-full px-3 py-2 bg-sting-black/30 border border-sting-white/20 rounded-lg text-sting-white focus:border-sting-gold focus:outline-none"
                  />
                </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowSettings(false)}
                className="flex-1 px-4 py-2 bg-transparent border border-sting-white/30 text-sting-white rounded-lg hover:bg-sting-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSettings}
                className="flex-1 px-4 py-2 sting-gradient text-sting-black rounded-lg font-medium hover:shadow-lg transition-shadow"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3D Dice Modal */}
      {showDice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="glass-card p-8 max-w-md w-full text-center">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-sting-gold">Rolling the Dice!</h2>
              <Button
                onClick={() => setShowDice(false)}
                variant="ghost"
                size="sm"
                className="text-sting-white hover:bg-sting-white/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="relative mx-auto mb-6" style={{width: '120px', height: '120px', perspective: '200px'}}>
              <div 
                className={`dice ${diceRolling ? 'rolling' : ''}`}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  transform: diceRolling ? 'rotateX(720deg) rotateY(720deg)' : 
                    selectedSection === 'section_1' ? 'rotateX(0deg) rotateY(0deg)' :
                    selectedSection === 'section_2' ? 'rotateX(-90deg) rotateY(0deg)' :
                    selectedSection === 'section_3' ? 'rotateX(0deg) rotateY(90deg)' :
                    selectedSection === 'section_4' ? 'rotateX(0deg) rotateY(-90deg)' :
                    selectedSection === 'section_5' ? 'rotateX(90deg) rotateY(0deg)' :
                    'rotateX(180deg) rotateY(0deg)',
                  transition: 'transform 2s ease-out'
                }}
              >
                {sections.map((section, index) => (
                  <div
                    key={section.id}
                    className="dice-face"
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      border: '2px solid #ffd700',
                      backgroundColor: section.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      color: 'white',
                      textAlign: 'center',
                      padding: '8px',
                      transform: 
                        index === 0 ? 'rotateY(0deg) translateZ(60px)' :
                        index === 1 ? 'rotateY(90deg) translateZ(60px)' :
                        index === 2 ? 'rotateY(180deg) translateZ(60px)' :
                        index === 3 ? 'rotateY(-90deg) translateZ(60px)' :
                        index === 4 ? 'rotateX(90deg) translateZ(60px)' :
                        'rotateX(-90deg) translateZ(60px)'
                    }}
                  >
                    {section.title}
                  </div>
                ))}
              </div>
            </div>
            
            {!diceRolling && selectedSection && (
              <div className="space-y-4">
                <div className="text-xl font-bold text-electric-cyan">
                  {/* {sections.find(s => s.id === selectedSection)?.title} */}
                </div>
                <p className="text-sting-white/70">
                  Category selected! Click "Start Energy Quest" to begin.
                </p>
              </div>
            )}
            
            {diceRolling && (
              <p className="text-sting-white/70">Rolling dice...</p>
            )}
          </div>
        </div>
      )}

      {/* Energy Section Selector Modal */}
      {showEnergySelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="glass-card p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-sting-gold">Choose Your Category</h2>
              <Button
                onClick={() => setShowEnergySelector(false)}
                variant="ghost"
                size="sm"
                className="text-sting-white hover:bg-sting-white/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setSelectedEnergySection(section.id);
                    setShowEnergySelector(false);
                  }}
                  className={`p-3 rounded-lg border transition-colors text-left ${
                    selectedEnergySection === section.id
                      ? 'border-sting-gold bg-sting-gold/10 text-sting-gold'
                      : 'border-sting-white/20 bg-sting-black/30 text-sting-white hover:border-sting-gold/50'
                  }`}
                >
                  <div className="font-medium">{section.title}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};