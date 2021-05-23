<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        class="d-flex"
        cols="12"
        sm="3"
      >
        <v-select
          :items="items"
          label="Planta"
          outlined
          dense
        />
      </v-col>
      <v-col
        class="d-flex"
        cols="12"
        sm="3"
      >
        <v-select
          :items="items"
          label="Bodega"
          outlined
          dense
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="6"
      >
        <v-text-field
          outlined
          label="Planta"
          prepend-inner-icon="mdi-magnify"
          dense
        />
      </v-col>
    </v-row>
    <v-row class="justify-center my-5">
      <v-col
        cols="12"
        sm="3"
        md="1"
      >
        <v-btn
          depressed
        >
          Histórico
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        sm="3"
        md="1"
      >
        <v-btn
          depressed
          color="primary"
        >
          Año
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        sm="3"
        md="1"
      >
        <v-btn
          depressed
        >
          Cuartos
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        sm="3"
        md="1"
      >
        <v-btn
          depressed
        >
          Mes
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        sm="3"
        md="1"
      >
        <v-btn
          depressed
        >
          Semana
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        sm="3"
        md="1"
      >
        <v-btn
          depressed
        >
          Día
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="justify-end">
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-row class="justify-center">
          <h2 class="grey--text">
            Despacho
          </h2>
        </v-row>
        <v-row class="justify-center">
          <p class="grey--text">
            Planta Celaya
          </p>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-select
          :items="items"
          label="Planta"
          outlined
          dense
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        lg="4"
      >
        <base-material-chart-card
          :data="dataCompletedTasksChart.data"
          :options="dataCompletedTasksChart.options"
          hover-reveal
          color="primary"
          type="Line"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="info"
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="info"
                  >
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">
            Tiempo promedio de operación
          </h4>

          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">4:04:34 hrs.</span>
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col
        cols="12"
        lg="4"
      >
        <base-material-chart-card
          :data="dailySalesChart.data"
          :options="dailySalesChart.options"
          color="primary"
          hover-reveal
          type="Bar"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="info"
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="info"
                  >
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">
            Incidencias reportadas
          </h4>

          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-pound
            </v-icon>
            <span class="caption grey--text font-weight-light">1,175</span>
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col
        cols="12"
        lg="4"
      >
        <base-material-chart-card
          :data="emailsSubscriptionChart.data"
          :options="emailsSubscriptionChart.options"
          :responsive-options="emailsSubscriptionChart.responsiveOptions"
          color="primary"
          hover-reveal
          type="Bar"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="info"
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="info"
                  >
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h3 class="card-title font-weight-light mt-2 ml-2">
            Cantidad facturada
          </h3>

          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-currency-usd
            </v-icon>
            <span class="caption grey--text font-weight-light">$255,034,023.09</span>
          </template>
        </base-material-chart-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'DispatchDashboard',

    data () {
      return {
        countryData: {
          US: 2920,
          DE: 1390,
          AU: 760,
          GB: 690,
          RO: 600,
          BR: 550,
        },
        dailySalesChart: {
          data: {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
              [12, 17, 7, 17, 23, 18, 38],
            ],
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0,
            }),
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
        },
        dataCompletedTasksChart: {
          data: {
            labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
            series: [
              [230, 750, 450, 300, 280, 240, 200, 190],
            ],
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0,
            }),
            low: 0,
            high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
        },
        emailsSubscriptionChart: {
          data: {
            labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
            series: [
              [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],

            ],
          },
          options: {
            axisX: {
              showGrid: false,
            },
            low: 0,
            high: 1000,
            chartPadding: {
              top: 0,
              right: 5,
              bottom: 0,
              left: 0,
            },
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0]
                },
              },
            }],
          ],
        },
        headers: [
          {
            sortable: false,
            text: 'ID',
            value: 'id',
          },
          {
            sortable: false,
            text: 'Name',
            value: 'name',
          },
          {
            sortable: false,
            text: 'Salary',
            value: 'salary',
            align: 'right',
          },
          {
            sortable: false,
            text: 'Country',
            value: 'country',
            align: 'right',
          },
          {
            sortable: false,
            text: 'City',
            value: 'city',
            align: 'right',
          },
        ],
        items: [
          {
            id: 1,
            name: 'Dakota Rice',
            country: 'Niger',
            city: 'Oud-Tunrhout',
            salary: '$35,738',
          },
          {
            id: 2,
            name: 'Minerva Hooper',
            country: 'Curaçao',
            city: 'Sinaai-Waas',
            salary: '$23,738',
          },
          {
            id: 3,
            name: 'Sage Rodriguez',
            country: 'Netherlands',
            city: 'Overland Park',
            salary: '$56,142',
          },
          {
            id: 4,
            name: 'Philip Chanley',
            country: 'Korea, South',
            city: 'Gloucester',
            salary: '$38,735',
          },
          {
            id: 5,
            name: 'Doris Greene',
            country: 'Malawi',
            city: 'Feldkirchen in Kārnten',
            salary: '$63,542',
          },
        ],
        sales: [
          {
            country: 'USA',
            flag: 'https://demos.creative-tim.com/vue-material-dashboard-pro/img/flags/US.png',
            salesInM: 2920,
          },
          {
            country: 'Germany',
            flag: 'https://demos.creative-tim.com/vue-material-dashboard-pro/img/flags/DE.png',
            salesInM: 1300,
          },
          {
            country: 'Australia',
            flag: 'https://demos.creative-tim.com/vue-material-dashboard-pro/img/flags/AU.png',
            salesInM: 760,
          },
          {
            country: 'United Kingdom',
            flag: 'https://demos.creative-tim.com/vue-material-dashboard-pro/img/flags/GB.png',
            salesInM: 690,
          },
          {
            country: 'Romania',
            flag: 'https://demos.creative-tim.com/vue-material-dashboard-pro/img/flags/RO.png',
            salesInM: 600,
          },
          {
            country: 'Brasil',
            flag: 'https://demos.creative-tim.com/vue-material-dashboard-pro/img/flags/BR.png',
            salesInM: 550,
          },
        ],
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

    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
    },
  }
</script>
