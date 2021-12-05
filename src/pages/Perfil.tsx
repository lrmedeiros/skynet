import {
  Avatar,
  Flex,
  Box,
  Stack,
  Text,
  VStack,
  Heading,
  StackDivider,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { AssociateCard } from "../components/AssociateCard";

import { CourseCard } from "../components/CourseCard";
import { Header } from "../components/Header";
import { useAuthContext } from "../contexts/AuthContext";
import { api } from "../services/api";

interface Course {
  id: number;
  name: string;
  minHours: number;
  createdAt: string;
  updatedAt: string;
}

interface Flight {
  id: number;
  aircraftId: number;
  pilotId: number;
  coPilotId: number;
  hoursFlew: number;
  createdAt: string;
  updatedAt: string;
}

interface Student {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

interface Instructor {
  id: number;
  email: string;
  name: string;
  type: string;
  license: string;
  createdAt: string;
  updatedAt: string;
}

interface Class {
  course: Course;
  id: number;
  flight: Flight;
  student: Student;
  instructor: Instructor;
}

export function Perfil() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const { associate } = useAuthContext();

  useEffect(() => {
    api
      .get("/courses")
      .then((response) => {
        const { courses } = response.data;

        const formattedCourse = courses.map((course: Course) => {
          return {
            id: Number(course.id),
            name: String(course.name),
            minHours: Number(course.minHours),
            createdAt: new Date(course.createdAt).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }),
            updatedAt: new Date(course.updatedAt).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }),
          };
        });
        setCourses(formattedCourse);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .get("/classes")
      .then((response) => {
        setClasses(response.data.classes);
      })
      .catch((err) => console.log(err));
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
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          <Flex mt="10" flexDir="column">
            <Heading color="blue.300">Perfil</Heading>
            <AssociateCard
              email={associate.email}
              name={associate.name}
              type={associate.type}
              license={associate.license}
            />
          </Flex>

          <Flex flexDir="column">
            <Heading color="blue.300">Cursos</Heading>
            <Stack paddingBottom="2" spacing="4">
              {courses.length > 0 &&
                courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    name={course.name}
                    minHours={course.minHours}
                    updatedAt={course.updatedAt}
                    createdAt={course.createdAt}
                  />
                ))}
            </Stack>
          </Flex>

          {/* <Flex flexDir="column">
            <Heading color="blue.300">Classes</Heading>
            <Stack paddingBottom="2" spacing="4">
              {classes.length > 0 &&
                classes.map((classe: Class) => (
                  
                ))}
            </Stack>
          </Flex> */}
        </VStack>
      </Flex>
    </Flex>
  );
}
