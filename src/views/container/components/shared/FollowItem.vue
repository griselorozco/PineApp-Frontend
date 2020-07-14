<!-- eslint-disable -->}
<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-img :src="IMG" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title right>
        {{ follow.nombre + " " + follow.apellido }}
      </v-list-item-title>
      <span class="grey--text caption" v-text="follow.nick" />
    </v-list-item-content>

    <v-list-item-icon>
      <v-btn
        x-small
        class="font-weight-light"
        :color="!isFollowed ? 'secundary' : 'success'"
        @click="following(follow)"
      >
        <v-icon dark left>
          {{ !isFollowed ? "mdi-plus" : "mdi-check" }}
        </v-icon>
        {{ !isFollowed ? "Seguir" : "Seguido" }}
      </v-btn>
    </v-list-item-icon>
  </v-list-item>
</template>

<script>
/* eslint-disable */
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["follow"],
  methods: {
    ...mapGetters(["seguidosGetter"]),
    following(user) {
      user.followed = !user.followed;
    }
  },
  computed: {
    IMG() {
      if (!this.follow.imagen)
        return "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png";
      else return "http://localhost:3004/public/upload/" + this.follow.imagen;
    },
    isFollowed() {
      let val = false;
      this.seguidosGetter().map(element => {
        if (this.follow._id == element._id) val = true;
      });
      return val;
    }
  }
};
</script>
