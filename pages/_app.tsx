import "../styles/globals.css";
import type { AppProps } from "next/app";

import React, { useState } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [username, setUsername] = useState("");
  const router = useRouter();

  // function to handle successfully user login.
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/chat");
  };

  return (
    <Component
      handleLoginChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setUsername(e.target.value)
      }
      username={username}
      handleLogin={handleLogin}
      {...pageProps}
    />
  );
}

export default MyApp;
