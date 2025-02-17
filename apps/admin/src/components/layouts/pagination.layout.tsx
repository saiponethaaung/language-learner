"use client";
import { Container, Pagination, Space } from "@mantine/core";
import React from "react";

interface IProps extends React.PropsWithChildren {
  total: number;
  header: React.ReactNode;
}

function PaginationLayout({ children, header, total }: IProps) {
  return (
    <Container fluid={true} w="100%" p={15}>
      <div style={{ height: "calc(100vh - 122px)", overflow: "hidden" }}>
        {header}
        <Space h="md" />
        <div
          style={{
            display: "flex",
            flex: 1,
            overflow: "auto",
            height: "100%",
          }}
        >
          {children}
        </div>
      </div>
      <Pagination total={total}></Pagination>
    </Container>
  );
}

export default PaginationLayout;
