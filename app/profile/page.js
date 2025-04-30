import { redirect } from "next/navigation";
import ProfileGeneral from "../components/ProfileGeneral";
import { auth0 } from "@/lib/auth0";

const Page = async () => {

    const session = await auth0.getSession();

    if (!session) {
        redirect('/')
    }

    return (
        <div className="flex flex-col max-w-4xl pt-16 py-4 mx-auto stretch h-screen">
            <div>
                <ProfileGeneral user={session?.user} />
            </div>
        </div>
    );

};

export default Page;