import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      message: 'API is working',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      hasMongoUri: !!process.env.MONGODB_URI,
      mongoUriLength: process.env.MONGODB_URI?.length || 0,
      mongoUriPreview: process.env.MONGODB_URI ? 
        process.env.MONGODB_URI.substring(0, 20) + '...' : 'Not set'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
