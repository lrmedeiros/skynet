import { Icon, Flex, HStack, Button } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Can } from "../components/Can";
import { Searchbar } from "../components/Form/Searchbar";

export function SearchAssociate() {
  return (
    // <Can roles={["instructor", "pilot", "student"]}>
    <Flex w="100vw" h="100vh" justify="center">
      <Flex
        w="100%"
        maxWidth={[360, 970]}
        bg="transparent"
        p="8"
        borderRadius="8"
        flexDir="column"
      >
        <Flex w="100%" justify="left">
          <Link to="/">
            <Icon fontSize="20" color="blue.300" as={FaArrowLeft} />
          </Link>
        </Flex>
        <Searchbar placeholder="Procurando por alguem?" />

        <HStack marginTop="3" w="100%" justify="center" spacing="2">
          <Button>Piloto</Button>
          <Button>Instrutor</Button>
          <Button>Aluno</Button>
        </HStack>
      </Flex>
    </Flex>
    // </Can>
  );
}
