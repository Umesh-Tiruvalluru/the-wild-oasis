import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { deletecabin } from "../../services/apiCabins";
import { CabinProps } from "../../types";
import { formatCurrency } from "../../utils/helpers";
import { TableCell, TableRow } from "../ui/table";
import EditCabinForm from "./EditCabinForm";
import { Dialog, DialogContent } from "../ui/dialog";
import ConfirmDelete from "../ui/ConfirmDelete";
import { useToast } from "@/hooks/use-toast";
import Menus from "../ui/Menus";

const CabinRow: React.FC<CabinProps> = ({
  id,
  name,
  maxCapacity,
  regularPrice,
  discount,
  description,
  image,
}) => {
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const toast = useToast();

  function handleCancel() {
    setOpenModal(false);
  }

  const { mutate } = useMutation({
    mutationFn: () => deletecabin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.toast({
        variant: "destructive",
        description: "Successfully Deleted Cabin",
      });
    },
  });

  return (
    <>
      <TableRow>
        <TableCell>
          <img className="w-24 h-16 m-3" src={image} alt={name} />
        </TableCell>
        <TableCell className="text-gray-600 text-base font-semibold">
          {name}
        </TableCell>
        <TableCell className="text-base">
          Fits up to {maxCapacity} guests
        </TableCell>
        <TableCell>{formatCurrency(regularPrice)}</TableCell>
        <TableCell>{discount ? formatCurrency(discount) : "--"}</TableCell>
        <TableCell>
          <Menus>
            <Menus.Menu>
              <Menus.Toggle id={`cabin-${id}`} />

              <Menus.List id={`cabin-${id}`}>
                <Menus.Button
                  icon={<Edit className="w-4 h-4" />}
                  onClick={() => setShowEditDialog(true)}
                >
                  Edit cabin
                </Menus.Button>

                <Menus.Button
                  icon={<Trash2 className="w-4 h-4 text-red-500" />}
                  onClick={() => setOpenModal(true)}
                >
                  Delete cabin
                </Menus.Button>
              </Menus.List>
            </Menus.Menu>
          </Menus>
        </TableCell>
      </TableRow>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-md">
          <EditCabinForm
            id={id}
            name={name}
            description={description}
            maxCapacity={maxCapacity}
            regularPrice={regularPrice}
            discount={discount}
            image={image}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <ConfirmDelete onClick={() => mutate()} handleCancel={handleCancel} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CabinRow;
