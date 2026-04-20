<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="max-w-md w-full">
      <h2 class="text-center text-2xl font-bold text-gray-800 mb-6">Sign in to Merchant Portal</h2>

      <div v-if="errorMsg" class="mb-4 text-red-600 text-center">{{ errorMsg }}</div>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div class="relative text-gray-400">
          <input
            id="email"
            name="email"
            type="email"
            v-model="email"
            :readonly="readonly || isLocked"
            autocomplete="off"
            class="w-full py-4 text-sm text-gray-900 rounded-md pl-4 border border-gray-300
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
            placeholder="Email address"
            required
          />
        </div>

        <div class="relative text-gray-400">
          <input
            id="password"
            name="password"
            type="password"
            v-model="password"
            :readonly="readonly || isLocked"
            autocomplete="new-password"
            class="w-full py-4 text-sm text-gray-900 rounded-md pl-4 border border-gray-300
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
            placeholder="Password"
            required
          />
        </div>

        <div v-if="isLocked" class="text-center text-red-500 text-sm">
          Too many failed attempts. Please wait {{ countdown }} minutes before trying again.
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-0 border-gray-300 rounded cursor-pointer"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900 cursor-pointer">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLocked"
            class="group relative w-full flex justify-center py-4 px-6 border border-transparent
              font-medium rounded-md text-white
              focus:outline-none focus:ring-2 focus:ring-offset-2
              transition"
            :class="isLocked ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMsg: "",
      readonly: true,
      isLocked: false,
      countdown: 5, // minutes left
    };
  },
  mounted() {
    setTimeout(() => {
      this.readonly = false;
    }, 100);

    // 🔹 Check if user is locked
    const lockUntil = localStorage.getItem("lockUntil");
    if (lockUntil && Date.now() < parseInt(lockUntil)) {
      this.lockUser();
    }

    if (this.$route.query.expired === "true") {
      this.errorMsg = "Your session has expired. Please log in again.";
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.email = "";
      vm.password = "";
      if (!vm.errorMsg) vm.errorMsg = "";
    });
  },
  methods: {
    async handleSubmit() {
      if (this.isLocked) return;

      try {
        this.errorMsg = "";
        const apiUrl = import.meta.env.VITE_API_URL;
        if (!apiUrl) {
          this.errorMsg = "API URL is not configured";
          return;
        }

        const response = await axios.post(`${apiUrl}/auth/login`, {
          email: this.email,
          password: this.password,
        });

        // ✅ Reset failed attempts if login is successful
        localStorage.removeItem("failedAttempts");
        localStorage.removeItem("lockUntil");

        const { access_token, role, bankcode, username, memberId } = response.data;
        const normalizedRole = (role || "").toLowerCase();

        if (!["user", "admin", "manager"].includes(normalizedRole)) {
          this.errorMsg = "Invalid role received from server";
          return;
        }

        const expiresIn = 60 * 60 * 1000;
        const expiryTime = new Date().getTime() + expiresIn;

        localStorage.setItem("token", access_token);
        localStorage.setItem("username", username);
        localStorage.setItem("role", normalizedRole);
        localStorage.setItem("bankcode", bankcode || "");
        localStorage.setItem("iin", response.data.iin || "");
        localStorage.setItem("tokenExpiry", expiryTime);
        localStorage.setItem("memberId", memberId || "");

        if (normalizedRole === "user") {
          this.$router.push({ name: "transaction" });
        } else {
          this.$router.push({ name: "dashboard" });
        }
      } catch (error) {
        this.errorMsg = error.response?.data?.message || "Login failed";
        console.error("Login error:", error);

        // 🔹 Track failed attempts
        let attempts = parseInt(localStorage.getItem("failedAttempts") || "0");
        attempts++;
        localStorage.setItem("failedAttempts", attempts);

        if (attempts >= 3) {
          const lockUntil = Date.now() + 5 * 60 * 1000; // 5 min
          localStorage.setItem("lockUntil", lockUntil);
          this.lockUser();
        }
      }
    },

    lockUser() {
      this.isLocked = true;
      const lockUntil = parseInt(localStorage.getItem("lockUntil"));
      const interval = setInterval(() => {
        const remaining = lockUntil - Date.now();
        if (remaining <= 0) {
          clearInterval(interval);
          this.isLocked = false;
          this.errorMsg = "";
          localStorage.removeItem("failedAttempts");
          localStorage.removeItem("lockUntil");
        } else {
          this.countdown = Math.ceil(remaining / 60000);
        }
      }, 1000);
    },
  },
};
</script>
