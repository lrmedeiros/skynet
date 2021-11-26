import { InputGroup, InputLeftElement, Icon, Input } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

interface SearchbarProps {
  placeholder: string;
}

export function Searchbar({ placeholder }: SearchbarProps) {
  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<Icon fontSize="20" as={FaSearch} color="blue.300" />}
      />
      <Input type="text" placeholder={placeholder} />
    </InputGroup>
  );
}
