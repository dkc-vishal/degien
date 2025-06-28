"use client";
import FolderSection from "@/components/core/FolderSection";

const qaAnalysisCards = [
  { title: "1. MID 1", files: ["Summary 1"], link: "/mid-final" },
  { title: "1. MID 2", files: ["Summary 1"], link: "/mid-final" },
  { title: "1. MID 3", files: ["Summary 1"], link: "/mid-final" },
  { title: "1. MID 4", files: ["Summary 1"], link: "/mid-final" },
  { title: "1. Initial", files: ["Summary 1"], link: "/qa-initial-report" },
  { title: "1. Initial Follow UP", files: ["Summary 1"], link: "/qa-initial-report" },


];

export default function QAAnalysisPage() {
  return <FolderSection sectionTitle="QA Analysis" folders={qaAnalysisCards} />;
}
