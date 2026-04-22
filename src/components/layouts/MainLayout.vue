<template>
  <div class="flex min-h-screen">
    <the-sidebar />

    <div class="flex flex-col flex-grow bg-gray-200">
      <the-header />

      <div class="mb-auto">
        <router-view />
      </div>

      <the-footer />
    </div>

    <member-ranking-overlay
      :is-open="isMemberRankingOverlayOpen"
      :prefetched-state="memberRankingOverlayState"
      @close="closeMemberRankingOverlay"
    />
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import TheSidebar from '@/components/layouts/TheSidebar.vue'
import TheHeader from '@/components/layouts/TheHeader.vue'
import TheFooter from '@/components/layouts/TheFooter.vue'
import MemberRankingOverlay from '@/components/overlays/MemberRankingOverlay.vue'
import {
  clearQueuedMemberRankingOverlay,
  normalizeRole,
  readQueuedMemberRankingOverlay,
} from '@/utils/memberRankingOverlay'

export default {
  components: {
    TheSidebar,
    TheHeader,
    TheFooter,
    MemberRankingOverlay,
  },
  setup() {
    const route = useRoute()
    const isMemberRankingOverlayOpen = ref(false)
    const memberRankingOverlayState = ref(null)

    const maybeOpenMemberRankingOverlay = () => {
      const role = normalizeRole(localStorage.getItem('role'))

      if (role !== 'user') {
        clearQueuedMemberRankingOverlay()
        return
      }

      if (isMemberRankingOverlayOpen.value) {
        return
      }

      const pendingOverlay = readQueuedMemberRankingOverlay()

      if (!pendingOverlay) {
        return
      }

      memberRankingOverlayState.value = pendingOverlay.overlayState || null
      clearQueuedMemberRankingOverlay()
      isMemberRankingOverlayOpen.value = true
    }

    const closeMemberRankingOverlay = () => {
      isMemberRankingOverlayOpen.value = false
      memberRankingOverlayState.value = null
      clearQueuedMemberRankingOverlay()
    }

    watch(
      () => route.fullPath,
      () => {
        maybeOpenMemberRankingOverlay()
      },
      { immediate: true }
    )

    return {
      closeMemberRankingOverlay,
      isMemberRankingOverlayOpen,
      memberRankingOverlayState,
    }
  },
}
</script>
