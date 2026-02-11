"use client";

import React, { useState } from "react";
import {
  Flex,
  Textarea,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Container,
  Heading,
  Text,
  HStack,
  Button,
  VStack,
  Stack,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react";
import { toast } from "sonner";

/**
 * BASE64 WORKBENCH - MOBILE RESPONSIVE ENTERPRISE EDITION
 * Design System: Dropbox Stone (Dark)
 * * Verbose Design Logic: 
 * Optimized for touch targets and mobile viewports. On small screens, the 
 * horizontal navigation stacks into a vertical layout, and padding is 
 * reduced to maximize the usable editor space.
 */

const Base64Studio = () => {
  const [submittedInput, setSubmittedInput] = useState("");
  const [output, setOutput] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  // Responsive values for mobile adaptation
  const isMobile = useBreakpointValue({ base: true, md: false });
  const containerPadding = { base: 4, md: 8 };
  const editorPadding = { base: 4, md: 10 };

  const theme = {
    bg: "#1e1919",
    workspace: "#2b2929",
    border: "#3d3b3b",
    accent: "#0061ff",
    textPrimary: "#ffffff",
    textSecondary: "#a19b9b",
    success: "#39e58c",
    hover: "#3d3b3b",
  };

  const handleCopy = async (text: string) => {
    /** * Verbose Logic: Standardizes the copy routine. On mobile devices, 
     * this utilizes the native share/clipboard integration provided by 
     * the browser's navigator object.
     */
    if (!text) return;
    await navigator.clipboard.writeText(text);
    toast.success("Copied");
  };

  const clearValues = () => {
    setSubmittedInput("");
    setOutput("");
  };

  const handleEncode = () => {
    if (!submittedInput.trim()) {
      toast.info("Input required");
      return;
    }
    const encoded = btoa(unescape(encodeURIComponent(submittedInput)));
    setOutput(encoded);
    setTabIndex(1);
  };

  const handleDecode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(submittedInput)));
      setOutput(decoded);
      setTabIndex(1);
    } catch (e) {
      toast.error("Invalid Base64 format.");
    }
  };

  return (
    <Box 
      bg={theme.bg} 
      minH="100vh" 
      color={theme.textPrimary} 
      fontFamily="Inter, system-ui, sans-serif"
    >
      {/* Global Header - Responsive Stack */}
      <Flex 
        as="nav" 
        direction={{ base: "column", md: "row" }}
        px={containerPadding} 
        py={{ base: 4, md: 0 }}
        h={{ base: "auto", md: "64px" }}
        align="center" 
        justify="space-between" 
        borderBottom="1px solid" 
        borderColor={theme.border}
        gap={4}
      >
        <Heading size="sm" fontWeight="800" letterSpacing="-0.02em" textTransform="uppercase">
          Base64 Studio
        </Heading>
        
        <HStack spacing={3} w={{ base: "full", md: "auto" }}>
          <Button
            flex={{ base: 1, md: "initial" }}
            size="sm"
            bg={theme.accent}
            color="white"
            borderRadius="0"
            fontSize="xs"
            fontWeight="700"
            onClick={handleEncode}
          >
            ENCODE
          </Button>
          <Button
            flex={{ base: 1, md: "initial" }}
            size="sm"
            variant="outline"
            borderColor={theme.border}
            color="white"
            borderRadius="0"
            fontSize="xs"
            fontWeight="700"
            onClick={handleDecode}
          >
            DECODE
          </Button>
        </HStack>
      </Flex>

      <Container maxW="full" p={0}>
        <Flex direction="column" h={{ base: "auto", md: "calc(100vh - 64px)" }}>
          
          <Tabs variant="unstyled" index={tabIndex} onChange={setTabIndex} isLazy display="flex" flexDirection="column" flex="1">
            
            {/* Toolbar - Responsive Layout */}
            <Flex 
              bg={theme.bg} 
              px={containerPadding} 
              py={3} 
              direction={{ base: "column", sm: "row" }}
              borderBottom="1px solid" 
              borderColor={theme.border}
              align={{ base: "flex-start", sm: "center" }}
              justify="space-between"
              gap={4}
            >
              <TabList gap={6}>
                {["SOURCE", "RESULT"].map((label, idx) => (
                  <Tab 
                    key={label}
                    p={0} 
                    fontSize="11px" 
                    fontWeight="800" 
                    color={theme.textSecondary}
                    letterSpacing="0.08em"
                    _selected={{ color: theme.textPrimary, boxShadow: "0 2px 0 0 white" }}
                  >
                    {label}
                  </Tab>
                ))}
              </TabList>

              <Stack direction="row" spacing={3} w={{ base: "full", sm: "auto" }} justify="space-between">
                <Button
                  variant="ghost"
                  size="xs"
                  color={theme.textSecondary}
                  fontSize="10px"
                  fontWeight="800"
                  px={0}
                  onClick={clearValues}
                >
                  CLEAR
                </Button>
                <Button
                  size="xs"
                  borderRadius="0"
                  fontSize="10px"
                  fontWeight="800"
                  bg={theme.border}
                  color="white"
                  onClick={() => handleCopy(tabIndex === 0 ? submittedInput : output)}
                >
                  COPY RESULT
                </Button>
              </Stack>
            </Flex>

            {/* Editor - Dynamic Height for Mobile */}
            <TabPanels flex={1} bg={theme.workspace}>
              <TabPanel p={0} h={{ base: "60vh", md: "full" }}>
                <Textarea
                  variant="unstyled"
                  w="full"
                  h="100%"
                  p={editorPadding}
                  value={submittedInput}
                  onChange={(e) => setSubmittedInput(e.target.value)}
                  placeholder="Paste source text..."
                  fontSize={{ base: "14px", md: "15px" }}
                  fontFamily="monospace"
                  lineHeight="1.8"
                  resize="none"
                  _placeholder={{ color: "whiteAlpha.300" }}
                />
              </TabPanel>

              <TabPanel p={0} h={{ base: "60vh", md: "full" }}>
                <Textarea
                  readOnly
                  variant="unstyled"
                  w="full"
                  h="100%"
                  p={editorPadding}
                  value={output}
                  placeholder="Output appears here..."
                  fontSize={{ base: "14px", md: "15px" }}
                  color={theme.success}
                  fontFamily="monospace"
                  lineHeight="1.8"
                  resize="none"
                />
              </TabPanel>
            </TabPanels>
          </Tabs>

          {/* Status Footer - Hidden or Mini on Mobile */}
          <Flex 
            h="40px" 
            bg={theme.bg} 
            borderTop="1px solid" 
            borderColor={theme.border} 
            align="center" 
            px={containerPadding}
            justify="space-between"
          >
            <HStack spacing={4}>
              <Box w="6px" h="6px" borderRadius="full" bg="green.400" />
              <Text fontSize="10px" fontWeight="800" color={theme.textSecondary} letterSpacing="0.05em">
                {isMobile ? "LOCAL" : "SECURE LOCAL RUNTIME"}
              </Text>
            </HStack>
            <Tooltip
              label={
                <Text as="span" fontSize="2xl" fontWeight="bold">
                  {(tabIndex === 0 ? submittedInput : output).length.toLocaleString('en-US')}
                </Text>
              }
              placement="top"
              hasArrow
            >
              <Text fontSize="10px" fontWeight="800" color={theme.textSecondary} cursor="help">
                CHARS: {(tabIndex === 0 ? submittedInput : output).length.toLocaleString('en-US')}
              </Text>
            </Tooltip>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Base64Studio;