import { useState } from "react";
import SignUpContainer from "@/components/common/SignUpContainer";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { getLatLng, geocodeByAddress } from "react-google-places-autocomplete";

const Location = () => {
  const [address, setAddress] = useState<any>(null);

  const handleSelect = async (value: any) => {
    let latLng;
    const results = await geocodeByAddress(value.label);
    if (results) latLng = await getLatLng(results[0]);
    console.log(results);
    setAddress(latLng);
  };

  const handleLocation = () => {};

  return (
    <SignUpContainer handleClick={handleLocation}>
      <FormControl mt={4}>
        <FormLabel>
          <p>what do you want people to call you?</p>
        </FormLabel>

        <GooglePlacesAutocomplete
          apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}
          selectProps={{ onChange: handleSelect }}
        />
      </FormControl>
    </SignUpContainer>
  );
};

export default Location;
