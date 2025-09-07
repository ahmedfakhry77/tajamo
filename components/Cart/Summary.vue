<template>
  <div class="w-full md:w-1/3">
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">
        {{ $t("cart.summary.title") }}
      </h2>

      <div class="space-y-3 mb-6">
        <div class="flex justify-between text-sm text-gray-600">
          <span>{{ $t("cart.summary.subtotal") }}</span>
          <span>{{ cartStore.cartTotal }}l</span>
        </div>
        <div class="flex justify-between text-sm text-gray-600">
          <span>{{ $t("cart.summary.shipping") }}</span>
          <span>{{ $t("cart.summary.free") }}</span>
        </div>
        <div class="flex justify-between text-sm text-gray-600">
          <span>{{ $t("cart.summary.tax") }}</span>
          <span>{{ $t("cart.summary.calculatedAtCheckout") }}</span>
        </div>
        <div class="border-t border-gray-200 pt-3">
          <div class="flex justify-between text-lg font-semibold text-gray-900">
            <span>{{ $t("cart.summary.total") }}</span>
            <span>{{ cartStore.cartTotal }}</span>
          </div>
        </div>
      </div>

      <!-- Checkout Button -->
      <NuxtLink
        to="/checkout"
        class="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
      >
        {{ $t("cart.actions.checkout") }}
      </NuxtLink>

      <!-- Continue Shopping -->
      <NuxtLink
        to="/"
        class="block w-full text-center text-blue-600 hover:text-blue-700 font-medium py-3 mt-3 transition-colors"
      >
        {{ $t("cart.actions.continueShopping") }}
      </NuxtLink>
    </div>
  </div>
</template>
<script setup>
import { useCartStore } from "~/stores/module/cart";
const cartStore = useCartStore();
</script>
