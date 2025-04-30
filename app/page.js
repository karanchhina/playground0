import Landing from "./components/Landing";
import ChatHome from "./components/ChatHome";
import { auth0 } from "@/lib/auth0";
import { Utils } from "@/lib/utils";

export default async function Chat() {

  let session;
  try {
    session = await auth0.getSession();
    // console.log(session);
    // console.log(await auth0.getAccessTokenForConnection({ connection: "sfdc" }));
    // console.log(await auth0.getAccessTokenForConnection({ connection: "google-oauth2" }));
    // console.log(await auth0.getAccessTokenForConnection({ connection: "spotify-custom" }));
    // console.log(await auth0.getAccessTokenForConnection({ connection: "spotify-custom" }));
  } catch (error) {
    console.error("Failed to get session:", error);
    session = null;
  }


  // get user identities from mgmt api
  const user = session ? await Utils.fetchUser(session.user.sub) : null;
  // console.log(user);

  return (
    <main className="flex-1 bg-black">
      {session ? <ChatHome session={session} identities={user.identities} /> : <Landing />}
    </main>
  );
}
