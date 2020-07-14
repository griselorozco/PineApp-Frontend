<template>
  <v-app-bar
    absolute
    color="black"
    flat
  >
    <v-container>
      <v-row align="center">
        <v-img
          aspect-ratio="1"
          max-width="41"
          max-height="40"
          src="@/assets/cara-feliz.png"
        />

        <v-spacer />

        <v-btn
          text
          @click="$router.push('/pages/login')"
        >
          <v-icon
            left
            size="20"
          >
            mdi-fruit-pineapple
          </v-icon>
          <span> Iniciar Sesión </span>
        </v-btn>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
  export default {
    name: 'PagesCoreAppBar',

    data: () => ({
    }),
  }
</script>
