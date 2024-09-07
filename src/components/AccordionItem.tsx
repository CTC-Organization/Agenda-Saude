import { Button } from "@/components/Button";
import { colors } from "@/styles/colors";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

type AccordionItemProps = {
  title: string;
  date: string;
};

const AccordionItem = ({ title, date }: AccordionItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const specialty = title.split(" ")[1];

  return (
    <View className="w-[305px] my-3 ms-1">
      {/* Corpo do Accordion */}
      <Pressable
        className={`h-[47px] rounded-t-[16px] flex-row justify-between items-center ${
          expanded ? "bg-ButtonBackground" : "bg-white"
        }`}
        style={{
          elevation: 4,
          borderBottomLeftRadius: expanded ? 0 : 16,
          borderBottomRightRadius: expanded ? 0 : 16,
        }}
        onPress={() => setExpanded(!expanded)}
      >
        <View className="flex-row items-center ms-3">
          {expanded ? (
            <View className="ml-3">
              <Text className="font-regular font-normal text-white text-[13px]">
                Requisição de consulta
              </Text>
              <View className="flex-row items-center">
                <FontAwesome6 name="clock" size={14} color="white" />
                <Text className="font-regular font-normal text-white text-[10.5px] ml-1">
                  {date}
                </Text>
              </View>
            </View>
          ) : (
            <View className="flex-row items-center">
              <FontAwesome6 name="user-doctor" size={36} color="black" />
              <View className="ml-3">
                <Text className="font-regular font-normal text-black text-[13px]">
                  {title}
                </Text>
                <Text className="font-regular font-normal text-TextSecondary text-[12px]">
                  {date}
                </Text>
              </View>
            </View>
          )}
        </View>
        <Pressable onPress={() => setExpanded(!expanded)} className="mr-2">
          <FontAwesome6
            name={`chevron-${expanded ? "up" : "down"}`}
            size={20}
            color="black"
          />
        </Pressable>
      </Pressable>

      {/* Conteúdo Expandido */}
      {expanded && (
        <View
          className="w-[305px] h-[121.275px] bg-white rounded-b-[16px] p-4 mt-0"
          style={{ elevation: 4 }}
        >
          <View className="flex-row justify-between mt-1">
            <View className="flex-row items-center ms-3">
              <FontAwesome6 name="user-doctor" size={36} color="black" />
              <Text className="font-regular font-normal text-black text-[13px] ml-3">
                Médico{"\n"}
                {specialty}
              </Text>
            </View>
            <View className="items-center me-3">
              <Pressable
                onPress={() => router.push("/(appointments)/DetailsScreen")}
              >
                <Feather
                  name="info"
                  size={24}
                  color={colors.ButtonBackground}
                />
              </Pressable>
              <Text className="font-regular font-normal text-TextSecondary text-[10px] mt-1">
                Detalhes
              </Text>
            </View>
          </View>

          <View className="flex-1 flex-row justify-center gap-5 mt-3 px-10">
            <View className="w-7/12 items-center justify-center">
              <Button
                title="Aceitar"
                onPress={() => console.log("Aceitar")}
                backgroundColor={colors.ButtonBackground}
                color={colors.ButtonText}
                size={"h-10 w-40"}
                border={"rounded-2xl border border-ButtonBorder"}
              />
            </View>
            <View className="w-5/12 items-center justify-center">
              <Button
                title="Rejeitar"
                onPress={() => console.log("Rejeitar")}
                backgroundColor={colors.SecondaryButtonBackground}
                color={colors.TextSecondary}
                size={"h-10 w-24"}
                border={"rounded-2xl border border-SecondaryButtonBorder"}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default AccordionItem;
