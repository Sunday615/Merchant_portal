<template>
  <div class="flex justify-between px-4 mt-4 sm:px-8">
    <h2 class="text-2xl text-gray-600">Dashboard</h2>

    <div class="flex items-center space-x-1 text-xs">
      <a href="#" class="font-bold text-indigo-700">Home</a>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
      <span class="text-gray-600">Dashboard</span>
    </div>
  </div>

  <div class="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8">
    <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
      <div class="p-4 bg-green-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 21h18M4 18h16M6 10v8m4-8v8m4-8v8m4-8v8M4 9.5v-.955a1 1 0 0 1 .458-.84l7-4.52a1 1 0 0 1 1.084 0l7 4.52a1 1 0 0 1 .458.84V9.5a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5Z" />
        </svg>
      </div>
      <div class="px-4 text-gray-700">
        <h3 class="text-sm tracking-wider">Total Merchants</h3>
        <p class="text-3xl">{{ totalMembers.toLocaleString() }}</p>
      </div>
    </div>

    <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
      <div class="p-4 bg-blue-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 21h18M4 18h16M6 10v8m4-8v8m4-8v8m4-8v8M4 9.5v-.955a1 1 0 0 1 .458-.84l7-4.52a1 1 0 0 1 1.084 0l7 4.52a1 1 0 0 1 .458.84V9.5a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5Z" />
        </svg>
      </div>
      <div class="px-4 text-gray-700">
        <h3 class="text-sm tracking-wider">Total Merchants (Real merchants)</h3>
        <p class="text-3xl">{{ totalMerchantActive.toLocaleString() }}</p>
      </div>
    </div>

    <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
      <div class="p-4 bg-red-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 21h18M4 18h16M6 10v8m4-8v8m4-8v8m4-8v8M4 9.5v-.955a1 1 0 0 1 .458-.84l7-4.52a1 1 0 0 1 1.084 0l7 4.52a1 1 0 0 1 .458.84V9.5a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5Z" />
        </svg>
      </div>
      <div class="px-4 text-gray-700">
        <h3 class="text-sm tracking-wider">Total Merchant Inactive</h3>
        <p class="text-3xl">{{ totalMerchantInactive.toLocaleString() }}</p>
      </div>
    </div>

    <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
      <div class="p-4 bg-indigo-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 21h18M4 18h16M6 10v8m4-8v8m4-8v8m4-8v8M4 9.5v-.955a1 1 0 0 1 .458-.84l7-4.52a1 1 0 0 1 1.084 0l7 4.52a1 1 0 0 1 .458.84V9.5a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5Z" />
        </svg>
      </div>
      <div class="px-4 text-gray-700">
        <h3 class="text-sm tracking-wider">Total Merchant Receive Crossborder</h3>
        <p class="text-3xl">{{ totalMerchantReceiveCrossborder.toLocaleString() }}</p>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 px-4 gap-4 mt-8 sm:grid-cols-3 sm:px-8">
    <div class="px-4 py-2 bg-white border rounded-md overflow-hidden shadow">
      <h3 class="text-xl text-gray-600 mb-4">Monthly Count</h3>
      <apexchart type="area" :height="300" :options="pageViewOptions" :series="pageViewSeries"></apexchart>
    </div>

    <div class="px-4 py-2 bg-white border rounded-md overflow-hidden shadow">
      <h3 class="text-xl text-gray-600 mb-4">Member Merchants</h3>
      <apexchart type="donut" :height="300" :options="sessionsOptions" :series="sessionsSeries"></apexchart>
    </div>

    <div class="px-4 py-2 bg-white border rounded-md shadow">
      <h3 class="text-xl text-gray-600 mb-2">Merchants</h3>

      <div class="flex flex-col">
        <div class="align-middle inline-block min-w-full">
          <!-- 🔹 set max height for ~10 rows and enable scroll -->
          <div class="overflow-y-auto border-0 max-h-80">
            <table class="table-auto min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th scope="col" class="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Province
                  </th>
                  <th scope="col" class="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Count
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 text-sm text-gray-500">
                <tr v-for="(item, index) in provinces" :key="index">
                  <td class="py-1">{{ item.Province }}</td>
                  <td class="py-1 text-sm text-gray-500">{{ item.count }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  </div>
  <!--
 
-->

</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import topAuthors from '@/data/home/topAuthors.json'
import recentSales from '@/data/home/recentSales.json'
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

export default {
  components: {
    apexchart: VueApexCharts,
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
  },

  setup() {
    const totalMembers = ref(0)
    const totalMerchantActive = ref(0)
    const totalMerchantInactive = ref(0)
    const totalMerchantReceiveCrossborder = ref(0)
    const userRole = computed(() => localStorage.getItem('role') || '')

    const sessionsSeries = ref([])
    const sessionsOptions = ref({
      chart: { type: 'donut' },
      labels: [],
      colors: [],
      legend: { position: 'bottom' },
      dataLabels: {
        enabled: true,
        formatter: (val, opts) => {
          const count = opts.w.config.series[opts.seriesIndex]
          return `${count}`
        },
        style: { fontSize: '14px' },
      },
      tooltip: {
        y: { formatter: (val) => `${val} merchants` },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: { width: 320 },
            legend: { position: 'bottom' },
          },
        },
      ],
    })

    const pageViewSeries = ref([{ name: 'Page view', data: [] }])
    const pageViewOptions = ref({
      chart: { id: 'pageview-chart', toolbar: { show: false }, zoom: { enabled: false } },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth' },
      xaxis: { categories: [] },
      tooltip: { enabled: true },
    })

    const apiUrl = import.meta.env.VITE_API_URL || '/api'

    function formatMonthLabel(monthDayStr) {
      const [month, day] = monthDayStr.split('-')
      const fakeYear = new Date().getFullYear()
      const date = new Date(fakeYear, Number(month) - 1, Number(day))
      return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' })
    }



    const fetchMonthlyCounts = async () => {
      try {
        const res = await axios.get(`${apiUrl}/records/monthly-count`)
        const categories = res.data.map(item => formatMonthLabel(item.day))
        const counts = res.data.map(item => Number(item.total))

        pageViewOptions.value = {
          ...pageViewOptions.value,
          xaxis: {
            ...pageViewOptions.value.xaxis,
            categories,
            labels: { rotate: -45 } // optional: tilt labels if many days
          }
        }

        pageViewSeries.value = [{ name: 'Page view', data: counts }]
      } catch (error) {
        console.error('Error fetching monthly count:', error)
      }
    }



    const fetchTotalMembers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/records/count`)
        totalMembers.value = Number(response.data[0]?.count) || 0
      } catch (error) {
        console.error('Fetch total members error:', error)
        totalMembers.value = 0
        alert('Error fetching total members: ' + (error.response?.data?.message || error.message))
      }
    }

    const fetchTotalMerchantActive = async () => {
      try {
        const response = await axios.get(`${apiUrl}/records/count-unique-merchants`)
        totalMerchantActive.value = Number(response.data.count) || 0
      } catch (error) {
        console.error('Fetch total active merchants error:', error)
        totalMerchantActive.value = 0
        alert('Error fetching total merchants: ' + (error.response?.data?.message || error.message))
      }
    }

    const fetchTotalMerchantInactive = async () => {
      try {
        const response = await axios.get(`${apiUrl}/records/count-status-inactive`)
        totalMerchantInactive.value = Number(response.data[0]?.count) || 0
      } catch (error) {
        console.error('Fetch total inactive merchants error:', error)
        totalMerchantInactive.value = 0
        alert('Error fetching inactive merchants: ' + (error.response?.data?.message || error.message))
      }
    }

    const fetchTotalMerchantReceiveCrossborder = async () => {
      try {
        const response = await axios.get(`${apiUrl}/records/count-support-cross-border`)
        totalMerchantReceiveCrossborder.value = Number(response.data[0]?.count) || 0
      } catch (error) {
        console.error('Fetch crossborder merchants error:', error)
        totalMerchantReceiveCrossborder.value = 0
        alert('Error fetching crossborder merchants: ' + (error.response?.data?.message || error.message))
      }
    }

    const provinces = ref([])

    const fetchProvinces = async () => {
      try {
        const response = await axios.get(`${apiUrl}/records/count-by-provinces`)
        provinces.value = response.data || []
      } catch (error) {
        console.error('Fetch provinces error:', error)
        provinces.value = []
      }
    }


    const fetchMemberMerchants = async () => {
      try {
        const response = await axios.get(`${apiUrl}/records/count-member-merchants`)
        const labels = response.data.map((item) => item.bankcode || 'Unknown')
        const series = response.data.map((item) => Number(item.count) || 0)

        const bankColors = [
          '#6366F1', '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6',
          '#14B8A6', '#F43F5E', '#EAB308', '#A855F7', '#22C55E', '#0EA5E9',
        ]
        const colors = labels.map((_, i) => bankColors[i % bankColors.length])

        sessionsSeries.value = series
        sessionsOptions.value = { ...sessionsOptions.value, labels, colors }
      } catch (error) {
        console.error('Fetch member merchants error:', error)
        sessionsSeries.value = []
        sessionsOptions.value = { ...sessionsOptions.value, labels: [], colors: [] }
        alert('Error fetching member merchants: ' + (error.response?.data?.message || error.message))
      }
    }

    onMounted(() => {
      fetchTotalMembers()
      fetchTotalMerchantActive()
      fetchTotalMerchantInactive()
      fetchTotalMerchantReceiveCrossborder()
      fetchMemberMerchants()
      fetchProvinces()
      fetchMonthlyCounts()
    })

    return {
      userRole,
      totalMembers,
      totalMerchantActive,
      totalMerchantInactive,
      totalMerchantReceiveCrossborder,
      pageViewOptions,
      pageViewSeries,
      sessionsOptions,
      sessionsSeries,
      topAuthors,
      recentSales,
      provinces,
    }
  },
}
</script>
