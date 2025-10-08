import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Simple API endpoint working',
    timestamp: new Date().toISOString()
  });
}
