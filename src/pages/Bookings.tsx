import BookingTable from "@/components/bookings/BookingTable";
import Filter from "@/components/Filter";

function Bookings() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">All Bookings</h1>
        <Filter
          field="status"
          options={[
            { value: "all", label: "All" },
            { value: "checked-out", label: "Checked out" },
            { value: "checked-in", label: "Checked in" },
            { value: "unconfirmed", label: "Unconfirmed" },
          ]}
        />
      </div>
      <BookingTable />
    </>
  );
}

export default Bookings;
