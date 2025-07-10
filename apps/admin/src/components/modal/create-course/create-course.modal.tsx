import { CreateCourse } from "@app/utils/grpc/course.client";
import { GetLanguages } from "@app/utils/grpc/language.client";
import { LanguageObject } from "@app/utils/grpc/type/language";
import { Button, Modal, Select, Space, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";

interface IProps {
  opened: boolean;
  close: (complete: boolean) => void;
}

export default function CreateCourseModal({ opened, close }: IProps) {
  const [loading, setLoading] = useState(false);
  const [languages, setLanguages] = useState<LanguageObject[]>([]);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      languageID: "",
      courseLanguageID: "",
    },
    validate: {
      name: (value) => {
        if (value === "") {
          return "Name is required";
        }
        return null;
      },
      courseLanguageID: (value) => {
        if (value === "") {
          return "Code language is required";
        }
        return null;
      },
      languageID: (value) => {
        if (value === "") {
          return "Language ID is required";
        }
        return null;
      },
    },
  });

  const createCourseCallback = async (data: {
    name: string;
    languageID: string;
    courseLanguageID: string;
  }) => {
    setLoading(true);

    const createCourse = await CreateCourse({
      name: data.name,
      languageID: parseInt(data.languageID),
      courseLanguageID: parseInt(data.courseLanguageID),
    });

    setLoading(false);

    if (createCourse.status) {
      form.reset();
      close(true);
      return;
    }

    alert(createCourse.error?.description ?? "Failed to create course.");
  };

  const loadLanguages = async () => {
    const languages = await GetLanguages({
      page: 1,
      limit: 1000,
    });

    if (!languages.status || !languages.data) {
      console.error("Failed to load languages");
      return;
    }

    setLanguages(languages.data.data);
  };

  useEffect(() => {
    loadLanguages();
  }, []);

  return (
    <Modal
      opened={opened}
      onClose={() => close(false)}
      title="Create course"
      centered
    >
      <form onSubmit={form.onSubmit(createCourseCallback)}>
        <TextInput
          label="Name"
          placeholder="English"
          size="sm"
          {...form.getInputProps("name")}
        />

        <Space h="sm" />

        <Select
          label="Language"
          data={languages.map((lang) => ({
            value: `${lang.id}`,
            label: lang.name,
          }))}
          placeholder="Select a language"
          {...form.getInputProps("languageID")}
        />

        <Space h="sm" />

        <Select
          label="Course Language"
          data={languages.map((lang) => ({
            value: `${lang.id}`,
            label: lang.name,
          }))}
          placeholder="Select a course language"
          {...form.getInputProps("courseLanguageID")}
        />

        <Button fullWidth mt="xl" size="sm" type="submit" disabled={loading}>
          Create
        </Button>
      </form>
    </Modal>
  );
}
