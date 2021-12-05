import { InputGroup, InputLeftElement, Icon, Input } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { ChangeEventHandler } from "react";

interface SearchbarProps {
  placeholder: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  value?: string | number | readonly string[] | undefined;
}

export function Searchbar({ placeholder, value, onChange }: SearchbarProps) {
  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<Icon fontSize="20" as={FaSearch} color="blue.300" />}
      />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </InputGroup>
  );
}
