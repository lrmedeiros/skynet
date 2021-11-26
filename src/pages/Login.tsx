import {
  Button,
  Flex,
  Stack,
  HStack,
  Link,
  Switch,
  Text,
  Image,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "../components/Form/Input";

import LogoSkynet from "../assets/logo.png";
import { useAuthContext } from "../contexts/AuthContext";

interface SignInFormData {
  email: string;
  password: string;
  keepConnected: boolean;
}

const signInSchema = yup.object().shape({
  email: yup.string().required("E-mail é obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha é obrigatório"),
  keepConnected: yup.boolean(),
});

export function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuthContext();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    try {
      await signIn(values);

      navigate("/search-associate");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg="transparent"
        p="8"
        borderRadius="8"
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Flex w="100%" alignItems="center" justify="center" marginBottom="8">
          <Image w="80px" src={LogoSkynet} alt="Logo da Skynet" size />
        </Flex>
        <Stack spacing="4">
          <Input
            label="E-mail"
            type="email"
            error={errors.email}
            {...register("email")}
          />
          <Input
            label="Senha"
            type="password"
            error={errors.password}
            {...register("password")}
          />
          <HStack spacing="3">
            <Switch size="md" {...register("keepConnected")} />
            <Text>Mantenha-me conectado</Text>
          </HStack>
        </Stack>
        <Button
          type="submit"
          marginTop="6"
          colorScheme="blue"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>

        <Link as={ReactRouterLink} to="register" width="100%">
          <Button w="100%" marginTop="6" size="lg">
            Criar conta
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}
