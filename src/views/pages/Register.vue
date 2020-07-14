<template>
  <v-container
    id="login"
    class="fill-height"
    tag="section"
  >
    <v-btn
      class="mt-10"
      fab
      small
      color="secondary"
      absolute
      left
      top
      @click="$router.go(-1)"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-img
      class="mt-n12 mb-n12"
      src="@/assets/logo2.png"
      height="36%"
    />
    <v-row
      justify="center"
      class="mt-n12"
    >
      <v-col
        cols="12"
        md="6"
      >
        <base-material-card
          color="primary"
          icon="mdi-account-plus"
          title="Registra tus datos"
          class="px- py-3"
        >
          <v-form
            ref="form"
            v-model="valid"
            class="mt-n2"
            lazy-validation
          >
            <v-text-field
              v-model="usuario.nombre"
              label="Nombre"
              :rules="nombre_rules"
            />

            <v-text-field
              v-model="usuario.apellido"
              label="Apellido"
              :rules="apellido_rules"
            />

            <v-text-field
              v-model="usuario.nick"
              label="Nombre de usuario"
              :rules="nombre_usuario_rules"
            />

            <v-text-field
              v-model="usuario.password"
              :type="show1 ? 'text' : 'password'"
              label="Contraseña"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              counter
              required
              @click:append="show1 = !show1"
            />

            <v-text-field
              v-model="usuario.confirmar_password"
              :type="show1 ? 'text' : 'password'"
              label="Confirmar contraseña"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, confirmacion_de_contraseña, rules.min]"
              counter
              required
              @click:append="show1 = !show1"
            />

            <v-text-field
              v-model="usuario.correo"
              label="Correo"
              :rules="[rules2.emailRules]"
            />

            <v-select
              v-model="usuario.sexo"
              label="Género"
              :items="generos"
              class="purple-input"
              :rules="[v => !!v || 'Género Requerido']"
            />

            <v-text-field
              v-model="usuario.edad"
              type="number"
              label="Edad"
              :rules="numberRules"
            />

            <v-textarea
              v-model="usuario.acerca_de_ti"
              rows="3"
              label="Acerca de ti"
              counter
              :rules="acerca_rules"
            />
          </v-form>
          <v-col
            cols="12"
            class="text-center mt-n3"
          >
            <v-btn
              type="submit"
              color="secondary"
              @click="crearUsuario()"
            >
              Guardar
            </v-btn>
          </v-col>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { createUser } from '@/api/modules'
  export default {
    name: 'PagesLogin',

    data: () => ({
      valid: false,
      show1: false,
      usuario: {},
      nombre_rules: [v => !!v || 'Nombre Requerido'],
      apellido_rules: [v => !!v || 'Apellido Requerido'],
      acerca_rules: [v => !!v || 'Acerca de ti Requerido'],
      nombre_usuario_rules: [v => !!v || 'Nombre de usuario Requerido'],
      rules2: {
        emailRules: v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(v) || 'Correo inválido.'
        },
      },
      numberRules: [
        v => !!v || 'Edad Requerida',
        v => v > 0 || 'Deben ser números positivos',
      ],
      rules: {
        required: value => !!value || 'Cotraseña requerida',
        min: v => (v || '').length >= 8 || 'Min 8 caracteres',
      },
      generos: [{ text: 'Masculino', value: 'Masculino' }, { text: 'Femenino', value: 'Femenino' }, { text: 'Prefiero no decirlo', value: 'Prefiero no decirlo' }],
    }),
    computed: {
      confirmacion_de_contraseña () {
        return (this.usuario.password === this.usuario.confirmar_password) || 'La contraseña no coincide'
      },
    },
    methods: {
      async crearUsuario () {
        if (this.$refs.form.validate()) {
          this.$swal({
            title: '¿Estás seguro de que deseas continuar?',
            text: 'Al confirmar estás aceptando los términos y servicio de PineApp',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
          }).then(async (result) => {
            if (result.value) {
              const serviceResponse = await createUser(this.usuario)
              if (serviceResponse.ok === true) {
                this.$swal(
                  '¡Cuenta creada exitosamente!',
                  'Ahora inicia sesión, ¡Bienvenido a PineApp!',
                  'success',
                )
                this.$router.push('/pages/login')
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
    },
  }
</script>
