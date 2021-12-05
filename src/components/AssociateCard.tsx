import { Box, Text, Avatar, Stack } from "@chakra-ui/react";

interface AssociateCardPros {
  type: "student" | "instructor" | "pilot";
  name: string;
  email: string;
  license: null | string;
}

export function AssociateCard({
  type,
  name,
  email,
  license,
}: AssociateCardPros) {
  return (
    <Box padding="6" boxShadow="lg" bg="white">
      <Avatar name={name} />
      <Stack mt="4" spacing="4">
        <Text>Associado: {type}</Text>
        <Text>Nome: {name}</Text>
        <Text>E-mail: {email}</Text>
        <Text>Licença: {license ? license : "Não possuí"}</Text>
      </Stack>
    </Box>
  );
}
