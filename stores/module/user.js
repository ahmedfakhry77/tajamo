import { defineStore } from "pinia";
import { ref } from "vue";
import { useMyFetch } from "@/composables/useMyFetch"; 

export const useUserStore = defineStore("user", () => {
  const profile = ref(null);
  const loading = ref(false);
  const error = ref(null);

  // Fetch profile
  const fetchProfile = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data: dataUser, error: fetchError } = await useMyFetch("/user");
      if (fetchError.value) {
        error.value = "Failed to load profile";
      } else {
        await (profile.value = dataUser?.value?.data);
      }
    } catch (err) {
      error.value = "Unexpected error";
    } finally {
      loading.value = false;
    }
  };

  // Update profile (with image support)
  const updateProfile = async ({ name, email, image }) => {
    loading.value = true;
    error.value = null;

    try {
      const formData = new FormData();
      if (name) formData.append("name", name);
      if (email) formData.append("email", email);
      if (image) formData.append("image", image); // <-- image file

      const { data, error: fetchError } = await useMyFetch("/profile", {
        method: "POST",
        body: formData,
      });

      if (fetchError.value) {
        error.value = fetchError.value.message || "Failed to update profile";
        return false;
      } else {
        profile.value = data.value.data;
        return true;
      }
    } catch (err) {
      error.value = err.message || "Unexpected error";
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
  };
});
