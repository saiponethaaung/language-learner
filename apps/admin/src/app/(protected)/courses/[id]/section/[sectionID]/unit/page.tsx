"use client";

import PaginationLayout from "@app/components/layouts/pagination/pagination.layout";
import SideNav from "@app/components/layouts/sidenav/sidenav.layout";
import { Routes } from "@app/utils/enums/routes";
import { useAppDispatch, useAppSelector } from "@app/utils/store/store";
import { useDisclosure } from "@mantine/hooks";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { setPagination, setSectionUnits } from "./section-unit.slice";
import { GetSectionUnits } from "@app/utils/grpc/section-unit.client";
import { Button, Container, Title } from "@mantine/core";
import CustomTable from "@app/components/table/table";
import CreateSectionUnitModal from "@app/components/modal/create-section-unit/create-section-unit.modal";
import { SectionUnitObject } from "@app/utils/grpc/type/section_unit";

export default function ChapterList() {
  const { id, sectionID } = useParams<{ id: string; sectionID: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.sectionUnit);

  const loadData = async (page: number) => {
    setLoading(true);

    const sections = await GetSectionUnits({
      page,
      limit: state.pagination.limit,
    });

    setLoading(false);

    if (!sections.status) {
      console.log("Failed to load sections");
      return;
    }

    if (sections.data) {
      dispatch(setSectionUnits(sections.data.data));
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
        {
          title: "Info",
          href: Routes.Section.replace(":id", id).replace(
            ":sectionID",
            sectionID
          ),
        },
        {
          title: "Unit",
          href: Routes.Units.replace(":id", id).replace(
            ":sectionID",
            sectionID
          ),
        },
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
            <Title order={5}>Units</Title>
            <Button variant="default" onClick={open}>
              Add Unit
            </Button>
          </Container>
        }
      >
        <CustomTable<SectionUnitObject>
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
        <CreateSectionUnitModal
          sectionID={parseInt(sectionID)}
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
