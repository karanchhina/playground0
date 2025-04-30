const Icons = {

    CoachIcon: ({ width, height }) => (
        <div className="flex shrink-0 items-center justify-center bg-blue-500 text-white rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width={width} height={height} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <title>Coach</title>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
        </div>
    ),

    ProfileIcon: ({ width, height }) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width={width} height={height} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <title>Profile</title>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
    ),

    LogoutIcon: ({ width, height }) => (
        <div className="flex shrink-0 items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width={width} height={height} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <title>Logout</title>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
        </div>
    ),

    HumanIcon: ({ width, height }) => (
        <div className="flex shrink-0 items-center justify-center bg-zinc-500 text-white border p-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width={width} height={height} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>

        </div>
    ),

    Auth0Icon: () => (
        <svg width="140" height="30" viewBox="0 0 140 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-flex" data-sentry-element="svg" data-sentry-source-file="icons.tsx" data-sentry-component="IconAuth0">
            <title>Auth0</title>
            <path d="M32.4695 21.1688L37.1234 8.93911H38.9171L43.553 21.1688H41.9336L40.6447 17.8674H35.3297L34.0408 21.1688H32.4695ZM40.188 16.4878L37.9737 10.5989L35.7774 16.4878H40.188Z" fill="black" data-sentry-element="path" data-sentry-source-file="icons.tsx"></path><path d="M50.2831 12.2586H51.7132V21.1688H50.4754L50.2831 19.982C49.7603 20.6447 48.907 21.2743 47.4438 21.2743C45.4909 21.2743 43.9406 20.1748 43.9406 17.2198V12.2586H45.3707V17.1324C45.3707 18.985 46.206 19.9639 47.6872 19.9639C49.3066 19.9639 50.2831 18.7229 50.2831 16.7137V12.2586Z" fill="black" data-sentry-element="path" data-sentry-source-file="icons.tsx"></path><path d="M52.3982 13.5689V12.2586H54.0026V9.76146H55.4328V12.2586H57.7342V13.5689H55.4328V18.8283C55.4328 19.5784 55.6941 19.8585 56.4603 19.8585H57.8724V21.1688H56.3221C54.6155 21.1688 54.0056 20.4188 54.0056 18.8464V13.5689H52.3982Z" fill="black" data-sentry-element="path" data-sentry-source-file="icons.tsx"></path><path d="M66.6124 16.2077V21.1688H65.1823V16.295C65.1823 14.4425 64.293 13.4635 62.7607 13.4635C61.1052 13.4635 60.0777 14.7046 60.0777 16.7137V21.1688H58.6476V8.93911H60.0777V13.7256C60.6005 12.8882 61.5078 12.1532 63.0041 12.1532C64.99 12.1532 66.6094 13.2527 66.6094 16.2077H66.6124Z" fill="black" data-sentry-element="path" data-sentry-source-file="icons.tsx"></path><path d="M67.6069 14.7738C67.6069 11.2977 69.4877 8.83368 72.2429 8.83368C74.998 8.83368 76.8607 11.2977 76.8607 14.7738V15.3341C76.8607 18.985 74.9799 21.2743 72.2429 21.2743C69.5058 21.2743 67.6069 18.985 67.6069 15.3341V14.7738ZM75.3795 14.825C75.3795 11.9243 74.1237 10.1771 72.2429 10.1771C70.362 10.1771 69.0881 11.9243 69.0881 14.825V15.2799C69.0881 18.1807 70.344 19.9278 72.2429 19.9278C74.1417 19.9278 75.3795 18.1807 75.3795 15.2799V14.825Z" fill="black" data-sentry-element="path" data-sentry-source-file="icons.tsx"></path><path d="M91.3754 16.7137C91.3754 19.4398 89.5637 21.2743 87.106 21.2743C85.6068 21.2743 84.5973 20.6628 84.0565 19.8073L83.8642 21.1688H82.6264V8.93911H84.0565V13.6924C84.6484 12.8701 85.6068 12.1562 87.106 12.1562C89.5637 12.1562 91.3754 13.8159 91.3754 16.7167V16.7137ZM89.9122 16.7137C89.9122 14.7738 88.7285 13.4304 86.9678 13.4304C85.2072 13.4304 84.0415 14.7769 84.0415 16.6806C84.0415 18.5843 85.2252 20.0001 86.9678 20.0001C88.7104 20.0001 89.9122 18.6536 89.9122 16.7167V16.7137Z" fill="black" data-sentry-element="path" data-sentry-source-file="icons.tsx"></path><path d="M91.3213 12.2586H92.8386L95.5757 19.3705L98.2256 12.2586H99.7429L95.6478 22.672C95.089 24.1058 94.7585 24.6631 93.5056 24.6631H91.799V23.3527H93.0699C93.8902 23.3527 94.0284 23.1419 94.3589 22.3045L94.7945 21.2201L91.3273 12.2586H91.3213Z" fill="black" data-sentry-element="path" data-sentry-source-file="icons.tsx"></path><path d="M110.421 21.2743C106.987 21.2743 104.601 18.6536 104.601 15.054C104.601 11.4543 106.99 8.83368 110.421 8.83368C113.852 8.83368 116.241 11.4543 116.241 15.054C116.241 18.6536 113.852 21.2743 110.421 21.2743ZM110.421 19.8766C112.966 19.8766 114.69 17.8674 114.69 15.054C114.69 12.2405 112.966 10.2314 110.421 10.2314C107.876 10.2314 106.151 12.2405 106.151 15.054C106.151 17.8674 107.876 19.8766 110.421 19.8766Z" fill="black" data-sentry-element="path" data-sentry-source-file="icons.tsx"></path><path d="M117.337 8.93911H118.767V16.9939L123.229 12.2586H124.99L121.522 15.9456L125.233 21.1688H123.508L120.564 16.9758L118.77 18.8283V21.1688H117.34V8.93911H117.337Z" fill="black" data-sentry-element="path" data-sentry-source-file="icons.tsx"></path><path d="M125.35 13.5689V12.2586H126.955V9.76146H128.385V12.2586H130.686V13.5689H128.385V18.8283C128.385 19.5784 128.646 19.8585 129.412 19.8585H130.824V21.1688H129.274C127.567 21.1688 126.958 20.4188 126.958 18.8464V13.5689H125.35Z" fill="black" data-sentry-element="path" data-sentry-source-file="icons.tsx"></path><path d="M140 19.8585V21.1688H139.216C138.032 21.1688 137.629 20.6628 137.611 19.7892C137.053 20.5935 136.166 21.2743 134.631 21.2743C132.678 21.2743 131.356 20.2953 131.356 18.6717C131.356 16.8884 132.594 15.8944 134.928 15.8944H137.542V15.2829C137.542 14.1292 136.722 13.4304 135.328 13.4304C134.072 13.4304 133.237 14.0238 133.063 14.9335H131.633C131.843 13.1864 133.252 12.1562 135.397 12.1562C137.663 12.1562 138.969 13.2918 138.969 15.3703V19.2651C138.969 19.738 139.144 19.8585 139.543 19.8585H140ZM134.79 17.0993C133.519 17.0993 132.804 17.5722 132.804 18.5843C132.804 19.4579 133.552 20.0513 134.739 20.0513C136.518 20.0513 137.545 19.0211 137.545 17.5361V17.0993H134.79Z" fill="black" data-sentry-element="path" data-sentry-source-file="icons.tsx"></path><path d="M1.57638 13.0229C6.47384 12.2126 10.3133 8.1477 11.1175 3.22953L11.3873 0.865693C11.4541 0.490055 11.2003 -0.0331547 10.7274 0.00440905C7.02691 0.294187 3.53483 1.52038 1.59241 2.31726C0.62788 2.71437 0 3.65346 0 4.69988V12.4112C0 12.8673 0.40879 13.2161 0.857657 13.1437L1.57638 13.0256V13.0229Z" fill="black" data-sentry-element="path" data-sentry-source-file="icons.tsx"></path><path d="M13.4798 3.2297C14.2867 8.14787 18.1261 12.2128 23.0209 13.0231L23.7396 13.1412C24.1885 13.2163 24.5972 12.8675 24.5972 12.4087V4.69737C24.5972 3.65095 23.9694 2.71185 23.0048 2.31475C21.0597 1.51518 17.5703 0.291674 13.8698 0.00189662C13.3943 -0.0356672 13.1511 0.492909 13.2072 0.86318L13.4771 3.22702L13.4798 3.2297Z" fill="black" data-sentry-element="path" data-sentry-source-file="icons.tsx"></path><path d="M23.0171 15.1831C16.3242 16.5086 13.2169 20.976 13.2169 29.4332C13.2169 29.8572 13.6363 30.1523 13.989 29.9162C17.067 27.8314 23.8401 22.39 24.5374 15.5829C24.5641 14.727 23.4981 15.1295 23.0171 15.1831Z" fill="black" data-sentry-element="path" data-sentry-source-file="icons.tsx"></path><path d="M1.57885 15.1831C8.27178 16.5086 11.3791 20.976 11.3791 29.4332C11.3791 29.8572 10.9596 30.1523 10.607 29.9162C7.52901 27.8314 0.755923 22.39 0.0585757 15.5829C0.0318574 14.727 1.09792 15.1295 1.57885 15.1831Z" fill="black" data-sentry-element="path" data-sentry-source-file="icons.tsx"></path>
        </svg>
    ),
}

