<template>
  <v-content
    id="pages"
    :class="$vuetify.theme.dark ? undefined : 'grey lighten-3'"
  >
    <v-img
      :class="{}"
      :src="require(`@/assets/${src || 'clint-mckoy.jpg'}`)"
      gradient="to top, rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)"
      min-height="100%"
    >
      <v-row
        align="center"
        class="text-center"
        justify="center"
      >
        <pages-image />
      </v-row>
      <v-row
        align="center"
        class="text-center"
        justify="center"
      >
        <v-col
          class="mb-10"
          cols="12"
        >
          <pages-heading class="mb-12">
            Bienvenidos a PineApp
          </pages-heading>

          <div class="display-1 font-weight-light grey--text text--lighten-2">
            PineApp es una red social. Puedes subir fotos para compartirlas con los demás usuarios y ¡Puedes ganar dinero!
          </div>
        </v-col>

        <template v-for="(plan, i) in plans">
          <v-col
            :key="i"
            class="d-flex"
            cols="12"
            sm="6"
            md="3"
          >
            <pages-plan-card :plan="plan" />
          </v-col>

          <v-col
            v-if="(i === 1 && $vuetify.breakpoint.smAndDown) && i + 1 !== plans.length"
            :key="`divider-${i}`"
            class="pa-6"
            cols="12"
          />
        </template>

        <v-card
          :color="!plans.best ? 'transparent elevation-0' : undefined"
          class="v-card--plan mx-auto pt-3 pb-4 px-2 text-center"
          max-width="100%"
        >
          <v-avatar
            style="border-radius: 50%;"
            size="130"
          >
            <v-icon
              size="64"
            >
              mdi-account
            </v-icon>
          </v-avatar>

          <h2
            class="display-2 font-weight-light"
          >
            Regístrate
          </h2>

          <v-card-text
            class="body-1 font-weight-light pa-1"
          >
            ¡Regístrate ahora y comienza a compartir!
          </v-card-text>
          <v-btn
            color="white"
            @click="$router.push('/pages/register')"
          >
            <span class="display-1 black--text">¡Regístrate!</span>
          </v-btn>
        </v-card>
      </v-row>
    </v-img>
  </v-content>
</template>

<script>
  export default {
    name: 'PagesCoreView',

    components: {
      PagesHeading: () => import('../../components/Heading'),
      PagesPlanCard: () => import('../../components/PlanCard'),
      PagesImage: () => import('../../components/Image'),
    },

    data: () => ({
      srcs: {
        '/': 'login.jpg',
      },
      plans: [
        {
          icon: 'mdi-camera',
          title: 'Comparte Fotos',
          text: 'Postea tus increibles ideas y transformalas en algo genial',
        },
        {
          icon: 'mdi-account-heart',
          title: 'Mira Lo Que Otros Usuarios Comparten',
          text: 'Ve lo que los demas usuarios postean y reacciona a ello',
        },
        {
          icon: 'mdi-cash-usd',
          title: 'Gana dinero',
          text: 'Si a las personas les gusta lo que posteas, ¡ganaras dinero!',
        },
      ],
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

    .v-card--plan
      .v-avatar
        border-radius: 50%
        border: 1px solid #E5E5E5
</style>
