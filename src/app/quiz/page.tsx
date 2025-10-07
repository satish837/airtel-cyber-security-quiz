'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { quizData, QuizQuestion } from '@/data/quizData';
import Image from 'next/image';
import { soundManager } from '@/utils/sounds';
import { backgroundAudioManager } from '@/utils/backgroundAudio';
import MagicConfetti from '@/components/MagicConfetti';

const categoryIcons: Record<string, string> = {
  it: '/it-category-icon.png',
  healthcare: '/healthcare.png',
  bfsi: '/bfsi.png',
  manufacturing: '/manufacturing.png',
  government: '/government.png',
  others: '/others.png'
};

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [category, setCategory] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentResult, setCurrentResult] = useState<QuizQuestion | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState<{option: string, originalIndex: number}[]>([]);
  const [showVideo, setShowVideo] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const router = useRouter();

  // Function to shuffle array
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Function to shuffle options for current question
  const shuffleQuestionOptions = useCallback((question: QuizQuestion) => {
    const optionsWithIndex = question.options.map((option, index) => ({
      option,
      originalIndex: index
    }));
    const shuffled = shuffleArray(optionsWithIndex);
    setShuffledOptions(shuffled);
  }, []);

  useEffect(() => {
    const name = localStorage.getItem('playerName');
    const selectedCategory = localStorage.getItem('selectedCategory');
    
    if (!name || !selectedCategory) {
      router.push('/');
      return;
    }
    
    setPlayerName(name);
    setCategory(selectedCategory);
    setQuestions(quizData[selectedCategory] || []);
  }, [router]);

  const handleTimeUp = useCallback(async () => {
    // Prevent multiple timeout calls
    if (selectedAnswer !== null) return;
    
    // Time's up - show wrong answer popup
    setSelectedAnswer(-1); // Use -1 to indicate time up
    setIsCorrect(false);
    setCurrentResult(questions[currentQuestion]);
    // Play lose sound for timeout
    await soundManager.playLoseSound();
    setShowResult(true);
  }, [questions, currentQuestion, selectedAnswer]);

  useEffect(() => {
    if (!gameStarted || gameCompleted || showResult) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up - show wrong answer popup
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameCompleted, showResult, handleTimeUp]);

  // Start the game immediately when component loads
  useEffect(() => {
    if (questions.length > 0 && !gameStarted) {
      setGameStarted(true);
    }
  }, [questions, gameStarted]);

  // Show video after game completion with delay
  useEffect(() => {
    if (gameCompleted) {
      const timer = setTimeout(() => {
        setShowVideo(true);
      }, 2000); // 2 second delay before showing video
      
      return () => clearTimeout(timer);
    }
  }, [gameCompleted]);

  // Shuffle options when question changes
  useEffect(() => {
    if (questions.length > 0 && currentQuestion < questions.length) {
      shuffleQuestionOptions(questions[currentQuestion]);
    }
  }, [currentQuestion, questions, shuffleQuestionOptions]);

  const handleAnswerSelect = async (shuffledIndex: number) => {
    if (selectedAnswer !== null) return; // Already answered
    
    await soundManager.playClickSound();
    setSelectedAnswer(shuffledIndex);
    
    const question = questions[currentQuestion];
    const originalIndex = shuffledOptions[shuffledIndex].originalIndex;
    const correct = originalIndex === question.correctAnswer;
    setIsCorrect(correct);
    setCurrentResult(question);
    
    if (correct) {
      // Calculate score based on time left (more time = more points)
      const points = Math.floor((timeLeft / 30) * 100);
      setScore(prev => prev + points);
      setCorrectAnswers(prev => prev + 1);
      // Play win sound and show confetti
      await soundManager.playWinSound();
      setShowConfetti(true);
    } else {
      // Play lose sound
      await soundManager.playLoseSound();
    }
    
    // Show result screen
    setShowResult(true);
  };

  const handleNextQuestion = async () => {
    await soundManager.playClickSound();
    setShowResult(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(30);
      setSelectedAnswer(null);
    } else {
      setGameCompleted(true);
      // Stop background music when game is completed
      backgroundAudioManager.stopBackgroundMusic();
      // Save score when game is completed
      await saveScore();
    }
  };


  const resetGame = async () => {
    await soundManager.playClickSound();
    setCurrentQuestion(0);
    setTimeLeft(30);
    setSelectedAnswer(null);
    setScore(0);
    setGameStarted(false);
    setGameCompleted(false);
    setShuffledOptions([]);
    setShowVideo(false);
    setShowQRCode(false);
    setCorrectAnswers(0);
    // Restart background music when resetting game
    backgroundAudioManager.playBackgroundMusic();
  };

  const goToCategories = async () => {
    await soundManager.playClickSound();
    // Stop background music when going to categories
    backgroundAudioManager.stopBackgroundMusic();
    router.push('/categories');
  };

  const saveScore = async () => {
    try {
      const response = await fetch('/api/scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerName,
          score,
          category,
          totalQuestions: questions.length,
          correctAnswers,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Score saved successfully');
      } else if (response.status === 503) {
        console.warn('Database not configured. Score not saved.');
      } else {
        console.error('Failed to save score:', data.error);
      }
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="cyber-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  if (showResult && currentResult) {
    return (
      <div className="cyber-bg flex items-center justify-center p-4">
        <div className="rounded-lg max-w-4xl w-full p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <Image 
                  src={categoryIcons[category] || '/it-category-icon.png'} 
                  alt={currentResult.category}
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <span className="text-gray-400">{currentResult.category}</span>
                <span className="text-white ml-2">Level {currentResult.level} ({currentResult.levelName})</span>
              </div>
            </div>
            <div className="text-red-500 font-bold text-2xl flex items-center">
              <Image src="/airtel-logo.png" alt="Airtel Logo" width={120} height={48} className="w-auto h-12 object-contain" />
            </div>
          </div>

          {/* Result Message */}
          <div className="text-center mb-8">
            <div className={`p-6 rounded-lg mb-6 ${isCorrect ? 'border-green-500 bg-green-900/20' : 'border-red-500 bg-red-900/20'}`}>
              <h2 className={`text-2xl font-bold mb-4 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {selectedAnswer === -1 ? '⏰ TIME UP!' : (isCorrect ? '🎉 CORRECT!' : '❌ INCORRECT')}
              </h2>
              <p className="text-lg text-white mb-4">
                {selectedAnswer === -1 
                  ? <span dangerouslySetInnerHTML={{__html: `Time's up! You didn't answer in time. ${currentResult.loserMessage}`}} />
                  : (isCorrect ? currentResult.winnerMessage : <span dangerouslySetInnerHTML={{__html: currentResult.loserMessage}} />)
                }
              </p>

              {/* Result Message 
              <div className=" p-4 rounded-lg bg-gray-800">
                <p className="text-sm text-gray-300 mb-2">Our Solution:</p>
                <p className="text-lg font-bold text-red-400">{currentResult.solution}</p>
              </div>
              */}
            </div>
          </div>

          {/* Score and Progress */}
          <div className="flex justify-between items-center">
            <div className="text-white">
              Question {currentQuestion + 1} of {questions.length}
            </div>
             {/* Continue Button */}
          <div className="text-center">
            <button
              onClick={handleNextQuestion}
              className="cyber-button px-8 py-3 rounded-lg text-white font-bold"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          </div>
            <div className="text-white">
              Score: {score} points
            </div>
          </div>

         
        </div>
        <MagicConfetti trigger={showConfetti && isCorrect} onComplete={() => setShowConfetti(false)} />
      </div>
    );
  }


  if (gameCompleted) {
    const allCorrect = correctAnswers === questions.length;
    
    return (
      <>
        <div className="cyber-bg flex items-center justify-center p-4">
          <div className="rounded-lg max-w-2xl w-full">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Great job, {playerName}!</h1>
              
              {/* Custom completion message based on performance */}
              <div className="p-0 rounded-lg mb-0">
                {allCorrect ? (
                  <div>
                    <h2 className="text-2xl font-bold text-green-400 mb-4">🎉 Congratulations!</h2>
                    <p className="text-2xl text-white mb-2">
                      The organization is secured because of YOU, powered by Airtel Secure
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-2xl text-white mb-2">
                      This is just a simulation, but in actual world, save your organization with Airtel Secure.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="p-6 rounded-lg mb-0">
                <h2 className="text-2xl font-bold text-red-500 mb-2">Final Score</h2>
                <p className="text-4xl font-bold text-white">{score} points</p>
                <p className="text-lg text-gray-300 mt-2">
                  {correctAnswers} out of {questions.length} questions correct
                </p>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={resetGame}
                  className="cyber-button px-6 py-3 rounded-lg text-white font-bold mr-4"
                >
                  Play Again
                </button>
                <button
                  onClick={goToCategories}
                  className="cyber-button px-6 py-3 rounded-lg text-white font-bold mr-4"
                >
                  Choose Different Category
                </button>
                <button
                  onClick={() => setShowQRCode(true)}
                  className="cyber-button px-6 py-3 rounded-lg text-white font-bold mr-4"
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Fullscreen Video Modal */}
        {showVideo && (
          <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
            <video
              autoPlay
              muted
              className="w-full h-full object-cover"
              onEnded={() => setShowVideo(false)}
              onError={() => setShowVideo(false)}
            >
              <source src="/shield.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 text-white text-2xl font-bold bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              ×
            </button>
          </div>
        )}

        {/* QR Code Modal */}
        {showQRCode && (
          <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Share Cyber Hunt</h3>
                <p className="text-gray-600 mb-6">Scan this QR code to play the game</p>
                <div className="flex justify-center mb-6">
                  <Image
                    src="/cyber-security-booth-public.png"
                    alt="QR Code to share Cyber Hunt game"
                    width={300}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
                <button
                  onClick={() => setShowQRCode(false)}
                  className="cyber-button px-6 py-3 rounded-lg text-white font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  const question = questions[currentQuestion];

  if (!question) {
    return (
      <div className="min-h-screen cyber-bg digital-pattern flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="cyber-bg flex items-center justify-center p-4">
      <div className="rounded-lg p-8 max-w-4xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 flex items-center justify-center">
              <Image 
                src={categoryIcons[category] || '/it-category-icon.png'} 
                alt={question.category}
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <span className="text-gray-400">{question.category}</span>
              <span className="text-white ml-2">Level {question.level} ({question.levelName})</span>
            </div>
          </div>
          <div className="text-red-500 font-bold text-2xl flex items-center">
          <Image src="/airtel-logo.png" alt="Airtel Logo" width={120} height={48} className="w-auto h-12 object-contain" />
          </div>
        </div>

        {/* Timer */}
        <div className="text-center mb-6 fixed bottom-8 right-8">
          <div className="relative w-20 h-20">
            {/* Circular Progress Bar */}
            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-600"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={`${timeLeft <= 10 ? 'text-red-500' : 'text-blue-500'}`}
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={`${((30 - timeLeft) / 30) * 100}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                style={{
                  transition: 'stroke-dasharray 1s linear'
                }}
              />
            </svg>
            {/* Timer Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`text-lg font-bold ${timeLeft <= 10 ? 'text-red-500 cyber-animation' : 'text-white'}`}>
                {timeLeft}s
              </div>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-xl text-white mb-6">
            Q: {question.question}
          </h2>
        </div>

        {/* Answer Options */}
        <div className="space-y-4 mb-8">
          {shuffledOptions.map((optionData, shuffledIndex) => {
            let buttonClass = " p-4 rounded-lg border border-gray-600 text-left w-full transition-all duration-300";
            let textClass = "text-white";
            
            if (selectedAnswer === shuffledIndex) {
              if (optionData.originalIndex === question.correctAnswer) {
                buttonClass += " border-green-500 bg-green-900/20";
                textClass = "text-green-400 font-bold";
              } else {
                buttonClass += " border-red-500 bg-red-900/20";
                textClass = "text-red-400 font-bold";
              }
            } else if (selectedAnswer !== null && optionData.originalIndex === question.correctAnswer) {
              buttonClass += " border-green-500 bg-green-900/20";
              textClass = "text-green-400 font-bold";
            } else {
              buttonClass += " hover:border-red-500 hover:cyber-glow";
            }

            return (
              <button
                key={shuffledIndex}
                onClick={() => handleAnswerSelect(shuffledIndex)}
                disabled={selectedAnswer !== null}
                className={buttonClass}
              >
                <span className={textClass}>{optionData.option}</span>
              </button>
            );
          })}
        </div>

        {/* Progress and Score */}
        <div className="flex justify-between items-center">
          <div className="text-white">
            Question {currentQuestion + 1} of {questions.length}
          </div>
          <div className="text-white">
            Score: {score} points
          </div>
        </div>

        {/* Next Button */}
        {selectedAnswer !== null && (
          <div className="text-center mt-6">
            <button
              onClick={handleNextQuestion}
              className="cyber-button px-8 py-3 rounded-lg text-white font-bold"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
