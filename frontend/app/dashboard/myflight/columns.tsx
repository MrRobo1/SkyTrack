"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/app/ui/button";

export type FlightRow = {
  airplane: string;
  route: string;
  fuel: number | null;
  passenger: number | null;
  distance: number;
};

export const columns: ColumnDef<FlightRow>[] = [
  {
    accessorKey: "airplane",
    header: "Aircraft type",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.airplane}</span>
    ),
  },
  {
    accessorKey: "route",
    header: "Departure -> Arrival",
  },
  {
    accessorKey: "fuel",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fuel used (kg)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (row.original.fuel ?? "-") as string | number,
  },
  {
    accessorKey: "passengers",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Passengers
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (row.original.passenger ?? "-") as string | number,
  },
  {
    accessorKey: "distance",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Distance (Nm)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
