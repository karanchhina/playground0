import { ManagementClient, AuthenticationClient } from 'auth0';

export const management = new ManagementClient({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_M2M_CLIENT_ID,
    clientSecret: process.env.AUTH0_M2M_CLIENT_SECRET,
});

export const Utils = {

    fetchUser: async (id) => {
        try {
            const response = await management.users.get({ id });
            const user = response.data || response;
            return user;
        } catch (error) {
            console.error('Error fetching user:', error.response ? error.response.data : error.message);
            return null;
        }
    },
    unlinkIdentity: async (id, provider) => {
        try {
            const response = await management.users.unlinkOtherAccount({ id, provider });
            return response;
        } catch (error) {
            console.error('Error unlinking identity:', error.response ? error.response.data : error.message);
            return null;
        }
    }
}
