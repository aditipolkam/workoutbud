import React from "react";
import AuthContext from "@/context/authContext";
import useGeoLocation from "@/hooks/useGeoLocation";
import { useEffect } from "react";
import { useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Activity } from "@/types";
import { SimpleGrid } from "@chakra-ui/react";
import ActivityCard from "@/components/ActivityCard";
import CustomButton from "@/components/common/CustomButton";
import Link from "next/link";

const Index = () => {
  const router = useRouter();
  const location = useGeoLocation();
  const { user } = useContext(AuthContext);
  const [activities, setActivities] = React.useState<Activity[]>([]);
  console.log(location);

  const getActivities = async () => {
    try {
      const res = await axios.post(`/api/activities`, {
        location,
        radius: 100,
      });
      if (res.status == 400) return console.log(res.data);
      if (res.status !== 200) return console.log(res.data);
      setActivities(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
    if (location.loaded) {
      getActivities();
    }
  }, [location.loaded]);
  return (
    <div>
      <div className="flex justify-between">
        <div></div>
        <Link href={"/signup/activities"}>
          <CustomButton variant="solid">Add Activity</CustomButton>
        </Link>
      </div>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(400px, 1fr))"
      >
        {activities.length > 0 &&
          activities.map((activity: any, index: number) => {
            return <ActivityCard activity={activity} key={index} />;
          })}
      </SimpleGrid>
    </div>
  );
};

export default Index;
