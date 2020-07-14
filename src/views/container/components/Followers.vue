<!-- eslint-disable -->
<template>
  <v-container fluid>
    <v-list>
      <follow-item v-for="(item, index) in seguidores" :key="index" :follow="item" />
      <span v-if="seguidores.length === 0"> No posee Seguidores </span>
    </v-list>
  </v-container>
</template>

<script>
/* eslint-disable */
import { mapActions, mapGetters } from "vuex";
import FollowItem from "./shared/FollowItem";
export default {
  components: {
    FollowItem
  },
  data: () => ({}),
  methods: {
    ...mapActions(["obtenerFollows"]),
    ...mapGetters(["seguidoresGetter"])
  },
  computed: {
    URL_ID() {
      return this.$route.params.id;
    },
    seguidores() {
      return this.seguidoresGetter();
    },
    async created() {
      await this.obtenerFollows(this.URL_ID);
    }
  }
};
</script>
