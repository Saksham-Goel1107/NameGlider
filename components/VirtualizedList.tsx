import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ListRenderItem,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  withSpring,
  useAnimatedStyle,
  FadeIn,
  FadeOut,
  Layout,
  ZoomIn,
  SlideInRight,
} from "react-native-reanimated";
import ItemRenderer from "./ItemRenderer";
import GroupHeader from "./GroupHeader";
import ListControls from "./ListControls";
import { ListItem, GroupBy, SortOrder } from "../types";
import { processData } from "../utils/dataUtils";

interface VirtualizedListProps {
  data: ListItem[];
  isLoading?: boolean;
  onRefresh?: () => void;
}

type ListDataItem =
  | ListItem
  | {
      id: string;
      title: string;
      isHeader: true;
      count: number;
    };

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const SCROLLING_DEBOUNCE_TIME = 300;


const VirtualizedList: React.FC<VirtualizedListProps> = ({
  data,
  isLoading = false,
  onRefresh,
}) => {
  const [searchText, setSearchText] = useState("");
  const [groupBy, setGroupBy] = useState<GroupBy>("category");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [showControls, setShowControls] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const listOpacity = useSharedValue(1);
  const listScale = useSharedValue(1);
  const processedData = useMemo(() => {
    if (isLoading || data.length === 0) return [];
    return processData(data, searchText, groupBy, sortOrder);
  }, [data, searchText, groupBy, sortOrder, isLoading]);
  const renderItem: ListRenderItem<ListDataItem> = useCallback(
    ({ item, index }) => {
      if (isScrolling) {
        if ("isHeader" in item && item.isHeader) {
          return <GroupHeader title={item.title} count={item.count} />;
        }
        return (
          <ItemRenderer
            item={item as ListItem}
            disableAnimations={true}
            isScrolling={true}
          />
        );
      }

      if ("isHeader" in item && item.isHeader) {
        return (
          <Animated.View entering={SlideInRight.duration(120).springify()}>
            <GroupHeader title={item.title} count={item.count} />
          </Animated.View>
        );
      }

      const shouldAnimate = index < 10;

      return (
        <Animated.View
          entering={shouldAnimate ? SlideInRight.duration(100) : undefined}
        >
          <ItemRenderer item={item as ListItem} isScrolling={false} />
        </Animated.View>
      );
    },
    [isScrolling]
  );

  const getItemLayout = useCallback(
    (data: ArrayLike<ListDataItem> | null | undefined, index: number) => {
      const item = data?.[index];
      const isHeader = item && "isHeader" in item && item.isHeader;

      const height = isHeader ? 45 : 70;
      let offset = 0;
      if (data && index > 0) {
        for (let i = 0; i < index; i++) {
          const d = data[i];
          offset += d && "isHeader" in d && d.isHeader ? 45 : 70;
        }
      }
      return { length: height, offset, index };
    },
    []
  );
  const keyExtractor = useCallback((item: ListDataItem) => {
    return "isHeader" in item && item.isHeader ? item.id : item.id;
  }, []);

  const animatedListStyle = useAnimatedStyle(() => {
    return {
      opacity: listOpacity.value,
      transform: [{ scale: listScale.value }],
    };
  }, [listOpacity, listScale]);

  const toggleControls = () => {
    setShowControls((prev) => !prev);
  };

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  const handleScroll = useCallback(() => {
    setIsScrolling(true);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, SCROLLING_DEBOUNCE_TIME);
  }, []);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerButtons}>
        <View style={styles.headerLeftSection}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={toggleControls}
          >
            <Text style={styles.actionButtonText}>
              {showControls ? "Hide Controls" : "Show Controls"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.actionButton} onPress={handleRefresh}>
          <Text style={styles.actionButtonText}>Refresh Data</Text>
        </TouchableOpacity>
      </View>
      {showControls && (
        <ListControls
          searchText={searchText}
          onSearchChange={setSearchText}
          groupBy={groupBy}
          onGroupByChange={setGroupBy}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
        />
      )}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Loading data...</Text>
        </View>
      ) : processedData.length > 0 ? (
        <View style={{ flex: 1 }}>
          <Animated.View style={[{ flex: 1 }, animatedListStyle]}>
            <FlatList
              data={processedData as any[]}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              getItemLayout={getItemLayout}
              initialNumToRender={7}
              maxToRenderPerBatch={3}
              windowSize={3}
              removeClippedSubviews={true}
              stickyHeaderIndices={processedData
                .map((item, index) =>
                  "isHeader" in item && item.isHeader ? index : null
                )
                .filter((index): index is number => index !== null)}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            />
          </Animated.View>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No items match your search</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
  headerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerLeftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  actionButtonText: {
    color: "white",
    fontWeight: "500",
  },
  listContent: {
    paddingBottom: 20,
  },
  performanceIndicator: {
    backgroundColor: "#FF9800",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 8,
  },
  performanceText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default VirtualizedList;
