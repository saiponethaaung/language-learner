"use client";

import SideNav from "@app/components/layouts/sidenav/sidenav.layout";
import { Routes } from "@app/utils/enums/routes";
import { useParams } from "next/navigation";

export default function ChapterList() {
  const { id, sectionID } = useParams<{ id: string; sectionID: string }>();

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
      Unit
      {/* Chapter list{" "}
        <Link
          href={{
            pathname: `section`,
          }}
        >
          Section 
        </Link> */}
    </SideNav>
  );
}
