"use client";
import { setLinks } from "@app/components/layouts/nav/nav.slice";
import { Routes } from "@app/utils/enums/routes";
import { useAppDispatch } from "@app/utils/store/store";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function ChapterList() {
  const { id, sectionID } = useParams<{ id: string; sectionID: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setLinks([
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
      ])
    );
  });

  return (
    <>
      Unit list
      {/* Chapter list{" "}
      <Link
        href={{
          pathname: `section`,
        }}
      >
        Section
      </Link> */}
    </>
  );
}
