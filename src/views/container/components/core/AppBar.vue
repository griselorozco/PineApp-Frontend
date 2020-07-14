<template>
  <v-app-bar
    absolute
    app
    color="transparent"
    flat
    height="75"
    style="width: auto;"
  >
    <v-btn
      fab
      small
      @click="$vuetify.breakpoint.smAndDown ? setDrawer(!drawer) : $emit('input', !value)"
    >
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn>
    <v-spacer />
    <router-link to="/app">
      <v-img
        src="../../../../assets/logoP.png"
        max-width="150"
      />
    </router-link>

    <v-spacer />

    <v-menu
      bottom
      left
      min-width="200"
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          min-width="0"
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list
        :tile="false"
        flat
        nav
      >
        <app-bar-item :to="{name:'User Profile', params:{id: perfil_id}}">
          <v-list-item-title>Perfil</v-list-item-title>
        </app-bar-item>

        <template>
          <app-bar-item>
            <v-list-item-title v-text="'Monto: ' + dinero + ' $'" />
          </app-bar-item>
        </template>
        <template v-for="(p, i) in profile">
          <v-divider
            v-if="p.divider"
            :key="`divider-${i}`"
            class="mb-2 mt-2"
          />

          <app-bar-item
            v-else
            :key="`item-${i}`"
            :to="p.to"
          >
            <v-list-item-title
              @click="onHandler(p.value)"
              v-text="p.title"
            />
          </app-bar-item>
        </template>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
// Components
  import { VHover, VListItem } from 'vuetify/lib'

  // Utilities
  import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

  export default {
    name: 'DashboardCoreAppBar',

    components: {
      AppBarItem: {
        render (h) {
          return h(VHover, {
            scopedSlots: {
              default: ({ hover }) => {
                return h(
                  VListItem,
                  {
                    attrs: this.$attrs,
                    class: {
                      'black--text': !hover,
                      'white--text secondary elevation-12': hover,
                    },
                    props: {
                      activeClass: '',
                      dark: hover,
                      link: true,
                      ...this.$attrs,
                    },
                  },
                  this.$slots.default
                )
              },
            },
          })
        },
      },
    },

    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      notifications: [
        'Mike John Responded to your email',
        'You have 5 new tasks',
        "You're now friends with Andrew",
        'Another Notification',
        'Another one',
      ],
      profile: [
        { title: 'Ajustes', to: '/app/ajustes' },
        { divider: true },
        { title: 'Cerrar Sesión', value: 'logout' },
      ],
    }),

    computed: {
      ...mapState(['drawer']),
      perfil_id () {
        return JSON.parse(localStorage.getItem('perfil'))._id
      },
      dinero () {
        return this.dineroGetter()
      },
    },

    created () {
      this.obtenerDinero()
    },

    methods: {
      ...mapActions(['obtenerDinero']),
      ...mapGetters(['dineroGetter']),
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),
      ...mapActions(['logout_action']),
      onHandler: function (name) {
        switch (name) {
          case 'logout':
            this.logout()

            break

          default:
            break
        }
      },
      logout: function () {
        // configurar aqui todo el cierre de session
        this.$swal({
          title: '¿Estás seguro de que deseas cerrar sesión?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
        }).then(async result => {
          if (result.value) {
            const resp = this.logout_action()
            if (resp) {
              const Toast = this.$swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: false,
              })

              Toast.fire({
                icon: 'success',
                title: '¡Sesión cerrada con éxito!',
              })
            }
          }
        })
      },
    },
  }
</script>