const CustomComponents = {
    DoubleUnderline: ({ children, className = "" }) => (
        <span
            className={`underline ${className}`}
            style={{ textDecorationStyle: "double", textUnderlineOffset: "4px" }}
        >
            {children}
        </span>
    ),

    BracketLink: ({ children }) => (
        [<span className="px-2 py-1 flex flex-row items-center gap-x-1 hover:underline">
            {children}
        </span>]
    ),

}

const treeData = [
    {
        logo: "google.png",
        company: "Google",
        services: ["GMail", "Calendar", "Drive", "Maps", "Photos"],
        description: "Internet services and products.",
        connection: "google-oauth2",
    },
    {
        logo: "microsoft.png",
        company: "Microsoft",
        services: ["Outlook", "Teams", "OneDrive"],
        description: "Software and cloud services.",
        connection: "windowslive",
    },
    {
        logo: "github_white.png",
        company: "GitHub",
        services: ["Git Repositories"],
        description: "Hosting for software development.",
        connection: "github",
    },
    {
        logo: "box.png",
        company: "Box",
        services: ["Cloud Storage"],
        description: "Cloud content management.",
        connection: "box",
    },
    {
        logo: "salesforce.png",
        company: "Salesforce",
        services: ["CRM", "Sales Cloud", "Service Cloud"],
        description: "Customer relationship management.",
        connection: "sfdc",
    },
    {
        logo: "atlassian.png",
        company: "Atlassian",
        services: ["Jira", "Confluence", "Trello", "Bitbucket"],
        description: "Software for developers and project managers.",
        connection: "atlassian",
    },
    {
        logo: "slack.png",
        company: "Slack",
        services: ["Messaging", "Channels"],
        description: "Team communication app.",
        connection: "slack-custom",
    },
    {
        logo: "spotify.png",
        company: "Spotify",
        services: ["Playlists"],
        description: "Digital music service.",
        connection: "spotify-custom",
    },
    {
        logo: "strava.png",
        company: "Strava",
        services: ["Fitness"],
        description: "Social fitness network.",
        connection: "strava-custom",
    },
    {
        logo: "stripe.png",
        company: "Stripe",
        services: ["Connect"],
        description: "Stripe.",
        connection: "stripe",
    },
]

export { Icons, treeData, CustomComponents };