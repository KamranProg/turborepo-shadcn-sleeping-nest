"use client";

import { ColumnDef } from "@repo/ui/components/ui/data-table";
import { AggregatedSleep } from "../../../types";
import UserAvatar from "../../../shard-components/UserAvatar";
import DataTableRowActions from "../../../shard-components/DataTableRowActions";

interface Props {
  onView: (item: AggregatedSleep) => void;
}
// AggregatedSleep type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const getColumns = (props: Props): ColumnDef<AggregatedSleep>[] => [
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
    accessorKey: "logs",
    header: "7 Days logs",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <DataTableRowActions row={row} {...props} />,
    size: 50,
  },
];
