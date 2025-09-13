"use client";

import { useMutation } from "@apollo/client";
import { DELETE_FLIGHT } from "@/app/lib/graphql/mutations";
import { Button } from "@/app/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "react-toastify";

export default function DeleteFlightButton({ id }: { id: number | string }) {
  const [deleteFlight, { loading }] = useMutation(DELETE_FLIGHT, {
    update(cache, { data }) {
      const ok = data?.deleteFlight;
      if (!ok) return;
      const idNum = typeof id === "string" ? Number(id) : id;
      cache.evict({ id: cache.identify({ __typename: "Flight", id: idNum }) });
      cache.gc();
    },
  });

  const onConfirm = async () => {
    const idNum = typeof id === "string" ? Number(id) : id;
    try {
      const res = await deleteFlight({
        variables: { deleteFlightId: idNum },
      });
      if (res.data?.deleteFlight) {
        toast.success("Flight deleted successfully!");
      } else {
        toast.error("Delete failed");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Delete failed");
      }
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" disabled={loading}>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this flight?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The flight record will be permanently
            removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={loading}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
