import {
  Box,
  Flex,
  Icon,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AssociateCard } from "../components/AssociateCard";
import { Header } from "../components/Header";
import { api } from "../services/api";

interface InstructorData {
  id: number;
  type: "student" | "instructor" | "pilot";
  name: string;
  email: string;
  license: string | null;
}

export function SearchInstructor() {
  const [instructors, setInstructions] = useState<InstructorData[]>([]);

  useEffect(() => {
    api
      .get("/courses/instructors")
      .then((response) => {
        setInstructions(response.data.instructors);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Flex w="100vw" h="100vh" justify="center">
      <Flex
        w="100%"
        maxWidth={[360, 970]}
        h="100%"
        bg="transparent"
        p="8"
        borderRadius="8"
        flexDir="column"
      >
        <Header />
        <Flex mt="10" w="100%" justify="left">
          <Link to="/perfil">
            <Icon fontSize="20" color="blue.300" as={FaArrowLeft} />
          </Link>
        </Flex>

        <Text align="center" fontSize="3xl" color="blue.300">
          Lista de instrutores
        </Text>

        <Stack paddingBottom="2" spacing="4">
          {instructors.length > 0 ? (
            instructors.map((instructor: InstructorData) => (
              <AssociateCard
                key={instructor.id}
                type={instructor.type}
                name={instructor.name}
                email={instructor.email}
                license={instructor.license}
              />
            ))
          ) : (
            <>
              <Box padding="6" boxShadow="lg" bg="white">
                <SkeletonCircle size="10" />
                <SkeletonText mt="4" noOfLines={4} spacing="4" />
              </Box>
              <Box padding="6" boxShadow="lg" bg="white">
                <SkeletonCircle size="10" />
                <SkeletonText mt="4" noOfLines={4} spacing="4" />
              </Box>
              <Box padding="6" boxShadow="lg" bg="white">
                <SkeletonCircle size="10" />
                <SkeletonText mt="4" noOfLines={4} spacing="4" />
              </Box>
            </>
          )}
        </Stack>
      </Flex>
    </Flex>
  );
}
