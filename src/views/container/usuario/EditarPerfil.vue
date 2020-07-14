<!-- eslint-disable -->
<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <base-material-card
          color="secondary"
          inline
          title="Edita tu perfil"
          class="px-5 py-3"
        >
          <v-col cols="auto" class="text-center">
            <input ref="file" type="file" class="d-none" @change="onChange" />
            <v-card
              :class="perfil.imagen ? 'success--text' : 'grey--text'"
              class="mx-auto mt-0 d-inline-flex v-card--account"
              outlined
              height="106"
              width="106"
              @click="$refs.file.click()"
            >
              <img :src="imagenValue" height="100%" width="100%" />
              <!-- <v-icon v-else class="mx-auto" size="96">mdi-account</v-icon> -->
            </v-card>

            <div class="font-weight-bold grey--text">
              Cambia tu imagen de perfil
            </div>
          </v-col>
          <v-form class="mt-5">
            <v-text-field label="Nombre" v-model="perfil.nombre" />

            <v-text-field label="Apellido" v-model="perfil.apellido" />

            <v-text-field label="Nombre de usuario" v-model="perfil.nick" />

            <v-text-field label="Email" v-model="perfil.correo" />

            <v-textarea
              label="Acerca de ti"
              counter
              v-model="perfil.acerca_de_ti"
            />
            <v-card-actions class="justify-center">
              <v-btn color="success" min-width="100" @click="editarPerfil"
                >Guardar datos</v-btn
              >
            </v-card-actions>
            <br />
            <v-divider />
            <br />
            <p class="font-weight-bold">Información Privada</p>
            <v-text-field
             label="Número"
              v-model="tarjeta.numero"
              type="number"
              :rules="numberRules"
            />

            <v-select
              :items="tipos_tarjetas"
              label="Selecciona tu tipo de tarjeta"
              v-model="tarjeta.tipo"
            />

            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="tarjeta.fechaExpiracion"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="tarjeta.fechaExpiracion"
                  label="Fecha de expiración"
                  prepend-icon="event"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="tarjeta.fechaExpiracion"
                color="green lighten-1"
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false"
                  >Cancelar</v-btn
                >
                <v-btn
                  text
                  color="primary"
                  @click="$refs.dialog.save(tarjeta.fechaExpiracion)"
                  >Aceptar</v-btn
                >
              </v-date-picker>
            </v-dialog>

            <v-text-field
              label="Codigo de seguridad"
              v-model="tarjeta.codigo"
              type="number"
              :rules="numberRules"
            />

            <v-img class src="@/assets/tarjetas.png" height="36%" />

            <!-- <v-text-field label="Dirección de facturación" /> -->
            <v-card-actions class="justify-center">
              <v-btn color="success" min-width="100" @click="saveCard"
                >Guardar tarjeta</v-btn
              >
            </v-card-actions>
          </v-form>

          <br />
          <v-divider />
          <br />
          <p class="font-weight-bold">Tarjetas guardadas</p>
          <!-- tsadasdsa -->
          <v-data-table
            :headers="headers"
            :items="tarjetas"
            :sort-by="['id']"
            :sort-desc="[false]"
            multi-sort
            class="elevation-1"
            hide-default-header
            hide-default-footer
            disable-pagination
          >
            <template v-slot:item.actions="{ item }">
              <v-btn
                color="red"
                fab
                class="px-1 ml-1"
                x-small
                @click="removeCard(item)"
              >
                <v-icon small v-text="'mdi-delete'" />
              </v-btn>
            </template>
          </v-data-table>

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
/* eslint-disable */
import { mapActions, mapGetters } from "vuex";
import { getUserById } from '@/api/modules'

