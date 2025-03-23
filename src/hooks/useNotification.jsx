import { useState } from "react";

export function useNotification() {
  const [notification, setNotification] = useState("");

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  return { notification, showNotification };
}
