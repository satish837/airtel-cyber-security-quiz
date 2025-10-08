import { NextRequest, NextResponse } from 'next/server';

// Temporarily disabled MongoDB import for debugging
async function getDatabase() {
  console.log('MongoDB connection disabled for debugging');
  return null;
}

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

    // MongoDB temporarily disabled for debugging
    return NextResponse.json({ 
      error: 'Database temporarily disabled for debugging' 
    }, { status: 503 });

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

    // MongoDB temporarily disabled for debugging
    return NextResponse.json({ 
      error: 'Database temporarily disabled for debugging',
      scores: []
    }, { status: 503 });

  } catch (error) {
    console.error('Error fetching scores:', error);
    return NextResponse.json({ error: 'Failed to fetch scores' }, { status: 500 });
  }
}
