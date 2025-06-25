<script setup>
  defineProps({ booking: Object });

  const getDebtItems = (booking) => booking.invoiceItems.filter(item => item.type === 'charge' && item.description && item.amount && item.qty);
  const getPaymentItems = (booking) => booking.invoiceItems.filter(item => item.type === 'payment');

  const getTotal = (booking) => booking.invoiceItems
    .reduce((total, item) => item.type === 'charge' ? total + item.lineTotal : total, 0)
    .toFixed(2);
</script>

<template>
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
</template>
