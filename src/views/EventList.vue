<template>
  <div>
    <div>Event list for {{ user.user.name }}</div>
    {{ eventsTotal }}
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page !== 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev"> Prev Page</router-link>
    </template>
    <template v-if="this.event.eventsTotal > this.page * 2">
      <router-link :to="{ name: 'event-list', query: { page: page + 1 } }" rel="next"> Next Page</router-link>
    </template>
  </div>
</template>
<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    EventCard
  },
  created() {
    this.$store.dispatch('event/fetchEvents', {
      perPage: 2,
      page: this.page
    })
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page || 1)
    },
    ...mapState(['event', 'eventsTotal', 'user'])
  }
}
</script>
