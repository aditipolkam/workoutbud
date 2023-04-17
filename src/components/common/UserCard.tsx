import React from "react";
import {
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  Button,
  CardFooter,
} from "@chakra-ui/react";
import { UserProfile } from "@/types";

const UserCard = ({ data }: { data: UserProfile }) => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      width={600}
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80"
        alt="Profile"
      />

      <Stack>
        <CardBody>
          <div className="flex items-center justify-between">
            <Heading size="md">{data.nickname}</Heading>
            <Text py="2">{data.gender}</Text>
          </div>
          <Text py="2">{data.description}</Text>
          <Text py="2">
            Interested in:{" "}
            {data.activities.map((activity) => (
              <>{activity} </>
            ))}
          </Text>
          <Text py="2">
            Free Time:{" "}
            {data.timeSlots.map((slot) => (
              <>{slot} </>
            ))}
          </Text>
        </CardBody>
        <CardFooter>
          <Button variant="solid" colorScheme="blue">
            View Profile
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default UserCard;
