


import { getRole, getUserBookingList } from "@/actions/user";
import AdminUserBookingsTable from "@/components/AdminUserBookingsTable";
import { redirect } from "next/navigation";

export type Bookings=Awaited<ReturnType<typeof getUserBookingList>>
export type Booking=Bookings[number]
export default async function AdminUserBookings() {
  const userBookings=await getUserBookingList()
  const role=await getRole();
  if(role!=='ADMIN') redirect('/');
  return (
   <AdminUserBookingsTable bookings={userBookings} />
  );
}
