import { useEffect, useState } from "react";

const useScroll = () => {
  const [position, setPosition] = useState(48);
  const [maxScroll, setMaxScroll] = useState(0);

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const scrollTop = window.scrollY > 48 ? window.scrollY : 48;
      setPosition(scrollTop);
    }
  };

  const handleResize = () => {
    if (typeof window !== "undefined") {
      const newMaxScroll = Math.max(document.documentElement.scrollHeight - 908, 48);
      setMaxScroll(newMaxScroll);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const newMaxScroll = Math.max(document.documentElement.scrollHeight - 908, 48);
      setMaxScroll(newMaxScroll);
    })

    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    }
  })

  return { position, maxScroll };
};

export default useScroll;
