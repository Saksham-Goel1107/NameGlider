export interface ListItem {
  id: string;
  name: string;
  category: string;
  timestamp: number;
}

export type GroupBy = 'category' | 'alphabetical' | 'timestamp' | 'nameLength' | 'reverseAlphabetical';
export type SortOrder = 'asc' | 'desc';