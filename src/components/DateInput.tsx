import DateTimePicker from "@react-native-community/datetimepicker";
import { clsx } from "clsx";
import { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

interface DateInputProps {
  name: string;
  control: Control<any>;
  editable: boolean;
  placeholder: string;
}

function DateInput({ name, control, editable, placeholder }: DateInputProps) {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View className="flex-1 flex-row items-center justify-between">
          <Pressable onPress={() => setShow(true)} disabled={!editable}>
            <Text
              className={clsx(
                "text-base font-normal",
                value ? "text-black" : "text-gray-74"
              )}
            >
              {value
                ? new Date(value).toLocaleDateString("pt-BR")
                : placeholder}
            </Text>
          </Pressable>
          {show && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event: any, selectedDate?: Date) => {
                setShow(false);
                const currentDate = selectedDate || date;
                setDate(currentDate);
                onChange(new Date(currentDate).toISOString());
              }}
            />
          )}
          {error && (
            <Text className="text-red-600 text-xs">{error.message}</Text>
          )}
        </View>
      )}
    />
  );
}

export { DateInput };
