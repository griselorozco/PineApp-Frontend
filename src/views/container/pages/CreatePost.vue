
<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <base-material-card
          color="secondary"
          inline
          :title="titulo"
          class="px-5 py-3"
        >
          <v-form

            ref="form"
            v-model="valid"
            enctype="multipart/form-data"
            lazy-validation
          >
            <v-col
              v-if="opcion === 1"
              cols="auto"
              class="text-center"
            >
              <input
                ref="file"
                type="file"

                accept="image/*"
                class="d-none"
                @change="onChange"
              >
              <v-card
                :class="image ? 'success--text' : 'grey--text'"
                class="mx-auto mt-0 d-inline-flex v-card--account"
                outlined
                height="auto"
                width="auto"
                @click="$refs.file.click()"
              >
                <v-img
                  v-if="image"
                  :src="image"

                  height="100%"
                  width="100%"
                />
                <v-icon
                  v-else
                  class="mx-auto"
                  size="96"
                >
                  mdi-camera
                </v-icon>
              </v-card>

              <div class="font-weight-bold grey--text">
                Coloca una imagen para tu publicación
              </div>
            </v-col>
            <v-text-field
              v-model="publicacion.titulo"
              :counter="20"
              label="Titulo"
              required
              :rules="[v => !!v || 'Este campo es obligatorio']"
            />

            <v-textarea
              v-model="publicacion.descripcion"
              label="Descripción"
              required
              :rules="[v => !!v || 'Este campo es obligatorio']"
            />

            <v-btn
              v-if="opcion==1"
              :disabled="!valid"
              color="secondary"
              class="mr-4"
              type="submit"
              small
              @click.prevent="crearPublicacion()"
            >
              Cargar
            </v-btn>
            <v-btn
              v-else
              :disabled="!valid"
              color="secondary"
              class="mr-4"
              type="submit"
              small
              @click.prevent="actualizarPublicacion()"
            >
              Editar
            </v-btn>

            <v-btn
              color="error"
              class="mr-4"
              small
              @click="reset"
            >
              Limpiar
            </v-btn>

            <v-btn
              color="warning"
              small
              @click="resetValidation"
            >
              Salir
            </v-btn>
          </v-form>
          <v-fab-transition>
            <v-btn
              fab
              dark
              absolute
              color="secondary"
              right
              top
              class="mt-3 mr-3"
              @click="$router.go(-1)"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-fab-transition>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { createPublicacion, editPublicacion, updatePublicacion } from '@/api/modules'

  export default {
    name: 'PagesPublicacion',
    data: () => ({
      publicacion: {},
      valid: true,
      titulo: '',
      opcion: 0,
      image: null,
    }),

    mounted () {
      this.inicializar()
    },

    methods: {
      async crearPublicacion () {
        if (this.$refs.form.validate()) {
          this.$swal({
            title: '¿Estás seguro de que deseas crear esta publicación?',
            text: 'Su publicación será publicada en su perfil',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
          }).then(async (result) => {
            if (result.value) {
              console.log(this.publicacion.image)
              const formData = new FormData()
              formData.append('image', this.publicacion.image)
              formData.append('titulo', this.publicacion.titulo)
              formData.append('descripcion', this.publicacion.descripcion)
              const serviceResponse = await createPublicacion(formData)
              if (serviceResponse.ok === true) {
                this.$swal(
                  '¡Publicación creada con éxito!',
                  'success',
                )
                this.$router.push('/app')
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
        } else {
          this.$swal(
            '¡ERROR!',
            'Faltan campos por llenar',
            'error',
          )
        }
      },
      async inicializar () {
        this.opcion = this.$route.params.opcion
        if (this.opcion === 1) {
          this.titulo = 'Crea tu publicación'
        } else {
          this.titulo = 'Edita tu publicación'

          const serviceResponse = await editPublicacion(this.$route.params.id)

          if (serviceResponse.ok === true) {
            console.log(serviceResponse.publicacion)

            this.publicacion = { titulo: serviceResponse.publicacion.titulo, descripcion: serviceResponse.publicacion.descripcion }
          } else {
            console.log(serviceResponse)
            this.$swal({
              title: '¡ERROR!',
              html: serviceResponse.mensaje.text,
              icon: 'error',
            })
          }
        }
      },

      async actualizarPublicacion () {
        const serviceResponse = await updatePublicacion(this.$route.params.id, this.publicacion)

        if (serviceResponse.ok === true) {
          console.log(serviceResponse.publicacion)
          this.$swal(
            '¡Publicación actualizada con éxito!',
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

      onChange (val) {
        const value = val.target.files[0]

        if (!value) return (this.image = null)
        this.publicacion.image = value
        this.image = URL.createObjectURL(value)
      },
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
        this.image = ''
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>