export default {
  data: () => ({
    modal: false,
    tarjeta: {
      numero:"",
      codigo:"",
      tipo:"",
      fechaExpiracion:null
    },
    numberRules: [
      v => !!v || 'Campo requerido',
      v => v > 0 || 'Deben ser números positivos',
    ],
    imagenValue: null,
    tipos_tarjetas: ["Visa", "Master Card", "American Express", "Diners Club"],
    perfil: {
      nombre:"",
      apellido:"",
      nick: "",
      correo:"",
      acerca_de_ti:""

    },
    headers: [
      {
        text: "Código",
        value: "codigo"
      },
      {
        text: "Número",
        value: "numero"
      },
      {
        text: "Tipo",
        value: "tipo"
      },
      {
        sortable: false,
        text: "Acciones",
        value: "actions"
      }
    ],
    items: [
      { id: 1, number: "4360-4869-4207-9986" },
      { id: 2, number: "4801-5987-9541-1830" }
    ],
    imagen_check: null,
    id:'',
  }),
  computed: {
    tarjetas() {
      return this.tarjetasGetter();
    }
  },
  created() {
    this.id = this.perfilGetter();
    this.load()
  },
  methods: {
    ...mapActions([
      "updatePerfil",
      "updateImagenPerfil",
      "agregarTarjeta",
      "eliminarTarjeta",
      "leer_token"
    ]),
    ...mapGetters(["perfilGetter", "tarjetasGetter"]),
    async load() {
      const resp = await getUserById(this.id._id)
      if (resp.ok === true) {
        this.perfil = resp.perfil
         this.perfil.correo = resp.usuario.correo
         this.imagenValue = !this.perfil.imagen ? "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png": 'http://localhost:3004/public/upload/' + this.perfil.imagen;
      } else {
        console.log(resp)
        this.$swal({
          title: '¡ERROR!',
          html: resp.mensaje.text,
          icon: 'error',
        })
      }
    },
    async onChange(val) {
      this.perfil.imagen = val.target.files[0];
      this.imagenValue = URL.createObjectURL(this.perfil.imagen);
      this.imagen_check = true
    },
    async editarPerfil() {

      if(this.validarPerfil()){


      this.$swal({
        title: `¿Estás seguro que quieres actualizar tus datos?`,
        text: "Esta acción no tiene vuelta atrás",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar"
      }).then(async result => {
        if (result.value) {
          if (this.imagenValue && this.imagen_check) {
            const imagen_resp = await this.editarImagen();
            if (imagen_resp.ok) {
              this.$swal({
                title: "¡Perfil actualizado con Éxito!",
                icon: "success"
              });
              /* location.reload(); */
            }
          }

          const resp = await this.updatePerfil(this.perfil);
          console.log(this.perfil._id)
          if (resp.ok) {
              const resp = await getUserById(this.perfil._id)
                if (resp.ok === true) {
                  this.$swal({
                    title: "¡Perfil actualizado con Éxito!",
                    icon: "success"
                  });
                  localStorage.setItem("perfil", JSON.stringify(resp.perfil));
                  /* this.perfil = JSON.parse(localStorage.getItem('perfil')) */
                  this.leer_token()
                  location.reload()
                } else {
                  console.log(resp)
                  this.$swal({
                    title: '¡ERROR!',
                    html: resp.mensaje.text,
                    icon: 'error',
                  })
                }
          } else {
            console.log(resp)
            this.$swal({
              title: '¡ERROR!',
              html: resp.mensaje.text,
              icon: 'error',
            })
          }
        }
      });
      }
      else{
        this.$swal({
          title: "¡Debe completar los campos!",
          icon: "error"
        });
      }
    },
    async saveCard() {
      console.log(this.tarjeta);
      if (this.validateTarjeta()) {
        this.$swal({
          title: `¿Estás seguro que quieres guardar la tarjeta?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar"
        }).then(async result => {
          if (result.value) {
            const resp = await this.agregarTarjeta(this.tarjeta);
            if (resp.ok === true) {
              const resp2 = await getUserById(this.perfil._id)
                if (resp2.ok === true) {
                  this.$swal({
                    title: "¡Tarjeta guardad con éxito!",
                    icon: "success"
                  });
                  localStorage.setItem("perfil", JSON.stringify(resp2.perfil));
                  /* this.perfil = JSON.parse(localStorage.getItem('perfil')) */
                  this.leer_token()
                  this.tarjeta= {
                    numero:"",
                    codigo:"",
                    tipo:"",
                    fechaExpiracion:null
                  }
                } else {
                  console.log(resp2)
                  this.$swal({
                    title: '¡ERROR!',
                    html: resp2.mensaje.text,
                    icon: 'error',
                  })
                }
            } else {
              console.log(resp)
              this.$swal({
                title: '¡ERROR!',
                html: resp.mensaje.text,
                icon: 'error',
              })
            }
        }
      });
       } else {
        this.$swal({
         title: "¡Debe completar los campos!",
         icon: "error"
       });
       }
    },
    async removeCard(tarjeta) {
      this.$swal({
        title: `¿Estás seguro que quieres eliminar la tarjeta?`,
        text: "Esta acción no tiene vuelta atrás",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar"
      }).then(async result => {
        if (result.value) {
          const resp = await this.eliminarTarjeta(tarjeta._id);
          if (resp.ok === true) {
            const resp2 = await getUserById(this.perfil._id)
            if (resp2.ok === true) {
                  this.$swal({
                    title: "Tarjeta eliminada con Éxito!",
                    icon: "success"
                  });
                  localStorage.setItem("perfil", JSON.stringify(resp2.perfil));
                  /* this.perfil = JSON.parse(localStorage.getItem('perfil')) */
                  this.leer_token()
                } else {
                  console.log(resp2)
                  this.$swal({
                    title: '¡ERROR!',
                    html: resp2.mensaje.text,
                    icon: 'error',
                  })
                }
          } else {
            console.log(resp)
              this.$swal({
                title: '¡ERROR!',
                html: resp.mensaje.text,
                icon: 'error',
              })
          }
        }
      });
    },
    async editarImagen() {
      let formData = new FormData();
      formData.append("image", this.perfil.imagen);
      const resp = await this.updateImagenPerfil(formData);
      return resp;
    },
    validateForm(scope) {
      return this.$validator.validateAll(scope);
    },
    validateTarjeta() {
      
      if (
        this.tarjeta.nombre == "" ||
        this.tarjeta.codigo == "" ||
        this.tarjeta.fechaExpiracion == null ||
        this.tarjeta.tipo == "" /*||
        !this.tarjeta.nombre ||
        !this.tarjeta.codigo ||
        !this.tarjeta.fechaExpiracion ||
        !this.tarjeta.tipo*/
      )
        return false;
      else return true;
    },
        validarPerfil() {

      if (
        this.perfil.nombre == "" ||
        this.perfil.apellido == "" ||
        this.perfil.correo == "" ||
        this.perfil.nick == "" ||
        this.perfil.acerca_de_ti == ""
      )
        return false;
      else return true;
    }
  },
};
</script>
