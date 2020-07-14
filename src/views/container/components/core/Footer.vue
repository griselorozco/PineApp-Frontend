<template>
  <v-footer
    id="dashboard-core-footer"
  >
    <v-container>
      <v-col
        cols="12"
        md="auto"
      >
        <div class="body-1 font-weight-light pt-6 pt-md-0 text-center">
          &copy; 2020, hecho con
          <v-icon size="18">
            mdi-heart
          </v-icon>
          Por el equipo de PineApp.
        </div>
      </v-col>
    </v-container>
  </v-footer>
</template>

<script>
  export default {
    name: 'DashboardCoreFooter',

    data: () => ({
    }),
  }
</script>

<style lang="sass">
  #dashboard-core-footer
    a
      color: #3c4858
      font-size: .825rem
      font-weight: 500
      text-decoration: none
      text-transform: uppercase
</style>
