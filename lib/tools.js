import { tool } from "ai";
import { z } from 'zod';
import { getContact, getOpportunity, getProduct, listAccounts, listOpportunities, listOpportunityFields, listProducts } from "./sfdc";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { auth0 } from "./auth0";
import { getUserDetails, getUserRepos } from "./github";
import { googleTools } from './google';
import { createSpotifyPlaylist, getSpotifyPlaylists } from "./spotify";
import { getStravaActivities } from "./strava";
import { createStripeProduct, listStripeProducts } from "./stripe";
import { list } from "postcss";

export const tools = {
  weather: tool({               // ootb weather tool
    description: 'Get the weather in a location (fahrenheit)',
    parameters: z.object({
      location: z.string().describe('The location to get the weather for'),
    }),
    execute: async ({ location }) => {
      const temperature = Math.round(Math.random() * (90 - 32) + 32);
      return {
        location,
        temperature,
      };
    },
  }),

  // google
  createCalendarEvent: googleTools.createCalendarEvent(),
  createCalendarEventsInBatch: googleTools.createCalendarEventsInBatch(),
  listCalendarEvents: googleTools.listCalendarEvents(),
  listCalendars: googleTools.listCalendars(),
  listFiles: googleTools.listFiles(),
  getFileMetadata: googleTools.getFileMetadata(),
  getFileContent: googleTools.getFileContent(),



  // salesforce
  listOpportunities,
  getOpportunity,
  listAccounts,
  getContact,
  listProducts,
  getProduct,

  listOpportunityFields,


  // github tools
  getUserDetails,
  getUserRepos,

  // spotify tools
  createSpotifyPlaylist,
  getSpotifyPlaylists,

  // strava tools
  getStravaActivities,

  // stripe connect tools
  createStripeProduct,
  listStripeProducts,


  // helper tools
  convertToArrayOfObjects: tool({
    description: 'Convert response to an array of objects',
    parameters: z.object({
      response: z.string().describe('The LLM response to be converted'),
    }),
    execute: async ({ response }) => {
      try {
        const parsedResponse = JSON.parse(response);
        if (Array.isArray(parsedResponse)) {
          return parsedResponse;
        } else {
          return [parsedResponse];
        }
      } catch (error) {
        throw new Error('Invalid JSON response');
      }
    },
  }),

  // get today's date
  getTodaysDate: tool({
    description: 'Get the current date',
    parameters: z.object({}),
    execute: async () => {
      const date = new Date();
      return date.toISOString();
    },
  }),

  getTokensForApis: tool({
    description: 'Get the federated connections access tokens for APIs',
    parameters: z.object({
      connection: z.string().describe('Connection name to get the federated access token for'),
    }),
    execute: async ({ connection }) => {
      try {
        const token = await auth0.getAccessTokenForConnection({ connection });
        return { token };
      } catch (error) {
        return (`Failed to get access token for connection ${connection}: ${error.message}`);
      }
    },
  }),


}