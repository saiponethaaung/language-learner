import { CreateLanguage } from "@app/utils/grpc/language.client";
import { Button, Modal, Space, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

interface IProps {
  opened: boolean;
  close: (complete: boolean) => void;
}

export default function CreateLanguageModal({ opened, close }: IProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      code: "",
    },
    validate: {
      name: (value) => {
        if (value === "") {
          return "Name is required";
        }
        return null;
      },
      code: (value) => {
        if (value === "") {
          return "Code is required";
        }
        return null;
      },
    },
  });

  const createLanguage = async (data: { name: string; code: string }) => {
    setLoading(true);

    const createLanguage = await CreateLanguage(data);

    setLoading(false);

    if (createLanguage.status) {
      form.reset();
      close(true);
      return;
    }

    alert(createLanguage.error?.description ?? "Failed to create language");
  };

  return (
    <Modal
      opened={opened}
      onClose={() => close(false)}
      title="Create language"
      centered
    >
      <form onSubmit={form.onSubmit(createLanguage)}>
        <TextInput
          label="Name"
          placeholder="English"
          size="sm"
          {...form.getInputProps("name")}
        />

        <Space h="sm" />

        <TextInput
          label="Code"
          placeholder="en"
          size="sm"
          {...form.getInputProps("code")}
        />

        <Button fullWidth mt="xl" size="sm" type="submit" disabled={loading}>
          Create
        </Button>
      </form>
    </Modal>
  );
}
