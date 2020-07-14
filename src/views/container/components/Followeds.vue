<!-- eslint-disable -->
<template>
  <v-container fluid>
    <v-list>
      <follow-item v-for="(item, index) in siguiendo" :key="index" :follow="item" />
      <span v-if="siguiendo.length === 0"> No posee Seguidores </span>
    </v-list>
  </v-container>
</template>

<script>
/* eslint-disable */
import FollowItem from "./shared/FollowItem";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    FollowItem
  },
  data: () => ({}),
  methods: {
    ...mapActions(["obtenerFollows"]),
    ...mapGetters(["seguidosGetter"])
  },
  computed: {
    URL_ID() {
      return this.$route.params.id;
    },
    siguiendo() {
      return this.seguidosGetter();
    }
  },
  async created() {
    await this.obtenerFollows(this.URL_ID);
  }
};
</script>
