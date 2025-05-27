import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, { FadeIn, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface GroupHeaderProps {
  title: string;
  count: number;
}

const GroupHeader: React.FC<GroupHeaderProps> = ({ title, count }) => {
  const backgroundColor = useSharedValue('#f0f0f0');
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor.value,
    };
  });
  
  React.useEffect(() => {
    backgroundColor.value = withTiming('#e0e0ff', { duration: 300 });
    setTimeout(() => {
      backgroundColor.value = withTiming('#f0f0f0', { duration: 300 });
    }, 500);
  }, []);
  
  return (
    <Animated.View 
      style={[styles.container, animatedStyle]}
      entering={FadeIn.duration(300)}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.count}>{count} items</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  count: {
    fontSize: 12,
    color: '#666',
  },
});

export default GroupHeader;
