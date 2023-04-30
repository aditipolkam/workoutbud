import SignUpContainer from "@/components/common/SignUpContainer";
import React, { useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Stack,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { CheckboxGroup, Checkbox } from "@chakra-ui/react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useRouter } from "next/router";
import AuthContext from "@/context/authContext";
import { useContext } from "react";
import axios from "axios";
import { Activity } from "@/types";
import { getLatLng, geocodeByAddress } from "react-google-places-autocomplete";

const Activities = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [activity, setActivity] = React.useState<Activity | null>({
    uid: user,
    name: "",
    description: "",
    timeSlots: [],
    days: [],
    location: {
      address: "",
      coordinates: {
        lat: null,
        lng: null,
      },
    },
  });
  const [activities, setActivities] = React.useState<Activity[]>([]);

  useEffect(() => {
    if (user)
      setActivity((prevActivity) => {
        if (prevActivity) {
          return { ...prevActivity, uid: user };
        }
        return null;
      });
  }, [user]);

  const handleSelect = async (value: any) => {
    let latLng: any = null;
    const results = await geocodeByAddress(value.label);
    if (results) latLng = await getLatLng(results[0]);

    setActivity((prevActivity) => {
      if (prevActivity) {
        return {
          ...prevActivity,
          location: { address: value.label, coordinates: latLng },
        };
      }
      return null;
    });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActivity((prevActivity) => {
      if (prevActivity) {
        return { ...prevActivity, name: event.target.value };
      }
      return null;
    });
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setActivity((prevActivity) => {
      if (prevActivity) {
        return { ...prevActivity, description: event.target.value };
      }
      return null;
    });
  };

  const handleDayChange = (value: any) => {
    setActivity((prevActivity) => {
      if (prevActivity) {
        return {
          ...prevActivity,
          days: value,
        };
      }
      return null;
    });
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let timeSlots = event.target.value.split(",").map(function (value: string) {
      return value.trim();
    });
    setActivity((prevActivity) => {
      if (prevActivity) {
        return {
          ...prevActivity,
          timeSlots: timeSlots,
        };
      }
      return null;
    });
  };

  const handleActivities = async () => {
    //console.log(activities);
    if (activities.length === 0) {
      alert("Please add atleast one activity");
      return;
    }
    setIsPending(true);
    const res = await axios.post(
      "/api/update/user-activities",
      { uid: user, activities },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    setIsPending(false);
    if (res.status === 200) router.push("/app");
  };

  const handleAddActivity = () => {
    if (
      !activity?.name ||
      !activity?.description ||
      !activity?.days ||
      !activity?.location.address ||
      !activity?.location.coordinates.lat ||
      !activity?.location.coordinates.lng ||
      activity?.timeSlots.length === 0 ||
      !activity?.uid
    ) {
      alert("Please fill all the fields");
      return;
    }
    setActivities((prevActivities) => {
      if (activity) {
        return [...prevActivities, activity];
      }
      return prevActivities;
    });
    setActivity({
      uid: user,
      name: "",
      description: "",
      timeSlots: [],
      days: [],
      location: {
        address: "",
        coordinates: {
          lat: null,
          lng: null,
        },
      },
    });
  };

  console.log(activity);

  return (
    <>
      <SignUpContainer handleClick={handleAddActivity}>
        <FormControl mt={4}>
          <div className="flex justify-between">
            <FormLabel>
              <p>What activities are you interested in?</p>
            </FormLabel>
          </div>
          <div>
            <Input
              placeholder="activity name"
              onChange={handleNameChange}
              borderColor={"blackAlpha.300"}
              backgroundColor={"white"}
              value={activity?.name}
              my={2}
            />
            <Textarea
              placeholder="describe what do you do in this activity"
              onChange={handleDescriptionChange}
              borderColor={"blackAlpha.300"}
              backgroundColor={"white"}
              value={activity?.description}
              my={2}
            />
            <div className="my-2">
              <CheckboxGroup
                colorScheme="purple"
                onChange={handleDayChange}
                value={activity?.days}
              >
                <Stack spacing={[1, 5]} direction={["column", "row"]}>
                  <Checkbox value="Monday">Monday</Checkbox>
                  <Checkbox value="Tuesday">Tuesday</Checkbox>
                  <Checkbox value="Wednesday">Wednesday</Checkbox>
                  <Checkbox value="Thursday">Thursday</Checkbox>
                </Stack>
                <Stack spacing={[1, 5]} direction={["column", "row"]}>
                  <Checkbox value="Friday">Friday</Checkbox>
                  <Checkbox value="Saturday">Saturday</Checkbox>
                  <Checkbox value="Sunday">Sunday</Checkbox>
                </Stack>
              </CheckboxGroup>
            </div>

            <Input
              placeholder="time slots (separate by comma) eg: 7am-9am, 9am-11am"
              onChange={handleTimeChange}
              borderColor={"blackAlpha.300"}
              backgroundColor={"white"}
              value={activity?.timeSlots}
              my={2}
            />
            <div className="my-2">
              <GooglePlacesAutocomplete
                apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}
                selectProps={{
                  onChange: handleSelect,
                  placeholder: "select location for this activity",
                }}
              />
            </div>
          </div>
        </FormControl>
      </SignUpContainer>
      {activities.length > 0 && (
        <>
          <Table variant="simple">
            <TableCaption>Activities</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>Days</Th>
                <Th>Time</Th>
                <Th>Location</Th>
              </Tr>
            </Thead>
            <Tbody>
              {activities.map((activity, index) => {
                return (
                  <Tr key={index}>
                    <Td>{activity.name}</Td>
                    <Td>{activity.description}</Td>
                    <Td>{activity.days.join(" ")}</Td>
                    <Td>{activity.timeSlots.join(", ")}</Td>
                    <Td>{activity.location.address}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
          <Button p={2} colorScheme="purple" onClick={handleActivities}>
            Submit
          </Button>
        </>
      )}
    </>
  );
};

export default Activities;
