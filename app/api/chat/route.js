import { openai } from "@ai-sdk/openai"
import { streamText, tool } from "ai"
import { tools } from "@/lib/tools";

export const maxDuration = 60;

export async function POST(req) {
  const { messages } = await req.json()

  const system = `You're a helpful AI agent. Always convert returned data from a tool call to a JSON array of objects`

  const response = streamText({
    model: openai('gpt-4o'),
    messages,
    system,
    maxSteps: 50,
    tools,
    onError({ error }) {
      console.error(error);
    },
  })

  return response.toDataStreamResponse({
    getErrorMessage: errorHandler,
  });
}

export function errorHandler(error) {
  if (error == null) {
    return 'unknown error';
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return JSON.stringify(error);
}

