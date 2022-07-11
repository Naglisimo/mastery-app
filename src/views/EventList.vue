<template>
  <div>
    <div>Event list</div>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>
<script>
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService'

export default {
  components: {
    EventCard
  },
  data() {
    return {
      events: []
    }
  },
  created() {
    EventService.getEvents()
      .then(({ data }) => {
        console.log(data)
        this.events = data
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
