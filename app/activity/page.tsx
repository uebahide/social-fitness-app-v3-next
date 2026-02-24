import { activity } from "@/types/api/activity";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Activity() {
    const cookiesStore = await cookies()
    const token = cookiesStore.get("token")?.value;

    let res: Response;

    try{
      res = await fetch(`${process.env.API_URL}/api/activities`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
    }catch(e){
      throw new Error(`Network error while fetching activities: ${String(e)}`);  
    }

    if (!res.ok) {
      redirect("/login");
    }

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
  