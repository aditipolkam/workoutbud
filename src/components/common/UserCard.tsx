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
      <Image objectFit="cover" width={200} src={data.avatar} alt="Profile" />

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
          <Text py="2">Stays near: {data.address}</Text>
          <Text py="2">
            Free Time:{" "}
            {data.timeSlots.map((slot) => (
              <>{slot} </>
            ))}
          </Text>
          <Button variant="solid" colorScheme="blue">
            View Profile
          </Button>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default UserCard;
