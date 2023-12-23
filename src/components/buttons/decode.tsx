import { Button } from "@chakra-ui/react";

export const DecodeButton = ({ handleDecode }: { handleDecode: () => void }) => {
  return (
    <Button variant="outline" mx={5} onClick={() => handleDecode()}>
      Decode
    </Button>
  );
};
