import { Button } from "@/components/Button";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

type AccordionItemProps = {
  requestName: string;
  status: string;
  color?: string;
};

const AccordionItem = ({ requestName, status, color = "black" }: AccordionItemProps) => {
  const [expanded, setExpanded] = useState(false);

  const getColorForStatus = (status: string) => {
    switch (status) {
      case "Aguardando":
        return "blue";
      case "Confirmada":
        return "green";
      case "Cancelada":
        return "orange";
      case "Negada":
        return "red";
      case "Finalizada":
        return "grey";
      default:
        return "black";
    }
  };

  return (
    <View className="w-full my-3">
      <Pressable
        className="p-4 bg-gray-100 rounded-lg flex-row justify-between items-center"
        onPress={() => setExpanded(!expanded)}
      >
        <View className="flex-row items-center">
          <Svg width="32" height="32" fill="none" viewBox="0 0 32 32">
            <Path
              d="M2.75 8C2.75 5.83688 4.50355 4.08333 6.66667 4.08333H20C22.1631 4.08333 23.9167 5.83688 23.9167 8V9.41667H25.3333C27.4964 9.41667 29.25 11.1702 29.25 13.3333V21.3333C29.25 23.4964 27.4964 25.25 25.3333 25.25H23.9167V29.3333C23.9167 29.8389 23.6121 30.2947 23.145 30.4882C22.6779 30.6817 22.1403 30.5747 21.7828 30.2172L16.8156 25.25H12C11.3749 25.25 10.7834 25.103 10.2588 24.8423L10.2172 24.8839C9.85972 25.2414 9.32207 25.3483 8.85498 25.1548C8.38789 24.9614 8.08333 24.5056 8.08333 24V19.9167H6.66667C4.50355 19.9167 2.75 18.1631 2.75 16V8ZM12.3511 22.75H17.3333C17.6649 22.75 17.9828 22.8817 18.2172 23.1161L21.4167 26.3156V24C21.4167 23.3096 21.9763 22.75 22.6667 22.75H25.3333C26.1157 22.75 26.75 22.1157 26.75 21.3333V13.3333C26.75 12.5509 26.1157 11.9167 25.3333 11.9167H23.9167V16C23.9167 18.1631 22.1631 19.9167 20 19.9167H15.1844L12.3511 22.75ZM21.4167 8C21.4167 7.2176 20.7824 6.58333 20 6.58333H6.66667C5.88426 6.58333 5.25 7.2176 5.25 8V16C5.25 16.7824 5.88426 17.4167 6.66667 17.4167H9.33333C10.0237 17.4167 10.5833 17.9763 10.5833 18.6667V20.9822L13.7828 17.7828C14.0172 17.5484 14.3351 17.4167 14.6667 17.4167H20C20.7824 17.4167 21.4167 16.7824 21.4167 16V8Z"
              fill="#13151A"
            />
          </Svg>
          <Text className="text-lg font-medium ml-2">{requestName}</Text>
        </View>
        <Svg
          width="32"
          height="32"
          fill="none"
          viewBox="0 0 32 32"
          style={{ transform: [{ rotate: expanded ? "270deg" : "90deg" }] }}
        >
          <Path
            d="M11.6686 23.5314C11.0437 22.9065 11.0437 21.8935 11.6686 21.2686L16.9372 16L11.6686 10.7314C11.0437 10.1065 11.0437 9.09347 11.6686 8.46863C12.2934 7.84379 13.3065 7.84379 13.9313 8.46863L20.3313 14.8686C20.9562 15.4935 20.9562 16.5065 20.3313 17.1314L13.9313 23.5314C13.3065 24.1562 12.2934 24.1562 11.6686 23.5314Z"
            fill="#13151A"
          />
        </Svg>
      </Pressable>
      {expanded && (
        <View className="p-4 bg-gray-200 rounded-lg mt-2">
          <Text className="text-base mb-2">
            <Text className="text-black">Status: </Text>
            <Text style={{ color: getColorForStatus(status) }}>{status}</Text>
          </Text>
          <Button
            title="Ver Detalhes"
            onPress={() => router.push("/DetailsScreen")}
          />
        </View>
      )}
    </View>
  );
};

export default AccordionItem;
