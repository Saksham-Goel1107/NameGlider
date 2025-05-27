import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Animated, { FadeIn, FadeOut, Layout, SlideInDown } from 'react-native-reanimated';
import { GroupBy, SortOrder } from '../types';

interface ListControlsProps {
  searchText: string;
  onSearchChange: (text: string) => void;
  groupBy: GroupBy;
  onGroupByChange: (groupBy: GroupBy) => void;
  sortOrder: SortOrder;
  onSortOrderChange: (sortOrder: SortOrder) => void;
}

const ListControls: React.FC<ListControlsProps> = ({
  searchText,
  onSearchChange,
  groupBy,
  onGroupByChange,
  sortOrder,
  onSortOrderChange
}) => {
  return (
    <View style={styles.container}>      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchText}
          onChangeText={onSearchChange}
        />
        {searchText.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => onSearchChange('')}
          >
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>      {/* Group By Controls */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Group By:</Text>
        <View style={styles.buttonGroup}>
          <GroupButton 
            title="Category" 
            isActive={groupBy === 'category'} 
            onPress={() => onGroupByChange('category')}
          />
          <GroupButton 
            title="Alphabetical" 
            isActive={groupBy === 'alphabetical'} 
            onPress={() => onGroupByChange('alphabetical')}
          />
          <GroupButton 
            title="Rev. Alpha" 
            isActive={groupBy === 'reverseAlphabetical'} 
            onPress={() => onGroupByChange('reverseAlphabetical')}
          />
          <GroupButton 
            title="Name Length" 
            isActive={groupBy === 'nameLength'} 
            onPress={() => onGroupByChange('nameLength')}
          />
          <GroupButton 
            title="Date" 
            isActive={groupBy === 'timestamp'} 
            onPress={() => onGroupByChange('timestamp')}
          />
        </View>
      </View>

      {/* Sort Order Controls */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sort Order:</Text>
        <View style={styles.buttonGroup}>
          <GroupButton 
            title="Ascending" 
            isActive={sortOrder === 'asc'} 
            onPress={() => onSortOrderChange('asc')}
          />
          <GroupButton 
            title="Descending" 
            isActive={sortOrder === 'desc'} 
            onPress={() => onSortOrderChange('desc')}
          />
        </View>
      </View>
    </View>
  );
};

interface GroupButtonProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
}

const GroupButton: React.FC<GroupButtonProps> = ({ title, isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isActive ? styles.activeButton : null
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          isActive ? styles.activeButtonText : null
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginHorizontal: 4,
    marginBottom: 8,
  },
  activeButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
  },  activeButtonText: {
    color: 'white',
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 14,
    color: '#999',
    fontWeight: 'bold',
  },
});

export default ListControls;
