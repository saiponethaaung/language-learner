"use client";
import PaginationLayout from "@app/components/layouts/pagination/pagination.layout";
import {
  Button,
  Center,
  Container,
  Group,
  Table,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconSelector,
} from "@tabler/icons-react";
import classes from "./page.module.scss";
import { useEffect, useState } from "react";
import { GetCourses } from "@app/utils/grpc/course_client";
import { formatDate } from "@app/utils/date_format";
import { useDisclosure } from "@mantine/hooks";
import { useAppDispatch, useAppSelector } from "@app/utils/store/store";
import { setCourses, setLanguages, setPagination } from "./course.slice";
import Link from "next/link";
import CreateCourseModal from "@app/components/modal/create_course/create_course_modal";
import { GetLanguagesByIds } from "@app/utils/grpc/language_client";

interface RowData {
  name: string;
  email: string;
  company: string;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort: () => void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={16} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

export default function CourseList() {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const state = useAppSelector((state) => state.course);
  const dispatch = useAppDispatch();

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
  };

  const loadData = async (page: number) => {
    setLoading(true);

    const courses = await GetCourses({
      page,
      limit: state.pagination.limit,
    });

    setLoading(false);

    if (!courses.status) {
      console.log("Failed to load courses");
      return;
    }

    if (courses.data) {
      dispatch(setCourses(courses.data.data));
      dispatch(setPagination(courses.data.pagination));
    } else {
      console.log("Failed to load courses");
    }
  };

  const loadLanguages = async () => {
    if (state.data.length === 0) {
      console.log("No courses to load languages for");
      return;
    }

    const ids: Map<number, number> = new Map();

    state.data.forEach((course) => {
      if (!ids.has(course.languageID)) {
        ids.set(course.languageID, course.languageID);
      }

      if (!ids.has(course.courseLanguageID)) {
        ids.set(course.courseLanguageID, course.courseLanguageID);
      }
    });

    const languages = await GetLanguagesByIds({
      ids: Array.from(ids.keys()),
    });

    if (!languages.status || !languages.data) {
      console.error("Failed to load languages");
      return;
    }

    dispatch(setLanguages(languages.data));
  };

  useEffect(() => {
    loadData(state.pagination.page);
  }, []);

  useEffect(() => {
    loadLanguages();
  }, [state.data]);

  return (
    <PaginationLayout
      total={state.pagination.totalPages}
      paginate={(page) => loadData(page)}
      header={
        <Container
          fluid={true}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Title order={5}>Courses</Title>
          <Button variant="default" onClick={open}>
            Add Course
          </Button>
        </Container>
      }
    >
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        layout="fixed"
      >
        <Table.Tbody>
          <Table.Tr>
            <Th
              sorted={sortBy === "name"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("name")}
            >
              Name
            </Th>
            <Th
              sorted={sortBy === "email"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("email")}
            >
              Language
            </Th>
            <Th
              sorted={sortBy === "email"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("email")}
            >
              Course Language
            </Th>
            <Th
              sorted={sortBy === "company"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("company")}
            >
              Status
            </Th>
            <Th
              sorted={sortBy === "company"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("company")}
            >
              Created At
            </Th>
            <Th
              sorted={sortBy === "company"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("company")}
            >
              Updated At
            </Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {state.data.length > 0 ? (
            state.data.map((course) => (
              <Table.Tr key={course.id}>
                <Table.Td>
                  <Link
                    href={{
                      pathname: `/courses/${course.id}/section`,
                    }}
                  >
                    {course.name}
                  </Link>
                </Table.Td>
                <Table.Td>
                  {
                    state.languages
                      .filter((lang) => lang.id === course.languageID)
                      .map((lang) => lang.name)[0]
                  }
                </Table.Td>
                <Table.Td>
                  {
                    state.languages
                      .filter((lang) => lang.id === course.courseLanguageID)
                      .map((lang) => lang.name)[0]
                  }
                </Table.Td>
                <Table.Td>{course.status ? "Active" : "Deactive"}</Table.Td>
                <Table.Td>{formatDate(course.createdAt)}</Table.Td>
                <Table.Td>{formatDate(course.updatedAt)}</Table.Td>
              </Table.Tr>
            ))
          ) : (
            <Table.Tr>
              <Table.Td colSpan={Object.keys(state.data).length}>
                <Text fw={500} ta="center">
                  {loading ? "Loading..." : "Nothing found"}
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
      <CreateCourseModal
        opened={opened}
        close={(complete: boolean) => {
          close();
          if (complete) {
            loadData(1);
          }
        }}
      />
    </PaginationLayout>
  );
}
