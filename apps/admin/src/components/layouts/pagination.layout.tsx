"use client";
import { Container, Pagination, Space } from "@mantine/core";
import classes from "./pagination.module.scss";
import React from "react";

interface IProps extends React.PropsWithChildren {
  header: React.ReactNode;
  total: number;
  paginate: (page: number) => void;
}

function PaginationLayout({ children, header, total, paginate }: IProps) {
  return (
    <Container fluid={true} w="100%" p={15}>
      <div className={classes.paginateContentCon}>
        {header}
        <Space h="md" />
        <div className={classes.paginateContent}>{children}</div>
      </div>
      <Pagination total={total} onChange={paginate}></Pagination>
    </Container>
  );
}

export default PaginationLayout;
