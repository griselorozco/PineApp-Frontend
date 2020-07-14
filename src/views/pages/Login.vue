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
      @click="$router.push('/')"
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
          icon="mdi-fruit-pineapple"
          title="Inicia Sesión"
          class="px- py-3"
        >
          <v-form
            ref="form"
            v-model="valid"
            class="mt-5"
            lazy-validation
          >
            <v-text-field
              v-model="usuario.correo"
              label="Correo"
              :rules="[rules2.emailRules]"
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
          </v-form>

          <v-card-actions class="justify-center">
            <v-btn
              color="secondary"
              min-width="100"
              @click="login()"
            >
              Iniciar Sesión
            </v-btn>
          </v-card-actions>
        </base-material-card>
        <center>
          <router-link
            to="/pages/register"
            style="color:#FFFFFF;"
          >
            ¿Intentas crearte una cuenta?
          </router-link>
        </center>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'PagesLogin',

    data: () => ({
      valid: false,
      show1: false,
      rules: {
        required: value => !!value || 'Cotraseña requerida',
        min: v => (v || '').length >= 8 || 'Min 8 caracteres',
      },
      rules2: {
        emailRules: v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(v) || 'Correo inválido.'
        },
      },
      usuario: {},
    }),
    methods: {
      ...mapActions(['login_action']),
      async login () {
        if (this.$refs.form.validate()) {
          const resp = await this.login_action(this.usuario)
          if (resp.ok) {
            const Toast = this.$swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 5000,
              timerProgressBar: false,
            })

            Toast.fire({
              icon: 'success',
              title: 'Sesión iniciada',
            })
          } else {
            this.$swal(
              '¡ERROR!',
              resp.mensaje.text,
              'error',
            )
          }
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
