import { openai } from "@/app/openai";
import { NextResponse } from "next/server";

// Skicka ett nytt meddelande till en befintlig tråd
export async function POST(
  request: Request,
  context: { params: { threadId: string } }
) {
  try {
    const { toolCallOutputs, runId } = await request.json();
    const { threadId } = context.params;

    const stream = openai.beta.threads.runs.submitToolOutputsStream(
      threadId,
      runId,
      { tool_outputs: toolCallOutputs }
    );

    return new Response(stream.toReadableStream());
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
