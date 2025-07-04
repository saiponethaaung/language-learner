"use client";
import {
  Anchor,
  Breadcrumbs,
  Container,
  Pagination,
  Space,
  Text,
} from "@mantine/core";
import classes from "./pagination.module.scss";
import React from "react";
import { BreadCrumbItems } from "@app/utils/types/breadcrumb";

interface IProps extends React.PropsWithChildren {
  header: React.ReactNode;
  total: number;
  paginate: (page: number) => void;
  breadcrumbs?: BreadCrumbItems[];
}

function PaginationLayout({
  children,
  header,
  total,
  paginate,
  breadcrumbs,
}: IProps) {
  return (
    <Container fluid={true} w="100%" p={15}>
      <div className={classes.paginateContentCon}>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs className={classes.breadcrumb}>
            {breadcrumbs.map((item, index) => {
              if (item.href !== "#") {
                return (
                  <Anchor href={item.href} key={index}>
                    {item.title}
                  </Anchor>
                );
              }

              return <Text key={index}>{item.title}</Text>;
            })}
          </Breadcrumbs>
        )}
        {header}
        <Space h="md" />
        <div className={classes.paginateContent}>{children}</div>
      </div>
      <Pagination total={total} onChange={paginate}></Pagination>
    </Container>
  );
}

export default PaginationLayout;
