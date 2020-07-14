
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
        <v-fab-transition>
          <v-btn
            fab
            dark
            absolute
            small
            color="secondary"
            left
            top
            class="mt-3 mr-3"
            @click="$router.go(-1)"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-list
          class="pt-0"
          dense
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-center display-1">
                Acerca de
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <span class="text-justify">
                PineApp es una red social diseñada para que puedas ganar dinero por medio de tus publicaciones, pueden ser desde fotos de viajes, arte, tutoriales y mucho más, ¡Deja volar tu imaginación y ÚNETE YA!
              </span>
            </v-list-item-content>
          </v-list-item>
          <v-list-item-group
            color="#1DE9B6s"
          >
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon" />
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>

              <v-list-item-action-text v-text="item.text" />
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <img
        class="align-center"
        src="@/assets/cara-corazon.png"
        height="auto"
        width="30%"
      >
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      items: [
        // { title: "Editar perfil", icon: "create", name: "Ver_perfil" },
        { title: 'Versión de la aplicación', icon: 'mdi-fruit-pineapple', text: '1.0' },
      ],
    }),
  }
</script>
