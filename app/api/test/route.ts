export async function GET() {
  const apiKey = process.env.NEXT_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: 'NEXT_API_KEY is not configured' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: 'You are a test assistant.' },
          { role: 'user', content: 'Testing. Just say hi and hello world and nothing else.' },
        ],
        model: 'grok-4-latest',
        stream: false,
        temperature: 0,
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
