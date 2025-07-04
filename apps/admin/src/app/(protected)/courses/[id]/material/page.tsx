"use client";

import { setLinks } from "@app/components/layouts/nav/nav.slice";
import { Routes } from "@app/utils/enums/routes";
import { useAppDispatch } from "@app/utils/store/store";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function MaterialList() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setLinks([
        { title: "Section", href: Routes.Sections.replace(":id", id) },
        { title: "Maetrial", href: Routes.Materials.replace(":id", id) },
      ])
    );
  });

  return <>Material list</>;
}
