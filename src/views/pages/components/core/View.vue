<template>
  <v-content
    id="pages"
    :class="$vuetify.theme.dark ? undefined : 'grey lighten-3'"
  >
    <v-img
      :class="{ }"
      :src="require(`@/assets/${src || 'login.jpg'}`)"
      gradient="to top, rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)"
      min-height="100%"
    >
      <router-view />
    </v-img>
  </v-content>
</template>

<script>
  export default {
    name: 'PagesCoreView',

    data: () => ({
      srcs: {
        '/pages/404 error': 'login.jpg',
        '/pages/login': 'login.jpg',
        '/pages/register': 'login.jpg',
        '/pages/comentarios': 'fondo_blanco.png',
      },
    }),

    computed: {
      src () {
        return this.srcs[this.$route.path]
      },
    },
  }
</script>

<style lang="sass">
  #pages
    > .v-content__wrap > .v-image
      padding-top: 64px
      padding-bottom: 88px

    .v-image--md
      padding: 188px 0

    .v-image--sm
      padding: 96px 0 188px 0
</style>
