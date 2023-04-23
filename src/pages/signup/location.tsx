import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { getLatLng, geocodeByAddress } from "react-google-places-autocomplete";

const Search = () => {
  const [address, setAddress] = useState<any>(null);

  const handleSelect = async (value: any) => {
    let latLng;
    const results = await geocodeByAddress(value.label);
    if (results) latLng = await getLatLng(results[0]);
    console.log(results);
    setAddress(latLng);
  };

  console.log(address);

  return (
    <GooglePlacesAutocomplete
      apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}
      selectProps={{ onChange: handleSelect }}
    />
  );
};

export default Search;
