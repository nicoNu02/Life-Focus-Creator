import { useState } from "react";

const useModals = () => {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };
  return [isShowing, toggle];
};

export default useModals;
