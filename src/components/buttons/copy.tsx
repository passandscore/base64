import { Button, useToast } from "@chakra-ui/react";

export const CopyButton = ({ input, output, tabIndex }: { 
  input: string;
  output: string;
  tabIndex: number;
}) => {
  const toast = useToast();

  const copied = () => {
    toast({
      title: "Copied",
      status: "success",
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Button
      size="xs"
      onClick={() => {
        navigator.clipboard.writeText(tabIndex === 0 ? input : output);
        copied();
      }}
      color={"green.400"}
      w="5rem"
      mr={2}
    >
      Copy
    </Button>
  );
};
