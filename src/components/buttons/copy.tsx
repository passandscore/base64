import { Button } from "@chakra-ui/react";
import { toast } from "sonner";

export const CopyButton = ({ input, output, tabIndex }: { 
  input: string;
  output: string;
  tabIndex: number;
}) => {
  const copied = () => {
    toast.success("Copied");
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
