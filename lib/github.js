import { tool } from "ai";
import { z } from 'zod';
import { auth0 } from "./auth0";
const { Octokit } = require("@octokit/rest");

// tool to Fetch user details for the authenticated user
const getUserDetails = tool({
    description: 'Get user details from GitHub',
    parameters: z.object({}),
    execute: async () => {
        try {

            const octokit = new Octokit({
                auth: (await auth0.getAccessTokenForConnection({ connection: "github" })).token,
            });

            const response = await octokit.request('GET /user');
            return response.data;
        } catch (error) {
            console.error('Error fetching user details:', error);
            throw new Error('Failed to fetch user details');
        }
    },
});

// tool to fetch repos for the authenticated user
const getUserRepos = tool({
    description: 'Get user repos from GitHub',
    parameters: z.object({}),
    execute: async () => {
        try {
            const octokit = new Octokit({
                auth: (await auth0.getAccessTokenForConnection({ connection: "github" })).token,
            });

            const response = await octokit.request('GET /user/repos', {
                visibility: 'all',
            });
            const filteredRepos = response.data.map(repo => ({
                id: repo.id,
                full_name: repo.full_name,
                private: repo.private,
                owner_name: repo.owner.login,
                url: repo.html_url,
                description: repo.description,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
            }));

            console.log(filteredRepos);
            return filteredRepos;
        } catch (error) {
            console.error('Error fetching user repos:', error);
            throw new Error('Failed to fetch user repos');
        }
    },
});


export { getUserDetails, getUserRepos }