<template>
  <div class="profile-picture-upload">
    <div class="profile-picture-wrapper" @click="openFileInput">
      <NuxtImg
        v-if="profileImage && typeof profileImage === 'string'"
        :src="profileImage"
        @error="profileImage = ''"
        alt="Profile Picture"
        class="profile-picture"
      />

      <div v-else class="default-picture">
        <AvatarProfilePicture class="default-icon" />
      </div>

      <input 
        type="file" 
        ref="fileInput" 
        @change="onFileChange" 
        accept="image/*"
        hidden 
      />
    </div>
    <div class="upload-text">{{ $t('profile.uploadImage') }}</div>
    <div class="upload-hint">{{ $t('profile.uploadHint') }}</div>

    <!-- Error message for invalid file types -->
    <div v-if="fileError" class="file-error">
      {{ fileError }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from "vue";
import { useUserStore } from "@/stores/module/user";
const emit = defineEmits(["update-image", "file-selected"]);
const profileImage = ref<string>("");
const userStore = useUserStore();
onMounted(() => {
  profileImage.value = userStore.profile?.picture?.lg ;
});
const fileInput = ref<HTMLInputElement | null>(null);
const fileError = ref<string>("");

// Allowed file types
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg+xml'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const openFileInput = () => {
  fileError.value = "";
  fileInput.value?.click();
};

const validateFile = (file: File): boolean => {
  // Check file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    fileError.value = "Invalid file type. Please select an image file.";
    return false;
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    fileError.value = "File too large. Maximum size is 5MB.";
    return false;
  }

  return true;
};

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  
  if (files && files.length > 0) {
    const file = files[0];
    
    if (!file) return;
    
    // Validate file type and size
    if (!validateFile(file)) {
      // Clear the input to allow selecting the same file again
      target.value = '';
      return;
    }

    // Clear any previous errors
    fileError.value = "";
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target && e.target.result) {
        profileImage.value = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
    
    // Emit the file for parent component
    emit("file-selected", file);
    emit("update-image", file);
  }
};
</script>

<style scoped>
.profile-picture-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.profile-picture-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #f7f5f2;
  border: 2px solid #ccc;
  cursor: pointer;
  margin-bottom: 1rem;
}

.profile-picture {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.default-picture {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #f7f5f2;
}

.default-icon {
  color: #ccc;
}

.upload-text {
  margin-bottom: 0.5rem;
  color: #555;
}

.upload-hint {
  color: #aaa;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}

.file-error {
  color: #dc2626;
  font-size: 0.875rem;
  text-align: center;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 4px;
  max-width: 300px;
}
</style>
