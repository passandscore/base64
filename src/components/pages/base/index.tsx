"use client";

import { Box, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Header from "src/components/header";
import Base64 from "src/components/base64-converter";

const Page = () => {
  const [preloaded, setPreloaded] = useState(false as boolean);
  const [isFullScreen, setIsFullScreen] = useState(false as boolean);

  useEffect(() => {
    setTimeout(() => {
      setPreloaded(true);
    }, 2000);
  }, []);

  const feature = () => {
    return (
      <>
        {!isFullScreen}
        <Center>
          <Box
            mt={10}
            px={5}
            maxW="1300px"
            w="100%"
          >
            {!isFullScreen && <Header />}
            <Base64
              isFullScreen={isFullScreen}
              setIsFullScreen={setIsFullScreen}
            />
          </Box>
        </Center>
      </>
    );
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
      </style>
      {feature()}
    </>
  );
};

export default Page;
