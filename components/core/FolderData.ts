export const folders: FolderItem[] = [
  {
    type: "folder",
    title: "Sampling",
    files: [{ type: "file", name: "Sampling Watchpoint" }],
  },
  {
    type: "folder",
    title: "Master-110",
    files: [{ type: "file", name: "110" }],
  },
  {
    type: "folder",
    title: "Tech Graded Spec",
    files: [
      { type: "file", name: "Tech Spec View" },
      { type: "file", name: "Graded Spec" },
      { type: "file", name: "Print" },
    ],
  },
  {
    type: "folder",
    title: "Fit/PP/Top/Web",
    files: [
      {
        type: "folder",
        title: "Fit",
        files: [
          { type: "file", name: "Fit 1" },
          { type: "file", name: "Fit 2" },
          { type: "file", name: "Fit 3" },
        ],
      },
      {
        type: "folder",
        title: "PP",
        files: [
          { type: "file", name: "PP 1" },
          { type: "file", name: "PP 2" },
          { type: "file", name: "PP 3" },
        ],
      },
      {
        type: "folder",
        title: "Top",
        files: [
          { type: "file", name: "Top 1" },
          { type: "file", name: "Top 2" },
          { type: "file", name: "Top 3" },
        ],
      },
      {
        type: "folder",
        title: "Web",
        files: [
          { type: "file", name: "Web 1" },
          { type: "file", name: "Web 2" },
          { type: "file", name: "Web 3" },
          { type: "file", name: "Web 4" },
          { type: "file", name: "Web 5" },
          { type: "file", name: "Web 6" },
          { type: "file", name: "Web 7" },
          { type: "file", name: "Web 8" },
          { type: "file", name: "Web 9" },
          { type: "file", name: "Web 10" },
          { type: "file", name: "Web 11" },
          { type: "file", name: "Web 12" },
        ],
      },
    ],
  },
  {
    type: "folder",
    title: "QA Audit Forms",
    files: [
      {
        type: "folder",
        title: "Mid",
        files: [
          { type: "file", name: "Mid 1" },
          { type: "file", name: "Mid 2" },
          { type: "file", name: "Mid 3" },
        ],
      },
      {
        type: "folder",
        title: "Final",
        files: [
          { type: "file", name: "Final 1" },
          { type: "file", name: "Final 2" },
          { type: "file", name: "Final 3" },
        ],
      },
      {
        type: "folder",
        title: "Initial",
        files: [
          { type: "file", name: "Initial" },
          { type: "file", name: "Initial Follow Up" },
        ],
      },
    ],
  },
  {
    type: "folder",
    title: "QA Audit Analysis",
    files: [
      { type: "file", name: "QA Spec Audit Form" },
      { type: "file", name: "QA Inspection Point Audit Form" },
    ],
  },
];

export interface FileItem {
  type: "file";
  name: string;
}

export interface FolderItem {
  type: "folder";
  title: string;
  files: (FileItem | FolderItem)[];
}
