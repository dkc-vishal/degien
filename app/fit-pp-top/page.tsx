"use client";
import FolderSection from "@/components/core/FolderSection";

const fitPpTopCards = [
  { title: "1. FIT Sample", files: ["FIT-1"], link: "/fit-sample" },
  { title: "2. PP Sample", files: [], link: "/pp-sample" },
  { title: "3. TOP Sample", files: ["TOP-1", "TOP-2"], link: "/top-sample" },
];

export default function FitPPTopPage() {
  return <FolderSection sectionTitle="FIT / PP / TOP" folders={fitPpTopCards} />;
}
