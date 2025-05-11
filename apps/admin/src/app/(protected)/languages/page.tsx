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
import { GetLanguages } from "@app/utils/grpc/language_client";
import { formatDate } from "@app/utils/date_format";
import { useDisclosure } from "@mantine/hooks";
import CreateLanguageModal from "@app/components/modal/create_language/create_language_modal";
import { useAppDispatch, useAppSelector } from "@app/utils/store/store";
import { setLanguages, setPagination } from "./language.slice";

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

export default function LanguageList() {
  const [opened, { open, close }] = useDisclosure(false);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const state = useAppSelector((state) => state.language);
  const dispatch = useAppDispatch();

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
  };

  const loadLangauges = async (page: number) => {
    const languages = await GetLanguages({
      page,
      limit: state.pagination.limit,
    });

    if (!languages.status) {
      console.log("Failed to load languages");
      return;
    }

    if (languages.data) {
      dispatch(setLanguages(languages.data.data));
      dispatch(setPagination(languages.data.pagination));
    } else {
      console.log("Failed to load languages");
    }
  };

  useEffect(() => {
    loadLangauges(state.pagination.page);
  }, []);

  return (
    <PaginationLayout
      total={state.pagination.totalPages}
      paginate={(page) => loadLangauges(page)}
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
          <Title order={5}>Languages</Title>
          <Button variant="default" onClick={open}>
            Add Langugae
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
              Code
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
            state.data.map((language) => (
              <Table.Tr key={language.code}>
                <Table.Td>{language.name}</Table.Td>
                <Table.Td>{language.code}</Table.Td>
                <Table.Td>Enabled</Table.Td>
                <Table.Td>{formatDate(language.createdAt)}</Table.Td>
                <Table.Td>{formatDate(language.updatedAt)}</Table.Td>
              </Table.Tr>
            ))
          ) : (
            <Table.Tr>
              <Table.Td colSpan={Object.keys(state.data).length}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
      <CreateLanguageModal
        opened={opened}
        close={(complete: boolean) => {
          close();
          if (complete) {
            loadLangauges(1);
          }
        }}
      />
    </PaginationLayout>
  );
}
