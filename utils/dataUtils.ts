import { ListItem, GroupBy, SortOrder } from '../types';

export const groupItems = (items: ListItem[], groupBy: GroupBy): { [key: string]: ListItem[] } => {
  const grouped: { [key: string]: ListItem[] } = {};
  
  items.forEach(item => {
    let key: string;
    
    switch (groupBy) {
      case 'category':
        key = item.category;
        break;
      case 'alphabetical':
        key = item.name.charAt(0).toUpperCase();
        break;
      case 'reverseAlphabetical':
        key = item.name.charAt(item.name.length - 1).toUpperCase();
        break;
      case 'nameLength':
        const length = item.name.length;
        if (length < 10) {
          key = 'Short (< 10 chars)';
        } else if (length < 15) {
          key = 'Medium (10-15 chars)';
        } else {
          key = 'Long (> 15 chars)';
        }
        break;
      case 'timestamp':
        const date = new Date(item.timestamp);
        key = date.toISOString().split('T')[0];
        break;
      default:
        key = 'Other';
    }
    
    if (!grouped[key]) {
      grouped[key] = [];
    }
    
    grouped[key].push(item);
  });
  
  return grouped;
};

export const sortGroupedItems = (
  groupedItems: { [key: string]: ListItem[] },
  sortOrder: SortOrder
): { [key: string]: ListItem[] } => {
  const sorted: { [key: string]: ListItem[] } = {};
  
  const sortedKeys = Object.keys(groupedItems).sort((a, b) => {
    return sortOrder === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
  });
  
  sortedKeys.forEach(key => {
    sorted[key] = groupedItems[key];
  });
  
  return sorted;
};

export const filterItems = (items: ListItem[], searchText: string): ListItem[] => {
  if (!searchText || searchText.trim() === '') {
    return items;
  }
  
  const search = searchText.toLowerCase();
  return items.filter(item => 
    item.name.toLowerCase().includes(search) || 
    item.category.toLowerCase().includes(search)
  );
};

export const processData = (
  items: ListItem[],
  searchText: string,
  groupBy: GroupBy,
  sortOrder: SortOrder
): any[] => {
  const filteredItems = filterItems(items, searchText);
  
  const groupedItems = groupItems(filteredItems, groupBy);
  
  const sortedGroups = sortGroupedItems(groupedItems, sortOrder);
  
  const sections: any[] = [];
  
  Object.keys(sortedGroups).forEach(key => {
    sections.push({
      id: `header-${key}`,
      title: key,
      isHeader: true,
      data: sortedGroups[key]
    });
    
    sortedGroups[key].forEach(item => {
      sections.push({
        ...item,
        isHeader: false
      });
    });
  });
  
  return sections;
};