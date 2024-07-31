import { colors } from "@/styles/colors";
import { ReactNode } from "react";
import { Control, Controller } from "react-hook-form";
import { Text, TextInput, TextInputProps, View } from "react-native";

function Input({ children }: { children: ReactNode }) {
  return (
    <View
      className="w-full h-12 flex-row items-center gap-3 p-3 border 
    border-gray-91 bg-gray-95 rounded-md"
    >
      {children}
    </View>
  );
}

interface FieldProps extends TextInputProps {
  name: string;
  control: Control<any>;
}

function Field({ name, control, ...rest }: FieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <TextInput
            className="flex-1 text-base font-normal"
            placeholderTextColor={colors.gray[74]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            {...rest}
          />
          {error && (
            <Text className="text-red-600 self-stretch text-xs">
              {error.message}
            </Text>
          )}
        </>
      )}
    />
  );
}

Input.Field = Field;
export { Input };
