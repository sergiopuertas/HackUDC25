"use client";
import { useEffect } from "react";

export default function LoginChecker() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.location.href.includes("/login")
    )
      return;
    const username = localStorage.getItem("username");
    if (username === null) {
      window.location.href = "/login";
    }

    if (window.location.href.includes("/login")) {
      window.location.href = "/main";
    }
  }, []);

  return <></>;
}
