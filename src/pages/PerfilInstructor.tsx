import { Button, Flex, Icon, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

import { FaArrowLeft } from "react-icons/fa";

import { Input } from "../components/Form/Input";
import { Header } from "../components/Header";
import { api } from "../services/api";

const createFlightClassSchema = yup.object().shape({
  description: yup.string().required("Descrição é obrigatória"),
  courseId: yup
    .number()
    .required("Id do curso é obrigatório")
    .integer("O Id é inteiro"),
  studentId: yup
    .number()
    .required("Id do estudante é obrigatório")
    .integer("O Id é inteiro"),
  instructorId: yup
    .number()
    .required("Id do instrutor é obrigatório")
    .integer("O Id é inteiro"),
  hoursFlew: yup.number().required("Número de horas é obrigatório"),
  aircraftId: yup
    .number()
    .required("Id da aeronave é obrigatório")
    .integer("O Id é inteiro"),
});

interface CreateFlightClassData {
  description: string;
  courseId: number;
  studentId: number;
  instructorId: number;
  hoursFlew: number;
  aircraftId: number;
}

export function PerfilInstructor() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createFlightClassSchema),
  });

  const { errors } = formState;

  const handleCreateFlightClass: SubmitHandler<CreateFlightClassData> = async (
    values,
    event
  ) => {
    try {
      const {
        aircraftId,
        courseId,
        studentId,
        instructorId,
        hoursFlew,
        description,
      } = values;

      await api.post("/classes", {
        description,
        aircraftId,
        courseId,
        studentId,
        instructorId,
        hoursFlew,
      });

      navigate("/perfil");
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
        onSubmit={handleSubmit(handleCreateFlightClass)}
      >
        <Header />
        <Flex mt="10" w="100%" justify="left">
          <Link to="/perfil">
            <Icon fontSize="20" color="blue.300" as={FaArrowLeft} />
          </Link>
        </Flex>
        <Stack mt="3" spacing="4">
          <Input
            label="Descrição"
            type="textarea"
            error={errors.description}
            {...register("description")}
          />
          <Input
            label="Id do curso"
            type="text"
            error={errors.courseId}
            {...register("courseId")}
          />
          <Input
            label="Id do estudante"
            type="text"
            error={errors.studentId}
            {...register("studentId")}
          />
          <Input
            label="Id do instrutor"
            type="text"
            error={errors.instructorId}
            {...register("instructorId")}
          />
          <Input
            label="Horas de voo"
            type="text"
            error={errors.hoursFlew}
            {...register("hoursFlew")}
          />
          <Input
            label="Id da aeronava"
            type="text"
            error={errors.aircraftId}
            {...register("aircraftId")}
          />

          <Button
            type="submit"
            marginTop="6"
            colorScheme="blue"
            size="lg"
            isLoading={formState.isSubmitting}
          >
            Criar aula de voo
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
}
