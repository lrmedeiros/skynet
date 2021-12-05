import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

interface ErrorAlertProps {
  title: string;
  description?: string;
}

export function ErrorAlert({ title, description }: ErrorAlertProps) {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>{title}</AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
      {/* <CloseButton position="absolute" right="8px" top="8px" /> */}
    </Alert>
  );
}
