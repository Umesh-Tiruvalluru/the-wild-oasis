import CabinTable from "@/components/cabins/CabinTable";
import CreateCabinForm from "@/components/cabins/CreateCabinForm";
import Filter from "@/components/Filter";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import Uploader from "@/data/Uploader";
import { Plus } from "lucide-react";
import { useState } from "react";

function Cabins() {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const CABIN_FILTER_DATA = [
    {
      field: "discount",
      options: [
        { label: "All", value: "all" },
        { label: "With Discount", value: "with-discount" },
        { label: "Without Discount", value: "no-discount" },
      ],
    },
  ];

  function handleClose() {
    setOpenModal(false);
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">All Cabins</h1>
        <div className="flex items-center gap-4">
          <Filter
            field={CABIN_FILTER_DATA[0].field}
            options={CABIN_FILTER_DATA[0].options}
          />
          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
              <Button>
                <Plus strokeWidth={3} />
                Add Cabin
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <CreateCabinForm handleClose={handleClose} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="mt-12 overflow-hidden">
        <CabinTable />
      </div>

      {/* <Uploader /> */}
    </>
  );
}

export default Cabins;
