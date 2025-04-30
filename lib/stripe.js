import { tool } from "ai";
import { z } from 'zod';
import { auth0 } from "./auth0";
import Stripe from "stripe";

const createStripeProduct = tool({
  description: 'Create a product in a connected Stripe account using Stripe Connect',
  parameters: z.object({
    name: z.string().describe('The name of the product'),
    description: z.string().optional().describe('An optional description of the product'),
    metadata: z.record(z.string()).optional().describe('Optional key-value metadata for the product'),
  }),
  execute: async ({ name, description, metadata }) => {
    try {
      // 🔐 Get the OAuth access token for the connected Stripe account
      const access_token = (await auth0.getAccessTokenForConnection({
        connection: 'stripe',
      })).token;

      const stripe = new Stripe(access_token, {
        apiVersion: '2023-10-16',
      });

      console.log('Creating Stripe product with:', { name, description, metadata });

      const product = await stripe.products.create({
        name,
        description,
        metadata,
      });

      console.log('Created product:', product);

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        metadata: product.metadata,
        created: product.created,
      };
    } catch (error) {
      console.error('Error creating Stripe product:', error);
      throw new Error(`Error creating Stripe product: ${error instanceof Error ? error.message : String(error)}`);
    }
  },
});

const listStripeProducts = tool({
  description: 'List products in a connected Stripe account using Stripe Connect',
  parameters: z.object({
    limit: z.number().optional().describe('The maximum number of products to return'),
    starting_after: z.string().optional().describe('A cursor for pagination'),
  }),
  execute: async ({ limit, starting_after }) => {
    try {
      // 🔐 Get the OAuth access token for the connected Stripe account
      const access_token = (await auth0.getAccessTokenForConnection({
        connection: 'stripe',
      })).token;

      const stripe = new Stripe(access_token, {
        apiVersion: '2023-10-16',
      });

      const products = await stripe.products.list({
        limit,
        starting_after,
      });

      return products.data.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        metadata: product.metadata,
        created: product.created,
      }));
    } catch (error) {
      console.error('Error listing Stripe products:', error);
      throw new Error(`Error listing Stripe products: ${error instanceof Error ? error.message : String(error)}`);
    }
  },
});



export { createStripeProduct, listStripeProducts };