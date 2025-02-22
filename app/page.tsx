"use client";
import { useEffect } from "react";

export default function Main() {
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username === null) {
      window.location.href = "/login";
    } else {
      window.location.href = "/main";
    }
  });
  return <div></div>;
}
