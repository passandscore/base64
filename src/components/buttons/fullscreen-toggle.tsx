import { Button } from "@chakra-ui/react";
import Maximize from "src/assets/icons/maximize";
import Minimize from "src/assets/icons/minimize";

export const FullScreenToggleButton = ({
  isFullScreen,
  setIsFullScreen,
}: {
  isFullScreen: boolean;
  setIsFullScreen: (value: boolean) => void;
}) => {
  return (
    <Button
      variant="outline"
      onClick={() => {
        isFullScreen ? setIsFullScreen(false) : setIsFullScreen(true);
      }}
    >
      {isFullScreen ? (
        <Minimize width={20} height={20} />
      ) : (
        <Maximize width={20} height={20} />
      )}
    </Button>
  );
};
