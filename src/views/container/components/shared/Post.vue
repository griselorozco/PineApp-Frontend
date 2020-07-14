<template>
  <v-container fluid>
    <v-row>
      <v-col
        sm="12"
        md="4"
      >
        <base-material-card
          color="transparent"
          image
          hover-reveal
        >
          <template v-slot:image>
            <v-img
              :src="imagenUrl+post.imagen"
              @click.stop="dialog = true"
            />
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
                  @click.prevent="darLike(post._id)"
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
                  @click="$router.push('/coments/comentarios/'+post._id)"
                >
                  <v-icon class="secondary--text">
                    mdi-chat
                  </v-icon>
                </v-btn>
              </template>

              <span>Comentarios</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  class="mx-1"
                  color="primary"
                  light
                  icon
                  v-on="on"
                  @click="$router.push('/app/pages/create_post/'+post._id)"
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
            {{ post.titulo }}
          </v-card-title>

          <v-card-text
            class="body-1 text-center mb-3 font-weight-light grey--text"
          >
            {{ post.descripcion }}
          </v-card-text>
          <span class="body-1 text-left mb-3 font-weight-light grey--text">{{ post.perfil_id.nike }}</span>
          <div
            class="text-right mt-n8"
          >
            <v-btn
              class="mt-n3"
              color="black"
              large
              icon
              fab
              @click="eliminar_publicacion(post._id)"
            >
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
          </div>

          <template v-slot:actions>
            <span class="body-1 text-center mb-3 font-weight-light grey--text">
              <v-icon color="primary">mdi-heart</v-icon>
              {{ post.cantidadLike }}
            </span>

            <v-spacer />

            <div class="display-1 font-weight-light grey--text">
              <v-icon color="secondary">
                mdi-chat
              </v-icon>
              {{ post.comentarios.length }}
            </div>
          </template>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  // eslint-disable-next-line no-unused-vars
  import { like, getPublicacionesUser, deletePublicacion } from '@/api/modules'

  export default {
    // eslint-disable-next-line vue/require-prop-types
    props: ['post'],
    data: () => ({
      imagenUrl: 'http://localhost:3004/public/upload/',
      tiles: [
        { icon: 'mdi-alert-octagon', title: 'Denunciar Post' },
        { icon: 'mdi-account-minus', title: 'Dejar de seguir' },
      ],
      menu: false,
      sheet: null,
      dialog: false,
    }),
    methods: {
      async darLike (publicacionId) {
        const publicacion = await like(publicacionId)

        if (publicacion.ok === true) {
          const post = this.post

          post.cantidadLike = publicacion.publicacion.cantidadLike
        } else {
          console.log(publicacion)
          this.$swal({
            title: '¡ERROR!',
            html: publicacion.mensaje.text,
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
              this.$swal({
                text: '¡Su pubicación ha sido eliminada con exito!',
                icon: 'success',
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
    },
  }
</script>
