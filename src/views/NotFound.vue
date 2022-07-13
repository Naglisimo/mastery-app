<template>
    <div>
        <h1>Oops!</h1>
        <h3>The {{ resource }} does not exist! Come back home, baby!</h3>
        <router-link :to="{ name: 'event-list' }">I'm coming back!</router-link>
    </div>
</template>

<script>
export default {
    props: {
        resource: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
</style>