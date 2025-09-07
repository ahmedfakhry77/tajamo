import { defineStore } from "pinia";
import { useMyFetch } from "@/composables/useMyFetch";

export const useAddressesStore = defineStore("addresses", {
  state: () => ({
    addresses: [],
    loading: false,
    error: null,
  }),

  getters: {
    // Get all addresses
    getAllAddresses: (state) => state.addresses,

    // Check if loading
    isLoading: (state) => state.loading,

    // Check if there's an error
    hasError: (state) => state.error !== null,

    // Get error message
    getError: (state) => state.error,
  },

  actions: {
    // Set loading state
    setLoading(loading) {
      this.loading = loading;
    },

    // Set error
    setError(error) {
      this.error = error;
    },

    // Clear error
    clearError() {
      this.error = null;
    },

    // Load all addresses
    async loadAddresses() {
      this.setLoading(true);
      this.clearError();

      try {
        const { data, error: fetchError } = await useMyFetch("/addresses");

        if (fetchError.value) {
          throw new Error(
            fetchError.value.message || "Failed to load addresses"
          );
        }

        this.addresses = data.value?.data ?? [];
      } catch (error) {
        console.error("Failed to load addresses:", error);
        this.setError(
          error.message || "Failed to load addresses. Please try again."
        );
        throw error;
      } finally {
        this.setLoading(false);
      }
    },

    // Add new address
    async addAddress(addressData) {
      this.setLoading(true);
      this.clearError();

      try {
        const { data, error: fetchError } = await useMyFetch("/addresses", {
          method: "POST",
          body: addressData,
        });

        if (fetchError.value) {
          throw new Error(fetchError.value.message || "Failed to add address");
        }

        // Add to state
        this.addresses.push(data.value.data);

        return addressData;
      } catch (error) {
        console.error("Failed to add address:", error);
        this.setError(
          error.message || "Failed to add address. Please try again."
        );
        throw error;
      } finally {
        this.setLoading(false);
      }
    },

    // Update existing address
    async updateAddress(id, addressData) {
      this.setLoading(true);
      this.clearError();

      try {
        // Convert addressData to FormData

        const { data, error: fetchError } = await useMyFetch(
          `/addresses/${id}`,
          {
            method: "PUT",
            body: addressData,
          }
        );

        if (fetchError.value) {
          throw new Error(
            fetchError.value.message || "Failed to update address"
          );
        }

        const updatedAddress = data.value?.data;

        if (!updatedAddress) {
          throw new Error("No address data returned from server");
        }

        // Find address index
        const index = this.addresses.findIndex((addr) => addr.id === id);
        if (index === -1) {
          throw new Error("Address not found");
        }

        // If this is set as default, unset others
        if (updatedAddress.default === 1) {
          this.addresses.forEach((addr) => (addr.default = 0));
        }

        // Update address in state
        this.addresses[index] = updatedAddress;

        return updatedAddress;
      } catch (error) {
        console.error("Failed to update address:", error);
        this.setError(
          error.message || "Failed to update address. Please try again."
        );
        throw error;
      } finally {
        this.setLoading(false);
      }
    },

    // Delete address
    async deleteAddress(id) {
      this.setLoading(true);
      this.clearError();

      try {
        const { error: fetchError } = await useMyFetch(`/addresses/${id}`, {
          method: "DELETE",
        });

        if (fetchError.value) {
          throw new Error(
            fetchError.value.message || "Failed to delete address"
          );
        }

        // Remove from state
        this.addresses = this.addresses.filter((addr) => addr.id !== id);

        return true;
      } catch (error) {
        console.error("Failed to delete address:", error);
        this.setError(
          error.message || "Failed to delete address. Please try again."
        );
        throw error;
      } finally {
        this.setLoading(false);
      }
    },

    // Clear all addresses (useful for logout)
    clearAddresses() {
      this.addresses = [];
      this.error = null;
    },
  },
});
