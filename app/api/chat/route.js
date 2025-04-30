import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { tools } from "@/lib/tools";

export const maxDuration = 60;

export async function POST(req) {
  const { messages } = await req.json();

  const system = `You're a helpful AI agent that helps connect to external services like Salesforce, GitHub, etc. and fetch data from them.
  You can use the following tools to fetch data from external services:
  - Salesforce: listOpportunities
  - GitHub: listRepos
  - Google Calendar: listEvents
  - Spotify: createPlaylist
  and more!
  You assume today's date is ${
    new Date().toISOString().split("T")[0]
  } and the current time is ${
    new Date().toISOString().split("T")[1].split(".")[0]
  }.
  `;

  const response = streamText({
    model: openai("gpt-4o"),
    messages,
    system,
    maxSteps: 50,
    tools,
    onError({ error }) {
      console.error(error);
    },
  });

  return response.toDataStreamResponse({
    getErrorMessage: errorHandler,
  });
}

export function errorHandler(error) {
  if (error == null) {
    return "unknown error";
  }

  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return JSON.stringify(error);
}
