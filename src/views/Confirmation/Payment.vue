<script setup>
  import { ref, onBeforeMount } from 'vue';
  import { ElMessageBox } from 'element-plus';
  import { useI18n } from 'vue-i18n';
  import QrcodeVue from 'qrcode.vue';
  import { loadStripe } from '@stripe/stripe-js';
  import { StripeElements, StripeElement } from 'vue-stripe-js';
  import { useBookingStore } from '@/stores/booking';
  import PayByCash from '@/components/Payment/PayByCash.vue';
  import Disagree from '@/components/Payment/Disagree.vue';
  import config from '@/config';

  const bookingStore = useBookingStore();
  const { bookings, updateBooking } = bookingStore;
  const { t } = useI18n();

  const instanceOptions = ref({
    // https://stripe.com/docs/js/initializing#init_stripe_js-options
  });
  const elementsOptions = ref({
    // https://stripe.com/docs/js/elements_object/create#stripe_elements-options
  });
  const cardOptions = ref({
    // https://stripe.com/docs/stripe.js#element-options

  });
  const stripeLoaded = ref(false);
  const card = ref();
  const elms = ref();
  const errorText = ref();
  const isButtonDissabled = ref(true);
  const loading = ref(false);
  const paymentUrl = window.location.href;

  const pay = async () => {
    isButtonDissabled.value = true;
    const cardElement = card.value.stripeElement;

    const purchase = {
      bookings: bookings.map(booking => booking.orderId),
    };

    const url = `${config.apiUrl}/api/payment`;
    const { token } = await fetchData(url, purchase);
    const result = await elms.value.instance.confirmCardPayment(
      token,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${bookings[0].firstName} ${bookings[0].lastName}`,
          },
        },
      }
    );

    if (result.error) {
      errorText.value = result.error.message;
      showError();
    } else {
      bookings.forEach(booking => {
        booking.paymentStatus = 'paid';
        booking.checkIn = true;
        booking.debt = 0;
        updateBooking(booking);
      });
      showSuccess();
    }
    isButtonDissabled.value = false;
  };

  const showError = () => {
    ElMessageBox.alert(t('common.error'), 'Error', {
      confirmButtonText: 'OK',
    });
  };

  const showSuccess = () => {
    ElMessageBox.alert(t('payment.success'), 'Success', {
      confirmButtonText: 'OK',
    });
  };

  const fetchData = async (url, data) => {
    loading.value = true;
    let json = [];

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(data),
      });
      json = await response.json();
    } catch (err) {
      showError();
    }

    loading.value = false;
    return json;
  };

  const handleChange = (event) => {
    isButtonDissabled.value = event.empty || event.error;
    errorText.value = event.error ? event.error.message : '';
  };

  const getDebt = () => bookings.reduce((debt, booking) => (Number.parseFloat(debt) + Number.parseFloat(booking.debt)).toFixed(2), '0');

  const getDebtItems = (booking) => booking.invoiceItems.filter(item => item.type === 'charge');
  const getPaymentItems = (booking) => booking.invoiceItems.filter(item => item.type === 'payment');

  const getTotal = (booking) => booking.invoiceItems
    .reduce((total, item) => item.type === 'charge' ? total + item.lineTotal : total, 0)
    .toFixed(2);

  onBeforeMount(() => {
    const stripePromise = loadStripe(config.stripePublicKey);
    stripePromise.then(() => {
      stripeLoaded.value = true;
    });
  });
</script>

<template>
  <div v-for="booking in bookings" :key="booking.orderId">
    <strong>{{ $t('payment.details', { orderId: booking.orderId }) }}</strong>
    <p><strong>{{ $t('payment.charges') }}:</strong></p>
    <ul>
      <li v-for="invoice in getDebtItems(booking)" :key="invoice.id">
        {{ invoice.description }}: {{ invoice.amount }} € &times; {{ invoice.qty }} = <strong>{{ invoice.lineTotal }} €</strong>
      </li>
    </ul>
    <p>{{ $t('payment.total') }}: <strong>{{ getTotal(booking) }}  €</strong></p>
    <p v-if="getPaymentItems(booking).length"><strong>{{ $t('payment.payments') }}:</strong></p>
    <ul v-if="getPaymentItems(booking).length">
      <li v-for="invoice in getPaymentItems(booking)" :key="invoice.id">
        {{ invoice.description }}: <strong>{{ invoice.lineTotal }} €</strong>
      </li>
    </ul>

  </div>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="16" :md="8">
      <p><strong>{{ $t('payment.debt', { debt: getDebt() }) }}</strong></p>
      <div class="container" v-loading="loading">
        <StripeElements v-if="stripeLoaded" v-slot="{ elements }" ref="elms" :stripe-key="config.stripePublicKey"
          :instance-options="instanceOptions" :elements-options="elementsOptions">
          <StripeElement class="stripe-element" ref="card" :elements="elements" :options="cardOptions"
            @change="handleChange" />
        </StripeElements>
        <button @click="pay" :disabled="isButtonDissabled">{{ $t('payment.pay') }}</button>
        <p class="card-error" role="alert">{{ errorText }}</p>
        <pay-by-cash :debt="getDebt()" />
        <Disagree />
      </div>
    </el-col>
    <el-col :xs="24" :sm="8" :md="8">
      <p>{{ $t('payment.qrcode') }}</p>
      <qrcode-vue :value="paymentUrl" />
    </el-col>
  </el-row>
  
</template>

<style scoped>
  .container {
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
  }

  @media only screen and (max-width: 768px) {
    .container {
      padding: 10px;
    }
  }

  .container input {
    border-radius: 6px;
    margin-bottom: 6px;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    height: 44px;
    font-size: 16px;
    width: 100%;
    background: white;
  }

  .stripe-element {
    border-radius: 4px 4px 0 0;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    height: 44px;
    width: 100%;
    background: white;
  }

  button {
    background: #5469d4;
    color: #ffffff;
    font-family: Arial, sans-serif;
    border-radius: 0 0 4px 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }

  button:hover {
    filter: contrast(115%);
  }

  button:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .card-error {
    color: rgb(105, 115, 134);
    text-align: left;
    font-size: 13px;
    line-height: 17px;
    margin-top: 12px;
  }
</style>
