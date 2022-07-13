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
import store from '@/store/store'

const getPageEvents = (routeTo, next) => {
  const currentPage = parseInt(routeTo.query.page) || 1
  store.dispatch('event/fetchEvents', {
    page: currentPage
  }).then(() => {
    routeTo.params.page = currentPage
    next()
  })
}

export default {
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    EventCard
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  computed: {
    ...mapState(['event', 'eventsTotal', 'user'])
  }
}
</script>
