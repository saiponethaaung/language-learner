import { router } from "expo-router";
import { Text, View } from "react-native";
import { useEffect } from "react";
import { UserServicePromiseClient } from "@/utils/grpc/gen/user_grpc_web_pb";
import { getKey } from "@/utils/store/secure-store";
import { Client, UserMeta } from "@/utils/grpc/common";
import { EmptyRequest } from "@/utils/grpc/gen/common_pb";

export default function Index() {
  const authCheck = async () => {
    const token = await getKey("token");

    if (token) {
      const client = await Client<UserServicePromiseClient>(
        UserServicePromiseClient
      );

      try {
        const meta = await UserMeta();
        const request = new EmptyRequest();

        const profile = await client.profile(request, meta);
        const response = profile.toObject();

        if (response.id !== 0) {
          router.replace("/protected/home");
        } else {
          router.replace("/auth");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      router.replace("/auth");
    }
  };

  useEffect(() => {
    authCheck();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Authenticating...</Text>
    </View>
  );
}
