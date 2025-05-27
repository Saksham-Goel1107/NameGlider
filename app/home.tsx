import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import VirtualizedList from '../components/VirtualizedList';
import { MOCK_DATA, generateMockData } from '../utils/mockData';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(MOCK_DATA);
  const [listSize, setListSize] = useState(10000);

  const loadData = (size: number) => {
    setIsLoading(true);
    setListSize(size);

    setTimeout(() => {
      const newData = generateMockData(size);
      setData(newData);
      setIsLoading(false);
    }, 300);
  };  useEffect(() => {
    loadData(500); 
  }, []);
  
  const handleRefresh = () => {
    loadData(listSize);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sizeControlsContainer}>
        <Text style={styles.sizeTitle}>List Size:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.buttonGroup}>
            {[100, 500, 1000, 2000, 5000, 10000].map(size => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeButton,
                  listSize === size ? styles.activeSizeButton : null
                ]}
                onPress={() => loadData(size)}
              >
                <Text 
                  style={[
                    styles.sizeButtonText, 
                    listSize === size ? styles.activeSizeButtonText : null
                  ]}
                >
                  {size.toLocaleString()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <VirtualizedList 
        data={data} 
        isLoading={isLoading} 
        onRefresh={handleRefresh} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  sizeControlsContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sizeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    marginHorizontal: -4,
  },
  sizeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeSizeButton: {
    backgroundColor: '#2196F3',
  },
  sizeButtonText: {
    fontSize: 14,
  },
  activeSizeButtonText: {
    color: 'white',
  },
});

export default Home;