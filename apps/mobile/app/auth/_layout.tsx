import { ThemedText } from "@/components/ThemedText";
import { Slot, Stack } from "expo-router";
import { View } from "react-native";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login/index" />
      <Stack.Screen name="register/index" />
    </Stack>
  );
}

// export default function AuthLayout() {
//   return <Slot />;
// }
