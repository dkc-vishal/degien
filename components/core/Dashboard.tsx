// "use client";
// import React, { useState } from "react";
// import { LayoutGrid, List } from "lucide-react";
// import Link from "next/link";

// interface FolderCard {
//   id: number;
//   title: string;
//   files: string[];
//   highlight?: boolean;
//   link: string;
// }

// const initialFolders: FolderCard[] = [
//   { id: 1, title: "1.Sampling", files: [],link:"/SamplingWatchPoint" },
//   {
//     id: 2,
//     title: "2.Master-110",
//     files: ["Style 1", "Style 2", "Style 3"],
//     highlight: true,
//     link:"/form-110",
//   },
//   { id: 3, title: "3.Tech Graded Spec", files: ["Style 7"] ,link:"/tech-spec" },
//   { id: 4, title: "4.FIT / PP / TOP / WEB Analysis", files: [] ,link:"/Fit-top-pp" },
//   { id: 5, title: "5.QA Audit Forms", files: ["Style 13", "Style 14"], link:"/qa-initial-report" },
//   { id: 6, title: "6.QA Audit Analysis", files: [], link:"/mid-final" },
// ];

// const Dashboard: React.FC<{ styleName?: string}> = ({ styleName }) => {
//   const [folders, setFolders] = useState<FolderCard[]>(initialFolders);
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

//   return (
//     <div className="min-h-screen min-w-full flex flex-col bg-gray-100">
//       {/* Header Row */}
//       <div className="flex items-center justify-between px-6 pt-6">
//         <h1 className="text-2xl font-bold text-gray-800">
//           Dashboard: {styleName}
//         </h1>
//         <button
//           onClick={() =>
//             setViewMode((prev) => (prev === "grid" ? "list" : "grid"))
//           }
//           className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-700"
//           title="Toggle View"
//         >
//           {viewMode === "grid" ? (
//             <List className="w-5 h-5" />
//           ) : (
//             <LayoutGrid className="w-5 h-5" />
//           )}
//         </button>
//       </div>

//       {/* Main Content */}
//       <main className="p-6 flex-1">
//         {viewMode === "grid" ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
//             {folders.map((folder) => (
//               <Link href={folder.link} replace key={folder.id}>
//                 <div
//                 key={folder.id}
//                 className={`relative rounded-xl border shadow-sm hover:shadow-lg transition-all duration-200 p-4 h-[250px] cursor-pointer ${folder.files.length === 0
//                     ? "border-red-300 bg-red-100"
//                     : "border-gray-200 bg-white"
//                   }`}
//               >
//                 <div className="flex justify-between items-center mb-3">
//                   <h3 className="font-semibold text-gray-800 text-sm">
//                     {folder.title}
//                   </h3>
//                 </div>
//                 <div className="flex flex-col items-center justify-center h-full -translate-y-4">
//                   {folder.files.length > 0 ? (
//                     <div className="grid grid-cols-2 gap-7 relative">
//                       <img
//                         src="/spreadsheet_icon.png"
//                         alt="spreadsheet"
//                         className="w-14 h-14 object-contain"
//                       />
//                       <img
//                         src="/spreadsheet_icon.png"
//                         alt="spreadsheet"
//                         className="w-14 h-14 object-contain"
//                       />
//                       <div className="col-span-2 flex justify-center mt-[-12px]">
//                         <img
//                           src="/spreadsheet_icon.png"
//                           alt="spreadsheet"
//                           className="w-16 h-16 object-contain"
//                         />
//                       </div>
//                     </div>
//                   ) : (
//                     <span className="text-2xl font-bold italic text-gray-600">
//                       Empty
//                     </span>
//                   )}
//                 </div>
//               </div>
//            </Link>
//             ))}
//           </div>
//         ) : (
//           <div className="bg-white rounded-xl shadow-xl p-6">
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm text-gray-700 border-separate border-spacing-y-2 border-spacing-x-2">
//                 <thead className="bg-purple-100 text-purple-800 uppercase text-xs font-semibold">
//                   <tr>
//                     <th className="px-6 py-3 text-left">Folder Title</th>
//                     <th className="px-6 py-3 text-left">Files</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {folders.map((folder, idx) => (
//                     <tr
//                       key={folder.id}
//                       className={`transition ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"
//                         } hover:bg-purple-50`}
//                     >
//                       <td className="px-6 py-3 font-medium text-gray-800 rounded-l-lg">
//                         {folder.title}
//                       </td>
//                       <td
//                         className={`px-6 py-3 rounded-r-lg ${folder.files.length === 0
//                             ? "text-red-600 italic font-medium"
//                             : "text-gray-700"
//                           }`}
//                       >
//                         {folder.files.length > 0
//                           ? folder.files.join(", ")
//                           : "Empty"}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Dashboard;

