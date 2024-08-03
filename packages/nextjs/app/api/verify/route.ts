import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const proof = await request.json();
    console.log('Received proof:', proof);
    
    // Your verification logic here
    
    return NextResponse.json({ message: 'Verification successful' });
  } catch (error) {
    console.error('Error processing verification:', error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
  }
}