// app/dashboard/myflight/editable-cell.tsx
"use client";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_FLIGHT } from "@/app/lib/graphql/mutations";
import { Input } from "@/app/ui/input";
import { toast } from "react-toastify";

const FIELD_LABEL: Record<EditableNumberCellProps["field"], string> = {
  fuel_quantity: "Fuel quantity",
  number_of_passangers: "PAX",
  distance: "Distance",
};

type EditableNumberCellProps = {
  rowId: string | number;
  initialValue: number | null;
  field: "fuel_quantity" | "number_of_passangers" | "distance";
};

export function EditableNumberCell({
  rowId,
  initialValue,
  field,
}: EditableNumberCellProps) {
  const [value, setValue] = useState(
    initialValue == null ? "" : String(initialValue)
  );
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setValue(initialValue == null ? "" : String(initialValue));
    setDirty(false);
  }, [initialValue]);

  const [updateFlight] = useMutation(UPDATE_FLIGHT, {
    update(cache, { data }) {
      const updated = data?.updateFlight;
      if (!updated) return;
      const idNum = typeof rowId === "string" ? Number(rowId) : rowId;
      cache.modify({
        id: cache.identify({ __typename: "Flight", id: idNum }),
        fields: {
          fuel_quantity(existing) {
            return field === "fuel_quantity"
              ? (updated.fuel_quantity ?? null)
              : existing;
          },
          number_of_passangers(existing) {
            return field === "number_of_passangers"
              ? (updated.number_of_passangers ?? null)
              : existing;
          },
          distance(existing) {
            return field === "distance" ? (updated.distance ?? 0) : existing;
          },
        },
      });
    },
  });

  const commit = async () => {
    if (!dirty) return;

    const parsed = value.trim() === "" ? null : Number(value.replace(",", "."));
    if (value.trim() !== "" && Number.isNaN(parsed)) return;

    const idNum = typeof rowId === "string" ? Number(rowId) : rowId;

    try {
      await updateFlight({
        variables: {
          updateFlightId: idNum, //  <-- nom attendu par ta mutation
          input: { [field]: parsed }, //  <-- payload
        },
        optimisticResponse: {
          updateFlight: {
            __typename: "Flight",
            id: idNum,
            fuel_quantity:
              field === "fuel_quantity"
                ? (parsed as number | null)
                : initialValue,
            number_of_passangers:
              field === "number_of_passangers"
                ? (parsed as number | null)
                : null,
            distance: field === "distance" ? ((parsed ?? 0) as number) : null,
          },
        },
      });
      const label = FIELD_LABEL[field] ?? String(field);
      toast.success(`${label} updated successfully!`);
    } catch (error) {
      toast.error(
        `Update failed: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  return (
    <Input
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        setDirty(true);
      }}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === "Enter") commit();
        if (e.key === "Escape") {
          setValue(initialValue == null ? "" : String(initialValue));
          setDirty(false);
        }
      }}
      className="h-8"
      inputMode="numeric"
      placeholder="-"
    />
  );
}
