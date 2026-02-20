import { activity } from "@/types/api/activity";

export default async function Activity() {
    const res = await fetch(`${process.env.API_URL}/api/activities`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    )

    const activities = await res.json();
    return (
      <div>
        Activity list
        {activities.map((activity: activity) => (
              <div key={activity.id}>{activity.title}</div>
            )
          )
        }
      </div>
    );
  }
  