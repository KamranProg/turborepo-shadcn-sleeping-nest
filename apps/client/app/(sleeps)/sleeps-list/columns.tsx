"use client";

import { ColumnDef } from "@repo/ui/components/ui/data-table";
import { TableCell } from "@repo/ui/components/ui/table";
import { Sleep } from "../../../types";

import { dateTimeFormat } from "../../../utils/dateTimeHelpers";
import UserAvatar from "../../../shard-components/UserAvatar";
import DataTableRowActions from "../../../shard-components/DataTableRowActions";

interface Props {
  onView: (item: Sleep) => void;
  onEdit: (item: Sleep) => void;
  onDelete: (item: Sleep) => void;
}
// Sleep type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const getColumns = (props: Props): ColumnDef<Sleep>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name: string = row.getValue("name");

      return (
        <div className="flex flex-col gap-1">
          <UserAvatar fallbackText={`${name?.charAt(0)}`} />
          <h6>{name}</h6>
        </div>
      );
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "sleepDuration",
    header: "Duration",
  },
  {
    accessorKey: "createdAt",
    header: "created At",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt");
      return createdAt ? (
        <TableCell>{dateTimeFormat(createdAt?.toString())}</TableCell>
      ) : null;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <DataTableRowActions row={row} {...props} />,
    size: 50,
  },
];
