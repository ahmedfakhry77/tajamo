<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="mb-8 flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">{{ t('addresses.title') }}</h1>
          <p class="mt-2 text-gray-600">
            {{ t('addresses.subtitle') }} 
          </p>
        </div>
        <button
          @click="showAddModal = true"
          class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <svg
            class="w-5 h-5 inline mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          {{ t('addresses.addAddress') }}
        </button>
      </div>

      <!-- Addresses Table -->
      <div class="bg-white shadow rounded-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-medium text-gray-900">{{ t('addresses.yourAddresses') }}</h2>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ t('addresses.table.name') }}
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ t('addresses.table.location') }}
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ t('addresses.table.address') }}
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ t('addresses.table.contact') }}
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ t('addresses.table.default') }}
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ t('addresses.table.actions') }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="address in addresses"
                :key="address.id"
                class="hover:bg-gray-50 transition-colors duration-150"
              >
                <td class="px-4 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div
                      class="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center"
                    >
                      <svg
                        class="h-4 w-4 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                    </div>
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-900">
                        {{ address.name }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-4">
                  <div class="text-sm text-gray-900">
                    <div class="font-medium">{{ address.city }}</div>
                    <div class="text-gray-500">{{ address.governorate }}</div>
                  </div>
                </td>
                <td class="px-4 py-4">
                  <div class="text-sm text-gray-900 max-w-xs">
                    <div class="truncate" :title="address.address">
                      {{ address.address }}
                    </div>
                    <div class="text-gray-500 text-xs mt-1">
                      {{ address.postal_code }}
                    </div>
                  </div>
                </td>
                <td class="px-4 py-4">
                  <div class="text-sm text-gray-900">
                    <div class="flex items-center">
                      <span class="text-sm">{{ address.phone }}</span>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-4 whitespace-nowrap">
                  <span
                    v-if="address.default === 1 || address.default === true"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    <svg
                      class="h-3 w-3 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    {{ t('addresses.status.default') }}
                  </span>
                  <span v-else class="text-gray-400 text-sm">{{ t('addresses.status.notDefault') }}</span>
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex items-center space-x-2">
                    <button
                      @click="editAddress(address)"
                      class="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                      :title="t('addresses.editAddress')"
                    >
                      <svg
                        class="h-3 w-3 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        ></path>
                      </svg>
                      {{ t('addresses.buttons.edit') }}
                    </button>
                    <button
                      @click="openDeleteModal(address.id)"
                      class="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150"
                      :title="t('addresses.deleteAddress')"
                    >
                      <svg
                        class="h-3 w-3 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                      {{ t('addresses.buttons.delete') }}
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="addresses.length === 0">
                <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                  <div class="flex flex-col items-center">
                    <svg
                      class="mx-auto h-12 w-12 text-gray-400 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                    <h3 class="text-sm font-medium text-gray-900 mb-2">
                      {{ t('addresses.noAddresses.title') }}
                    </h3>
                    <p class="text-sm text-gray-500 mb-4">
                      {{ t('addresses.noAddresses.subtitle') }}
                    </p>
                    <button
                      @click="showAddModal = true"
                      class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                    >
                      <svg
                        class="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                      </svg>
                      {{ t('addresses.noAddresses.addFirst') }}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Add/Edit Address Modal -->
    <MazDialog 
      v-model="showAddModal" 
      :title="t('addresses.addAddress')"
      :width="500"
      :height="'auto'"
    >
      <form @submit.prevent="addAddress()" class="space-y-4">
        <!-- Name -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">{{ t('addresses.form.name') }}</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :placeholder="t('addresses.form.namePlaceholder')"
          />
        </div>

        <!-- Governorate -->
        <div>
          <label for="governorate" class="block text-sm font-medium text-gray-700">{{ t('addresses.form.governorate') }}</label>
          <input
            id="governorate"
            v-model="form.governorate"
            type="text"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :placeholder="t('addresses.form.governoratePlaceholder')"
          />
        </div>

        <!-- City -->
        <div>
          <label for="city" class="block text-sm font-medium text-gray-700">{{ t('addresses.form.city') }}</label>
          <input
            id="city"
            v-model="form.city"
            type="text"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :placeholder="t('addresses.form.cityPlaceholder')"
          />
        </div>

        <!-- Address -->
        <div>
          <label for="address" class="block text-sm font-medium text-gray-700">{{ t('addresses.form.address') }}</label>
          <textarea
            id="address"
            v-model="form.address"
            rows="3"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :placeholder="t('addresses.form.addressPlaceholder')"
          ></textarea>
        </div>

        <!-- Postal Code -->
        <div>
          <label for="postal_code" class="block text-sm font-medium text-gray-700">{{ t('addresses.form.postalCode') }}</label>
          <input
            id="postal_code"
            v-model="form.postal_code"
            type="text"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :placeholder="t('addresses.form.postalCodePlaceholder')"
          />
        </div>

        <!-- Phone -->
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700">{{ t('addresses.form.phone') }}</label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :placeholder="t('addresses.form.phonePlaceholder')"
          />
        </div>

        <!-- Default Address -->
        <div class="flex items-center">
          <input
            id="default"
            :checked="form.default === 1 || form.default === true"
            @change="(event) => { form.default = event.target.checked ? 1 : 0; handleDefaultChange(); }"
            type="checkbox"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label for="default" class="ml-2 block text-sm text-gray-700">
            {{ t('addresses.form.setAsDefault') }}
          </label>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            @click="closeModal"
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            {{ t('addresses.buttons.cancel') }}
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">{{ t('addresses.buttons.adding') }}</span>
            <span v-else>{{ t('addresses.buttons.add') }}</span>
          </button>
        </div>
      </form>
    </MazDialog>

    <!-- Edit Address Modal -->
    <MazDialog 
      v-model="showEditModal" 
      :title="t('addresses.editAddress')"
      :width="500"
      :height="'auto'"
    >
      <form @submit.prevent="updateAddress()" class="space-y-4">
        <!-- Name -->
        <div>
          <label for="edit-name" class="block text-sm font-medium text-gray-700">{{ t('addresses.form.name') }}</label>
          <input
            id="edit-name"
            v-model="form.name"
            type="text"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :placeholder="t('addresses.form.namePlaceholder')"
          />
        </div>

        <!-- Governorate -->
        <div>
          <label for="edit-governorate" class="block text-sm font-medium text-gray-700">{{ t('addresses.form.governorate') }}</label>
          <input
            id="edit-governorate"
            v-model="form.governorate"
            type="text"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :placeholder="t('addresses.form.governoratePlaceholder')"
          />
        </div>

        <!-- City -->
        <div>
          <label for="edit-city" class="block text-sm font-medium text-gray-700">{{ t('addresses.form.city') }}</label>
          <input
            id="edit-city"
            v-model="form.city"
            type="text"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :placeholder="t('addresses.form.cityPlaceholder')"
          />
        </div>

        <!-- Address -->
        <div>
          <label for="edit-address" class="block text-sm font-medium text-gray-700">{{ t('addresses.form.address') }}</label>
          <textarea
            id="edit-address"
            v-model="form.address"
            rows="3"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :placeholder="t('addresses.form.addressPlaceholder')"
          ></textarea>
        </div>

        <!-- Postal Code -->
        <div>
          <label for="edit-postal_code" class="block text-sm font-medium text-gray-700">{{ t('addresses.form.postalCode') }}</label>
          <input
            id="edit-postal_code"
            v-model="form.postal_code"
            type="text"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :placeholder="t('addresses.form.postalCodePlaceholder')"
          />
        </div>

        <!-- Phone -->
        <div>
          <label for="edit-phone" class="block text-sm font-medium text-gray-700">{{ t('addresses.form.phone') }}</label>
          <input
            id="edit-phone"
            v-model="form.phone"
            type="tel"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :placeholder="t('addresses.form.phonePlaceholder')"
          />
        </div>

        <!-- Default Address -->
        <div class="flex items-center">
          <input
            id="edit-default"
            :checked="form.default === 1 || form.default === true"
            @change="(event) => { form.default = event.target.checked ? 1 : 0; handleDefaultChange(); }"
            type="checkbox"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label for="edit-default" class="ml-2 block text-sm text-gray-700">
            {{ t('addresses.form.setAsDefault') }}
          </label>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            @click="closeModal"
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            {{ t('addresses.buttons.cancel') }}
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">{{ t('addresses.buttons.updating') }}</span>
            <span v-else>{{ t('addresses.buttons.update') }}</span>
          </button>
        </div>
      </form>
    </MazDialog>

    <MazDialog v-model="isDeleteOpen" :title="t('addresses.deleteAddress')">
      <p class="text-gray-700 mb-4">{{ t('addresses.messages.deleteConfirm') }}</p>

      <div class="flex justify-end space-x-3">
        <button 
          class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" 
          @click="isDeleteOpen = false"
        > 
          {{ t('addresses.buttons.cancel') }}
        </button>
        <button 
          class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" 
          @click="deleteAddress"
        > 
          {{ t('addresses.buttons.delete') }}
        </button>
      </div>
    </MazDialog>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
  middleware: "auth",
});

