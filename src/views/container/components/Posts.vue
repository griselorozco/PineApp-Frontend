<template>
  <v-container fluid>
    <post
      v-for="(post, index) in posts"
      :key="index"
      :post="post"
    />
  </v-container>
</template>
<script>
  import { getPublicacionesUser, getPublicacionPorUsuario } from '@/api/modules'
  import Post from './shared/Post'
  export default {
    components: {
      Post,
    },
    props: {
      perfilId: {
        type: String,
        default: '',
      },
    },
    data: () => ({
      posts: [],
    }),
    created () {
      this.buscarPublicacionesPorUsuario()
    },
    methods: {
      async buscarPublicacionesPorUsuario () {
        const serviceResponse = await getPublicacionPorUsuario(this.perfilId)
        if (serviceResponse.ok === true) {
          console.log(serviceResponse)
          this.posts = serviceResponse.publicaciones
          console.log(this.posts)
        } else {
          console.log(serviceResponse)
          this.$swal({
            title: '¡ERROR!',
            html: serviceResponse.mensaje.text,
            icon: 'error',
          })
        }
      },

      async buscarPublicaciones () {
        const serviceResponse = await getPublicacionesUser()
        if (serviceResponse.ok === true) {
          console.log(serviceResponse)
          this.posts = serviceResponse.publicacions
          console.log(this.posts)
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
