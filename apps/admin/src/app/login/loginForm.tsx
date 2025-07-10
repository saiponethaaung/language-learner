"use client";
import {
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "./login.module.css";
import { useEffect, useState } from "react";
import { AdminLogin } from "@app/utils/grpc/admin.client";
import { setCookie } from "@app/utils/auth/auth";
import { useRouter } from "next/navigation";
import { useForm } from "@mantine/form";
import { Routes } from "@app/utils/enums/routes";
import { CookieKey } from "@app/utils/enums/cookies";

export default function LoginForm() {
  const router = useRouter();
  const [domLoaded, setDomLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => {
        if (!value) {
          return "Email is required";
        }
        return value.includes("@") ? null : "Invalid email";
      },
      password: (value) => {
        if (!value) {
          return "Password is required";
        }
        return value.length >= 6 ? null : "Password is too short";
      },
    },
  });

  const login = async (data: { email: string; password: string }) => {
    setLoading(true);
    const loginResponse = await AdminLogin(data);

    if (loginResponse.status) {
      await setCookie({ [CookieKey.ACCESS_TOKEN]: loginResponse.accessToken });
      router.push(Routes.Home);
    } else {
      setLoading(false);
      alert("Login failed!");
    }
  };

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  if (!domLoaded) {
    return null;
  }

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome to Language Learner
          <br />
          Admin Portal!
        </Title>
        <form onSubmit={form.onSubmit(login)}>
          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            {...form.getInputProps("password")}
          />
          <Checkbox label="Keep me logged in" mt="xl" size="md" />
          <Button fullWidth mt="xl" size="md" type="submit" disabled={loading}>
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
}