// Import the addresses store
import { useAddressesStore } from "~/stores/module/addresses";
import MazDialog from "maz-ui/components/MazDialog";

// Get store instance
const addressesStore = useAddressesStore();

// Get i18n instance
const { t } = useI18n();

// Local modal state
const showAddModal = ref(false);
const showEditModal = ref(false);
const editingId = ref(null);

const form = ref({
  name: "",
  governorate: "",
  city: "",
  address: "",
  postal_code: "",
  phone: "",
  default: 0,
});

// Computed properties from store
const addresses = computed(() => addressesStore.getAllAddresses);
const loading = computed(() => addressesStore.isLoading);

// Add new address
const addAddress = async () => {
  try {
    await addressesStore.addAddress(form.value);

    $snackbar.add({
      type: "success",
      text: t('addresses.messages.addSuccess'),
    });

    closeModal();
  } catch (error) {
    $snackbar.add({
      type: "error",
      text: addressesStore.getError || t('addresses.messages.addError'),
    });
  }
};

// Edit address
const editAddress = (address) => {
  editingId.value = address.id;
  form.value = { ...address };
  showEditModal.value = true;
};

// Update address
const updateAddress = async () => {
  try {
    await addressesStore.updateAddress(editingId.value, form.value);

    $snackbar.add({
      type: "success",
      text: t('addresses.messages.updateSuccess'),
    });

    closeModal();
  } catch (error) {
    $snackbar.add({
      type: "error",
      text: addressesStore.getError || t('addresses.messages.updateError'),
    });
  }
};

