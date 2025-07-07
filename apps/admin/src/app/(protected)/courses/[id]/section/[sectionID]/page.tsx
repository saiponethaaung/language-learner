"use client";

import SideNav from "@app/components/layouts/sidenav/sidenav.layout";
import { Routes } from "@app/utils/enums/routes";
import { useAppDispatch } from "@app/utils/store/store";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function SessoinInfoPage() {
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
      Session info
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
