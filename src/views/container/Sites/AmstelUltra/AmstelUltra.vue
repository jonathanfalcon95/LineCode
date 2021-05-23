<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row>
      <v-col cols="12">
        <div
          class="font-weight-light mt-1"
          style="color:#3c4858; font-size: 25px"
        >
          Challenger Team
        </div>
      </v-col>
    </v-row>

    <v-row v-if="respData.length">
      <v-col
        v-for="item in respData"
        :key="item.id"
        sm="12"
        md="4"
      >
        <base-material-card
          color="transparent"
          image
          hover-reveal
        >
          <template v-slot:image>
            <v-img
              :src="item.media_url"
              height="400px"
              width="400px"
            />
          </template>

          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  class="mx-1"
                  v-bind="attrs"
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-view-split-vertical</v-icon>
                </v-btn>
              </template>

              <span>View</span>
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
                  <v-icon class="success--text">
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </template>

              <span>Edit</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  class="mx-1"
                  color="error"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon class="error--text">
                    mdi-close
                  </v-icon>
                </v-btn>
              </template>

              <span>Remove</span>
            </v-tooltip>
          </template>

          <v-card-title class="justify-center font-weight-light mb-2 mt-3">
            Publicacion
          </v-card-title>

          <v-textarea
            v-model="item.caption"
            label="Caption"
            class="text-no-wrap"
            auto-grow
            rows="2"
            row-height="30"
            readonly
          />
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'AmstelUltra',

    data () {
      return {
        respData: [],
        title: null,
        data: {
          title: 'Amstel Ultra',
          subtitle:
            'Es una bebida energética inspirada en el poder más fuerte de la naturaleza: EL SOL. Una bebida elaborada con ingredientes de origen natural que te dará esa energía que necesitas para vivir el día a día con mayor intensidad y alcanzar tu máximo rendimiento.',
        },
        tabs: 0,
        list: {
          0: false,
          1: false,
          2: false,
        },
      }
    },

    computed: {
      totalSales () {
        return this.sales.reduce((acc, val) => acc + val.salesInM, 0)
      },
    },

    mounted: async function () {
      const resp = await axios.get(
        'https://graph.instagram.com/me/media?fields=id,caption,media_url&access_token=IGQVJXZAElZAM0d0d1hvMG5FR1Jpdk94c3FnVnhWNk13YWtNU29NeTNtTnZA6T1UyNDJxMzNiYTNocFp4NThuMEY3SktrWDR3SkhsaURPZAWoybDZAtOGQyU0ZAfU0taX1oyTmRydzcyc3ZAB'
      )

      this.respData = resp.data.data
      console.log('data: ', this.respData)
    },

    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
    },
  }
</script>
