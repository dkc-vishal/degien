"use client";
import FolderSection from "@/components/core/FolderSection";

const qaReportCards = [
  { title: "1. QA Audit Form", files: ["Audit Form A"], link: "/qa-audit-form" },
  { title: "2. QA Defects", files: [], link: "/qa-defects" },
  { title: "3. QA Review", files: ["Review A"], link: "/qa-review" },
];

export default function QAReportPage() {
  return <FolderSection sectionTitle="QA Report" folders={qaReportCards} />;
}
