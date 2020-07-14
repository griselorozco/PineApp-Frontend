<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <h1 class="text-center display-3 font-weight-light">
      Preguntas frecuentes
    </h1>
    <v-row justify="center">
      <img
        class="align-center"
        src="@/assets/cara-pregunta.png"
        height="auto"
        width="30%"
      >
      <v-col
        cols="12"
        md="6"
      >
        <v-card>
          <v-card-text class="text--primary">
            <v-expansion-panels focusable>
              <v-expansion-panel
                v-for="(item,i) in items"
                :key="i"
              >
                <v-expansion-panel-header> {{ item.question }} </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div v-if="!item.lista">
                    {{ item.answer }}
                  </div>
                  <div v-else>
                    {{ item.answer }}
                    <br>
                    <br>
                    {{ item.answer2 }}
                    <br>
                    <br>
                    {{ item.answer3 }}
                    <div v-if="item.answer4">
                      <br>
                      {{ item.answer4 }}
                    </div>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      items: [
        { question: '¿Qué son los niveles?', answer: 'Los niveles son categorías que te ayudan obtener mejores recompensas en tus publicaciones. Una cuenta nivel 1 es el primer nivel donde ganarás por cada 100 seguidores, cada "Me Gusta" 0.001$, mientras que una cuenta nivel 3,la cual es el máximo nivel ganarás por cada "Me Gusta" 0.003$.' },
        { question: '¿Cómo puedo subir de nivel?.', answer: 'Para subir de nivel debes tener 100 seguidores, cada 100 seguidores subes un nivel hasta llegar al nivel 3 el cual es el máximo.', answer2: '- Comienzas siendo nivel 1, si quieres avanzar tendrás que alcanzar 200 seguidores para subir a nivel 2.', answer3: '- Para subir a nivel 3, tendrás que alcanzar 300 seguidores.', lista: true },
        { question: '¿Dónde puedo ver qué nivel soy?', answer: 'Desde tu perfil puedes visualizar tu nivel.' },
        { question: '¿Cómo puedo ganar dinero?', answer: 'Dependiendo de tu nivel podras ganar mas o menos dinero por cada "Me Gusta".' },
        { question: '¿Dónde puedo ver mi saldo?', answer: 'Existen dos maneras de ver tu saldo.', answer2: '- Desde tu perfil.', answer3: '- En el botón de perfil junto al logo de PineApp.', lista: true },
        { question: '¿Cómo puedo retirar mi dinero?', answer: 'Desde el menú de la aplicación selecciona la opción "Retirar fondos", escoge una tarjeta de débito previamente registrada en tu perfil y selecciona "Enviar pago" esta acción añadirá el saldo a tu tarjeta de una manera segura dentro de un plazo de 48 horas.' },
        { question: '¿Cómo agrego mi tarjeta?', answer: 'Primero debes dirgirte a tu perfil, luego seleccionar opción "Editar perfil" y en el apartado "Informacion Privada", Podrás añadir los datos de tu tarjeta.' },
        { question: '¿Puedo usar cualquier tarjeta?', answer: 'Solamente puedes usar tarjetas de débito.' },
      ],
    }),
  }
</script>
