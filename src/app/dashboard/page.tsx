'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { soundManager } from '@/utils/sounds';

interface ScoreData {
  _id: string;
  playerName: string;
  score: number;
  category: string;
  totalQuestions: number;
  correctAnswers: number;
  timestamp: string;
}

export default function Dashboard() {
  const [scores, setScores] = useState<ScoreData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    try {
      const response = await fetch('/api/scores');
      if (response.ok) {
        const data = await response.json();
        setScores(data.scores);
      } else {
        setError('Failed to fetch scores');
      }
    } catch (err) {
      setError('Error loading scores');
    } finally {
      setLoading(false);
    }
  };

  const handleGoHome = async () => {
    await soundManager.playClickSound();
    router.push('/');
  };

  const handlePlayAgain = async () => {
    await soundManager.playClickSound();
    router.push('/categories');
  };

  if (loading) {
    return (
      <div className="cyber-bg flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Loading Leaderboard...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="cyber-bg flex items-center justify-center p-4">
      <div className="rounded-lg max-w-6xl w-full p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">🏆 Leaderboard</h1>
          <div className="text-red-500 font-bold text-2xl flex items-center">
            <Image src="/airtel-logo.png" alt="Airtel Logo" width={120} height={48} className="w-auto h-12 object-contain" />
          </div>
        </div>

        {error ? (
          <div className="text-center">
            <p className="text-red-400 text-xl mb-4">{error}</p>
            <button
              onClick={fetchScores}
              className="cyber-button px-6 py-3 rounded-lg text-white font-bold"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="cyber-card p-6 text-center">
                <h3 className="text-2xl font-bold text-blue-400 mb-2">Total Players</h3>
                <p className="text-3xl font-bold text-white">{scores.length}</p>
              </div>
              <div className="cyber-card p-6 text-center">
                <h3 className="text-2xl font-bold text-green-400 mb-2">Highest Score</h3>
                <p className="text-3xl font-bold text-white">
                  {scores.length > 0 ? scores[0].score : 0}
                </p>
              </div>
              <div className="cyber-card p-6 text-center">
                <h3 className="text-2xl font-bold text-yellow-400 mb-2">Average Score</h3>
                <p className="text-3xl font-bold text-white">
                  {scores.length > 0 ? Math.round(scores.reduce((sum, score) => sum + score.score, 0) / scores.length) : 0}
                </p>
              </div>
            </div>

            {/* Leaderboard */}
            <div className="cyber-card p-6">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Top Scores</h2>
              
              {scores.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 text-xl">No scores yet. Be the first to play!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {scores.map((score, index) => (
                    <div
                      key={score._id}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        index === 0 ? 'bg-yellow-900/30 border-yellow-500 border-2' :
                        index === 1 ? 'bg-gray-700/30 border-gray-400 border-2' :
                        index === 2 ? 'bg-orange-900/30 border-orange-500 border-2' :
                        'bg-gray-800/30 border-gray-600 border'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`text-2xl font-bold ${
                          index === 0 ? 'text-yellow-400' :
                          index === 1 ? 'text-gray-300' :
                          index === 2 ? 'text-orange-400' :
                          'text-white'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{score.playerName}</h3>
                          <p className="text-sm text-gray-400">
                            {score.category} • {score.correctAnswers}/{score.totalQuestions} correct
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-white">{score.score}</p>
                        <p className="text-sm text-gray-400">
                          {new Date(score.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={handleGoHome}
            className="cyber-button px-8 py-3 rounded-lg text-white font-bold"
          >
            🏠 Home
          </button>
          <button
            onClick={handlePlayAgain}
            className="cyber-button px-8 py-3 rounded-lg text-white font-bold"
          >
            🎮 Play Again
          </button>
        </div>
      </div>
    </div>
  );
}
