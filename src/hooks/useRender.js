import { useState, useEffect, useRef } from "react";
const useRender = () => {
  const renderRef = useRef(true);

  useEffect(() => {
    // if (renderRef.current) {
    //   renderRef.current = false;
    //   return;
    // }
  }, []);
  return renderRef;
};

export default useRender;
