import { CreateSection } from "@app/utils/grpc/section.client";
import { Button, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

interface IProps {
  courseID: number;
  opened: boolean;
  close: (complete: boolean) => void;
}

export default function CreateSectionModal({
  opened,
  close,
  courseID,
}: IProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      languageID: "",
      sectionLanguageID: "",
    },
    validate: {
      name: (value) => {
        if (value === "") {
          return "Name is required";
        }
        return null;
      },
    },
  });

  const createSectionCallback = async (data: {
    name: string;
    languageID: string;
    sectionLanguageID: string;
  }) => {
    setLoading(true);

    const createSection = await CreateSection({
      name: data.name,
      courseID,
    });

    setLoading(false);

    if (createSection.status) {
      form.reset();
      close(true);
      return;
    }

    alert(createSection.error?.description ?? "Failed to create section.");
  };

  return (
    <Modal
      opened={opened}
      onClose={() => close(false)}
      title="Create section"
      centered
    >
      <form onSubmit={form.onSubmit(createSectionCallback)}>
        <TextInput
          label="Name"
          placeholder="English"
          size="sm"
          {...form.getInputProps("name")}
        />

        <Button fullWidth mt="xl" size="sm" type="submit" disabled={loading}>
          Create
        </Button>
      </form>
    </Modal>
  );
}
