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

const Index = () => {
  const router = useRouter();
  const location = useGeoLocation();
  const { user } = useContext(AuthContext);
  const [activities, setActivities] = React.useState<Activity[]>([]);
  console.log(location);

  const getActivities = async () => {
    const res = await axios.post(`/api/activities`, {
      location,
      radius: 100,
    });
    setActivities(res.data);
    console.log(res.data);
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
