"use client";
import PaginationLayout from "@app/components/layouts/pagination/pagination.layout";
import CreateSectionModal from "@app/components/modal/create-section/create-section.modal";
import CustomTable from "@app/components/table/table";
import { GetSections } from "@app/utils/grpc/section.client";
import { useAppDispatch, useAppSelector } from "@app/utils/store/store";
import { Button, Container, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { setPagination, setSections } from "./section.slice";
import { SectionObject } from "@app/utils/grpc/type/section";
import { Routes } from "@app/utils/enums/routes";
import SideNav from "@app/components/layouts/sidenav/sidenav.layout";

export default function SectionList() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.section);

  const loadData = async (page: number) => {
    setLoading(true);

    const sections = await GetSections({
      page,
      limit: state.pagination.limit,
    });

    setLoading(false);

    if (!sections.status) {
      console.log("Failed to load sections");
      return;
    }

    if (sections.data) {
      dispatch(setSections(sections.data.data));
      dispatch(setPagination(sections.data.pagination));
    } else {
      console.log("Failed to load sections");
    }
  };

  useEffect(() => {
    loadData(state.pagination.page);
  }, []);

  return (
    <SideNav
      links={[
        { title: "Section", href: Routes.Sections.replace(":id", id) },
        { title: "Material", href: Routes.Materials.replace(":id", id) },
      ]}
    >
      <PaginationLayout
        total={0}
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
            <Title order={5}>Sections</Title>
            <Button variant="default" onClick={open}>
              Add Section
            </Button>
          </Container>
        }
      >
        <CustomTable<SectionObject>
          loading={loading}
          columns={[
            {
              name: "ID",
              selector: "id",
              type: "link",
              path: Routes.Section.replace(":id", id),
              replaceKey: ":sectionID",
            },
            {
              name: "Name",
              selector: "name",
              type: "text",
            },
          ]}
          data={state.data}
        />
        <CreateSectionModal
          courseID={parseInt(id)}
          close={(complete: boolean) => {
            close();
            if (complete) {
              loadData(state.pagination.page);
            }
          }}
          opened={opened}
        />
      </PaginationLayout>
    </SideNav>
  );
}
