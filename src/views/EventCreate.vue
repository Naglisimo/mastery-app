<template>
    <div>
        <h1>Create an event, {{ user.name }}</h1>
        <h2>id {{ user.id }}</h2>
        <p>{{ local }}</p>
        <ul>
            <li v-for="cat in categories" :key="cat">{{ cat }}</li>
        </ul>
        <p> there are {{ getEvent(2) }} categories</p>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
    computed: {
        getEvent() {
            return this.$store.getters.getEventById
        },
        ...mapGetters(['getEventById']),
        ...mapState(['user', 'categories'])
    }

}
</script>

<style lang="scss" scoped>
</style>