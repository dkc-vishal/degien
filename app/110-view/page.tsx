"use client";
import FolderSection from "@/components/core/FolderSection";

const view110Cards = [
  { title: "1. Master 110", files: ["Style A", "Style B"], link: "/form-110" }

];

export default function View110Page() {
  return (
    <FolderSection sectionTitle="110 View" folders={view110Cards} />
  );
}
