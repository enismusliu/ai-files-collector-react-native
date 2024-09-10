import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import * as Animatable from "react-native-animatable";
import { Image, ImageBackground, TouchableOpacity } from "react-native";

import { icons } from "../../constants";
import { Models } from "react-native-appwrite";

const zoomIn = {
  from: {
    scale: 0.9,
  },
  to: {
    scale: 1,
  },
} as Animatable.CustomAnimation<any>;

const zoomOut = {
  from: {
    scale: 1,
  },
  to: {
    scale: 0.9,
  },
} as Animatable.CustomAnimation<any>;

export const TrendingItem = ({
  activeItem,
  item,
}: {
  activeItem: Models.Document;
  item: Models.Document;
}) => {
  const [play, setPlay] = useState<boolean>(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem.$id === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative flex items-center justify-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="absolute w-12 h-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};
