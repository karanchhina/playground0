import { openai } from "@ai-sdk/openai"
import { streamText, tool } from "ai"
import { z } from 'zod';
import { auth0 } from "@/lib/auth0";
const { Octokit } = require("@octokit/rest");

export const maxDuration = 60;

export async function POST(req) {
  const { messages } = await req.json()

  const system = `You're a helpful AI agent that helps analyze salesforce data`

  const response = streamText({
    model: openai('gpt-4o'),
    messages,
    system,
    maxSteps: 10,
    tools: {
      listOpportunities: tool({ // salesforce tool call to get a list of opportunities
        description: 'Get a list of opportunities from Salesforce',
        parameters: z.object({
          limit: z.number().default(10).describe('The maximum number of opportunities to return'),
        }),
        execute: async ({ limit }) => {
          const instanceUrl = process.env.SALESFORCE_INSTANCE_URL;
          const endpoint = `query/?q=${encodeURIComponent(`SELECT Id, Name, StageName, CloseDate FROM Opportunity LIMIT ${limit}`)}`;
          const url = `${instanceUrl}/services/data/v57.0/${endpoint}`;

          // call auth0 to get the access token
          const { token } = await (auth0.getAccessTokenForConnection({ connection: "sfdc" }));

          const response = await fetch(url, {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`,
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


// export async function POST(req) {
//   const { messages } = await req.json()

//   const system = `You're a helpful AI agent that fetches GitHub repositories`

//   const response = streamText({
//     model: openai('gpt-4o'),
//     messages,
//     system,
//     tools: {
//       listRepos: tool({
//         description: 'Get user repos from GitHub',
//         parameters: z.object({}),
//         execute: async () => {
//             try {
//                 const { token } = await auth0.getAccessTokenForConnection({ connection: "github" });
//                 const octokit = new Octokit({
//                     auth: token,
//                 });

//                 const response = await octokit.request('GET /user/repos', {
//                     visibility: 'all',
//                 });
//                 const filteredRepos = response.data.map(repo => ({
//                     id: repo.id,
//                     full_name: repo.full_name,
//                     private: repo.private,
//                     owner_name: repo.owner.login,
//                     url: repo.html_url,
//                     description: repo.description,
//                     stars: repo.stargazers_count,
//                     forks: repo.forks_count,
//                 }));

//                 console.log(filteredRepos);
//                 return filteredRepos;
//             } catch (error) {
//                 console.error('Error fetching user repos:', error);
//                 throw new Error('Failed to fetch user repos');
//             }
//         },
//     }),
//     }
//   })
//   return response.toDataStreamResponse();
// }



// export async function POST(req) {
//   const { messages } = await req.json()
//   const system = `You're a helpful AI assistant that can read events from Google Calendar`
//   const response = streamText({
//     model: openai('gpt-4o'),
//     messages,
//     system,
//     tools: {
//       listEvents: tool({
//         description: 'List upcoming events from Google Calendar',
//         parameters: z.object({
//           maxResults: z.number().default(5).describe('Number of events to fetch'),
//         }),
//         execute: async ({ maxResults }) => {
//           const { token } = await auth0.getAccessTokenForConnection({ connection: 'google-oauth2' });

//           const oauth2Client = new google.auth.OAuth2()
//           oauth2Client.setCredentials({ access_token: token, })

//           const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
//           const now = new Date().toISOString();

//           // const { data: calendarList } = await calendar.calendarList.list();
//           // console.log('Calendars:', calendarList.items);

//           console.log("### Google Calendar API - List Events");
//           const response = await calendar.events.list({
//               calendarId: 'primary',
//               maxResults,
//               fields: "items(summary,start,end,location)",
//               timeMin: new Date().toISOString(),
//               singleEvents: true,
//               orderBy: 'startTime',
//           });
          
//           const events = response.data.items
//           console.log("### Google Calendar API - List Events - Response:", events);
//           return events;
//         },
//       }),
//     }
//   })
//   return response.toDataStreamResponse();
// }
