import {
  Button,
  Flex,
  Icon,
  Image,
  Select,
  Stack,
  FormLabel,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

import { Input } from "../components/Form/Input";

import LogoSkynet from "../assets/logo.png";
import { api } from "../services/api";

interface RegisterFormData {
  email: string;
  password: string;
  name: string;
  type: string;
}

const RegisterFormSchema = yup.object().shape({
  email: yup.string().required("E-mail é obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(6, "Mínimo de 6 caracteres"),
  name: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Por favor insira um nome valido")
    .required("Nome é obrigatório"),
  type: yup.string().required("O seu tipo de conta é obrigatório"),
});

export function Register() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(RegisterFormSchema),
  });

  const { errors } = formState;

  const handleRegisterAssociate: SubmitHandler<RegisterFormData> = async (
    values,
    event
  ) => {
    const { email, password, name, type } = values;
    try {
      await api.post("/users", {
        email,
        password,
        name,
        type,
      });

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex w="100%" h="100%" align="center" justify="center">
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg="transparent"
        p="8"
        borderRadius="8"
        flexDir="column"
        onSubmit={handleSubmit(handleRegisterAssociate)}
      >
        <Flex w="100%" justify="left">
          <Link to="/">
            <Icon fontSize="20" color="blue.300" as={FaArrowLeft} />
          </Link>
        </Flex>
        <Flex w="100%" alignItems="center" justify="center" marginBottom="4">
          <Image w="80px" src={LogoSkynet} alt="Logo da Skynet" size />
        </Flex>
        <Stack spacing="4">
          <Input
            label="E-mail"
            type="text"
            error={errors.email}
            {...register("email")}
          />
          <Input
            label="Nome"
            type="text"
            error={errors.name}
            {...register("name")}
          />
          <Flex flexDir="column">
            <FormLabel>Tipo de conta</FormLabel>

            <Select
              error={errors.type}
              {...register("type")}
              bg="gray.300"
              borderColor="gray.500"
              color="gray.500"
              _hover={{ borderColor: "gray.500" }}
            >
              <option value="student">Estudante</option>
              <option value="pilot">Piloto</option>
              <option value="instructor">Instrutor</option>
            </Select>
          </Flex>
          <Input
            label="Senha"
            type="password"
            error={errors.password}
            {...register("password")}
          />
        </Stack>

        <Button
          type="submit"
          marginTop="6"
          colorScheme="blue"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Criar conta
        </Button>
      </Flex>
    </Flex>
  );
}
