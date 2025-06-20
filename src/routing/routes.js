import Checkout from '@/views/Checkout/Checkout.vue';
import Registration from "@/views/Registration.vue";
import Search from '@/views/Confirmation/Search.vue';
import Instruction from '@/views/Confirmation/Instruction.vue';
import Documents from '@/views/Confirmation/Documents.vue';
import Payment from '@/views/Confirmation/Payment.vue';
import Rules from '@/views/Confirmation/Rules.vue';
import BookingInfo from '@/views/Confirmation/BookingInfo.vue';
import CheckOutDetails from '@/views/Checkout/CheckOutDetails.vue';
import Home from '@/views/Home.vue';
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import Confirmation from "@/views/Confirmation/Confirmation.vue";

const routes = [
  {
    path: '/', component: DefaultLayout,
    children: [
      { path: '', name: 'Home', component: Home },
      { path: '/registration', component: Registration },
      {
        path: '/confirmation',
        component: Confirmation,
        children: [
          { path: 'search', component: Search },
          { path: ':orderId/instruction', component: Instruction },
          { path: ':orderId/rules', component: Rules },
          { path: ':orderId/documents', component: Documents },
          { path: ':orderId/payment', component: Payment },
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
    ],
  },
];

export default routes;
