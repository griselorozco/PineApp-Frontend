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
        <v-list
          class="pt-0"
          dense
        >
          <v-list-item-group
            color="#1DE9B6s"
          >
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :to="item.name"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon" />
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-theme-light-dark</v-icon>
              </v-list-item-icon>
              <v-row
                align="center"
                no-gutters
              >
                <v-col cols="auto">
                  Dark Mode
                </v-col>

                <v-spacer />

                <v-col cols="auto">
                  <v-switch
                    v-model="$vuetify.theme.dark"
                    class="ma-0 pa-0"
                    color="secondary"
                    hide-details
                  />
                </v-col>
              </v-row>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      items: [
        { title: 'Preguntas frecuentes', icon: 'mdi-help-circle', name: '/app/pages/faqs' },
        { title: 'Acerca de', icon: 'mdi-alert', name: '/app/pages/about' },
      ],
    }),
  }
</script>
