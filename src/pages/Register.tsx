import { Button, Flex, Icon, Image, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

import { Input } from "../components/Form/Input";

import LogoSkynet from "../assets/logo.png";

interface RegisterFormData {
  email: string;
  password: string;
  name: string;
  address: string;
  birthday: Date;
}

const today = new Date();

const eighteenYearsOld = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate()
);

const eightyYearsOld = new Date(
  today.getFullYear() - 72,
  today.getMonth(),
  today.getDate()
);

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
  address: yup.string().required("Endereço é obrigatório"),
  birthday: yup
    .date()
    .transform((curr, orig) => (orig === "" ? undefined : curr))
    .required("Sua data de nascimento é obrigatória")
    .max(eighteenYearsOld, "Você não pode ser menor de 18 anos!")
    .min(eightyYearsOld, "Você não pode ser mais velho do que 80 anos"),
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
    const { email, password, address, birthday, name } = values;

    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    console.log({ email, password, address, birthday, name });
    // const response = await api.post("/createUser", { email, password });

    navigate("/");
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
          <Input
            label="Data de nascimento"
            type="date"
            error={errors.birthday}
            {...register("birthday")}
          />
          <Input
            label="Endereço"
            type="text"
            error={errors.address}
            {...register("address")}
          />
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
