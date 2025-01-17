import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import CabinRow from "./CabinRow";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { CabinProps } from "@/types";
import { useSearchParams } from "react-router-dom";
import Loader from "../ui/Loader";

const CabinTable = () => {
  const [searchParams] = useSearchParams();

  const { data: cabins, isPending } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  console.log(cabins);

  if (isPending) {
    return <Loader />;
  }

  const filterValue = searchParams.get("discount") || "all";
  let filteredData;

  if (filterValue === "all") filteredData = cabins;

  if (filterValue === "with-discount")
    filteredData = cabins?.filter((cabin) => cabin.discount > 0);

  if (filterValue === "no-discount")
    filteredData = cabins?.filter((cabin) => cabin.discount === 0);

  console.log(filteredData);

  return (
    <Table className="overflow-x-auto border">
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead className="text-black p-4 dark:text-white font-semibold">
            Cabin
          </TableHead>
          <TableHead className="text-black p-4 dark:text-white font-semibold">
            Capacity
          </TableHead>
          <TableHead className="text-black p-4 dark:text-white font-semibold">
            Price
          </TableHead>
          <TableHead className="text-black p-4 dark:text-white font-semibold">
            Discount
          </TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredData?.map(
          ({
            id,
            name,
            description,
            maxCapacity,
            regularPrice,
            discount,
            image,
          }: CabinProps) => (
            <React.Fragment key={id}>
              <CabinRow
                id={id}
                name={name}
                description={description}
                maxCapacity={maxCapacity}
                regularPrice={regularPrice}
                image={image}
                discount={discount}
              />
            </React.Fragment>
          ),
        )}
      </TableBody>
    </Table>
  );
};

export default CabinTable;
