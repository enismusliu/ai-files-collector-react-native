import { FC } from "react";
import { View, Text } from "react-native";

interface Props {
  title: string | number;
  subtitle?: string;
  containerStyles?: string;
  titleStyles: string;
}
const InfoBox: FC<Props> = ({
  title,
  subtitle,
  containerStyles,
  titleStyles,
}) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold ${titleStyles}`}>
        {title}
      </Text>
      <Text className="text-sm text-center text-gray-100 font-pregular">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
