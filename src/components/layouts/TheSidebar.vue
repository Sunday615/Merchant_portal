<template>
  <aside class="w-64 bg-gray-800">
    <div
      class="py-3 text-2xl uppercase text-center tracking-widest bg-gray-900 border-b-2 border-gray-800 mb-8"
    >
      <router-link to="/" class="text-white">LaoQR-MC</router-link>
    </div>

    <nav class="text-sm text-gray-300">
      <ul class="flex flex-col">
        <template v-for="item in accessibleRoutes" :key="item.name">
          <!-- Section headers -->
          <li
            v-if="item.isSection"
            class="px-4 py-2 text-xs uppercase tracking-wider text-gray-500 font-bold"
          >
            {{ item.name }}
          </li>
          <!-- Non-grouped routes -->
          <li v-else-if="!item.isGroup" class="px-4 cursor-pointer hover:bg-gray-700">
            <router-link
              :to="{ name: item.route }"
              class="py-2 flex items-center"
              :class="{ 'bg-gray-500 text-gray-800': $route.name === item.route }"
              @click="logNavigation(item.route)"
            >
              <svg
                class="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 3C3.89543 3 3 3.89543 3 5V7C3 8.10457 3.89543 9 5 9H7C8.10457 9 9 8.10457 9 7V5C9 3.89543 8.10457 3 7 3H5Z"
                  fill="currentColor"
                />
                <path
                  d="M5 11C3.89543 11 3 11.8954 3 13V15C3 16.1046 3.89543 17 5 17H7C8.10457 17 9 16.1046 9 15V13C9 11.8954 8.10457 11 7 11H5Z"
                  fill="currentColor"
                />
                <path
                  d="M11 5C11 3.89543 11.8954 3 13 3H15C16.1046 3 17 3.89543 17 5V7C17 8.10457 16.1046 9 15 9H13C11.8954 9 11 8.10457 11 7V5Z"
                  fill="currentColor"
                />
                <path
                  d="M11 13C11 11.8954 11.8954 11 13 11H15C16.1046 11 17 11.8954 17 13V15C17 16.1046 16.1046 17 15 17H13C11.8954 17 11 16.1046 11 15V13Z"
                  fill="currentColor"
                />
              </svg>

              {{ item.name }}
            </router-link>
          </li>
          <!-- Grouped routes (e.g., User Management) -->
          <Disclosure
            v-else
            v-slot="{ open }"
            :default-open="isRouteActive(item.subRoutes)"
          >
            <DisclosureButton
              class="px-4 py-3 flex items-center w-full hover:bg-gray-700"
              :class="open ? 'bg-gray-700' : ''"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {{ item.name }}
              <span class="ml-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  :class="open ? 'transform rotate-90' : ''"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </DisclosureButton>
            <DisclosurePanel>
              <ul>
                <li
                  v-for="subItem in item.subRoutes"
                  :key="subItem.name"
                  class="pl-8 cursor-pointer hover:bg-gray-700"
                >
                  <router-link
                    :to="{ name: subItem.route }"
                    class="py-3 flex items-center"
                    :class="{
                      'bg-gray-500 text-gray-800': $route.name === subItem.route,
                    }"
                    @click="logNavigation(subItem.route)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                    </svg>
                    {{ subItem.name }}
                  </router-link>
                </li>
              </ul>
            </DisclosurePanel>
          </Disclosure>
        </template>
      </ul>
    </nav>
  </aside>
</template>

<script>
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

export default {
  name: "Sidebar",
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const userRole = computed(() => {
      const role = (localStorage.getItem("role") || "").toLowerCase();
      const bankcode = localStorage.getItem("bankcode") || "";
      const iin = localStorage.getItem("iin") || "";
      const memberId = localStorage.getItem("memberId") || "";

      console.log(
        "Sidebar: Current role:",
        role,
        "Bankcode:",
        bankcode,
        "iin:",
        iin,
        "memberId:",
        memberId
      );
      return role;
    });

    onMounted(() => {
      console.log(
        "Sidebar mounted, Router available:",
        !!router,
        "Current route:",
        route.name
      );
    });

    const logNavigation = (routeName) => {
      console.log(
        `Navigating to route: ${routeName}, Current role: ${userRole.value}, Current route: ${route.name}`
      );
    };

    const isRouteActive = (subRoutes) => {
      if (!subRoutes) return false;
      return subRoutes.some((subItem) => route.name === subItem.route);
    };

    const accessibleRoutes = computed(() => {
      console.log("Sidebar: Accessible routes for role:", userRole.value);
      if (userRole.value === "user") {
        return [
          { name: "Members Info", isSection: true },
          { name: "Dashboard", route: "transaction" },
          { name: "Upload Merchant", route: "upload" },
          { name: "List Merchant", route: "listMerchant" },
        ];
      }
      return [
        { name: "Internal", isSection: true },
        { name: "Dashboard", route: "dashboard" },
        {
          name: "Management",
          isGroup: true,
          subRoutes: [
            { name: "Users", route: "user-list" },
            { name: "Members", route: "members" },
            { name: "Country", route: "country" },
          ],
        },
        { name: "Members Info", isSection: true },
        { name: "Upload Merchant", route: "upload" },
        { name: "List Merchant", route: "listMerchant" },
        { name: "Merchants Management", isSection: true },
        { name: "Merchant Mapping", route: "mappingMerchant" },
        { name: "Merchant Mapped", route: "merchantmapping" },
        { name: "All Merchants", isSection: true },
        { name: "All Merchant", route: "merchant" },
      ];
    });

    return {
      userRole,
      accessibleRoutes,
      isRouteActive,
      logNavigation,
    };
  },
};
</script>
