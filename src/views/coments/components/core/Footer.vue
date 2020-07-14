<template>
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
</template>

<script>
  import { realizarComentario } from '@/api/modules'
  export default {
    name: 'PagesCoreFooter',

    data: () => ({
      comentario: '',
    }),
    methods: {
      async comentar () {
        const formData = new FormData()
        formData.append('comentario', this.comentario)

        const serviceResponse = await realizarComentario(formData, this.$route.params.id)

        if (serviceResponse.ok === true) {
          this.$router.push('/coments/comentarios/' + this.$route.params.id)
          this.comentario = ''
          this.$swal(
            '¡Comentario creado!',
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
      },
    },
  }
</script>

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
