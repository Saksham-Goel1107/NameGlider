import { ListItem } from "../types";

const categories = [
  "Work",
  "Personal",
  "Shopping",
  "Health",
  "Education",
  "Finance",
  "Entertainment",
  "Travel",
  "Family",
  "Miscellaneous",
];

// Generate a random person name
const generateName = (index: number): string => {
  const firstNames = [
    "Saksham",
    "Aarav",
    "Vivaan",
    "Aditya",
    "Krishna",
    "Ishaan",
    "Aryan",
    "Lakshya",
    "Devansh",
    "Rohan",
    "Priya",
    "Ananya",
    "Ishita",
    "Shruti",
    "Sanya",
    "Meera",
    "Kavya",
    "Pooja",
    "Divya",
    "Sneha",
  ];

  const lastNames = [
    "Goel",
    "Brahmin",
    "Kshatriya",
    "Vaishya",
    "Shudra",
    "Agarwal",
    "Baniya",
    "Gupta",
    "Jat",
    "Rajput",
    "Yadav",
    "Thakur",
    "Kurmi",
    "Kayastha",
    "Teli",
    "Brahmbhatt",
    "Chaudhary",
    "Mishra",
    "Pandey",
    "Sharma",
    "Tripathi",
    "Tiwari",
    "Dubey",
    "Dwivedi",
    "Verma",
    "Patel",
  ];

  const firstNameIndex = index % firstNames.length;
  const lastNameIndex = Math.floor(index / 20) % lastNames.length;

  return `${firstNames[firstNameIndex]} ${lastNames[lastNameIndex]}`;
};

export const generateMockData = (count = 10000): ListItem[] => {
  const items: ListItem[] = [];
  const now = Date.now();
  const dayInMilliseconds = 24 * 60 * 60 * 1000;

  for (let i = 0; i < count; i++) {
    const daysOffset = Math.floor(Math.random() * 60) - 30; 

    const item: ListItem = {
      id: `item-${i}`,
      name: generateName(i),
      category: categories[i % categories.length],
      timestamp: now + daysOffset * dayInMilliseconds,
    };

    items.push(item);
  }

  return items;
};

export const MOCK_DATA = generateMockData();
