<script setup>
  import { ref, onBeforeMount } from 'vue';
  import { useBookingStore } from '@/stores/booking';
  import { loadStripe } from '@stripe/stripe-js';
  import { StripeElements, StripeElement } from 'vue-stripe-js';
  import { ElMessageBox } from 'element-plus';
  import PayByCash from './PayByCash.vue';
  import config from '@/config';

  const bookingStore = useBookingStore();
  const { booking, updateBooking } = bookingStore;

  //const stripeKey = 'pk_test_51KlDhBGT2BPFfMCDGsKJRjDzrAS1poMsp8QLwL2vfpL1NOjvKIRaoJFseGQEiUECvA9JodSOhLMOE3Vwk4fWvhup00joqB3GX5'; // test key
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

  const pay = async () => {
    isButtonDissabled.value = true;
    const cardElement = card.value.stripeElement;

    const purchase = {
      bookingId: booking.orderId,
    };

    const url = `${config.apiUrl}/api/payment`;
    const { token } = await fetchData(url, purchase);
    const result = await elms.value.instance.confirmCardPayment(
      token,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${booking.firstName} ${booking.lastName}`,
          },
        },
      }
    );

    if (result.error) {
      errorText.value = result.error.message;
      showError();
    } else {
      booking.paymentStatus = 'paid';
      booking.checkIn = true;
      updateBooking(booking);
      showSuccess();
    }
    isButtonDissabled.value = false;
  };

  const showError = () => {
    ElMessageBox.alert('An error occurred please contact support', 'Error', {
      confirmButtonText: 'OK',
    });
  };

  const showSuccess = () => {
    ElMessageBox.alert('Thank you for your payment. You can go to the next step.', 'Success', {
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

  onBeforeMount(() => {
    const stripePromise = loadStripe(config.stripePublicKey);
    stripePromise.then(() => {
      stripeLoaded.value = true;
    });
  });
</script>

<template>
  <p>
    You should pay {{ booking.debt }} &euro;
  </p>
  <div class="container" v-loading="loading">
    <StripeElements
      v-if="stripeLoaded"
      v-slot="{ elements }"
      ref="elms"
      :stripe-key="config.stripePublicKey"
      :instance-options="instanceOptions"
      :elements-options="elementsOptions">
      <StripeElement
        class="stripe-element"
        ref="card"
        :elements="elements"
        :options="cardOptions"
        @change="handleChange" />
    </StripeElements>
    <button @click="pay" :disabled="isButtonDissabled">Pay</button>
    <p class="card-error" role="alert">{{errorText}}</p>
    <PayByCash />
  </div>
</template>

<style scoped>
  .container {
    width: 30vw;
      min-width: 500px;
      align-self: center;
      box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
        0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
      border-radius: 7px;
      padding: 40px;
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
