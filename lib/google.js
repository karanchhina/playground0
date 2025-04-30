import { tool } from "ai";
import { z } from 'zod';
import { auth0 } from "./auth0";
const { google } = require('googleapis');

export const googleTools = {
    createCalendarEvent: () => tool({
        description: 'Create an event in Google Calendar',
        parameters: z.object({
            calendarId: z.string().describe('The calendar ID to create the event in'),
            summary: z.string().describe('The event summary'),
            start: z.string().describe('The event start time'),
            end: z.string().describe('The event end time'),
        }),
        execute: async ({ calendarId, summary, start, end }) => {
            try {
                const access_token = (await auth0.getAccessTokenForConnection({ connection: 'google-oauth2' })).token;
                console.log('access_token', access_token);
                const oauth2Client = new google.auth.OAuth2()
                oauth2Client.setCredentials({ access_token })
                const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
                const event = {
                    summary,
    
                    start: {
                        dateTime: start,
                        timeZone: 'America/New_York',
                    },
                    end: {
                        dateTime: end,
                        timeZone: 'America/New_York',
                    },
                };
                const response = await calendar.events.insert({
                    calendarId,
                    resource: event,
                });
                console.log(response);
                return response.data;
            } catch (error) {
                console.error('Error creating event:', error);
                throw new Error('Error creating event:', error);
            }
        },
    }),

    createCalendarEventsInBatch: () => tool({
        description: 'Create events in Google Calendar in batch',
        parameters: z.object({
            calendarId: z.string().describe('The calendar ID to create the events in'),
            events: z.array(z.object({
                summary: z.string().describe('The event summary'),
                start: z.string().describe('The event start time'),
                end: z.string().describe('The event end time'),
            })),
        }),
        execute: async ({ calendarId, events }) => {
            try {
                const access_token = (await auth0.getAccessTokenForConnection({ connection: 'google-oauth2' })).token;
                console.log('access_token', access_token);
                const oauth2Client = new google.auth.OAuth2()
                oauth2Client.setCredentials({ access_token })
                const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
                const batch = calendar.newBatch();
                events.forEach(({ summary, start, end }) => {
                    const event = {
                        summary,
                        start: {
                            dateTime: start,
                            timeZone: 'America/New_York',
                        },
                        end: {
                            dateTime: end,
                            timeZone: 'America/New_York',
                        },
                    };
                    batch.add(calendar.events.insert({
                        calendarId,
                        resource: event,
                    }));
                });
                const response = await batch.execute();
                console.log(response);
                return response;
            } catch (error) {
                console.error('Error creating events in batch:', error);
                throw new Error('Error creating events in batch:', error);
            }
        },
    }),

    listCalendarEvents: () => tool({
        description: 'Get a list of events from Google Calendar',
        parameters: z.object({
            calendarId: z.string().describe('The calendar ID to get the events for'),
            maxResults: z.number().default(10).describe('The maximum number of events to return'),
            start: z.string().optional().describe('The start time of the events to get'),
            end: z.string().optional().describe('The end time of the events to get'),
        }),
        execute: async ({ calendarId, maxResults, start, end }) => {
            try {
                const access_token = (await auth0.getAccessTokenForConnection({ connection: 'google-oauth2' })).token;
                const oauth2Client = new google.auth.OAuth2()
                oauth2Client.setCredentials({ access_token, })
                const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
                const timeMin = start ? new Date(start).toISOString() : new Date().toISOString();
                const timeMax = end ? new Date(end).toISOString() : new Date(new Date(timeMin).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
                console.log('timeMin', timeMin);
                console.log('timeMax', timeMax);
                console.log('maxResults', maxResults);
                console.log('calendarId', calendarId);
                console.log({
                    calendarId,
                    maxResults: maxResults + 1,
                    fields: "items(summary,start,end,location)",
                    timeMin,
                    timeMax,
                    singleEvents: true,
                    orderBy: 'startTime',
                });
                const response = await calendar.events.list({
                    calendarId,
                    maxResults: maxResults + 1,
                    fields: "items(summary,start,end,location)",
                    timeMin,
                    timeMax,
                    singleEvents: true,
                    orderBy: 'startTime',
                });
                console.log(response.data.items);
                return response.data.items;
            } catch (error) {
                console.error('Error getting events:', error);
                throw new Error('Error getting events:', error);
            }
        },
    }),

    listCalendars: () => tool({
        description: 'Get a list of calendars from Google Calendar',
        parameters: z.object({}),
        execute: async () => {
            try {
                const access_token = (await auth0.getAccessTokenForConnection({ connection: 'google-oauth2' })).token;
                console.log('access_token', access_token)
                const oauth2Client = new google.auth.OAuth2()
                oauth2Client.setCredentials({ access_token: access_token })
                const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
                const response = await calendar.calendarList.list({
                    fields: "items(id,summary,timeZone)"
                });
                // const calendars = response.data.items.map(({ id, summary, timeZone }) => ({ id, summary, timeZone }));
                // console.log(calendars);
                return response.data.items;
            } catch (error) {
                console.error('Error getting calendars:', error);
                throw new Error('Error getting calendars:', error);
            }
        }
    }),

    listFiles: () => tool({
        description: 'Get a list of files from Google Drive',
        parameters: z.object({
            pageSize: z.number().default(10).describe('The maximum number of files to return'),
        }),
        execute: async ({ pageSize }) => {
            try {
                const access_token = (await auth0.getAccessTokenForConnection({ connection: 'google-oauth2' })).token;
                console.log('access_token', access_token)
                const oauth2Client = new google.auth.OAuth2()
                oauth2Client.setCredentials({ access_token: access_token })
                const drive = google.drive({ version: 'v3', auth: oauth2Client });
                const response = await drive.files.list({
                    pageSize,
                    fields: "files(id, name, mimeType)",
                });
                console.log(response.data.files);
                return response.data.files;
            } catch (error) {
                console.error('Error getting files:', error);
                throw new Error('Error getting files:', error);
            }
        }
    }),


    getFileMetadata: () => tool({
        description: 'Get metadata for a file from Google Drive',
        parameters: z.object({
            fileId: z.string().describe('The ID of the file to get metadata for'),
        }),
        execute: async ({ fileId }) => {
            try {
                const access_token = (await auth0.getAccessTokenForConnection({ connection: 'google-oauth2' })).token;
                console.log('access_token', access_token)
                const oauth2Client = new google.auth.OAuth2()
                oauth2Client.setCredentials({ access_token: access_token })
                const drive = google.drive({ version: 'v3', auth: oauth2Client });
                const response = await drive.files.get({
                    fileId,
                    fields: "id, name, mimeType, size, webViewLink",
                });
                console.log(response.data);
                return response.data;
            } catch (error) {
                console.error('Error getting file metadata:', error);
                throw new Error('Error getting file metadata:', error);
            }
        }
    }),


    getFileContent: () => tool({
        description: 'Get content for a file from Google Drive',
        parameters: z.object({
            fileId: z.string().describe('The ID of the file to get content for'),
        }),
        execute: async ({ fileId }) => {
            try {
                const access_token = (await auth0.getAccessTokenForConnection({ connection: 'google-oauth2' })).token;
                console.log('access_token', access_token)
                const oauth2Client = new google.auth.OAuth2()
                oauth2Client.setCredentials({ access_token: access_token })
                const drive = google.drive({ version: 'v3', auth: oauth2Client });
                const response = await drive.files.get({
                    fileId,
                    alt: "media",
                });
                console.log(response.data);
                return response.data;
            } catch (error) {
                console.error('Error getting file content:', error);
                throw new Error('Error getting file content:', error);
            }
        }
    })


}