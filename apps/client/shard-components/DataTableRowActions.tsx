import React from "react";

import { Button } from "@repo/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { Row } from "@repo/ui/components/ui/data-table";
import {
  MoreHorizontal,
  PencilIcon,
  TrashIcon,
  ViewIcon,
} from "@repo/ui/components/ui/icons";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onView?: (value: TData) => void;
  onEdit?: (value: TData) => void;
  onDelete?: (value: TData) => void;
}

const DataTableRowActions = <TData,>({
  row,
  onView,
  onEdit,
  onDelete,
}: DataTableRowActionsProps<TData>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {onView && (
          <DropdownMenuItem
            onClick={() => onView(row.original)}
            className="flex items-center gap-1"
          >
            <ViewIcon />
            <span>View</span>
          </DropdownMenuItem>
        )}

        {onEdit && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onEdit(row.original)}
              className="flex items-center gap-1"
            >
              <PencilIcon /> <span>Edit</span>
            </DropdownMenuItem>
          </>
        )}

        {onDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(row.original)}
              className="flex items-center gap-1"
            >
              <TrashIcon /> <span>Delete</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataTableRowActions;
