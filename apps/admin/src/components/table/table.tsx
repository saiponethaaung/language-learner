import { Table, Text } from "@mantine/core";
import Link from "next/link";

// interface ThProps {
//   children: React.ReactNode;
//   reversed: boolean;
//   sorted: boolean;
//   onSort: () => void;
// }

// function Th({ children, reversed, sorted, onSort }: ThProps) {
//   const Icon = sorted
//     ? reversed
//       ? IconChevronUp
//       : IconChevronDown
//     : IconSelector;
//   return (
//     <Table.Th className={classes.th}>
//       <UnstyledButton onClick={onSort} className={classes.control}>
//         <Group justify="space-between">
//           <Text fw={500} fz="sm">
//             {children}
//           </Text>
//           <Center className={classes.icon}>
//             <Icon size={16} stroke={1.5} />
//           </Center>
//         </Group>
//       </UnstyledButton>
//     </Table.Th>
//   );
// }

interface TableField {
  selector: string;
  name: string;
  type: "text" | "number" | "date" | "boolean" | "id" | "link";
  path?: string;
  replaceKey?: string;
}

interface Props<T> {
  columns: TableField[];
  data: T[];
  loading: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderColumn = (id: string, value: any, column: TableField) => {
  switch (column.type) {
    case "link":
      return (
        <Link href={`${column.path?.replace(`${column?.replaceKey}`, id)}`}>
          {value}
        </Link>
      );
      break;
  }
  return value;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTable<T extends { id: number; [key: string]: any }>({
  columns,
  data,
  loading,
}: Props<T>) {
  return (
    <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
      <Table.Tbody>
        <Table.Tr>
          {columns.map((column) => (
            <Table.Th key={column.name}>{column.name}</Table.Th>
          ))}
        </Table.Tr>
      </Table.Tbody>
      <Table.Tbody>
        {data.length > 0 ? (
          data.map((item) => (
            <Table.Tr key={item.id}>
              {columns.map((column, index) => {
                const cellValue = item[column.selector];
                return (
                  <Table.Td key={index}>
                    {renderColumn(item.id, cellValue, column)}
                  </Table.Td>
                );
              })}
            </Table.Tr>
          ))
        ) : (
          <Table.Tr>
            <Table.Td colSpan={data.length}>
              <Text fw={500} ta="center">
                {loading ? "Loading..." : "Nothing found"}
              </Text>
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Tbody>
    </Table>
  );
}

export default CustomTable;
