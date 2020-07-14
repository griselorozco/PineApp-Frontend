<!-- eslint-disable -->
<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card class="v-card-profile" :avatar="perfil.imagen">
          <v-card-text class="text-center">
            <h6 class="display-1 mb-1 grey--text">{{ perfil.nick }}</h6>

            <h4 class="display-2 font-weight-light mb-3 black--text">
              {{ perfil.nombre }} {{ perfil.apellido }}
            </h4>
            <p class="font-weight-light grey--text">
              {{ perfil.acerca_de_ti }}
            </p>
            <v-btn
              v-if="URL_ID === auth._id"
              color="success"
              rounded
              class="mr-0"
              @click="$router.push('/app/user/' + perfil._id + '/edit')"
            >
              <v-icon>mdi-pencil</v-icon>Editar Perfil
            </v-btn>
            <v-btn
              v-else
              :color="seguir ? 'warning' : 'error'"
              rounded
              class="mr-0"
              @click="onSeguir(perfil._id)"
            >
              <v-icon>
                {{ seguir ? "mdi-account-multiple-plus" : "mdi-account-minus" }}
              </v-icon>
              {{ seguir ? " Seguir" : " Dejar de seguir" }}
            </v-btn>
          </v-card-text>
        </base-material-card>
      </v-col>
      <v-col cols="12" md="8" class="mt-n12" v-if="URL_ID === auth._id">
        <v-card>
          <v-card-text class="text-center">
            <h4 class="display-2 font-weight-light mb-3 black--text">
              Nivel de la cuenta
            </h4>
            <p class="font-weight-light grey--text">{{ perfil.nivel }}</p>

            <h4 class="display-1 font-weight-light mb-3 black--text">
              Saldo de la cuenta
            </h4>

            <p class="font-weight-light grey--text">{{ dinero }} $</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-tabs v-model="tab" background-color="white" color="success" centered>
      <v-tab
        v-for="item in items"
        :key="item"
        style="color: black; font-size: x-small;"
        v-text="item"
      />
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
          <Posts :perfilId="this.$route.params.id" />
      </v-tab-item>
      <v-tab-item>
          <Followers />
      </v-tab-item>
      <v-tab-item>
          <Followeds />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
/* eslint-disable */
import Posts from "../components/Posts";
import Followers from "../components/Followers";
import Followeds from "../components/Followeds";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Posts,
    Followers,
    Followeds
  },
  data: () => ({
    tab: null,
    seguir: false,
    items: ["Publicaciones", "Seguidores", "Seguidos"],
    components: ["Posts", "Followers", "Followeds"]
  }),
  methods: {
    ...mapActions([
      "getUserByIdAction",
      "seguirPerfil",
      "obtenerDinero",
      "obtenerFollows"
    ]),
    ...mapGetters([
      "usuarioGetter",
      "perfilGetter",
      "seguidoresGetter",
      "dineroGetter",
      "seguidosGetter"
    ]),
    async onSeguir(id) {
      const resp = await this.seguirPerfil(id);
      this.seguir = !this.seguir;
      console.log(resp);
    }
  },
  computed: {
    perfil() {
      return this.usuarioGetter();
    },
    URL_ID() {
      return this.$route.params.id;
    },
    auth() {
      return this.perfilGetter();
    },
    dinero() {
      return this.dineroGetter();
    }
  },
  async created() {
    await this.getUserByIdAction(this.$route.params.id);
    await this.obtenerDinero();
    await this.obtenerFollows(this.URL_ID);
    this.seguidoresGetter().forEach(e => {
      if (e._id === this.URL_ID) this.seguir = true;
    });
  }
};
</script>
