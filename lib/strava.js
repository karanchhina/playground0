import { tool } from "ai";
import { z } from 'zod';
import { format } from 'date-fns';
import { auth0 } from "./auth0";

const getStravaActivities = tool({
  description: "Fetch the user's recent fitness activities from Strava.",
  parameters: z.object({
    count: z.number().default(100).describe("Number of activities to fetch"),
    dateFrom: z.string().optional().describe("Start date for activities in YYYY-MM-DD format"),
    dateTo: z.string().optional().describe("End date for activities in YYYY-MM-DD format"),
  }),
  execute: async ({ count, dateFrom, dateTo }) => {
    const { token: accessToken } = await auth0.getAccessTokenForConnection({ connection: "strava-custom" });

    dateFrom = Math.floor(new Date(dateFrom || '2025-01-01').getTime() / 1000);
    dateTo = Math.floor(new Date(dateTo || '2025-01-31').getTime() / 1000);

    const response = await fetch(`https://www.strava.com/api/v3/athlete/activities?per_page=${count}&before=${dateTo}&after=${dateFrom}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching activities: ${response.statusText}`);
    }

    const data = await response.json();

    let activities = data.map(activity => {
      return {
        name: activity.name,
        type: activity.type,
        distance: (activity.distance / 1609.34).toFixed(2),
        duration: (activity.moving_time / 60).toFixed(2),
        start_date: activity.start_date,
      };
    });

    console.log(activities);

    return activities;
  }
});



const analyzeStravaActivities = (activities) => {

  console.log("ANALYZING ACTIVITIES", activities);

  return activities;

}



const formatDataForChart = (activities) => {
  const labels = activities.map((activity) => format(new Date(activity.start_date), 'MMM d')); // Use activity names as labels
  const distances = activities.map((activity) => activity.distance); // Use distances for Y-axis data

  return {
    labels: labels,
    datasets: [
      {
        label: 'Distance (in miles)',
        data: distances,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
};


export { getStravaActivities, analyzeStravaActivities, formatDataForChart };