import { defineStore } from "pinia";
import { useMyFetch } from "@/composables/useMyFetch";

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    favorites: [], // Array of product objects
    loading: false,
    error: null,
  }),

  getters: {
    favoritesCount: (state) => {
      return state.favorites.length;
    },

    getFavoriteProducts: (state) => {
      return state.favorites;
    },

    hasFavorites: (state) => {
      return state.favorites.length > 0;
    },
    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null,
  },

  actions: {
    async loadFavorites() {
      this.loading = true;
      this.error = null;

      try {
        const { data, error: fetchError } = await useMyFetch("/favorites");

        if (fetchError.value) {
          this.error = fetchError.value.message || "Failed to load favorites";
        } else {
          console.log(data.value.data);
          this.favorites = data.value.data;
        }
      } catch (error) {
        this.error = error.message || "Failed to load favorites";
        console.error("Failed to load favorites:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async toggleFavorite(product) {
      try {
        const { data, error: fetchError } = await useMyFetch(
          `/favorites/${product.id}/toggle`,
          {
            method: "GET",
          }
        );

        if (fetchError.value) {
          this.error = fetchError.value.message || "Failed to toggle favorite";
        } else {
          if (
            this.favorites.some((favorite) => favorite.id === product.id)
          ) {
            this.favorites = this.favorites.filter(
              (favorite) => favorite.id !== product.id
            );
          } else {
            this.favorites.push(product);
          }
        }
      } catch (error) {
        this.error = error.message || "Failed to toggle favorite";
        console.error("Failed to toggle favorite:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
