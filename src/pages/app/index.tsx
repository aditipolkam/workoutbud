import React from "react";
import AuthContext from "@/context/authContext";
import useGeoLocation from "@/hooks/useGeoLocation";
import { useEffect } from "react";
import { useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Activity } from "@/types";
import { SimpleGrid, Input, FormControl, FormLabel } from "@chakra-ui/react";
import ActivityCard from "@/components/ActivityCard";
import CustomButton from "@/components/common/CustomButton";
import Link from "next/link";

const Index = () => {
  const router = useRouter();
  const location = useGeoLocation();
  const { user } = useContext(AuthContext);
  const [activities, setActivities] = React.useState<Activity[]>([]);
  const [radius, setRadius] = React.useState<string>("20");

  const getActivities = async () => {
    try {
      const res = await axios.post(`/api/activities`, {
        location,
        radius,
      });
      if (res.status == 400) return console.log(res.data);
      if (res.status !== 200) return console.log(res.data);
      console.log(res);
      setActivities(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
    if (!location.loaded) return console.log("location not loaded");
    if (location.coordinates) {
      const { lat, lng } = location.coordinates;
      if (lat && lng) getActivities();
    }
  }, [location.loaded, location.coordinates, user, router, radius]);

  if (!location.loaded) return <>Loading location</>;
  if (location.loaded && !location.coordinates)
    return <>Location not found, please allow location permission</>;
  return (
    <div className="mb-10">
      <div className="flex justify-between">
        <div>
          <FormControl>
            <FormLabel>Radius</FormLabel>
            <Input
              placeholder="Radius"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
            />
          </FormControl>
        </div>
        <Link href={"/signup/activities"}>
          <CustomButton variant="solid">Add Activity</CustomButton>
        </Link>
      </div>
      <SimpleGrid
        spacing={2}
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
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
