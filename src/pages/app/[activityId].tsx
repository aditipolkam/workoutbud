import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";
import { Activity } from "@/types";
import { Box, Text, Flex } from "@chakra-ui/react";
import { BsSearchHeart, BsCalendar3 } from "react-icons/bs";
import { FaShare, FaComment } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { IoIosTimer } from "react-icons/io";

const Activity = () => {
  const { activityId } = useRouter().query;
  const [activity, setActivity] = React.useState<Activity | null>(null);

  const getActivity = async () => {
    try {
      const res = await axios.post(`/api/get-activity`, {
        id: activityId,
      });
      console.log(res.data);
      if (res.status == 400) return console.log(res.data);
      if (res.status == 200) return setActivity(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(activityId);
    if (!activityId) return console.log("activityId not set");
    getActivity();
  }, [activityId]);

  if (!activity) return <Box>Loading...</Box>;

  return (
    <Box>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Text fontSize="xl" color={"purple.700"} as="b">
          {activity.name}
        </Text>
      </Flex>
      <Box>
        <div className="flex flex-row items-center my-2">
          <div>
            <BsSearchHeart size={15} />
          </div>
          <p className="mx-3">{activity.description}</p>
        </div>
        <div className="flex flex-row items-center my-2">
          <div>
            <GoLocation size={15} />
          </div>
          <p className="mx-3">{activity.location.address}</p>
        </div>
        <div className="flex flex-row items-center my-2">
          <div>
            <BsCalendar3 size={15} />
          </div>
          <p className="mx-3">{activity.days.join(" ")}</p>
        </div>
        <div className="flex flex-row items-center my-2">
          <div>
            <IoIosTimer size={15} />
          </div>
          <p className="mx-3">{activity.timeSlots.join(" ")}</p>
        </div>
      </Box>
    </Box>
  );
};

export default Activity;
