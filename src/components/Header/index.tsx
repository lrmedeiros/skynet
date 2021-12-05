import { Avatar, Flex, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";

export function Header() {
  const { associate, signOut, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <Flex
      height="10"
      align="center"
      justify="space-between"
      position="absolute"
      top="0"
      right="0"
      left="0"
      boxshadow="dark-lg"
      p="6"
      bg="blue.500"
    >
      <Avatar
        marginLeft="2"
        to="/perfil"
        as={Link}
        size="sm"
        name={associate.name}
      />
      <Flex>
        <Button to="/search-instructor" as={Link} size="sm" marginRight="2">
          Instrutores
        </Button>
        {associate.type === "instructor" && (
          <Button to="/perfil-instructor" as={Link} size="sm" marginRight="2">
            Criar classe
          </Button>
        )}
        <Button size="sm" marginRight="2" onClick={signOut}>
          SignOut
        </Button>
      </Flex>
    </Flex>
  );
}
