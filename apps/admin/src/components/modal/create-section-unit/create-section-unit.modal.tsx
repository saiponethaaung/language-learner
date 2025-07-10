import { CreateSectionUnit } from "@app/utils/grpc/section-unit.client";
import { Button, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

interface IProps {
  sectionID: number;
  opened: boolean;
  close: (complete: boolean) => void;
}

export default function CreateSectionUnitModal({
  opened,
  close,
  sectionID,
}: IProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
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

  const createSectionCallback = async (data: { name: string }) => {
    setLoading(true);

    const createSection = await CreateSectionUnit({
      name: data.name,
      sectionID,
    });

    setLoading(false);

    if (createSection.status) {
      form.reset();
      close(true);
      return;
    }

    alert(createSection.error?.description ?? "Failed to create unit.");
  };

  return (
    <Modal
      opened={opened}
      onClose={() => close(false)}
      title="Create unit"
      centered
    >
      <form onSubmit={form.onSubmit(createSectionCallback)}>
        <TextInput
          label="Name"
          placeholder="Unit 1"
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
