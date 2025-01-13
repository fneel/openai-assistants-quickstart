import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    // Hämta användarens meddelande från förfrågan
    const { userMessage } = await request.json();

    // Skicka förfrågan till OpenAI Assistants API
    const response = await fetch(
      `https://api.openai.com/v1/assistants/${process.env.OPENAI_ASSISTANT_ID}/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: userMessage }],
        }),
      }
    );

    // Bearbeta svaret från OpenAI
    const data = await response.json();
    const assistantMessage =
      data.choices?.[0]?.message?.content || "Inget svar.";

    // Returnera svaret till frontend
    return NextResponse.json({ reply: assistantMessage });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
