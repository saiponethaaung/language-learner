"use client";

import SideNav from "@app/components/layouts/sidenav/sidenav.layout";
import { Routes } from "@app/utils/enums/routes";
import { useParams } from "next/navigation";

export default function MaterialList() {
  const { id } = useParams<{ id: string }>();

  return (
    <SideNav
      links={[
        { title: "Section", href: Routes.Sections.replace(":id", id) },
        { title: "Material", href: Routes.Materials.replace(":id", id) },
      ]}
    >
      Material list
    </SideNav>
  );
}
