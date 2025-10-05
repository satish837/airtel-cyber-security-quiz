'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { quizData, QuizQuestion } from '@/data/quizData';
import Image from 'next/image';

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
  const router = useRouter();

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

  useEffect(() => {
    if (!gameStarted || gameCompleted) return;

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
  }, [gameStarted, gameCompleted, handleTimeUp]);

  // Start the game immediately when component loads
  useEffect(() => {
    if (questions.length > 0 && !gameStarted) {
      setGameStarted(true);
    }
  }, [questions, gameStarted]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Already answered
    
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setCurrentResult(questions[currentQuestion]);
    
    if (correct) {
      // Calculate score based on time left (more time = more points)
      const points = Math.floor((timeLeft / 30) * 100);
      setScore(prev => prev + points);
    }
    
    // Show result screen
    setShowResult(true);
  };

  const handleTimeUp = useCallback(() => {
    // Time's up - show wrong answer popup
    setSelectedAnswer(-1); // Use -1 to indicate time up
    setIsCorrect(false);
    setCurrentResult(questions[currentQuestion]);
    setShowResult(true);
  }, [questions, currentQuestion]);

  const handleNextQuestion = () => {
    setShowResult(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(30);
      setSelectedAnswer(null);
    } else {
      setGameCompleted(true);
    }
  };


  const resetGame = () => {
    setCurrentQuestion(0);
    setTimeLeft(30);
    setSelectedAnswer(null);
    setScore(0);
    setGameStarted(false);
    setGameCompleted(false);
  };

  const goToCategories = () => {
    router.push('/categories');
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
                  ? `Time's up! You didn't answer in time. ${currentResult.loserMessage}`
                  : (isCorrect ? currentResult.winnerMessage : currentResult.loserMessage)
                }
              </p>
              <div className=" p-4 rounded-lg bg-gray-800">
                <p className="text-sm text-gray-300 mb-2">Our Solution:</p>
                <p className="text-lg font-bold text-red-400">{currentResult.solution}</p>
              </div>
            </div>
          </div>

          {/* Score and Progress */}
          <div className="flex justify-between items-center">
            <div className="text-white">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <div className="text-white">
              Score: {score} points
            </div>
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
        </div>
      </div>
    );
  }

  if (gameCompleted) {
    return (
      <div className="cyber-bg flex items-center justify-center p-4">
        <div className="rounded-lg max-w-2xl w-full">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Game Complete!</h1>
            <p className="text-xl text-gray-300 mb-6">Great job, {playerName}!</p>
            <div className="p-6 rounded-lg mb-6">
              <h2 className="text-2xl font-bold text-red-500 mb-2">Final Score</h2>
              <p className="text-4xl font-bold text-white">{score} points</p>
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
                className="cyber-button px-6 py-3 rounded-lg text-white font-bold"
              >
                Choose Different Category
              </button>
            </div>
          </div>
        </div>
      </div>
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
          {question.options.map((option, index) => {
            let buttonClass = " p-4 rounded-lg border border-gray-600 text-white text-left w-full transition-all duration-300";
            
            if (selectedAnswer === index) {
              if (index === question.correctAnswer) {
                buttonClass += " border-green-500 bg-green-900/20";
              } else {
                buttonClass += " border-red-500 bg-red-900/20";
              }
            } else if (selectedAnswer !== null && index === question.correctAnswer) {
              buttonClass += " border-green-500 bg-green-900/20";
            } else {
              buttonClass += " hover:border-red-500 hover:cyber-glow";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
                className={buttonClass}
              >
                <span className="mr-3">•</span>
                {option}
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
