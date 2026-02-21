import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const apiKey = process.env.NEXT_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: 'NEXT_API_KEY is not configured' },
      { status: 500 }
    );
  }

  try {
    const { messages, model = 'grok-4-latest', temperature = 0.7 } = await request.json();

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages,
        model,
        stream: false,
        temperature,
      }),
    });

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}