"use client";
import React, { useEffect, useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { useRouter } from "next/navigation";
import { MdLockOutline } from "react-icons/md";

interface FolderCard {
  id: number;
  title: string;
  files: string[];
  highlight?: boolean;
  disabled?: boolean;
}

// Master -> Sampling Watchpoint, Tech Graded Specs, Production Watchpoint 

// Updated the initialFolders to be dynamic based on 'vendorName'. For Master, it will show 3 folders, and for others like NS Blake, it will be default

const getInitialFolders = (vendorName?: string): FolderCard[] => {
  const normalizedVendor = vendorName?.toLowerCase();

  if (normalizedVendor === "master") {
    return [
      { id: 1, title: "1.Sampling Watchpoint", files: ["demo"], disabled: true },
      { id: 2, title: "2. Tech Graded Specs", files: ["demo"] },
      { id: 3, title: "3. Production Watchpoint", files: ["demo"] },
    ];
  }

  return [
    { id: 1, title: "1.Sampling", files: [] },
    {
      id: 2,
      title: "2.Master-110",
      files: ["Style 1", "Style 2", "Style 3"],
      highlight: true,
    },
    { id: 3, title: "3.Tech Graded Spec", files: ["Style 7"] },
    { id: 4, title: "4.FIT / PP / TOP / WEB Analysis", files: [] },
    { id: 5, title: "5.QA Audit Forms", files: ["Style 13", "Style 14"] },
    { id: 6, title: "6.QA Audit Analysis", files: [] },
  ];
};


const Dashboard: React.FC<{ styleName?: string; vendorName?: string }> = ({
  styleName,
  vendorName
}) => {

  const router = useRouter();

  const [folders, setFolders] = useState<FolderCard[]>([]); // empty at start
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // dynamically update folders if vendorName changes 

  useEffect(() => {
    const initial = getInitialFolders(vendorName);
    setFolders(initial);
  }, [vendorName])

  return (
    <div className="min-h-screen min-w-full flex flex-col p-6">
      {/* Header Row */}
      <div className="flex items-center justify-between px-6 pt-6 mb-6">
        <h2 className="text-xl font-bold text-gray-700">
          {styleName} / {vendorName}
        </h2>
        <button
          onClick={() =>
            setViewMode((prev) => (prev === "grid" ? "list" : "grid"))
          }
          className="p-2 rounded-full bg-blue-100 hover:bg-blue-500 text-blue-400 cursor-pointer hover:text-white"
          title="Toggle View"
        >
          {viewMode === "grid" ? (
            <List className="w-5 h-5" />
          ) : (
            <LayoutGrid className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Main Content */}
      <main className="p-6 flex-1">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {folders.map((folder) => (
              <div
                key={folder.id}
                className={`relative rounded-xl border shadow-sm hover:shadow-lg transition-all duration-200 p-4 h-[250px] cursor-pointer bg-white hover:border-blue-200`}
              >
                {/* Read-Only Badge */}
                {folder.disabled && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 text-xs bg-red-500 text-white px-2 py-1 rounded-md shadow-sm font-semibold">
                    <MdLockOutline className="w-4 h-4"/> Read-Only
                  </div>
                )}


                {/* Title */}
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-800 text-sm">{folder.title}</h3>
                </div>

                {/* Content */}
                <div className="flex flex-col items-center justify-center h-full -translate-y-4">
                  {folder.files.length > 0 ? (
                    <div className="grid grid-cols-2 gap-7 relative">
                      <img src="/spreadsheet_icon.png" className="w-14 h-14 object-contain" />
                      <img src="/spreadsheet_icon.png" className="w-14 h-14 object-contain" />
                      <div className="col-span-2 flex justify-center mt-[-12px]">
                        <img src="/spreadsheet_icon.png" className="w-16 h-16 object-contain" />
                      </div>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold italic text-gray-600">Empty</span>
                  )}
                </div>
              </div>

            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-xl p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-gray-700 border-separate border-spacing-y-2 border-spacing-x-2">
                <thead className="bg-purple-100 text-purple-800 uppercase text-xs font-semibold">
                  <tr>
                    <th className="px-6 py-3 text-left">Folder Title</th>
                    <th className="px-6 py-3 text-left">Files</th>
                  </tr>
                </thead>
                <tbody>
                  {folders.map((folder, idx) => (
                    <tr
                      key={folder.id}
                      className={`transition ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-purple-50`}
                    >
                      <td className="px-6 py-3 font-medium text-gray-800 rounded-l-lg">
                        {folder.title}
                      </td>
                      <td
                        className={`px-6 py-3 rounded-r-lg ${folder.files.length === 0
                          ? "text-red-600 italic font-medium"
                          : "text-gray-700"
                          }`}
                      >
                        {folder.files.length > 0
                          ? folder.files.join(", ")
                          : "Empty"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
