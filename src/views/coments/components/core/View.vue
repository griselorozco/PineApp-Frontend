<template>
  <v-content
    id="pages"
    :class="$vuetify.theme.dark ? undefined : 'grey lighten-3'"
  >
    <v-img
      :class="{ }"
      :src="require(`@/assets/${src || 'fondo_blanco.png'}`)"
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
        '/coments/comentarios': 'fondo_blanco.png',
      },
    }),

    computed: {
      src () {
        return this.srcs[this.$route.path]
      },
    },
  }
</script>
