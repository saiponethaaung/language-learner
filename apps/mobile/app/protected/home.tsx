import { deleteKey } from "@/utils/store/secure-store";
import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function HomePage() {
  const logout = async () => {
    await deleteKey("token");
    setTimeout(() => {
      router.replace("/");
    }, 500);
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home page</Text>

      <Button onPress={logout} title="Logout" />
    </View>
  );
}
