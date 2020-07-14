<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-sheet
      color="primary"
      class="text-start v-card--material__heading mt-9 pa-4"
      shaped
      elevation="0"
    >
      <v-tabs
        v-model="tabs"
        background-color="primary"
        slider-color="white"
        color="primary"
        show-arrows
      >
        <v-tab class="white--text">
          <h5 class="mr-n3">
            Publicaciones
          </h5>
        </v-tab>
        <v-tab
          class="ml-5 white--text"
        >
          <h5>Publicaciones de tus seguidores</h5>
        </v-tab>
      </v-tabs>
    </v-sheet>
    <v-tabs-items
      v-model="tabs"
      class="transparent"
    >
      <v-tab-item :kei="0">
        <v-row>
          <v-col
            v-for="(publi, index) in publicaciones.publicaciones"
            :key="index"
            sm="12"
            md="4"
          >
            <base-material-card
              color="transparent"
              image
              hover-reveal
            >
              <template v-slot:image>
                <v-img :src="imagenUrl+publi.imagen" />
              </template>
              <template v-slot:reveal-actions>
                <v-tooltip bottom>
                  <template v-slot:activator="{ attrs, on }">
                    <v-btn
                      v-bind="attrs"
                      class="mx-1"
                      color="primary"
                      light
                      icon
                      @click.prevent="darLike(publi._id)"
                      v-on="on"
                    >
                      <v-icon class="primary--text">
                        mdi-heart
                      </v-icon>
                    </v-btn>
                  </template>

                  <span>Me gusta</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ attrs, on }">
                    <v-btn
                      v-bind="attrs"
                      class="mx-1"
                      color="success"
                      light
                      icon
                      v-on="on"
                      @click="$router.push('/coments/comentarios/'+publi._id)"
                    >
                      <v-icon class="secondary--text">
                        mdi-chat
                      </v-icon>
                    </v-btn>
                  </template>

                  <span>Comentarios</span>
                </v-tooltip>
                <v-tooltip
                  v-if="perfil._id === publi.perfil_id._id"
                  bottom
                >
                  <template v-slot:activator="{ attrs, on }">
                    <v-btn
                      v-bind="attrs"
                      class="mx-1"
                      color="primary"
                      light
                      icon
                      v-on="on"
                      @click="$router.push('/app/pages/create_post/'+publi._id)"
                    >
                      <v-icon class="primary--text">
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                  </template>

                  <span>Editar</span>
                </v-tooltip>
              </template>

              <v-card-title class="justify-center font-weight-light">
                {{ publi.titulo }}
              </v-card-title>

              <v-card-text
                class="body-1 text-center mb-3 font-weight-light grey--text"
              >
                {{ publi.descripcion }}
              </v-card-text>
              <router-link :to="`/app/user/${publi.perfil_id._id}`">
                <span class="body-1 text-left mb-3 font-weight-light grey--text">De {{ publi.perfil_id.nick }}</span>
              </router-link>

              <div
                v-if="perfil._id === publi.perfil_id._id"
                class="text-right mt-n8"
              >
                <v-btn
                  class="mt-n3"
                  color="black"
                  large
                  icon
                  fab
                  @click="eliminar_publicacion(publi._id)"
                >
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
              </div>

              <div
                v-if="perfil._id !== publi.perfil_id._id && verificar_seguir(publi.perfil_id._id) === false"
                class="text-right mt-n8"
              >
                <v-btn
                  class="mt-n3"
                  color="primary"
                  large
                  icon
                  fab
                  @click.prevent="seguirPerfil(publi.perfil_id._id)"
                >
                  <v-icon>mdi-account-plus</v-icon>
                </v-btn>
              </div>
              <div
                v-if="perfil._id !== publi.perfil_id._id && verificar_seguir(publi.perfil_id._id) === true"
                class="text-right mt-n8"
              >
                <v-btn
                  class="mt-n3"
                  color="primary"
                  large
                  icon
                  fab
                  @click.prevent="dejarSeguirPerfil(publi.perfil_id._id)"
                >
                  <v-icon>mdi-account-minus</v-icon>
                </v-btn>
              </div>

              <template v-slot:actions>
                <span class="body-1 text-center mb-3 font-weight-light grey--text">
                  <v-icon color="primary">mdi-heart</v-icon>{{ publi.cantidadLike }}
                </span>

                <v-spacer />

                <router-link :to="'/coments/comentarios/'+publi._id">
                  <div class="display-1 font-weight-light grey--text">
                    <v-icon color="secondary">
                      mdi-chat
                    </v-icon>{{ publi.comentarios.length }} Comentarios
                  </div>
                </router-link>
              </template>
            </base-material-card>
          </v-col>

          <v-fab-transition>
            <v-btn
              fab
              dark
              fixed
              color="secondary"
              bottom
              right
              large
              @click="crearPublicacion()"
            >
              <v-icon>mdi-camera</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-row>
      </v-tab-item>
      <!-- publicaciones de seguidores -->
      <v-tab-item :kei="1">
        <v-row>
          <v-col
            v-for="(publi, index) in publicacionesSeguidores.publicacion"
            :key="index"
            sm="12"
            md="4"
          >
            <base-material-card
              color="transparent"
              image
              hover-reveal
            >
              <template v-slot:image>
                <v-img :src="imagenUrl+publi.imagen" />
              </template>
              <template v-slot:reveal-actions>
                <v-tooltip bottom>
                  <template v-slot:activator="{ attrs, on }">
                    <v-btn
                      v-bind="attrs"
                      class="mx-1"
                      color="primary"
                      light
                      icon
                      @click.prevent="darLike(publi._id)"
                      v-on="on"
                    >
                      <v-icon class="primary--text">
                        mdi-heart
                      </v-icon>
                    </v-btn>
                  </template>

                  <span>Me gusta</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ attrs, on }">
                    <v-btn
                      v-bind="attrs"
                      class="mx-1"
                      color="success"
                      light
                      icon
                      v-on="on"
                      @click="$router.push('/coments/comentarios/'+publi._id)"
                    >
                      <v-icon class="secondary--text">
                        mdi-chat
                      </v-icon>
                    </v-btn>
                  </template>

                  <span>Comentarios</span>
                </v-tooltip>
                <v-tooltip
                  v-if="perfil._id==publi.perfil_id._id"
                  bottom
                >
                  <template v-slot:activator="{ attrs, on }">
                    <v-btn
                      v-bind="attrs"
                      class="mx-1"
                      color="primary"
                      light
                      icon
                      v-on="on"
                      @click="$router.push('/app/pages/create_post/'+publi._id)"
                    >
                      <v-icon class="primary--text">
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                  </template>

                  <span>Editar</span>
                </v-tooltip>
              </template>

              <v-card-title class="justify-center font-weight-light">
                {{ publi.titulo }}
              </v-card-title>

              <v-card-text
                class="body-1 text-center mb-3 font-weight-light grey--text"
              >
                {{ publi.descripcion }}
              </v-card-text>
              <span class="body-1 text-left mb-3 font-weight-light grey--text">De {{ publi.perfil_id.nick }}</span>
              <div
                v-if="perfil._id !== publi.perfil_id._id"
                class="text-right mt-n8"
              >
                <v-btn
                  class="mt-n3"
                  color="primary"
                  large
                  icon
                  fab
                  @click.prevent="dejarSeguirPerfil(publi.perfil_id._id)"
                >
                  <v-icon>mdi-account-minus</v-icon>
                </v-btn>
              </div>

              <template v-slot:actions>
                <span class="body-1 text-center mb-3 font-weight-light grey--text">
                  <v-icon color="primary">mdi-heart</v-icon>{{ publi.cantidadLike }}
                </span>

                <v-spacer />

                <router-link :to="'/coments/comentarios/'+publi._id">
                  <div class="display-1 font-weight-light grey--text">
                    <v-icon color="secondary">
                      mdi-chat
                    </v-icon>{{ publi.comentarios.length }} Comentarios
                  </div>
                </router-link>
              </template>
            </base-material-card>
          </v-col>

          <v-fab-transition>
            <v-btn
              fab
              dark
              fixed
              color="secondary"
              bottom
              right
              large
              @click="crearPublicacion()"
            >
              <v-icon>mdi-camera</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
  /* eslint-disable */
  import { getPublicaciones, like, getPublicacionesSeguidores, seguir, getPublicacionesNoSeguidores, getUserById, deletePublicacion } from '@/api/modules'
  import { mapActions } from 'vuex'
  export default {
    name: 'DashboardDashboard',
    data () {
      return {
        perfil: '',
        tiles: [
          { icon: 'mdi-alert-octagon', title: 'Denunciar Post' },
          { icon: 'mdi-account-minus', title: 'Dejar de seguir' },
        ],
        sheet: false,
        publicacion: {
          ok: false,
          mensaje: '',
          publicaciones: [],
          like: false,
        },
        publicaciones: [],
        publicacionesSeguidores: [],
        imagenUrl: 'http://localhost:3004/public/upload/',
        tabs: 0,
      }
    },
    computed: {

     
 
    },
    /* eslint-disable vue/no-template-shadow */
    async created () {
      this.perfil = JSON.parse(localStorage.getItem('perfil'))

      this.publicacionesAll()
      
      this.publicacionSeguidores()

    },

    methods: {
      ...mapActions(['leer_token']),
      crearPublicacion () {
        this.$router.push({
          name: 'Create Post',
          params: {
            opcion: 1, // opcion 1 para crear
          },
        })
      },

      verificar_seguir (publicacion_usuario_id) {
        var check = false
        for (let i = 0; i < this.perfil.siguiendo.length; i++) {
          if (this.perfil.siguiendo[i] === publicacion_usuario_id) {
            return true
          } else {
            check = false
          }
        }
        return check
      },
 
      async darLike (publicacionId) {
        const publicacion = await like(publicacionId)

        if (publicacion.ok === true) {
          const publi = this.publicaciones.publicaciones
          for (let i = 0; i < publi.length; i++) {
            if (JSON.stringify(publi[i]._id) === JSON.stringify(publicacion.publicacion._id)) {
              publi[i].cantidadLike = publicacion.publicacion.cantidadLike
              
            }
          }

          const publicc = this.publicacionesSeguidores.publicacion
          for (let i = 0; i < publicc.length; i++) {
            if (JSON.stringify(publicc[i]._id) === JSON.stringify(publicacion.publicacion._id)) {
              publicc[i].cantidadLike = publicacion.publicacion.cantidadLike
              
            }
          }


        } else {
          console.log(publicacion)
          this.$swal({
            title: '¡ERROR!',
            html: publicacion.mensaje.text,
            icon: 'error',
          })
        }
      },

      async publicacionesAll(){
        const serviceResponse = await  getPublicaciones()
        if (serviceResponse.ok === true) {
         
          this.publicaciones = serviceResponse
          // eslint-disable-next-line no-unused-vars
          const publicacion = this.publicaciones.publicaciones
         console.log(this.publicaciones)
        } else {
          console.log(serviceResponse)
          this.$swal({
            title: '¡ERROR!',
            html: serviceResponse.mensaje.text,
            icon: 'error',
          })
        }
      },
      async publicacionSeguidores(){
        const serviceResponse = await getPublicacionesSeguidores()
        if (serviceResponse.ok === true) {
          this.publicacionesSeguidores = serviceResponse
         
        } else {
          console.log(serviceResponse)
          this.$swal({
            title: '¡ERROR!',
            html: serviceResponse.mensaje.text,
            icon: 'error',
          })
        }
      },
      async eliminar_publicacion (publi) {
        this.$swal({
            title: '¿Estás seguro de que deseas eliminar tu publicación?',
            text: 'Esta acción tiene un efecto permanente',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
          }).then(async (result) => {
            if (result.value) {

              const serviceResponse = await deletePublicacion(publi)
            if (serviceResponse.ok === true) {
              console.log(serviceResponse)
               const index = this.publicaciones.publicaciones.findIndex(item => item._id === publi)
              this.publicaciones.publicaciones.splice(index, 1)
               this.$swal({
                    text: '¡Su pubicación ha sido eliminada con exito!',
                    icon: 'success'
                  })
            } else {
              console.log(serviceResponse)
              this.$swal({
                title: '¡ERROR!',
                html: serviceResponse.mensaje.text,
                icon: 'error',
              })
            }

            }
          })
      },
      async seguirPerfil(perfilId){
           this.$swal({
            title: '¿Estás seguro de que deseas seguir este usuario?',
            text: 'Las publicaciones de este usuario ahora podrás visualizarlas en la sección seguidores',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
          }).then(async (result) => {
            if (result.value) {
              const serviceResponse = await seguir(perfilId)
              if (serviceResponse.ok === true) {
                  console.log(serviceResponse)
                const resp = await getUserById(this.perfil._id)
                if (resp.ok === true) {
                  this.$swal({
                    text: '¡Ahora sigues al usuario ' +serviceResponse.perfilSiguiendo.nick+ ' !',
                    icon: 'success'
                  })
                  localStorage.setItem("perfil", JSON.stringify(resp.perfil));
                  this.perfil = JSON.parse(localStorage.getItem('perfil'))
                  this.leer_token()
                  this.publicacionesAll()
                  this.publicacionSeguidores()
                } else {
                  console.log(serviceResponse)
                  this.$swal({
                    title: '¡ERROR!',
                    html: serviceResponse.mensaje.text,
                    icon: 'error',
                  })
                }
              } else {
                console.log(serviceResponse)
                this.$swal({
                  title: '¡ERROR!',
                  html: serviceResponse.mensaje.text,
                  icon: 'error',
                })
              }
            }
          })
    },
      async dejarSeguirPerfil(perfilId){
           this.$swal({
            title: '¿Estás seguro de que desea dejar de seguir a este usuario?',
            text: 'Las publicaciones de este usuario se dejarán de visualizar en la sección de seguidores',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
          }).then(async (result) => {
            if (result.value) {
              const serviceResponse = await seguir(perfilId)
              if (serviceResponse.ok === true) {
                 console.log(serviceResponse)
              const resp = await getUserById(this.perfil._id)
                if (resp.ok === true) {
                  this.$swal({
                    text: `¡Dejaste de seguir a ${serviceResponse.perfilSiguiendo.nick} !`,
                    icon: 'success'
                  })
                  localStorage.setItem("perfil", JSON.stringify(resp.perfil));
                  this.perfil = JSON.parse(localStorage.getItem('perfil'))
                  this.leer_token()
                  this.publicacionesAll()
                  this.publicacionSeguidores()
                } else {
                  console.log(serviceResponse)
                  this.$swal({
                    title: '¡ERROR!',
                    html: serviceResponse.mensaje.text,
                    icon: 'error',
                  })
                }
              } else {
                console.log(serviceResponse)
                this.$swal({
                  title: '¡ERROR!',
                  html: serviceResponse.mensaje.text,
                  icon: 'error',
                })
              }
            }
          })
    },
  }
}

</script>

<style>
a {
  text-decoration: none;
}
</style>

<style lang="sass">
.v-tabs-bar
  .v-slide-group__wrapper
    overflow: hidden !important
    display: -webkit-inline-box
    contain: inherit
    .v-slide-group__content
      z-index: 2
  .v-tab:not(:first-child)
      margin-left: 5px
</style>
