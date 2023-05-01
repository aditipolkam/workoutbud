import React from "react";
import AuthContext from "@/context/authContext";
import useGeoLocation from "@/hooks/useGeoLocation";
import { useEffect } from "react";
import { useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Activity } from "@/types";
import { getLatLng, geocodeByAddress } from "react-google-places-autocomplete";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { SimpleGrid, FormLabel } from "@chakra-ui/react";
import ActivityCard from "@/components/ActivityCard";
import CustomButton from "@/components/common/CustomButton";
import Link from "next/link";
import CustomSlider from "@/components/common/CustomSlider";

type LocationCoordinates = {
  lat: number | string;
  lng: number | string;
};

const Index = () => {
  const router = useRouter();
  const { location, getCurrentLocation } = useGeoLocation();
  const { user } = useContext(AuthContext);
  const [activities, setActivities] = React.useState<Activity[]>([]);
  const [sliderValue, setSliderValue] = React.useState(150);
  const [coordinates, setCoordinates] =
    React.useState<LocationCoordinates | null>(null);

  const getActivities = async () => {
    try {
      const res = await axios.post(`/api/activities`, {
        location: coordinates,
        radius: sliderValue,
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
    if (!coordinates) return console.log("coordinates not set");
    getActivities();
  }, [coordinates, sliderValue, user]);

  const handlePlaceSelect = async (value: any) => {
    let latLng: any = null;
    const results = await geocodeByAddress(value.label);
    if (results) latLng = await getLatLng(results[0]);
    setCoordinates(latLng);
  };

  useEffect(() => {
    if (!location.loaded) return console.log("location not loaded");
    if (!location?.coordinates) return console.log("coordinates not loaded");
    const { lat, lng } = location.coordinates;
    if (!lat || !lng) return console.log("lat or lng not loaded");
    setCoordinates({ lat, lng });
  }, [location.coordinates, location.loaded]);

  return (
    <div className="mb-10">
      <div className="flex justify-between">
        <div>
          <div className="flex flex-row items-center">
            <CustomButton variant="solid" handleClick={getCurrentLocation}>
              Use Current Location
            </CustomButton>
            <div className="mr-2">or</div>
            <GooglePlacesAutocomplete
              apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}
              selectProps={{
                onChange: handlePlaceSelect,
                placeholder: "select location for search",
              }}
            />
          </div>

          <div className="my-5">
            <CustomSlider
              sliderValue={sliderValue}
              setSliderValue={setSliderValue}
            />
          </div>
        </div>
        <Link href={"/signup/activities"}>
          <CustomButton variant="solid">Add Activity</CustomButton>
        </Link>
      </div>
      <SimpleGrid
        mt={5}
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
