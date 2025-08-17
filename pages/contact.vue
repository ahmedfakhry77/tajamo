<template>
  <div class="max-w-7xl mx-auto py-4">
    <!-- Hero Section -->
    <section class="text-center py-16">
      <h1 class="text-4xl font-heading font-bold text-scimaPrimary mb-6">
        Get in Touch
      </h1>
      <p class="text-xl text-secondary-600 max-w-2xl mx-auto">
        Have a question or want to work together? We'd love to hear from you.
        Send us a message and we'll respond as soon as possible.
      </p>
    </section>

    <div class="grid lg:grid-cols-2 gap-12">
      <!-- Contact Form -->
      <section class="bg-white rounded-lg shadow-sm p-8">
        <h2 class="text-2xl font-heading font-bold text-secondary-800 mb-6">
          Send us a message
        </h2>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label
                for="firstName"
                class="block text-sm font-medium text-secondary-700 mb-2"
              >
                First name
              </label>
              <input
                id="firstName"
                v-model="form.firstName"
                type="text"
                required
                class="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="First name"
              />
            </div>
            <div>
              <label
                for="lastName"
                class="block text-sm font-medium text-secondary-700 mb-2"
              >
                Last name
              </label>
              <input
                id="lastName"
                v-model="form.lastName"
                type="text"
                required
                class="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="Last name"
              />
            </div>
          </div>

          <div>
            <label
              for="email"
              class="block text-sm font-medium text-secondary-700 mb-2"
            >
              Email address
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              for="subject"
              class="block text-sm font-medium text-secondary-700 mb-2"
            >
              Subject
            </label>
            <input
              id="subject"
              v-model="form.subject"
              type="text"
              required
              class="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              placeholder="What's this about?"
            />
          </div>

          <div>
            <label
              for="message"
              class="block text-sm font-medium text-secondary-700 mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              v-model="form.message"
              rows="5"
              required
              class="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
              placeholder="Tell us more about your inquiry..."
            ></textarea>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-scimaPrimary hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            <span v-if="loading">Sending...</span>
            <span v-else>Send Message</span>
          </button>
        </form>
      </section>

      <!-- Contact Information -->
      <section class="space-y-8">
        <div class="bg-white rounded-lg shadow-sm p-8">
          <h2 class="text-2xl font-heading font-bold text-secondary-800 mb-6">
            Contact Information
          </h2>

          <div class="space-y-6">
            <div class="flex items-start space-x-4">
              <div
                class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <span class="text-scimaPrimary">📍</span>
              </div>
              <div>
                <h3 class="font-medium text-secondary-800 mb-1">Address</h3>
                <p class="text-secondary-600">
                  123 Innovation Street<br />
                  Tech City, TC 12345<br />
                  United States
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div
                class="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <span class="text-success-600">📧</span>
              </div>
              <div>
                <h3 class="font-medium text-secondary-800 mb-1">Email</h3>
                <p class="text-secondary-600">
                  <a
                    href="mailto:hello@narizdorada.com"
                    class="text-scimaPrimary hover:text-primary-500"
                  >
                    hello@narizdorada.com
                  </a>
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div
                class="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <span class="text-accent-600">📞</span>
              </div>
              <div>
                <h3 class="font-medium text-secondary-800 mb-1">Phone</h3>
                <p class="text-secondary-600">
                  <a
                    href="tel:+1-555-123-4567"
                    class="text-scimaPrimary hover:text-primary-500"
                  >
                    +1 (555) 123-4567
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-8">
          <h2 class="text-2xl font-heading font-bold text-secondary-800 mb-6">
            Business Hours
          </h2>
          <div class="space-y-2 text-secondary-600">
            <p>
              <span class="font-medium">Monday - Friday:</span> 9:00 AM - 6:00
              PM
            </p>
            <p><span class="font-medium">Saturday:</span> 10:00 AM - 4:00 PM</p>
            <p><span class="font-medium">Sunday:</span> Closed</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
});

const loading = ref(false);

const handleSubmit = async () => {
  loading.value = true;
};
</script>

<style scoped>
/* Contact page specific styles */
</style>
