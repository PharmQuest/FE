import { useState } from "react";

const useScroll = (limit: number) => {
  const [position, setPosition] = useState(48);
  const scrollRimit = limit;

  const handleScroll = () => {
    const scrollTop = window.scrollY - 148 > 48 ? window.scrollY - 148 : 48;
    const limitedScrollTop = Math.min(scrollTop, scrollRimit);

    setPosition(limitedScrollTop);
  };

  return { position, handleScroll }
};

export default useScroll;