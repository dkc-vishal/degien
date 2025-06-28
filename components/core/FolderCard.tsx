"use client";
import Link from "next/link";

interface FolderCardProps {
  title: string;
  files: string[];
  link: string;
}

const FolderCard: React.FC<FolderCardProps> = ({ title, files, link }) => {
  const isEmpty = files.length === 0;

  return (
    <Link href={link} replace>
      <div
        className={`relative rounded-xl border shadow-sm hover:shadow-lg transition-all duration-200 p-4 h-[250px] cursor-pointer ${
          isEmpty ? "border-red-300 bg-red-100" : "border-gray-200 bg-white"
        }`}
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
        </div>
        <div className="flex flex-col items-center justify-center h-full -translate-y-4">
          {isEmpty ? (
            <span className="text-2xl font-bold italic text-gray-600">
              Empty
            </span>
          ) : (
            <div className="grid grid-cols-2 gap-7 relative">
              <img
                src="/spreadsheet_icon.png"
                alt="spreadsheet"
                className="w-14 h-14 object-contain"
              />
              <img
                src="/spreadsheet_icon.png"
                alt="spreadsheet"
                className="w-14 h-14 object-contain"
              />
              <div className="col-span-2 flex justify-center mt-[-12px]">
                <img
                  src="/spreadsheet_icon.png"
                  alt="spreadsheet"
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default FolderCard;
