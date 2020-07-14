<template>
  <v-container fluid>
    <v-row>
      <v-col
        sm="12"
        md="4"
      >
        <base-material-card
          color="transparent"
          image
          hover-reveal
        >
          <template v-slot:image>
            <v-img :src="post.image" />
          </template>

          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  class="mx-1"
                  color="primary"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon class="primary--text">
                    mdi-heart
                  </v-icon>
                </v-btn>
              </template>

              <span>Remove</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  class="mx-1"
                  :to="{path:'create_post'}"
                  color="primary"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon class="primary--text">
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </template>

              <span>edit</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  class="mx-1"
                  color="success"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon class="secondary--text">
                    mdi-chat
                  </v-icon>
                </v-btn>
              </template>

              <span>Edit</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  class="mx-1"
                  v-bind="attrs"
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
            </v-tooltip>
          </template>

          <v-card-title class="justify-center font-weight-light">
            {{ post.title }}
          </v-card-title>

          <v-card-text
            class="body-1 text-center mb-3 font-weight-light grey--text"
          >
            {{ post.description }}
          </v-card-text>
          <span class="body-1 text-left mb-3 font-weight-light grey--text">{{ post.user }}</span>

          <div class="text-right mt-n8">
            <v-bottom-sheet
              v-model="sheet"
              inset
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-sheet
                class="text-center"
                height="200px"
              >
                <v-btn
                  class="mt-6"
                  text
                  color="error"
                  @click="sheet = !sheet"
                >
                  close
                </v-btn>
                <div class="my-3">
                  This is a bottom sheet using the inset prop
                </div>
              </v-sheet>
            </v-bottom-sheet>
          </div>

          <template v-slot:actions>
            <span class="body-1 text-center mb-3 font-weight-light grey--text">
              <v-icon color="primary">mdi-heart</v-icon>
              {{ post.likes }}
            </span>

            <v-spacer />

            <div class="display-1 font-weight-light grey--text">
              <v-icon color="secondary">
                mdi-chat
              </v-icon>
              {{ post.comments }}
            </div>
          </template>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    // eslint-disable-next-line vue/require-prop-types
    props: ['post'],
    data: () => ({
      menu: false,
      sheet: null,
    }),
    mounted () {},
  }
</script>
