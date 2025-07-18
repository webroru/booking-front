import type { RouteRecordRaw } from 'vue-router';
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
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import Confirmation from '@/views/Confirmation/Confirmation.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', name: 'Home', component: Home },
      { path: 'registration', name: 'Registration', component: Registration },
      {
        path: 'confirmation',
        component: Confirmation,
        children: [
          { path: 'search', name: 'ConfirmationSearch', component: Search },
          { path: ':orderId(\\d+)/instruction', name: 'Instruction', component: Instruction },
          { path: ':orderId(\\d+)/rules', name: 'Rules', component: Rules },
          { path: ':orderId(\\d+)/documents', name: 'Documents', component: Documents },
          { path: ':orderId(\\d+)/payment', name: 'Payment', component: Payment },
          { path: ':orderId(\\d+)/booking-info', name: 'BookingInfo', component: BookingInfo },
        ],
      },
      {
        path: 'checkout',
        component: Checkout,
        children: [
          { path: 'search', name: 'CheckoutSearch', component: Search },
          { path: ':orderId(\\d+)/details', name: 'CheckOutDetails', component: CheckOutDetails },
        ],
      },
    ],
  },
];

export default routes;
