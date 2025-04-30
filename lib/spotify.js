import { tool } from "ai";
import { z } from 'zod';
import { auth0 } from "./auth0";

const createSpotifyPlaylist = tool({
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
});

const getSpotifyPlaylists = tool({
    description: "Retrieve all Spotify playlists for the authenticated user.",
    parameters: z.object({}),
    execute: async () => {
        const { token: accessToken } = await auth0.getAccessTokenForConnection({ connection: "spotify-custom" });
        const userId = await getSpotifyUserId(accessToken);
        const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const data = await response.json();
        return data.items.map(playlist => ({
            id: playlist.id,
            name: playlist.name,
            description: playlist.description,
            external_urls: playlist.external_urls,
        }));
    },
});

const getSpotifyUserId = async (token) => {
    const accessToken = token ? token : (await auth0.getAccessTokenForConnection({ connection: "spotify-custom" })).token;
    const response = await fetch(`https://api.spotify.com/v1/me`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const data = await response.json();
    return data.id;
}

export { createSpotifyPlaylist, getSpotifyPlaylists };