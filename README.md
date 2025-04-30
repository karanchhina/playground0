This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

To get this going:

`git clone git@github.com:karanchhina/playground0.git`

`cd ./playground0`

Update your `.env.local` file with the following
```
OPENAI_API_KEY=<openai api key>

AUTH0_DOMAIN='genai-xxxxxxxxxxxx.us.auth0.com'
AUTH0_CLIENT_ID='<auth0 client id>'
AUTH0_CLIENT_SECRET='<auth0 client secret>'
AUTH0_SECRET='<random secret, e.g. openssl rand -hex 32>'
APP_BASE_URL=http://localhost:3000
AUTH0_M2M_CLIENT_ID='<auth0 client id for mgmt api scoped to get users and more>'
AUTH0_M2M_CLIENT_SECRET='<auth0 client secret for mgmt api scoped to get users and more>'

SALESFORCE_INSTANCE_URL=<e.g. https://xxxxxxxx.my.salesforce.com>
```

`npm i`
`npm run dev`
