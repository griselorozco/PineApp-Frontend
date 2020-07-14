<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <base-material-card
          v-if="perfil.tarjetas.length > 0"
          color="success"
          inline
          title="Retira tus fondos"
          class="px-5 py-3"
        >
          <v-col
            cols="auto"
            class="text-center"
          >
            <v-subheader class="display-1 mt-3">
              Elige tu tarjeta para recibir tu pago
            </v-subheader>
            <v-form class="pt-1">
              <v-row>
                <v-col
                  cols="12"
                  lg="3"
                >
                  <v-radio-group
                    column
                    class="ml-4 mt-0"
                    row
                    prepend-icon="mdi-credit-card"
                    mandatory
                  >
                    <v-radio
                      v-for="(item, index) in perfil.tarjetas"
                      :key="index"
                      :label="item.numero"
                      :value="index"
                    />
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-form>
          </v-col>

          <v-card-actions class="justify-center">
            <v-btn
              color="success"
              min-width="100"
              @click="procesarPago()"
            >
              Enviar pago
            </v-btn>
          </v-card-actions>
        </base-material-card>

        <base-material-card
          v-else
          color="success"
          inline
          title="Retira tus fondos"
          class="px-5 py-3"
        >
          <v-col
            cols="auto"
            class="text-center"
          >
            <v-subheader class="display-1 mt-3">
              ¡No posee tarjetas registradas!
            </v-subheader>
          </v-col>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  import { mapMutations } from 'vuex'
  import { pagar } from '@/api/modules'
  export default {

    data: () => ({
      perfil: '',
    }),
    created () {
      this.perfil = JSON.parse(localStorage.getItem('perfil'))
    },
    methods: {
      ...mapMutations(['set_dinero']),
      async procesarPago () {
        this.$swal({
          title: '¿Estás seguro que quieres procesar tu pago?',
          text: 'Esta acción no tiene vuelta atrás',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
        }).then(async (result) => {
          if (result.value) {
            const serviceResponse = await pagar()
            if (serviceResponse.ok === true) {
              this.set_dinero(0)
              this.$swal({
                title: '¡Pago procesado con Éxito!',
                text: 'El pago llegará a su cuenta dentro las próximas 48 horas',
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
