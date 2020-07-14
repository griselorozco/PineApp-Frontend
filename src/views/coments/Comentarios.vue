<template>
  <v-container
    fluid
    class="mt-n12"
  >
    <v-row
      justify="center"
      class="mt-n12"
    >
      <v-col
        v-for="(item, index) in comentarios"
        :key="index"
        cols="12"
        md="6"
      >
        <v-list-item three-line>
          <v-list-item-content>
            <router-link
              :to="{
                to: 'app/user',
              }"
              style="color:#000000;"
            >
              <v-list-item-title
                class="headline"
              >
                <h6>{{ item.perfil_id.nick }}</h6>
              </v-list-item-title>
            </router-link>

            <v-list-item-subtitle>
              {{ moment(item.fecha).locale('es').fromNow() }}
            </v-list-item-subtitle>
            <span>{{ item.comentario }}</span>
          </v-list-item-content>

          <v-btn
            v-if="perfil._id==item.perfil_id._id"
            icon
            @click.prevent="eliminarComentario(item._id)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item>
        <v-divider />
      </v-col>
    </v-row>
    <v-footer
      fixed
      width="100%"
    >
      <v-text-field
        v-model="comentario"
        label="Comentar..."
        single-line
        solo
        append-icon="send"
        color="oficial"
      >
        <template v-slot:append>
          <v-form
            ref="form"
          >
            <v-btn
              icon
              tile
              small
              type="submit"
              @click.prevent="comentar()"
            >
              <v-icon>
                mdi-send
              </v-icon>
            </v-btn>
          </v-form>
        </template>
      </v-text-field>
    </v-footer>
  </v-container>
</template>

<script>
  import { getPublicacion, destroyComentario, realizarComentario } from '@/api/modules'

  import { mapState } from 'vuex'
  export default {
    namw: 'Comentario',
    data: () => ({
      perfil: '',
      comentarios: [],
      publicacion: '',
      comentario: '',
    }),
    computed: {
      ...mapState(['user']),
    },
    async created () {
      this.perfil = JSON.parse(localStorage.getItem('perfil'))

      const serviceResponse = await getPublicacion(this.$route.params.id)
      if (serviceResponse.ok === true) {
        this.comentarios = serviceResponse.publicacion.comentarios
        console.log(this.comentarios)
      } else {
        console.log(serviceResponse)
        this.$swal({
          title: '¡ERROR!',
          html: serviceResponse.mensaje.text,
          icon: 'error',
        })
      }

      /* this.publicacion= coment */
    },
    methods: {
      async comentar () {
        const formData = new FormData()
        formData.append('comentario', this.comentario)

        const serviceResponse = await realizarComentario(formData, this.$route.params.id)

        if (serviceResponse.ok === true) {
          /* this.$router.push('/coments/comentarios/' + this.$route.params.id) */
          /* this.comentarios.push(this.comentario) */
          this.comentario = ''
          const comentario = serviceResponse.publicacion.comentarios.pop()
          this.comentarios.push(comentario)
          this.$swal({
            title: '¡Comentario creado!',
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
      },
      async eliminarComentario (comentarioId) {
        this.$swal({
          title: '¿Estás seguro de que deseas eliminar este comentario?',
          text: 'Su comentario será eliminado de la publicación',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
        }).then(async (result) => {
          if (result.value) {
            const serviceResponse = await destroyComentario(this.$route.params.id, comentarioId)

            if (serviceResponse.ok === true) {
              const index = this.comentarios.findIndex(item => item._id === comentarioId)
              this.comentarios.splice(index, 1)

              this.$swal(
                '¡Comentario eliminado con éxito!',
                'success',
              )
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

<style>
a {  text-decoration: none;}
</style>

<style lang="sass">
  #coments-core-footer
    a
      color: #FFFFFF
      font-size: .825rem
      font-weight: 500
      text-decoration: none
      text-transform: uppercase

  .v-footer
            position: fixed !important
            padding: 0px 0px 0px 0px
            bottom: 0
            width: 100%
            height: 49px
            background: grey
</style>
