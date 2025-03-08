import FormTextInput from "@/components/form-text-input/form-text-input";
import { Client } from "@/utils/grpc/common";
import { UserServicePromiseClient } from "@/utils/grpc/gen/user_grpc_web_pb";
import { LoginRequest } from "@/utils/grpc/gen/user_pb";
import { saveKey } from "@/utils/store/secure-store";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, StyleSheet, Text, View } from "react-native";

interface LoginObject {
  email: string;
  password: string;
}

export default function Index() {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginObject>({
    defaultValues: {
      email: "test@test.com",
      password: "admin123",
    },
  });

  const login = async (data: LoginObject) => {
    setLoading(true);

    const client = await Client<UserServicePromiseClient>(
      UserServicePromiseClient
    );
    const loginRequest = new LoginRequest();
    loginRequest.setEmail(data.email);
    loginRequest.setPassword(data.password);

    try {
      // Create a promise-based wrapper
      const loginUserPromise = await client.login(loginRequest, {});
      const response = loginUserPromise.toObject();

      if (response.error) {
        console.error(response.error);
        throw new Error(JSON.stringify(response.error));
      }

      await saveKey("token", `${response.accesstoken}`);
      router.replace("/");
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <FormTextInput
        name="email"
        control={control}
        placeholder="Email"
        keyboardType="email-address"
      />
      <FormTextInput
        name="password"
        control={control}
        placeholder="Password"
        style={styles.textInput}
        secureTextEntry={true}
      />
      <Button onPress={handleSubmit(login)} title="Login" disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 15,
    backgroundColor: "white",
  },
  textInput: {
    // backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
  },
});
