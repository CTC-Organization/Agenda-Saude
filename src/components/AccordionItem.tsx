import { Pressable, Text, View } from "react-native";
import DoctorIcon from "@/assets/medico.svg";
import RelogioIcon from "@/assets/relogio-quadrado.svg";
import ArrowIcon from "@/assets/seta-baixo.svg";
import CirculoIcon from "@/assets/circulo-azul.svg";
import DetalhesIcon from "@/assets/detalhes.svg";
import Button3 from "@/components/Button3";
import { useState } from "react";
import { router } from "expo-router";

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
          expanded ? "bg-blue-light" : "bg-white"
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
              <Text className="text-white text-[13px] font-normal">
                Requisição de consulta
              </Text>
              <View className="flex-row items-center">
                <RelogioIcon width={14} height={14} />
                <Text className="text-white text-[10.5px] font-normal ml-1">
                  {date}
                </Text>
              </View>
            </View>
          ) : (
            <View className="flex-row items-center">
              <DoctorIcon width={36} height={36.918} />
              <View className="ml-3">
                <Text className="text-black text-[13px] font-normal">
                  {title}
                </Text>
                <Text className="text-gray-400 text-[12px] font-normal">
                  {date}
                </Text>
              </View>
            </View>
          )}
        </View>
        <Pressable onPress={() => setExpanded(!expanded)} className="mr-2">
          <ArrowIcon
            width={20}
            height={20}
            style={{ transform: [{ rotate: expanded ? "180deg" : "0deg" }] }}
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
              <DoctorIcon width={36} height={36.918} />
              <Text className="ml-3 text-black text-[13px] font-normal">
                Médico{"\n"}{specialty}
              </Text>
            </View>
            <View className="items-center me-3">
              <Pressable onPress={() => router.push("/(appointments)/DetailsScreen")}>
                <CirculoIcon width={16} height={16} fill="#4FD1D9" />
                <DetalhesIcon
                  width={2.5}
                  height={9.9}
                  style={{
                    position: "absolute",
                    left: 6.75,
                    top: 3.05,
                  }}
                />
              </Pressable>
              <Text className="text-gray-400 text-[10px] mt-1">Detalhes</Text>
            </View>
          </View>

          <View className="flex-row justify-center mt-6">
            <Button3
              title="Aceitar"
              onPress={() => {
                /* ação de aceitar */
              }}
              style={{
                width: 120,
                height: 20,
                backgroundColor: "#5CCEFA",
                borderColor: "#39C4FA",
                borderWidth: 1,
                borderRadius: 16,
              }}
              textStyle={{
                color: "#FFF",
                fontSize: 10,
                textAlign: "center",
                lineHeight: 10,
              }}
            />
            <Button3
              title="Rejeitar"
              onPress={() => {
                /* ação de rejeitar */
              }}
              style={{
                width: 60,
                height: 20,
                backgroundColor: "#F6F6F6",
                borderColor: "#E8E8E8",
                borderWidth: 1,
                borderRadius: 16,
              }}
              textStyle={{
                color: "#BDBDBD",
                fontSize: 10,
                textAlign: "center",
                lineHeight: 10,
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default AccordionItem;
