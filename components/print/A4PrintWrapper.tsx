// components/A4PrintWrapper.tsx
"use client";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function A4PrintWrapper({ children }: Props) {
  return <div className="a4-container print:block">{children}</div>;
}
