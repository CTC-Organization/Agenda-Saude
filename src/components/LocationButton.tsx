import { Pressable, Image, Linking } from "react-native";

export function LocationButton() {
  const openMaps = () => {
    const url = "https://www.google.com/maps";
    Linking.openURL(url).catch((err: Error) =>
      console.error("Erro ao abrir o mapa", err)
    );
  };

  return (
    <Pressable
      style={{ elevation: 5 }}
      className="w-[81px] h-[33px] bg-green-newlight flex-shrink-0 rounded-tl-[50px] rounded-br-[16px] items-center justify-center"
      onPress={openMaps}
    >
      <Image
        source={require('@/assets/localizacao.png')}
        className="w-[19px] h-[19px]"
        resizeMode="cover"
      />
    </Pressable>
  );
}
