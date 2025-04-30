import { openai } from "@ai-sdk/openai"
import { streamText, tool } from "ai"
import { z } from 'zod';
import { auth0 } from "@/lib/auth0";

export const maxDuration = 60;

export async function POST(req) {

  const { messages } = await req.json()

  const system = `You're a helpful AI agent that can call external APIs`

  const response = streamText({
    model: openai('gpt-4o'),
    messages,
    system,
    maxSteps: 10,
    tools: {
      // Spotify tool to create a playlist
      createPlaylist: tool({
        description: "Create a new Spotify playlist for the user.",
        parameters: z.object({
          description: z.string().describe("Optional description of the playlist"),
        }),
        execute: async ({ description }) => {
          const { token: accessToken } = await auth0.getAccessTokenForConnection({ connection: "spotify-custom" });

          // search for songs based on description
          const query = new URLSearchParams({
            q: description,
            type: 'track',
            limit: '10',
          }).toString();

          const searchResponse = await fetch(`https://api.spotify.com/v1/search?${query}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const searchData = await searchResponse.json();
          const trackUris = searchData.tracks.items.map(track => track.uri); // save track URIs for playlist

          // Get current user's Spotify ID
          const userRes = await fetch("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const user = await userRes.json();

          // Create playlist
          const playlistRes = await fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: `Playlist - ${description} `,
              description: `A custom AI-generated playlist for ${description}`,
              public: true,
            }),
          });

          const playlistData = await playlistRes.json();

          // add the songs to the playlist
          await fetch(`https://api.spotify.com/v1/playlists/${playlistData.id}/tracks`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ uris: trackUris }),
          });

          return {
            message: `Playlist created for ${description}`,
            name: playlistData.name,
            playlist_url: playlistData.external_urls.spotify,
          }
        },
      }),


      // salesforce tool call to get a list of opportunities
      listOpportunities: tool({
        description: 'Get a list of opportunities from Salesforce',
        parameters: z.object({
          limit: z.number().default(10).describe('The maximum number of opportunities to return'),
        }),
        execute: async ({ limit }) => {
          const instanceUrl = process.env.SALESFORCE_INSTANCE_URL || "https://okta214-dev-ed.develop.my.salesforce.com";
          const endpoint = `query/?q=${encodeURIComponent(`SELECT Id, Name, StageName, CloseDate FROM Opportunity LIMIT ${limit}`)}`;

          const url = `${instanceUrl}/services/data/v57.0/${endpoint}`;

          const { token: accessToken } = await (auth0.getAccessTokenForConnection({ connection: "sfdc" })); // call auth0 to get the access token

          const response = await fetch(url, {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
          });

          return await response.json();
        },
      }),
    }
  })

  return response.toDataStreamResponse();
}
