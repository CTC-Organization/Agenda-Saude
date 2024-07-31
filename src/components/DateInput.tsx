import DateTimePicker from "@react-native-community/datetimepicker";
import { clsx } from "clsx";
import { useState } from "react";
import { useController } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

interface DateInputProps {
  control: any;
  name: string;
  editable: boolean;
  placeholder: string;
}

function DateInput({ control, name, editable, placeholder }: DateInputProps) {
  const { field } = useController({ control, name });

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const onChange = (event: any, selectedDate?: Date) => {
    setShow(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
    field.onChange(currentDate.toLocaleDateString("pt-BR"));
  };

  return (
    <View>
      <Pressable onPress={() => setShow(true)} disabled={!editable}>
        <Text
          className={clsx(
            "text-base font-normal",
            field.value ? "text-black" : "text-gray-74"
          )}
        >
          {field.value || placeholder}
        </Text>
      </Pressable>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}

export { DateInput };
