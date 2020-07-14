<template>
  <v-app-bar
    app
    flat
    hide-on-scroll
  >
    <v-btn
      icon
      @click="$router.go(-1)"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-toolbar-title>Comentarios</v-toolbar-title>
    <v-spacer />
  </v-app-bar>
</template>

<script>
  export default {
    name: 'PagesCoreAppBar',

    data: () => ({
    }),
  }
</script>
