import { Button } from "./button";
import { DialogDescription, DialogFooter, DialogHeader } from "./dialog";

interface ConfirmDeleteProps {
  onClick: () => void;
  handleCancel: () => void;
}

const ConfirmDelete = ({ onClick, handleCancel }: ConfirmDeleteProps) => {
  return (
    <div className="space-y-4">
      <DialogHeader className="font-semibold text-lg">
        Delete Cabin
      </DialogHeader>
      <DialogDescription className="text-gray-600">
        Are you sure you want to delete this permanently? This action cannot be
        undone{" "}
      </DialogDescription>
      <DialogFooter className="flex flex-row-reverse gap-2 items-center">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={onClick}>
          Delete
        </Button>
      </DialogFooter>
    </div>
  );
};

export default ConfirmDelete;
