import { tool } from "ai";
import { z } from 'zod';
import { auth0 } from "./auth0";

/**
 * Helper function to call Salesforce API.
 */
async function callSalesforceAPI(endpoint, method = 'GET', body) {
    const instanceUrl = process.env.SALESFORCE_INSTANCE_URL || "https://okta214-dev-ed.develop.my.salesforce.com"; // TODO: change this to your Salesforce instance URL
    const accessToken = (await (auth0.getAccessTokenForConnection({ connection: "sfdc" }))).token;

    console.debug('### Calling Salesforce API:', method, endpoint);
    // console.log('accessToken:', accessToken);

    if (!instanceUrl || !accessToken) {
        throw new Error('Salesforce configuration not set.');
    }

    const url = `${instanceUrl}/services/data/v57.0/${endpoint}`;
    const response = await fetch(url, {
        method,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Salesforce API error: ${response.status} - ${errorDetails}`);
    }

    const responseJson = await response.json();

    console.debug('### Salesforce API response:', responseJson);

    return 'records' in responseJson ? responseJson.records.map(({ attributes, ...rest }) => rest) : responseJson;
}

/**
 * Common function to run a SOQL query.
 */
async function querySalesforce(soql) {
    const endpoint = `query/?q=${encodeURIComponent(soql)}`;
    return await callSalesforceAPI(endpoint);
}


/**
 * Opportunity Tools
 */

export const listOpportunityFields = tool({
    description: 'Get a list of fields for the Opportunity object',
    parameters: z.object({}),
    execute: async () => {
        const response = await callSalesforceAPI('sobjects/Opportunity/describe');
        return response.fields.map(({ name, label, type }) => ({ name, label, type }));
    },
})

export const listOpportunities = tool({
    description: 'Get a list of opportunities from Salesforce',
    parameters: z.object({
        limit: z.number().default(10).describe('The maximum number of opportunities to return'),
        fields: z.string().optional().describe('The csv fields to return in the response'),
    }),
    execute: async ({ limit, fields = "Id, Name, StageName, CloseDate" }) => {
        return await querySalesforce(`SELECT ${fields} FROM Opportunity LIMIT ${limit}`);
    },
})

export const getOpportunity = tool({
    description: 'Get an opportunity from Salesforce',
    parameters: z.object({
        id: z.string().describe('The ID of the opportunity to get'),
    }),
    execute: async ({ id }) => {
        return await callSalesforceAPI(`sobjects/Opportunity/${id}`);
    },
})

/**
 * Account Tools
 */


export const listAccountFields = tool({
    description: 'Get a list of fields for the Account object',
    parameters: z.object({}),
    execute: async () => {
        const response = await callSalesforceAPI('sobjects/Account/describe');
        return response.fields.map(({ name, label, type }) => ({ name, label, type }));
    },
})

export const listAccounts = tool({
    description: 'Get a list of accounts from Salesforce',
    parameters: z.object({
        limit: z.number().default(10).describe('The maximum number of accounts to return'),
        fields: z.string().optional().describe('The csv fields to return in the response'),
    }),
    execute: async ({ limit, fields = "Id, Name, Industry, Type" }) => {
        return await querySalesforce(`SELECT ${fields} FROM Account LIMIT ${limit}`);
    },
})

export const getAccount = tool({
    description: 'Get an account from Salesforce',
    parameters: z.object({
        id: z.string().describe('The ID of the account to get'),
    }),
    execute: async ({ id }) => {
        return await callSalesforceAPI(`sobjects/Account/${id}`);
    },
})

/**
 * Contact Tools
 */

export const listContacts = tool({
    description: 'Get a list of contacts from Salesforce',
    parameters: z.object({
        limit: z.number().default(10).describe('The maximum number of contacts to return'),
    }),
    execute: async ({ limit }) => {
        return await querySalesforce(`SELECT Id, FirstName, LastName, Email FROM Contact LIMIT ${limit}`);
    },
})

export const getContact = tool({
    description: 'Get a contact from Salesforce',
    parameters: z.object({
        id: z.string().describe('The ID of the contact to get'),
    }),
    execute: async ({ id }) => {
        return await callSalesforceAPI(`sobjects/Contact/${id}`);
    },
})

/**
 * Product Tools
 */

export const listProducts = tool({
    description: 'Get a list of products from Salesforce',
    parameters: z.object({
        limit: z.number().default(10).describe('The maximum number of products to return'),
    }),
    execute: async ({ limit }) => {
        return await querySalesforce(`SELECT Id, Name, ProductCode, IsActive FROM Product2 LIMIT ${limit}`);
    },
})

export const getProduct = tool({
    description: 'Get a product from Salesforce',
    parameters: z.object({
        id: z.string().describe('The ID of the product to get'),
    }),
    execute: async ({ id }) => {
        return await callSalesforceAPI(`sobjects/Product2/${id}`);
    },
})
