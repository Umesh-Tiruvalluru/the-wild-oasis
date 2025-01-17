export type CabinProps = {
  id?: number;
  created_at?: Date;
  name: string;
  description?: string;
  maxCapacity: number;
  regularPrice: number;
  discount?: number;
  image: string;
};

export type FormData = {
  name: string;
  description: string;
  maxCapacity: number;
  regularPrice: number;
  image: FileList;
  discount: number;
};

export type EditFormData = Omit<CabinProps, "image"> & {
  image: FileList | string;
};

export type BookingsProps = {
  id: number;
  created_at?: Date;
  startDate: Date;
  endDate: Date;
  cabinName: string;
  guestName: string;
  guestEmail: string;
  status: string;
  numNights: number;
  totalPrice: number;
};

type BookingStatus = "unconfirmed" | "checked-in" | "checked-out";

export type BookingsDataProps = {
  id: number;
  cabins: { name: string }[];
  created_at?: Date;
  endDate: string;
  guests: { fullName: string; email: string }[];
  numGuests: number;
  numNights: number;
  startDate: Date;
  status: BookingStatus;
  totalPrice: number;
};

export type BookingDataProps = Omit<BookingsDataProps, "guests cabins"> & {
  guests: {
    fullName: string;
    email: string;
    country: string;
    countryFlag: string;
    nationalID: string;
  };
  cabins: { name: string };
  cabinPrice: number;
  extrasPrice: number;
  hasBreakfast: boolean;
  observations: string;
  isPaid: boolean;
};

export type TagNameStylesProps = {
  unconfirmed: string;
  "checked-in": string;
  "checked-out": string;
};

export type CheckoutButtonProps = {
  bookingId: string | number;
};
