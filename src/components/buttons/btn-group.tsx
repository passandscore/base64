import { Flex } from "@chakra-ui/react";
import { ResetButton } from "./reset";
import { CopyButton } from "./copy";

const ButtonGroup = ({
  input,
  output,
  tabIndex,
  clearValues,
  setTabIndex,
}: {
  input: string;
  output: string;
  tabIndex: number;
  clearValues: () => void;
  setTabIndex: (value: number) => void;
}) => {
  return (
    <Flex gap={4} justify="flex-end" mb={3}>
      {input && output && (
        <>
          <CopyButton input={input} output={output} tabIndex={tabIndex} />
          <ResetButton clearValues={clearValues} setTabIndex={setTabIndex} />
        </>
      )}
    </Flex>
  );
};

export default ButtonGroup;
