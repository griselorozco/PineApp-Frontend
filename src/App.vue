<template>
  <router-view />
</template>

<script>
  import Events from './events/event'
  import { mapActions } from 'vuex'
  export default {
    name: 'App',

    created () {
      Events.forEach(item => {
        this.$on(item.name, item.callback)
      })
      window.getApp = this
      this.leer_token()
    },
    methods: {
      ...mapActions(['leer_token']),
    },
  }
</script>
