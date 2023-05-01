import { Activity } from "@/types";
import React from "react";
import { Card, CardBody, Text, Flex, Box, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { BsSearchHeart, BsCalendar3 } from "react-icons/bs";
import { FaShare, FaComment } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { IoIosTimer } from "react-icons/io";
import Link from "next/link";

const ActivityCard = ({ activity }: { activity: Activity }) => {
  const toast = useToast();

  return (
    <Card maxW="md" dropShadow={"purple.100"}>
      <CardBody>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Link href={`/app/${activity.id}`}>
            <Text fontSize="xl" color={"purple.700"} as="b">
              {activity.name}
            </Text>
          </Link>

          <Button
            onClick={() => {
              navigator.clipboard.writeText(
                `http://workoutbud.vercel.app/app/${activity.id}`
              );
              toast({
                title: "Activity Copied.",
                description: "Copied the link to your clipboard.",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
            }}
          >
            <FaShare size={13} />
          </Button>
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
      </CardBody>

      {/* <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <div className="flex grow justify-center">
          <AiFillLike />
        </div>
        <div className="flex grow justify-center">
          <FaComment />
        </div>
        <div className="flex grow justify-center">
          <FaShare />
        </div>
      </CardFooter> */}
    </Card>
  );
};

export default ActivityCard;
