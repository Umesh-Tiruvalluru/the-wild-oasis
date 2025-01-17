import { getBookings } from "@/services/apiBookings";
import { BookingsDataProps } from "@/types";
import { PAGE_SIZE } from "@/utils/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

interface BookingResponseProps {
  bookings: BookingsDataProps[];
  count: number | null;
}

const useBooking = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //Filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  //Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  console.log(filter);
  const { data, isPending, error } = useQuery<BookingResponseProps>({
    queryKey: ["bookings", filter, page],
    queryFn: () => getBookings({ filter, page }),
  });

  const bookings = data?.bookings ?? [];
  const count = data?.count ?? 0;

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, page + 1],
      queryFn: () => getBookings({ filter, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, page - 1],
      queryFn: () => getBookings({ filter, page: page - 1 }),
    });
  }

  return { isPending, error, bookings, count };
};

export default useBooking;
