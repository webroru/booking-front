import Confirmation from '@/components/Confirmation/Confirmation.vue';
import SelectBooking from '@/components/Booking/SelectBooking.vue';
import Checkout from '@/components/Checkout/Checkout.vue';
import Registration from "@/components/Registration.vue";
import Search from '@/components/Search/Search.vue';
import Instruction from '@/components/Confirmation/Instruction.vue';
import Tax from '@/components/Tax.vue';
import Payment from '@/components/Payment/Payment.vue';
import Rules from '@/components/Rules.vue';
import CheckInDetails from '@/components/CheckInDetails.vue';
import BookingInfo from '@/components/BookingInfo.vue';
import CheckOutDetails from '@/components/Checkout/CheckOutDetails.vue';

const routes = [
  { path: '/', component: SelectBooking },
  { path: '/registration', component: Registration },
  {
    path: '/confirmation',
    component: Confirmation,
    children: [
      { path: 'search', component: Search },
      { path: ':orderId/instruction', component: Instruction },
      { path: ':orderId/rules', component: Rules },
      { path: ':orderId/tax', component: Tax },
      { path: ':orderId/payment', component: Payment },
      { path: ':orderId/checkin-details', component: CheckInDetails },
      { path: ':orderId/booking-info', component: BookingInfo },
    ],
  },
  {
    path: '/checkout',
    component: Checkout,
    children: [
      { path: 'search', component: Search },
      { path: ':orderId/details', component: CheckOutDetails },
    ],
   },
];

export default routes;
