import FormTextInput from "@/components/form-text-input/form-text-input";
import { Client } from "@/utils/grpc/common";
import { UserServicePromiseClient } from "@/utils/grpc/gen/user_grpc_web_pb";
import { RegisterRequest } from "@/utils/grpc/gen/user_pb";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, StyleSheet, Text, View } from "react-native";

interface RegisterObject {
  name: string;
  email: string;
  password: string;
}

export default function Index() {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterObject>({
    defaultValues: {
      name: "test",
      email: "test@test.com",
      password: "admin123",
    },
  });

  const register = async (data: RegisterObject) => {
    setLoading(true);

    const client = await Client<UserServicePromiseClient>(
      UserServicePromiseClient
    );
    const registerRequest = new RegisterRequest();
    registerRequest.setName(data.name);
    registerRequest.setEmail(data.email);
    registerRequest.setPassword(data.password);

    try {
      // Create a promise-based wrapper
      const registerUserPromise = await client.register(registerRequest, {});
      const response = registerUserPromise.toObject();

      if (response.error) {
        console.error(response.error);
        throw new Error(JSON.stringify(response.error));
      }

      router.push("/auth/login");
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Register</Text>
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
      <Button
        onPress={handleSubmit(register)}
        title="Register"
        disabled={loading}
      />
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
