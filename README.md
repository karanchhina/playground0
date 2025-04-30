This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

To get this going:

`git clone git@github.com:karanchhina/playground.git`

`cd ./playground`

`npm i`

`npm run dev`

There's no authentication implemented.

There's a fake session/user that can be set to null to simulate logged out state

```
  // fake session
  let session = {
    user: {
      name: 'John Doe',
      email: 'jd@example.com',
      picture: 'https://example.com/picture.jpg',
      nickname: 'jdoe',
      sub: '1234567890'
    }
  }
```

