import { Flex, Stack } from "@chakra-ui/react";

export function EmissionOfReportsMadeByTheInstructors() {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        w="100%"
        maxWidth={360}
        bg="transparent"
        p="8"
        borderRadius="8"
        flexDir="column"
      >
        <Stack spacing="4"></Stack>
      </Flex>
    </Flex>
  );
}
