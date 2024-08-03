import { Dimensions, Image, Pressable, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const PAGE_WIDTH = Dimensions.get("window").width;

interface CarouselItem {
  id: string;
  Image: any;
  note: string;
}

interface CarouselComponentProps {
  data: CarouselItem[];
  onItemPress: (id: string) => void;
}

function CarouselComponent({ data, onItemPress }: CarouselComponentProps) {
  return (
    <View className="flex-1">
      <Carousel
        width={PAGE_WIDTH / 3}
        height={100}
        style={{ width: PAGE_WIDTH }}
        loop
        data={data}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onItemPress(item.id)}
            className="items-center justify-center p-3 rounded-2xl size-full"
          >
            <Image
              source={item.Image}
              className="rounded-full h-10 w-1/4"
              resizeMode="contain"
            />
            <Text className="text-base font-bold">{item.note}</Text>
          </Pressable>
        )}
        snapEnabled
      />
    </View>
  );
}

export { CarouselComponent };
