import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { playerName, score, category, totalQuestions, correctAnswers } = await request.json();

    if (!playerName || score === undefined) {
      return NextResponse.json({ error: 'Player name and score are required' }, { status: 400 });
    }

    const db = await getDatabase();
    
    if (!db) {
      return NextResponse.json({ 
        error: 'Database not available. Please configure MongoDB connection.' 
      }, { status: 503 });
    }

    const scoresCollection = db.collection('scores');

    const scoreData = {
      playerName: playerName.trim(),
      score,
      category,
      totalQuestions,
      correctAnswers,
      timestamp: new Date(),
    };

    const result = await scoresCollection.insertOne(scoreData);

    return NextResponse.json({ 
      success: true, 
      id: result.insertedId,
      message: 'Score saved successfully' 
    });

  } catch (error) {
    console.error('Error saving score:', error);
    return NextResponse.json({ error: 'Failed to save score' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = await getDatabase();
    
    if (!db) {
      return NextResponse.json({ 
        error: 'Database not available. Please configure MongoDB connection.',
        scores: []
      }, { status: 503 });
    }

    const scoresCollection = db.collection('scores');

    // Get top 50 scores, sorted by score (descending)
    const scores = await scoresCollection
      .find({})
      .sort({ score: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json({ scores });

  } catch (error) {
    console.error('Error fetching scores:', error);
    return NextResponse.json({ error: 'Failed to fetch scores' }, { status: 500 });
  }
}
