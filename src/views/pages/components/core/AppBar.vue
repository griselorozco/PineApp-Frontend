<template>
  <v-app-bar
    absolute
    color="black"
    flat
  >
    <v-container>
      <v-row align="center">
        <v-toolbar-title
          class="font-weight-light"
          v-text="title"
        />

        <v-img
          aspect-ratio="1"
          max-width="41"
          max-height="40"
          src="@/assets/cara-feliz.png"
        />

        <v-spacer />

        <v-btn @click="$router.push('/pages/login')">
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
      items: [
        {
          icon: 'mdi-view-dashboard',
          text: 'Dashboard',
          to: '/',
        },
        {
          icon: 'mdi-currency-usd',
          text: 'Pricing',
          to: '/pages/pricing',
        },
        {
          icon: 'mdi-account-multiple-plus',
          text: 'Register',
          to: '/pages/register',
        },
        {
          icon: 'mdi-fingerprint',
          text: 'Login',
          to: '/pages/login',
        },
      ],
      titles: {
        '/pages/login': 'Login',
        '/pages/register': 'Registro',
        '/pages/welcome': 'PineApp',
      },
    }),

    computed: {
      title () {
        return this.titles[this.$route.path]
      },
    },
  }
</script>