// Delete address
const isDeleteOpen = ref(false);
const deleteId = ref(null);
const openDeleteModal = (id) => {
  deleteId.value = id;
  isDeleteOpen.value = true;
};

const deleteAddress = async () => {
  try {
    await addressesStore.deleteAddress(deleteId.value);

    $snackbar.add({
      type: "success",
      text: t('addresses.messages.deleteSuccess'),
    });
    isDeleteOpen.value = false;
  } catch (error) {
    $snackbar.add({
      type: "error",
      text: addressesStore.getError || t('addresses.messages.deleteError'),
    });
  } finally {
    isDeleteOpen.value = false;
  }
};

// Handle default address change
const handleDefaultChange = () => {
  // If setting as default, unset all other addresses as default
  if (form.value.default === 1 || form.value.default === true) {
    addressesStore.setAllAddressesAsNonDefault();
  }
};

// Close modal
const closeModal = () => {
  showAddModal.value = false;
  showEditModal.value = false;
  editingId.value = null;
  form.value = {
    name: "",
    governorate: "",
    city: "",
    address: "",
    postal_code: "",
    phone: "",
    default: 0,
  };
};

try {
  await addressesStore.loadAddresses();
} catch (error) {
  console.error("Failed to load addresses:", error);
}
</script>

<style scoped>
/* Address page specific styles */
</style>
