import React from "react";
import { useState, useEffect } from "react";
import { NavLocationState } from "@/types";

const useGeoLocation = () => {
  const [location, setLocation] = useState<NavLocationState>({
    loaded: false,
    coordinates: { lat: null, lng: null },
  });

  const onSuccess = (location: any) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error: any) => {
    setLocation({
      loaded: true,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  const getCurrentLocation = () => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

  // useEffect(() => {
  //   getCurrentLocation();
  // }, []);

  return { location, getCurrentLocation };
};

export default useGeoLocation;
