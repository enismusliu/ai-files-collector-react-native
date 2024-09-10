import { useState } from "react";
import { FlatList, ViewToken } from "react-native";
import { Models } from "react-native-appwrite";
import { TrendingItem } from "../molecules/TrendingItem";

const Trending = ({ posts }: { posts: Models.Document[] }) => {
  /**
   * @states
   */
  const [activeItem, setActiveItem] = useState<Models.Document>(posts[0]);

  /**
   * @handlers
   */
  const viewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length > 0) {
      const firstViewableItem = viewableItems[0].item as Models.Document;
      setActiveItem(firstViewableItem);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
    />
  );
};

export default Trending;
