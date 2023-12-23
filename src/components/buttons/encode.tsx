import { Button } from "@chakra-ui/react";

export const EncodeButton = ({ handleEncode }: { handleEncode: () => void }) => {
  return (
    <Button variant="outline" size="md" onClick={() => handleEncode()}>
      Encode
    </Button>
  );
};
