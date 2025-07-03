"use client";
import FolderCard from "./FolderCard";

interface FolderItem {
  title: string;
  files: string[];
  link: string;
}

interface FolderSectionProps {
  sectionTitle: string;
  folders: FolderItem[];
}

const FolderSection: React.FC<FolderSectionProps> = ({ sectionTitle, folders }) => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{sectionTitle}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {folders.map((card, index) => (
          <FolderCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default FolderSection;
