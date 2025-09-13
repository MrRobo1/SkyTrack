"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/app/ui/button";
import { EditableNumberCell } from "@/app/dashboard/myflight/editable-cell";

export type FlightRow = {
  id: number;
  airplane: string;
  route: string;
  fuel: number | null;
  passengers: number | null;
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
    cell: ({ row }) => (
      <EditableNumberCell
        rowId={row.original.id}
        initialValue={row.original.fuel}
        field="fuel_quantity"
      />
    ),
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
    cell: ({ row }) => (
      <EditableNumberCell
        rowId={row.original.id}
        initialValue={row.original.passengers}
        field="number_of_passangers"
      />
    ),
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
    cell: ({ row }) => (
      <EditableNumberCell
        rowId={row.original.id}
        initialValue={row.original.distance}
        field="distance"
      />
    ),
  },
];
