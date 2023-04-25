import { Activity } from "@/types";
import React from "react";
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Text,
  CardFooter,
  Button,
  Center,
  Flex,
  Avatar,
  Box,
  IconButton,
} from "@chakra-ui/react";
import CustomButton from "./common/CustomButton";

const ActivityCard = ({ activity }: { activity: Activity }) => {
  return (
    <Card maxW="md" dropShadow={"purple.100"}>
      <CardHeader>
        <Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar src="https://bit.ly/broken-link" />
            <Box>
              <Text>{activity.name}</Text>
            </Box>
          </Flex>
          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
          />
        </Flex>
      </CardHeader>
      <CardBody>
        <Box>
          <Text>{activity.description}</Text>
          <Text>{activity.location.address}</Text>
          <Box>On days {activity.days.join(" ")}</Box>
        </Box>
      </CardBody>

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <Button flex="1" variant="ghost">
          Chat
        </Button>
        <Button flex="1" variant="ghost">
          Comment
        </Button>
        <Button flex="1" variant="ghost">
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActivityCard;
