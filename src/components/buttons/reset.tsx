import { Button } from "@chakra-ui/react";

export const ResetButton = ({
  clearValues,
  setTabIndex,
}: {
  clearValues: () => void;
  setTabIndex: (value: number) => void;
}) => {
  return (
    <Button
      size="xs"
      onClick={() => {
        clearValues();
        setTabIndex(0)
      }}
      color={"red.400"}
      w="5rem"
      mr={2}
    >
      Reset
    </Button>
  );
};
