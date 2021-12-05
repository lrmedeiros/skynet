import { Box, Text } from "@chakra-ui/react";

interface CourseCardProps {
  name: string;
  minHours: number;
  createdAt: string;
  updatedAt: string;
}

export function CourseCard({
  name,
  minHours,
  createdAt,
  updatedAt,
}: CourseCardProps) {
  return (
    <Box mt="4" padding="6" boxShadow="lg" bg="white">
      <Text>Nome: {name}</Text>
      <Text>Mínimo de horas: {minHours}</Text>
      <Text>Data da criação: {createdAt}</Text>
      <Text>Data da ultima alteração: {updatedAt}</Text>
    </Box>
  );
}
