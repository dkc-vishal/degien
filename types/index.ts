export interface IssueImage {
  id: string;
  url: string;
  file: File;
  name: string;
}

export interface Issue {
  id: string;
  description: string;
  images: IssueImage[];
  status?: string;
  priority?: string;
  createdDate?: string;
}

export interface CellHistory {
  cell_history_id: string;
  created_at: string;
  edited_by: string;
  has_shape: boolean;
  is_highlighted: boolean;
  new_value: string;
  old_value: string;
}
