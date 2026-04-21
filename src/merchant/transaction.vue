<template>
  <div class="flex justify-between px-4 mt-4 sm:px-8">
    <h2 class="text-2xl text-gray-600">Dashboard</h2>

    <div class="flex items-center space-x-1 text-xs">
      <a href="#" class="font-bold text-indigo-700">Home</a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-2 w-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
      <span class="text-gray-600">Dashboard</span>
    </div>
  </div>

  <div class="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8">
    <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
      <div class="p-4 bg-green-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 21h18M4 18h16M6 10v8m4-8v8m4-8v8m4-8v8M4 9.5v-.955a1 1 0 0 1 .458-.84l7-4.52a1 1 0 0 1 1.084 0l7 4.52a1 1 0 0 1 .458.84V9.5a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5Z"
          />
        </svg>
      </div>
      <div class="px-4 text-gray-700">
        <h3 class="text-sm tracking-wider">Total Merchants</h3>
        <p class="text-3xl">{{ totalMembers.toLocaleString() }}</p>
      </div>
    </div>

    <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
      <div class="p-4 bg-red-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 21h18M4 18h16M6 10v8m4-8v8m4-8v8m4-8v8M4 9.5v-.955a1 1 0 0 1 .458-.84l7-4.52a1 1 0 0 1 1.084 0l7 4.52a1 1 0 0 1 .458.84V9.5a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5Z"
          />
        </svg>
      </div>
      <div class="px-4 text-gray-700">
        <h3 class="text-sm tracking-wider">Total Merchant Inactive</h3>
        <p class="text-3xl">{{ totalMerchantInactive.toLocaleString() }}</p>
      </div>
    </div>

    <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
      <div class="p-4 bg-blue-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 21h18M4 18h16M6 10v8m4-8v8m4-8v8m4-8v8M4 9.5v-.955a1 1 0 0 1 .458-.84l7-4.52a1 1 0 0 1 1.084 0l7 4.52a1 1 0 0 1 .458.84V9.5a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5Z"
          />
        </svg>
      </div>
      <div class="px-4 text-gray-700">
        <h3 class="text-sm tracking-wider">Total transaction inquiry (LMPS)</h3>
        <p class="text-3xl">{{ totalInquiryTransaction.toLocaleString() }}</p>
      </div>
    </div>

    <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
      <div class="p-4 bg-indigo-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 21h18M4 18h16M6 10v8m4-8v8m4-8v8m4-8v8M4 9.5v-.955a1 1 0 0 1 .458-.84l7-4.52a1 1 0 0 1 1.084 0l7 4.52a1 1 0 0 1 .458.84V9.5a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5Z"
          />
        </svg>
      </div>
      <div class="px-4 text-gray-700">
        <h3 class="text-sm tracking-wider">Total transaction transfer (LMPS)</h3>
        <p class="text-3xl">
          {{ transferLoading ? "Loading..." : totalTransferTransaction.toLocaleString() }}
        </p>
      </div>
    </div>
  </div>

  <div class="px-4 py-2 border rounded-md shadow">
    <div class="px-4 py-2 bg-white border rounded-md overflow-hidden shadow">
      <h3 class="text-xl text-gray-600 mb-4">Daily Transaction Count</h3>

      <div class="relative h-[300px] w-full">
        <div
          ref="dailyLineChartRef"
          class="h-full w-full transition-opacity duration-300"
          :class="chartLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'"
        ></div>

        <div
          v-if="chartLoading"
          class="absolute inset-0 flex flex-col items-center justify-center"
        >
          <svg
            class="animate-spin h-8 w-8 text-indigo-500 mb-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <p class="text-gray-500 text-sm">Loading count transactions...</p>
        </div>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 px-4 gap-4 mt-8 sm:grid-cols-4 sm:px-8">
    <div class="px-4 py-2 bg-white border rounded-md overflow-hidden shadow gsap-chart-card">
      <h3 class="text-xl text-gray-600 mb-4">Daily Transactions</h3>
      <apexchart
        type="donut"
        :height="300"
        :options="sessionsOptions"
        :series="sessionsSeries"
      ></apexchart>
    </div>

    <div class="px-4 py-3 bg-white border rounded-md overflow-hidden shadow gsap-chart-card sm:col-span-3">
      <div class="flex items-start justify-between mb-3 gap-3">
        <div>
          <h3 class="text-xl text-gray-700">Total Transaction Count & Total Amount</h3>
          <p class="text-sm text-gray-500">
            {{ userBankcode || "No bankcode" }} · {{ currentYear }}
          </p>
        </div>
      </div>
      <div class="relative h-[320px] w-full overflow-hidden rounded-md">
        <div
          ref="monthlyBarChartRef"
          class="h-full w-full transition-opacity duration-300"
          :class="monthlyChartInitialized ? 'opacity-100' : 'opacity-0 pointer-events-none'"
        ></div>
        <div
          v-if="monthlyChartLoading"
          class="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/90 text-sm text-gray-500 backdrop-blur-[1px]"
        >
          <div class="mb-5 flex items-end gap-2">
            <span class="h-12 w-3 rounded-full bg-blue-200 animate-pulse"></span>
            <span class="h-20 w-3 rounded-full bg-blue-500/80 animate-pulse [animation-delay:120ms]"></span>
            <span class="h-14 w-3 rounded-full bg-amber-200 animate-pulse [animation-delay:220ms]"></span>
            <span class="h-24 w-3 rounded-full bg-amber-500/80 animate-pulse [animation-delay:320ms]"></span>
            <span class="h-10 w-3 rounded-full bg-slate-200 animate-pulse [animation-delay:420ms]"></span>
          </div>
          <svg
            class="mb-2 h-8 w-8 animate-spin text-indigo-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <p class="font-medium text-gray-600">Loading total count & amount...</p>
          <p class="mt-1 text-xs text-gray-400">Preparing monthly transfer chart</p>
        </div>
        <div
          v-else-if="!monthlyChartInitialized && monthlyChartError"
          class="absolute inset-0 z-10 flex items-center justify-center bg-white/90 px-6 text-center text-sm text-red-500"
        >
          {{ monthlyChartError }}
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import VueApexCharts from "vue3-apexcharts";
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from "vue";
import axios from "axios";
import * as echarts from "echarts";
import { gsap } from "gsap";

