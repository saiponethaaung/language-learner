import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import { Button, View } from "react-native";
import { styles } from "./index.style";

export default function AuthOptionPage() {
  return (
    <View style={styles.authScreen}>
      <View>
        <ThemedText style={styles.text}>
          Welcome to language learner!
        </ThemedText>
      </View>
      <View style={styles.authOptions}>
        <Button
          onPress={() => {
            router.push("/auth/login");
          }}
          title="Login"
        />
        <Button
          onPress={() => {
            router.push("/auth/register");
          }}
          title="Register"
        />
      </View>
    </View>
  );
}
