import { useState } from "react";

const useMessage = () => {
  const [message, setMessage] = useState("");
  return [message, setMessage];
};

export default useMessage;
