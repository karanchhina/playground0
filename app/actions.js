'use server';
import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";

export async function linkAccount(connection) {
    "use server";
    const session = await auth0.getSession();
    const id_token_hint = session.idToken;
    const authParams = new URLSearchParams({
        scope: "link_account openid profile offline_access",
        requested_connection: connection,
        id_token_hint,
    })

    console.log("linkAccount", authParams.toString());

    redirect(`/auth/login?${authParams.toString()}`);
}


//
// { identities: [ stratus: "active", connection: "google-oauth2", user_id: "103, email: "kc@gmail.com"]}
// // 
// export async function requestAdditionalPermissions(connection, login_hint, additional_scopes) {
//     "use server";
//     const session = await auth0.getSession();
//     const id_token_hint = session.idToken;
//     const authParams = new URLSearchParams({
//         connection,
//         login_hint,
//         id_token_hint,
//     });

//     if (additional_scopes) {
//         authParams.append("connection_scope", additional_scopes);
//     }

//     redirect(`/auth/login?${authParams.toString()}`);
// }



