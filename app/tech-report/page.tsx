"use client";
import FolderSection from "@/components/core/FolderSection";

const techReportCards = [
  { title: "1. Tech Specs", files: ["Report A"], link: "/tech-spec" },
  { title: "2. Graded Specs", files: ["Test A"], link: "/techspecprintpage" },
  { title: "3. Print", files: ["Test B "], link: "/printpage" },
];

export default function TechReportPage() {
  return <FolderSection sectionTitle="Tech Report" folders={techReportCards} />;
}
