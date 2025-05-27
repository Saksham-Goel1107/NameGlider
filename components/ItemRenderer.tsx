import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { SlideInRight, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { ListItem } from "../types";

interface ItemProps {
  item: ListItem;
  disableAnimations?: boolean;
  isScrolling?: boolean;
}

const ItemRenderer: React.FC<ItemProps> = ({ item, disableAnimations = false, isScrolling = false }) => {
  const date = new Date(item.timestamp).toLocaleDateString();
  
  if (disableAnimations || isScrolling) {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.details}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
    );
  }

  return (
    <Animated.View 
      style={styles.container}
      entering={SlideInRight.duration(150)}
    >
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.details}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  category: {
    fontSize: 14,
    color: "#2196F3",
  },
  date: {
    fontSize: 14,
    color: "#757575",
  },
});

export default ItemRenderer;