export default {
  components: {
    apexchart: VueApexCharts,
  },

  setup() {
    const inquiryLoading = ref(true);
    const transferLoading = ref(true);
    const chartLoading = ref(true);
    const monthlyChartLoading = ref(true);
    const monthlyChartInitialized = ref(false);
    const monthlyChartError = ref("");
    const totalMembers = ref(0);
    const totalInquiryTransaction = ref(0);
    const totalMerchantInactive = ref(0);
    const totalTransferTransaction = ref(0);

    const userRole = computed(() => (localStorage.getItem("role") || "").toLowerCase());
    const userBankcode = computed(() =>
      (localStorage.getItem("bankcode") || "").toUpperCase().trim()
    );

    const apiUrl = import.meta.env.VITE_API_URL || "/api";
    const dailyLineChartRef = ref(null);
    const monthlyBarChartRef = ref(null);
    const currentYear = ref(new Date().getFullYear());
    const cachePrefix = "merchant-transaction-dashboard-v1";
    const monthlyScopeTtlMs = 10 * 60 * 1000;
    const monthlyRealtimeRefreshMs = 30000;
    const transferTodayTtlMs = 30 * 1000;
    const dailyCountsTtlMs = 2 * 60 * 1000;
    const totalsTtlMs = 60 * 1000;
    const memberMerchantTtlMs = 5 * 60 * 1000;

    let dailyLineChart = null;
    let monthlyBarChart = null;
    let monthlyChartTween = null;
    let monthlyRealtimeTimer = null;
    let monthlyChartRequestId = 0;
    let totalTransferTween = null;
    let monthlyChartRows = [];
    let monthlyChartHoverIndex = null;
    let lastTransferTodaySummary = null;
    let monthlyLegendSelected = {
      "Total Count": true,
      "Total Amount": true,
    };
    const monthlyLegendItems = [
      {
        name: "Total Count",
        icon: "roundRect",
        itemStyle: {
          color: "#2563EB",
          borderRadius: 4,
        },
      },
      {
        name: "Total Amount",
        icon: "roundRect",
        itemStyle: {
          color: "#F59E0B",
          borderRadius: 4,
        },
      },
    ];
    const inMemoryCache = new Map();
    const pendingRequests = new Map();

    const monthLabels = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const getAuthConfig = () => {
      const token = localStorage.getItem("token");
      return token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {};
    };

    const buildCacheKey = (scope, suffix) => `${cachePrefix}:${scope}:${suffix}`;

    const readCacheEntry = (key) => {
      if (inMemoryCache.has(key)) {
        return inMemoryCache.get(key);
      }

      try {
        const raw = localStorage.getItem(key);
        if (!raw) return null;

        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== "object" || !("data" in parsed)) {
          localStorage.removeItem(key);
          return null;
        }

        inMemoryCache.set(key, parsed);
        return parsed;
      } catch (error) {
        console.error("Failed to read cache entry:", error);
        localStorage.removeItem(key);
        return null;
      }
    };

    const writeCacheEntry = (key, data) => {
      const entry = {
        timestamp: Date.now(),
        data,
      };

      inMemoryCache.set(key, entry);

      try {
        localStorage.setItem(key, JSON.stringify(entry));
      } catch (error) {
        console.error("Failed to write cache entry:", error);
      }

      return data;
    };

    const getCachedData = (key, ttlMs) => {
      const entry = readCacheEntry(key);
      if (!entry) return { data: null, isFresh: false, timestamp: 0 };

      return {
        data: entry.data,
        isFresh: Date.now() - Number(entry.timestamp || 0) < ttlMs,
        timestamp: Number(entry.timestamp || 0) || 0,
      };
    };

    const fetchWithCache = async ({ key, ttlMs, requestFn, forceRefresh = false }) => {
      const cached = getCachedData(key, ttlMs);
      if (!forceRefresh && cached.isFresh) {
        return cached.data;
      }

      if (pendingRequests.has(key)) {
        return pendingRequests.get(key);
      }

      const request = requestFn()
        .then((data) => writeCacheEntry(key, data))
        .finally(() => {
          pendingRequests.delete(key);
        });

      pendingRequests.set(key, request);
      return request;
    };

    const toSafeNumber = (value) => {
      const num = Number(value);
      return Number.isFinite(num) ? num : 0;
    };

    const formatCount = (value) =>
      new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 0,
      }).format(toSafeNumber(value));

    const formatAmount = (value) =>
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(toSafeNumber(value));

    const formatCompact = (value) =>
      new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(toSafeNumber(value));

    const waitForChartPaint = () =>
      new Promise((resolve) => {
        if (typeof window === "undefined" || typeof window.requestAnimationFrame !== "function") {
          resolve();
          return;
        }

        window.requestAnimationFrame(() => resolve());
      });

    const emptyMonthRow = (month) => ({
      month,
      fromCount: 0,
      toCount: 0,
      totalCount: 0,
      fromAmount: 0,
      toAmount: 0,
      totalAmount: 0,
    });

    const normalizeMonthlyRows = (rows = []) => {
      const base = Array.from({ length: 12 }, (_, i) => emptyMonthRow(i + 1));

      rows.forEach((item) => {
        const month = Number(item?.month);
        if (month >= 1 && month <= 12) {
          base[month - 1] = {
            month,
            fromCount: toSafeNumber(item?.fromCount),
            toCount: toSafeNumber(item?.toCount),
            totalCount: toSafeNumber(item?.totalCount),
            fromAmount: toSafeNumber(item?.fromAmount),
            toAmount: toSafeNumber(item?.toAmount),
            totalAmount: toSafeNumber(item?.totalAmount),
          };
        }
      });

      return base;
    };

    const getMonthlyTotalCount = (rows = []) =>
      normalizeMonthlyRows(rows).reduce(
        (sum, item) => sum + toSafeNumber(item?.totalCount),
        0
      );

    const interpolateMonthlyRows = (fromRows = [], toRows = [], progress = 1) => {
      const startRows = normalizeMonthlyRows(fromRows);
      const endRows = normalizeMonthlyRows(toRows);

      return endRows.map((row, index) => {
        const start = startRows[index] || emptyMonthRow(index + 1);
        return {
          month: row.month,
          fromCount: start.fromCount + (row.fromCount - start.fromCount) * progress,
          toCount: start.toCount + (row.toCount - start.toCount) * progress,
          totalCount: start.totalCount + (row.totalCount - start.totalCount) * progress,
          fromAmount: start.fromAmount + (row.fromAmount - start.fromAmount) * progress,
          toAmount: start.toAmount + (row.toAmount - start.toAmount) * progress,
          totalAmount: start.totalAmount + (row.totalAmount - start.totalAmount) * progress,
        };
      });
    };

    const hasMonthlyChartRows = (rows) => Array.isArray(rows) && rows.length > 0;

    const extractTransferRows = (payload) =>
      Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.data)
        ? payload.data
        : [];

    const extractTransferTodaySource = (payload) => {
      if (typeof payload === "number") {
        return { count: payload };
      }

      if (Array.isArray(payload)) {
        return payload[0] || {};
      }

      if (Array.isArray(payload?.data)) {
        return payload.data[0] || {};
      }

      if (payload?.data && typeof payload.data === "object") {
        return payload.data;
      }

      return payload && typeof payload === "object" ? payload : {};
    };

    const extractTransferTodaySummary = (payload) => {
      const item = extractTransferTodaySource(payload);

      return {
        totalCount: toSafeNumber(
          item?.totalCount ??
            item?.count ??
            item?.todayCount ??
            item?.transactionCount ??
            item?.transferCount
        ),
        totalAmount: toSafeNumber(
          item?.totalAmount ??
            item?.amount ??
            item?.todayAmount ??
            item?.transactionAmount ??
            item?.transferAmount
        ),
      };
    };

    const getTransferMonthlyCacheKey = (bankcode) =>
      buildCacheKey("monthly-transfer-scope", bankcode);

    const getTransferTodayCacheKey = (bankcode) =>
      buildCacheKey("transfer-today-summary", bankcode);

    const fetchTransferMonthlyRows = async (bankcode, forceRefresh = false) => {
      const cacheKey = getTransferMonthlyCacheKey(bankcode);

      return fetchWithCache({
        key: cacheKey,
        ttlMs: monthlyScopeTtlMs,
        forceRefresh,
        requestFn: async () => {
          const response = await axios.get(
            `${apiUrl}/transfer/count-by-bankcode/${encodeURIComponent(bankcode)}`,
            getAuthConfig()
          );

          return extractTransferRows(response.data);
        },
      });
    };

    const fetchTransferTodaySummary = async (bankcode, forceRefresh = false) => {
      const cacheKey = getTransferTodayCacheKey(bankcode);

      return fetchWithCache({
        key: cacheKey,
        ttlMs: transferTodayTtlMs,
        forceRefresh,
        requestFn: async () => {
          const response = await axios.get(
            `${apiUrl}/transfer/count-by-bankcode-today/${encodeURIComponent(bankcode)}`,
            getAuthConfig()
          );

          return extractTransferTodaySummary(response.data);
        },
      });
    };

    const chartGradientCount = () =>
      new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: "#2563EB" },
        { offset: 1, color: "#60A5FA" },
      ]);

    const chartGradientAmount = () =>
      new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: "#F59E0B" },
        { offset: 1, color: "#FCD34D" },
      ]);

    const buildMonthlySeriesData = ({
      rows,
      hoveredIndex,
      key,
      gradient,
      activeColor,
      shadowColor,
    }) =>
      rows.map((item, index) => {
        const isHoveredMonth = hoveredIndex === index;
        const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

        return {
          value: item[key],
          itemStyle: {
            color: isHoveredMonth ? activeColor : gradient,
            opacity: isDimmed ? 0.08 : 1,
            borderRadius: [12, 12, 0, 0],
            shadowBlur: isHoveredMonth ? 18 : 10,
            shadowColor: isHoveredMonth ? shadowColor : "rgba(15, 23, 42, 0.10)",
            borderWidth: isHoveredMonth ? 1.5 : 0,
            borderColor: isHoveredMonth ? "rgba(255,255,255,0.85)" : "transparent",
          },
        };
      });

    const isMonthlyLegendVisible = (seriesName) =>
      monthlyLegendSelected[seriesName] !== false;

    const bindMonthlyChartHoverEvents = () => {
      if (!monthlyBarChart) return;

      monthlyBarChart.off("mouseover");
      monthlyBarChart.off("globalout");
      monthlyBarChart.off("legendselectchanged");

      monthlyBarChart.on("mouseover", (params) => {
        if (params?.componentType !== "series" || typeof params?.dataIndex !== "number") {
          return;
        }

        if (!isMonthlyLegendVisible(params?.seriesName)) {
          monthlyBarChart?.dispatchAction({ type: "hideTip" });
          return;
        }

        if (monthlyChartHoverIndex === params.dataIndex) return;
        renderMonthlyBarChart(monthlyChartRows, params.dataIndex);
      });

      monthlyBarChart.on("globalout", () => {
        if (monthlyChartHoverIndex === null) return;
        monthlyBarChart?.dispatchAction({ type: "hideTip" });
        renderMonthlyBarChart(monthlyChartRows, null);
      });

      monthlyBarChart.on("legendselectchanged", (params) => {
        monthlyLegendSelected = {
          ...monthlyLegendSelected,
          ...(params?.selected || {}),
        };

        monthlyChartHoverIndex = null;
        monthlyBarChart?.dispatchAction({ type: "hideTip" });
        renderMonthlyBarChart(monthlyChartRows, null);
      });
    };

    const renderMonthlyBarChart = (rawRows = [], hoveredIndex = null, options = {}) => {
      if (!monthlyBarChartRef.value) return;

      const { persistRows = true } = options;

      if (persistRows) {
        monthlyChartRows = Array.isArray(rawRows) ? rawRows : [];
      }
      monthlyChartHoverIndex = typeof hoveredIndex === "number" ? hoveredIndex : null;

      const rows = normalizeMonthlyRows(
        persistRows ? monthlyChartRows : Array.isArray(rawRows) ? rawRows : []
      );

      if (!monthlyBarChart) {
        monthlyBarChart = echarts.init(monthlyBarChartRef.value);
        bindMonthlyChartHoverEvents();
      }

      monthlyBarChart.setOption(
        {
          color: ["#2563EB", "#F59E0B"],
          backgroundColor: "transparent",
          animationDuration: 900,
          animationEasing: "cubicOut",
          grid: {
            top: 56,
            left: 28,
            right: 28,
            bottom: 28,
            containLabel: true,
          },
          legend: {
            top: 0,
            right: 0,
            data: monthlyLegendItems,
            selected: monthlyLegendSelected,
            itemWidth: 16,
            itemHeight: 10,
            itemGap: 18,
            inactiveColor: "#CBD5E1",
            textStyle: {
              color: "#64748B",
              fontWeight: 600,
            },
          },
          tooltip: {
            trigger: "axis",
            axisPointer: { type: "shadow" },
            confine: true,
            appendToBody: false,
            enterable: false,
            backgroundColor: "rgba(15, 23, 42, 0.96)",
            borderWidth: 0,
            textStyle: { color: "#fff" },
            position: (point, params, dom, rect, size) => {
              const [x, y] = point;
              const [contentWidth, contentHeight] = size.contentSize;
              const [viewWidth, viewHeight] = size.viewSize;

              let left = x + 14;
              if (left + contentWidth > viewWidth - 12) {
                left = Math.max(12, viewWidth - contentWidth - 12);
              }

              let top = y - contentHeight - 14;
              if (top < 12) {
                top = Math.min(viewHeight - contentHeight - 12, y + 14);
              }

              return [left, Math.max(12, top)];
            },
            formatter: (params) => {
              const visibleEntries = Array.isArray(params)
                ? params.filter((entry) => isMonthlyLegendVisible(entry?.seriesName))
                : [];

              if (!visibleEntries.length) {
                monthlyBarChart?.dispatchAction({ type: "hideTip" });
                return "";
              }

              const index = visibleEntries?.[0]?.dataIndex ?? 0;
              const item = rows[index] || emptyMonthRow(index + 1);
              const showCount = isMonthlyLegendVisible("Total Count");
              const showAmount = isMonthlyLegendVisible("Total Amount");

              return `
                <div style="min-width: 320px; padding: 4px 2px;">
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
                    <div style="font-size:15px;font-weight:700;">
                      ${monthLabels[index]} ${currentYear.value}
                    </div>
                  </div>

                  <div style="display:grid;grid-template-columns:${showCount && showAmount ? "1fr 1fr" : "1fr"};gap:10px;">
                    ${
                      showCount
                        ? `
                    <div style="background:rgba(37,99,235,0.16);border:1px solid rgba(96,165,250,0.22);border-radius:14px;padding:12px;">
                      <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#93C5FD;margin-bottom:8px;">
                        Count
                      </div>
                      <div style="display:flex;justify-content:space-between;margin-bottom:6px;gap:12px;">
                        <span style="color:rgba(255,255,255,0.72);">fromCount</span>
                        <b>${formatCount(item.fromCount)}</b>
                      </div>
                      <div style="display:flex;justify-content:space-between;margin-bottom:6px;gap:12px;">
                        <span style="color:rgba(255,255,255,0.72);">toCount</span>
                        <b>${formatCount(item.toCount)}</b>
                      </div>
                      <div style="display:flex;justify-content:space-between;gap:12px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.10);">
                        <span style="color:#DBEAFE;">totalCount</span>
                        <b style="color:#FFFFFF;">${formatCount(item.totalCount)}</b>
                      </div>
                    </div>
                    `
                        : ""
                    }

                    ${
                      showAmount
                        ? `
                    <div style="background:rgba(245,158,11,0.16);border:1px solid rgba(251,191,36,0.22);border-radius:14px;padding:12px;">
                      <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#FCD34D;margin-bottom:8px;">
                        Amount
                      </div>
                      <div style="display:flex;justify-content:space-between;margin-bottom:6px;gap:12px;">
                        <span style="color:rgba(255,255,255,0.72);">fromAmount</span>
                        <b>${formatAmount(item.fromAmount)}</b>
                      </div>
                      <div style="display:flex;justify-content:space-between;margin-bottom:6px;gap:12px;">
                        <span style="color:rgba(255,255,255,0.72);">toAmount</span>
                        <b>${formatAmount(item.toAmount)}</b>
                      </div>
                      <div style="display:flex;justify-content:space-between;gap:12px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.10);">
                        <span style="color:#FEF3C7;">totalAmount</span>
                        <b style="color:#FFFFFF;">${formatAmount(item.totalAmount)}</b>
                      </div>
                    </div>
                    `
                        : ""
                    }
                  </div>
                </div>
              `;
            },
          },
          xAxis: {
            type: "category",
            data: monthLabels,
            axisLine: {
              lineStyle: { color: "#CBD5E1" },
            },
            axisTick: { show: false },
            axisLabel: {
              color: "#64748B",
            },
            axisPointer: {
              type: "shadow",
              shadowStyle: {
                color: "rgba(15, 23, 42, 0.06)",
              },
            },
          },
          yAxis: [
            {
              type: "value",
              name: "Total Count",
              position: "left",
              splitLine: {
                lineStyle: { color: "rgba(148, 163, 184, 0.18)" },
              },
              axisLabel: {
                color: "#64748B",
                formatter: (value) => formatCompact(value),
              },
              nameTextStyle: {
                color: "#64748B",
              },
            },
            {
              type: "value",
              name: "Total Amount",
              position: "right",
              splitLine: { show: false },
              axisLabel: {
                color: "#64748B",
                formatter: (value) => formatCompact(value),
              },
              nameTextStyle: {
                color: "#64748B",
              },
            },
          ],
          series: [
            {
              name: "Total Count",
              type: "bar",
              yAxisIndex: 0,
              barMaxWidth: 22,
              data: buildMonthlySeriesData({
                rows,
                hoveredIndex: monthlyChartHoverIndex,
                key: "totalCount",
                gradient: chartGradientCount(),
                activeColor: "#2563EB",
                shadowColor: "rgba(37, 99, 235, 0.28)",
              }),
              emphasis: {
                disabled: true,
              },
            },
            {
              name: "Total Amount",
              type: "bar",
              yAxisIndex: 1,
              barMaxWidth: 22,
              data: buildMonthlySeriesData({
                rows,
                hoveredIndex: monthlyChartHoverIndex,
                key: "totalAmount",
                gradient: chartGradientAmount(),
                activeColor: "#F59E0B",
                shadowColor: "rgba(245, 158, 11, 0.28)",
              }),
              emphasis: {
                disabled: true,
              },
            },
          ],
        },
        true
      );
    };

    const animateMonthlyChartRows = (nextRows = []) => {
      const normalizedNextRows = normalizeMonthlyRows(nextRows);
      const hasPreviousRows = hasMonthlyChartRows(monthlyChartRows);

      if (!monthlyChartInitialized.value || !hasPreviousRows) {
        renderMonthlyBarChart(normalizedNextRows, monthlyChartHoverIndex);
        return;
      }

      monthlyChartTween?.kill();

      const tweenState = { progress: 0 };
      const fromRows = normalizeMonthlyRows(monthlyChartRows);

      monthlyChartTween = gsap.to(tweenState, {
        progress: 1,
        duration: 1.2,
        ease: "power2.out",
        onUpdate: () => {
          renderMonthlyBarChart(
            interpolateMonthlyRows(fromRows, normalizedNextRows, tweenState.progress),
            monthlyChartHoverIndex,
            { persistRows: false }
          );
        },
        onComplete: () => {
          renderMonthlyBarChart(normalizedNextRows, monthlyChartHoverIndex);
          monthlyChartTween = null;
        },
      });
    };

    const setAnimatedTotalTransferCount = (nextValue, animate = true) => {
      const normalizedValue = Math.max(0, Math.round(toSafeNumber(nextValue)));

      totalTransferTween?.kill();

      if (!animate) {
        totalTransferTransaction.value = normalizedValue;
        totalTransferTween = null;
        return;
      }

      const tweenState = { value: toSafeNumber(totalTransferTransaction.value) };

      totalTransferTween = gsap.to(tweenState, {
        value: normalizedValue,
        duration: 1.1,
        ease: "power2.out",
        onUpdate: () => {
          totalTransferTransaction.value = Math.round(tweenState.value);
        },
        onComplete: () => {
          totalTransferTransaction.value = normalizedValue;
          totalTransferTween = null;
        },
      });
    };

    const animateChartCards = () => {
      gsap.fromTo(
        ".gsap-chart-card",
        { opacity: 0, y: 24, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
        }
      );
    };

    const renderDailyLineChart = (categories = [], series = []) => {
      if (!dailyLineChartRef.value) return;

      if (!dailyLineChart) {
        dailyLineChart = echarts.init(dailyLineChartRef.value);
      }

      dailyLineChart.setOption(
        {
          color: ["#2563EB", "#10B981"],
          animationDuration: 800,
          animationEasing: "cubicOut",
          grid: {
            top: 32,
            left: 24,
            right: 24,
            bottom: 24,
            containLabel: true,
          },
          legend: {
            top: 0,
            right: 0,
            itemWidth: 12,
            itemHeight: 12,
            textStyle: {
              color: "#64748B",
              fontWeight: 600,
            },
          },
          tooltip: {
            trigger: "axis",
            confine: true,
            backgroundColor: "rgba(15, 23, 42, 0.96)",
            borderWidth: 0,
            textStyle: { color: "#fff" },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: categories,
            axisLine: {
              lineStyle: { color: "#CBD5E1" },
            },
            axisTick: { show: false },
            axisLabel: {
              color: "#64748B",
            },
          },
          yAxis: {
            type: "value",
            splitLine: {
              lineStyle: { color: "rgba(148, 163, 184, 0.18)" },
            },
            axisLabel: {
              color: "#64748B",
              formatter: (value) => formatCompact(value),
            },
          },
          series: series.map((item, index) => ({
            name: item.name,
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 7,
            showSymbol: false,
            emphasis: {
              focus: "series",
              scale: true,
            },
            lineStyle: {
              width: 3,
            },
            areaStyle: {
              opacity: 0.08,
            },
            data: Array.isArray(item.data) ? item.data : [],
            itemStyle: {
              color: index === 0 ? "#2563EB" : "#10B981",
            },
          })),
        },
        true
      );
    };

    const resizeCharts = () => {
      dailyLineChart?.resize();
      monthlyBarChart?.resize();
    };

    const clearMonthlyRealtimeRefresh = () => {
      if (monthlyRealtimeTimer) {
        clearTimeout(monthlyRealtimeTimer);
        monthlyRealtimeTimer = null;
      }
    };

    const scheduleMonthlyRealtimeRefresh = () => {
      clearMonthlyRealtimeRefresh();

      if (typeof document !== "undefined" && document.hidden) return;

      monthlyRealtimeTimer = setTimeout(async () => {
        try {
          await refreshTransferDashboardIfNeeded({
            showLoading: false,
            animate: true,
          });
        } finally {
          scheduleMonthlyRealtimeRefresh();
        }
      }, monthlyRealtimeRefreshMs);
    };

    const destroyCharts = () => {
      clearMonthlyRealtimeRefresh();
      monthlyChartTween?.kill();
      monthlyChartTween = null;
      totalTransferTween?.kill();
      totalTransferTween = null;
      window.removeEventListener("resize", resizeCharts);
      dailyLineChart?.dispose();
      dailyLineChart = null;
      monthlyBarChart?.dispose();
      monthlyBarChart = null;
    };

    const fetchMonthlyTransferScope = async (options = {}) => {
      const { forceRefresh = false, showLoading = true, animate = false } = options;
      const requestId = ++monthlyChartRequestId;
      monthlyChartError.value = "";
      let hasRenderedCachedData = false;
      try {
        const bankcode = userBankcode.value;
        if (!bankcode) {
          monthlyChartError.value = "No bankcode found for this account.";
          return;
        }

        const cacheKey = getTransferMonthlyCacheKey(bankcode);
        const cached = getCachedData(cacheKey, monthlyScopeTtlMs);
        const hasUsableCachedRows = hasMonthlyChartRows(cached.data);

        if (hasUsableCachedRows) {
          await nextTick();
          if (requestId !== monthlyChartRequestId) return;
          renderMonthlyBarChart(cached.data);
          monthlyChartInitialized.value = true;
          hasRenderedCachedData = true;
          monthlyChartLoading.value = false;
        } else if (showLoading || !monthlyChartInitialized.value) {
          monthlyChartLoading.value = true;
        }

        const rows = await fetchTransferMonthlyRows(
          bankcode,
          forceRefresh || !cached.isFresh || !hasUsableCachedRows
        );

        await nextTick();
        if (requestId !== monthlyChartRequestId) return;
        const rowsToRender = normalizeMonthlyRows(rows);

        if (animate) {
          animateMonthlyChartRows(rowsToRender);
        } else {
          renderMonthlyBarChart(rowsToRender);
        }
        monthlyChartError.value = "";
        monthlyChartInitialized.value = true;
        await waitForChartPaint();
        if (requestId !== monthlyChartRequestId) return;
        monthlyChartLoading.value = false;
      } catch (error) {
        if (requestId !== monthlyChartRequestId) return;
        if (!hasRenderedCachedData) {
          monthlyChartError.value =
            error.response?.data?.message || "Unable to load monthly transfer data.";
          monthlyChartInitialized.value = false;
        }
      } finally {
        if (requestId === monthlyChartRequestId && !monthlyChartInitialized.value) {
          monthlyChartLoading.value = false;
        }
      }
    };

    const fetchDailyCounts = async () => {
      chartLoading.value = true;
      try {
        const bankcode = userBankcode.value;
        if (!bankcode) return;

        const now = new Date();
        const monthScope = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
        const cacheKey = buildCacheKey("daily-counts", `${bankcode}:${monthScope}`);
        const cached = getCachedData(cacheKey, dailyCountsTtlMs);

        if (cached.data?.categories && cached.data?.series) {
          pageViewSeries.value = cached.data.series;
          pageViewOptions.value = {
            ...pageViewOptions.value,
            xaxis: { ...pageViewOptions.value.xaxis, categories: cached.data.categories },
          };
          renderDailyLineChart(cached.data.categories, cached.data.series);
          chartLoading.value = false;
        }

        const chartData = await fetchWithCache({
          key: cacheKey,
          ttlMs: dailyCountsTtlMs,
          forceRefresh: !cached.isFresh,
          requestFn: async () => {
            const [inquiryRes, transferRes] = await Promise.all([
              axios.get(`${apiUrl}/inquiry/daily-count`, {
                ...getAuthConfig(),
                params: { bankcode },
              }),
              axios.get(`${apiUrl}/transfer/daily-count`, {
                ...getAuthConfig(),
                params: { bankcode },
              }),
            ]);

            const daysInMonth = new Date(
              now.getFullYear(),
              now.getMonth() + 1,
              0
            ).getDate();

            const categories = Array.from({ length: daysInMonth }, (_, i) => i + 1);
            const inquiryRows = Array.isArray(inquiryRes.data) ? inquiryRes.data : [];
            const transferRows = Array.isArray(transferRes.data) ? transferRes.data : [];

            const inquiryCounts = categories.map(
              (day) => inquiryRows.find((x) => Number(x.day) === day)?.count || 0
            );

            const transferCounts = categories.map(
              (day) => transferRows.find((x) => Number(x.day) === day)?.count || 0
            );

            return {
              categories,
              series: [
                { name: "Inquiry", data: inquiryCounts },
                { name: "Transfer", data: transferCounts },
              ],
            };
          },
        });

        pageViewSeries.value = chartData.series;
        pageViewOptions.value = {
          ...pageViewOptions.value,
          xaxis: { ...pageViewOptions.value.xaxis, categories: chartData.categories },
        };
        renderDailyLineChart(chartData.categories, chartData.series);
      } catch (error) {
        console.error("Error fetching daily counts:", error);
      } finally {
        chartLoading.value = false;
      }
    };

    const fetchTotalInquiryTransaction = async () => {
      inquiryLoading.value = true;
      try {
        const bankcode = userBankcode.value;
        if (!bankcode) return;

        const cacheKey = buildCacheKey("inquiry-count-today", bankcode);
        const cached = getCachedData(cacheKey, totalsTtlMs);
        if (cached.data !== null && cached.data !== undefined) {
          totalInquiryTransaction.value = Number(cached.data) || 0;
          inquiryLoading.value = false;
        }

        const count = await fetchWithCache({
          key: cacheKey,
          ttlMs: totalsTtlMs,
          forceRefresh: !cached.isFresh,
          requestFn: async () => {
            const response = await axios.get(`${apiUrl}/inquiry/count-today`, {
              ...getAuthConfig(),
              params: { bankcode },
            });
            return Number(response.data?.count) || 0;
          },
        });

        totalInquiryTransaction.value = Number(count) || 0;
      } catch (error) {
        console.error("Error fetching inquiry today:", error);
        totalInquiryTransaction.value = 0;
      } finally {
        inquiryLoading.value = false;
      }
    };

    const primeTransferTodaySummary = async () => {
      try {
        const bankcode = userBankcode.value;
        if (!bankcode) return null;

        const cached = getCachedData(
          getTransferTodayCacheKey(bankcode),
          transferTodayTtlMs
        );

        if (cached.data) {
          lastTransferTodaySummary = cached.data;
        }

        if (cached.isFresh && cached.data) {
          return cached.data;
        }

        const summary = await fetchTransferTodaySummary(bankcode, !cached.isFresh);
        lastTransferTodaySummary = summary;
        return summary;
      } catch (error) {
        console.error("Error priming transfer today summary:", error);
        return null;
      }
    };

    const refreshTransferDashboardIfNeeded = async (options = {}) => {
      const { showLoading = false, animate = true } = options;

      try {
        const bankcode = userBankcode.value;
        if (!bankcode) return;

        const previousTodaySummary = lastTransferTodaySummary;
        const nextTodaySummary = await fetchTransferTodaySummary(bankcode, true);
        const shouldRefreshYear =
          !monthlyChartInitialized.value ||
          !previousTodaySummary ||
          nextTodaySummary.totalCount !== previousTodaySummary.totalCount ||
          nextTodaySummary.totalAmount !== previousTodaySummary.totalAmount;

        if (!shouldRefreshYear) {
          lastTransferTodaySummary = nextTodaySummary;
          return;
        }

        await fetchMonthlyTransferScope({
          forceRefresh: true,
          showLoading,
          animate,
        });

        lastTransferTodaySummary = nextTodaySummary;
      } catch (error) {
        console.error("Error refreshing transfer dashboard:", error);
      }
    };

    const handleMonthlyChartVisibilityChange = () => {
      if (typeof document === "undefined") return;

      if (document.hidden) {
        clearMonthlyRealtimeRefresh();
        return;
      }

      refreshTransferDashboardIfNeeded({
        showLoading: false,
        animate: true,
      });
      scheduleMonthlyRealtimeRefresh();
    };

    const fetchTotalTransferTransaction = async () => {
      transferLoading.value = true;
      try {
        const bankcode = localStorage.getItem("bankcode");
        if (!bankcode) return;
        const response = await axios.get(`${apiUrl}/transfer/count-today`, {
          params: { bankcode },
        });
        setAnimatedTotalTransferCount(Number(response.data?.count) || 0, false);
      } catch (error) {
        console.error("Error fetching transfer today:", error);
        totalTransferTransaction.value = 0;
      } finally {
        transferLoading.value = false;
      }
    };

    const fetchTotalMembers = async () => {
      try {
        const bankcode = userBankcode.value;
        if (!bankcode) throw new Error("No bankcode found");

        const res = await axios.post(
          `${apiUrl}/records/countByBankCode`,
          { bankcode },
          getAuthConfig()
        );

        totalMembers.value = Number(res.data?.count) || 0;
      } catch (error) {
        console.error(error);
        totalMembers.value = 0;
      }
    };

    const fetchTotalMerchantInactive = async () => {
      try {
        const bankcode = userBankcode.value;
        if (!bankcode) return;

        const res = await axios.post(
          `${apiUrl}/records/countInactiveByBankCode`,
          { bankcode },
          getAuthConfig()
        );

        totalMerchantInactive.value = Number(res.data?.inactiveCount) || 0;
      } catch (error) {
        console.error(error);
        totalMerchantInactive.value = 0;
      }
    };

    const fetchMemberMerchants = async () => {
      try {
        const bankcode = userBankcode.value;
        if (!bankcode) {
          sessionsSeries.value = [];
          sessionsOptions.value = {
            ...sessionsOptions.value,
            labels: [],
            colors: [],
          };
          return;
        }

        const cacheKey = buildCacheKey("member-merchants", bankcode);
        const cached = getCachedData(cacheKey, memberMerchantTtlMs);
        const applyRows = (rows = []) => {
          const filteredRows = rows.filter(
            (item) => String(item.bankcode || "").toUpperCase() === bankcode
          );

          const labels = filteredRows.length
            ? filteredRows.map((item) => item.bankcode || bankcode)
            : [bankcode];

          const series = filteredRows.length
            ? filteredRows.map((item) => Number(item.count) || 0)
            : [0];

          const bankColors = ["#6366F1", "#10B981", "#F59E0B", "#EF4444"];
          const colors = labels.map((_, i) => bankColors[i % bankColors.length]);

          sessionsSeries.value = series;
          sessionsOptions.value = { ...sessionsOptions.value, labels, colors };
        };

        if (Array.isArray(cached.data)) {
          applyRows(cached.data);
        }

        const rows = await fetchWithCache({
          key: cacheKey,
          ttlMs: memberMerchantTtlMs,
          forceRefresh: !cached.isFresh,
          requestFn: async () => {
            const res = await axios.get(
              `${apiUrl}/records/count-member-merchants`,
              getAuthConfig()
            );
            return Array.isArray(res.data) ? res.data : [];
          },
        });

        applyRows(rows);
      } catch (error) {
        console.error(error);
        sessionsSeries.value = [];
        sessionsOptions.value = {
          ...sessionsOptions.value,
          labels: [],
          colors: [],
        };
      }
    };

    const sessionsSeries = ref([]);
    const sessionsOptions = ref({
      chart: { type: "donut" },
      labels: [],
      colors: [],
      legend: { position: "bottom" },
      dataLabels: {
        enabled: true,
        formatter: (val, opts) => opts.w.config.series[opts.seriesIndex],
        style: { fontSize: "14px" },
      },
      tooltip: {
        y: {
          formatter: (val) => `${val} merchants`,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: { width: 320 },
            legend: { position: "bottom" },
          },
        },
      ],
    });

    const pageViewSeries = ref([
      { name: "Inquiry", data: [] },
      { name: "Transfer", data: [] },
    ]);

    const pageViewOptions = ref({
      chart: {
        id: "pageview-chart",
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 2 },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 4,
        },
      },
      xaxis: {
        categories: [],
        labels: { rotate: -45 },
      },
      tooltip: { enabled: true },
    });

    onMounted(async () => {
      await nextTick();

      fetchTotalMembers();
      fetchTotalMerchantInactive();
      fetchTotalInquiryTransaction();
      fetchTotalTransferTransaction();
      fetchMemberMerchants();
      fetchDailyCounts();
      fetchMonthlyTransferScope();
      primeTransferTodaySummary();

      animateChartCards();
      window.addEventListener("resize", resizeCharts);
      document.addEventListener("visibilitychange", handleMonthlyChartVisibilityChange);
      scheduleMonthlyRealtimeRefresh();
    });

    onBeforeUnmount(() => {
      document.removeEventListener("visibilitychange", handleMonthlyChartVisibilityChange);
      destroyCharts();
    });

    return {
      userRole,
      userBankcode,
      totalMembers,
      totalInquiryTransaction,
      totalMerchantInactive,
      totalTransferTransaction,
      dailyLineChartRef,
      pageViewOptions,
      pageViewSeries,
      sessionsOptions,
      sessionsSeries,
      transferLoading,
      chartLoading,
      monthlyChartInitialized,
      monthlyChartLoading,
      monthlyChartError,
      monthlyBarChartRef,
      currentYear,
    };
  },
};
</script>
