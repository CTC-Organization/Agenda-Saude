import { Stack } from "expo-router/stack";
import { useWindowDimensions } from "react-native";

export default function Layout() {
  const { width } = useWindowDimensions();

  return (
    <>
      <Stack>
        <Stack.Screen
          name="AppointmentsScreen"
          options={{
            title: "Marcações",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: width > 390 ? 20 : 16,
            },
          }}
        />
        <Stack.Screen
          name="DetailsScreen"
          options={{
            title: "Detalhes da Consulta",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: width > 390 ? 20 : 16,
            },
          }}
        />
      </Stack>
    </>
  );
}
