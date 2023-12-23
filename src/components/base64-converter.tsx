import {
  Flex,
  Textarea,
  Box,
  useToast,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { EncodeButton } from "./buttons/encode";
import { DecodeButton } from "./buttons/decode";
import { FullScreenToggleButton } from "./buttons/fullscreen-toggle";
import ButtonGroup from "./buttons/btn-group";

const Base64 = ({
  isFullScreen,
  setIsFullScreen,
}: {
  isFullScreen: boolean;
  setIsFullScreen: (value: boolean) => void;
}) => {
  const [submittedInput, setSubmittedInput] = useState("");
  const [output, setOutput] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  const toast = useToast();

  const clearValues = () => {
    setSubmittedInput("");
    setOutput("");
  };

  const handleEncode = () => {
    if (!submittedInput) {
      toast({
        title: "No Inputs Found",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setOutput(btoa(unescape(encodeURIComponent(submittedInput))));
    setTabIndex(1);
  };

  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(escape(atob(submittedInput))));
      setTabIndex(1);
    } catch (e) {
      if (e.message.includes("URI malformed")) {
        toast({
          title: "Invalid Input",
          description: "You can only decode valid Base64 strings.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      toast({
        title: "Error",
        description: e.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      {/* Main Menu Buttons */}
      <Flex justify="center" my={5}>
        <EncodeButton handleEncode={handleEncode} />
        <DecodeButton handleDecode={handleDecode} />
        <FullScreenToggleButton
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
        />
      </Flex>

      <Tabs variant="enclosed" index={tabIndex} onChange={setTabIndex}>
        <TabList>
          <Tab>Input</Tab>
          <Tab>Output</Tab>
        </TabList>

        <TabPanels>
          {/* Input Panel */}
          <TabPanel>
            <ButtonGroup
              input={submittedInput}
              output={output}
              tabIndex={tabIndex}
              clearValues={clearValues}
              setTabIndex={setTabIndex}
            />

            <Textarea
              variant="filled"
              placeholder="Text Input"
              h="100vh"
              value={submittedInput}
              onChange={(e) => {
                setSubmittedInput(e.target.value);
              }}
            />
          </TabPanel>

          {/* Output Panel */}
          <TabPanel>
            <ButtonGroup
              clearValues={clearValues}
              input={submittedInput}
              output={output}
              tabIndex={tabIndex}
              setTabIndex={setTabIndex}
            />
            <Textarea
              readOnly
              variant="filled"
              placeholder="Base64 Output"
              h="100vh"
              value={output}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Base64;
