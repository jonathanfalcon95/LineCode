<template>
  <v-container
    id="data-tables"
    tag="section"
  >
    <base-material-card
      color="primary"
      icon="mdi-store-outline"
      inline
      class="px-5 py-3"
    >
      <template v-slot:heading>
        <v-tabs
          v-model="tabs"
          background-color="transparent"
          slider-color="white"
          color="primary"
        >
          <v-tab class="mr-2">
            <v-icon class="mr-1">
              mdi-cash-refund
            </v-icon>
            Resumen
          </v-tab>
          <v-tab class="mr-2">
            <v-icon class="mr-1">
              mdi-cash-marker
            </v-icon>
            Evidencia
          </v-tab>
          <v-tab class="mr-2">
            <v-icon class="mr-1">
              mdi-cart
            </v-icon>
            Registro de actividad
          </v-tab>
           <v-tab class="mr-2">
            <v-icon class="mr-1">
              mdi-finance
            </v-icon>
            Reportes
          </v-tab>
          <v-tab class="mr-2">
            <v-icon class="mr-1">
              mdi-finance
            </v-icon>
            Incidencias
          </v-tab>
        </v-tabs>
      </template>
      <v-fab-transition>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              fab
              dark
              small
              color="primary"
              absolute
              right
              top
              :class="'back-table-button'"
              v-on="on"
              @click="goBack(tabs)"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("tooltip.back") }}</span>
        </v-tooltip>
      </v-fab-transition>
      <v-tabs-items
        v-model="tabs"
        class="transparent"
      >
        <v-tab-item :kei="0">
          <template>
            <v-container class="pa-0">
              <v-row class="justify-center">
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                >
                  <v-row class="justify-center">
                    <h2 class="grey--text">
                      Descarga
                    </h2>
                  </v-row>
                </v-col>
              </v-row>
              <v-row class="justify-center grey lighten-2">
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  class="text-center"
                >
                  {{ dateCurrent }}
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  class="text-center"
                >
                  Planta Celaya
                </v-col>
              </v-row>
              <v-row />
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  class="text-center"
                >
                  <v-list class="pa-0">
                    <v-list-item
                      dense
                      class="justify-start"
                    >
                      <v-list-item-content class="pa-0">
                        <v-list-item-title v-text="'Campaña 202101'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0" />
                    </v-list-item>
                    <v-list-item
                      dense
                      class="justify-start"
                    >
                      <v-list-item-content class="pa-0">
                        <v-list-item-title v-text="'Zona 108'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0" />
                    </v-list-item>
                    <v-list-item
                      dense
                      class="justify-start"
                    >
                      <v-list-item-content class="pa-0">
                        <v-list-item-title v-text="'Porteo Toluca'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0" />
                    </v-list-item>
                    <v-divider />
                  </v-list>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  class="text-center"
                >
                  <v-list dense>
                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title v-text="'Legada Real Planta Avon'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text"
                          v-text="'01/06/2020 '"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title v-text="'Salida Real Planta Avon'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text"
                          v-text="'01/06/2020 '"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title v-text="'Llegada Programada'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text"
                          v-text="'02/06/2020 '"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title v-text="'No. de placas'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text"
                          v-text="'95AJ9T//53UA1E'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title v-text="'No. de camión'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text"
                          v-text="'102TOL10'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between mt-1">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title v-text="'Tiempo de operación:'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text"
                          v-text="'04hrs. 15min.'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between mt-1">
                      <v-list-item-content>
                        <v-list-item-title v-text="'Observaciones:'" />
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title
                          class="grey--text"
                          v-text="'Observaciones'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content>
                        <v-list-item-title v-text="'Nombre de Transportista'" />
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title
                          class="grey--text"
                          v-text="'Juan Perez'"
                        />
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  class="align-center"
                >
                  <v-row class="justify-center align-center">
                    <v-col
                      cols="12"
                      sm="3"
                      md="3"
                    >
                      <v-avatar
                        size="80px"
                      >
                        <img
                          alt="Avatar"
                          src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                        >
                      </v-avatar>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-list-item-content>
                        <v-list-item-title v-text="'Juan Pérez'" />
                        <v-list-item-subtitle
                          class="grey--text"
                          v-text="'Transportista'"
                        />
                      </v-list-item-content>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  class="text-center"
                >
                  <v-list dense>
                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="font-weight-bold"
                          v-text="'Detalle del Pedido'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text"
                          v-text="''"
                        />
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider />

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="font-weight-bold"
                          v-text="'Importe'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text"
                          v-text="'$1,345,978.00'"
                        />
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider />

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="font-weight-bold"
                          v-text="'CODs'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text"
                          v-text="'298'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title v-text="'CODs Enviados'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text"
                          v-text="'298'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title v-text="'CODs Facturados'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text"
                          v-text="'298'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title v-text="'CODs Pendientes'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider />

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="font-weight-bold"
                          v-text="'Cantidad de Bultos'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text"
                          v-text="'981'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title v-text="'Cajas'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text"
                          v-text="'740'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title v-text="'Unitarios'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text"
                          v-text="'241'"
                        />
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider />

                    <v-list-item class="justify-space-between mt-1">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title v-text="'Premios'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content>
                        <v-list-item-title v-text="'Normales'" />
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title
                          class="grey--text"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content>
                        <v-list-item-title v-text="'Especiales'" />
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title
                          class="grey--text"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider />

                    <v-list-item class="justify-space-between">
                      <v-list-item-content>
                        <v-list-item-title v-text="'VEA'" />
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title
                          class="grey--text"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content>
                        <v-list-item-title v-text="'Material Promocional'" />
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title
                          class="grey--text"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider />

                    <v-list-item class="justify-space-between">
                      <v-list-item-content>
                        <v-list-item-title v-text="'Miscelaneos'" />
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title
                          class="grey--text"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content>
                        <v-list-item-title v-text="'Caja Papeleria'" />
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title
                          class="grey--text"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider />
                  </v-list>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  class="align-center"
                >
                  <v-row class="justify-center align-center">
                    <v-col
                      cols="12"
                      sm="3"
                      md="3"
                    >
                      <v-avatar
                        size="80px"
                      >
                        <img
                          alt="Avatar"
                          src="https://cdn.vuetifyjs.com/images/lists/1.jpg"
                        >
                      </v-avatar>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-list-item-content>
                        <v-list-item-title v-text="'Manuel Pérez'" />
                        <v-list-item-subtitle
                          class="grey--text"
                          v-text="'Supervisor de Planta'"
                        />
                      </v-list-item-content>
                    </v-col>
                  </v-row>
                  <v-row class="justify-center align-center mt-3">
                    <v-col
                      cols="12"
                      sm="3"
                      md="3"
                    >
                      <v-avatar
                        size="80px"
                      >
                        <img
                          alt="Avatar"
                          src="https://cdn.vuetifyjs.com/images/lists/2.jpg"
                        >
                      </v-avatar>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-list-item-content>
                        <v-list-item-title v-text="'Luis García'" />
                        <v-list-item-subtitle
                          class="grey--text"
                          v-text="'Gerente de Planta'"
                        />
                      </v-list-item-content>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row class="justify-center">
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  class="text-center"
                >
                  <v-list-item-content :elevation="0">
                    <v-list-item-title
                      class="text-uppercase"
                      v-text="'FIRMA DEL TRANSPORTISTA'"
                    />
                    <v-avatar
                      height="80"
                      width="150"
                      tile
                      class="my-2"
                    >
                      <img
                        alt="Avatar"
                        :elevation="0"
                        src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Firma_Len%C3%ADn_Moreno_Garc%C3%A9s.png"
                      >
                    </v-avatar>
                    <v-list-item-subtitle
                      class="text-uppercase"
                      v-text="'FIRMA DEL TRANSPORTISTA'"
                    />
                  </v-list-item-content>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  class="text-center"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-uppercase"
                      v-text="'NOMBRE Y FIRMA AUTORIZADA PARA LA SALIDA'"
                    />
                    <v-avatar
                      height="80"
                      width="150"
                      tile
                      class="my-2"
                    >
                      <img
                        alt="Avatar"
                        src="https://cysae.com/wp-content/uploads/2020/03/firma-javi-300x148.png"
                      >
                    </v-avatar>
                    <v-list-item-subtitle
                      class="text-uppercase"
                      v-text="'Firma del Supervisor'"
                    />
                  </v-list-item-content>
                </v-col>
              </v-row>
            </v-container>
          </template>
        </v-tab-item>

        <v-tab-item :kei="1" />
        <v-tab-item :kei="2">
          <v-container class="py-0" />
        </v-tab-item>
        <v-tab-item :kei="3">
          <v-container class="py-0" />
        </v-tab-item>
      </v-tabs-items>
    </base-material-card>
  </v-container>
</template>

<script>
//   import Summary from './Summary/Summary.vue'
  import moment from 'moment'
  moment.locale('es');
  const dispatch = {
    bodega: null,
    camion: null,
    campana: null,
    createdAt: null,
    despachoImporte: null,
    despachoSellos: null,
    despachoStatus: null,
    fechaCargaEst: null,
    fechaCargaReal: null,
    fechaDescargaEst: null,
    fechaDescargaReal: null,
    fechaFinCarga: null,
    fechaFinDescarga: null,
    fechaSalidaReal: null,
    idDespacho: null,
    nombreOperador: null,
    numPlacas: null,
    urlBoxes: null,
    urlUnitary: null,
    zona: null,
  }
  export default {
    name: 'DonwloadReportDetailComponent',
    components: {
    //   Summary,
    },
    data: () => ({
      tabs: 0,
      dateCurrent: moment().format('dddd, MMMM Do YYYY'),
      files: [
        {
          color: 'blue',
          icon: 'mdi-clipboard-text',
          subtitle: 'Jan 20, 2014',
          title: 'Vacation itinerary',
        },
        {
          color: 'amber',
          icon: 'mdi-gesture-tap-button',
          subtitle: 'Jan 10, 2014',
          title: 'Kitchen remodel',
        },
      ],
      folders: [
        {
          subtitle: 'Jan 9, 2014',
          title: 'Photos',
        },
        {
          subtitle: 'Jan 17, 2014',
          title: 'Recipes',
        },
        {
          subtitle: 'Jan 28, 2014',
          title: 'Work',
        },
      ],
      dispatch: Object.assign(dispatch),
    }),
    async mounted () {
      this.initialize()
    },
    methods: {
      initialize () {
        let paramData = this.$route.params.data
        console.log('dispatch', paramData)
        this.dispatch = Object.assign(dispatch, {
          bodega: paramData.bodega,
          camion: paramData.camion,
          campana: paramData.campana,
          createdAt: paramData.createdAt,
          despachoImporte: paramData.despachoImporte,
          despachoSellos: paramData.despachoSellos,
          despachoStatus: paramData.despachoStatus,
          fechaCargaEst: paramData.fechaCargaEst,
          fechaCargaReal: paramData.fechaCargaReal,
          fechaDescargaEst: paramData.fechaDescargaEst,
          fechaDescargaReal: paramData.fechaDescargaReal,
          fechaFinCarga: paramData.fechaFinCarga,
          fechaFinDescarga: paramData.fechaFinDescarga,
          fechaSalidaReal: paramData.fechaSalidaReal,
          idDespacho: paramData.idDespacho,
          nombreOperador: paramData.nombreOperador,
          numPlacas: paramData.numPlacas,
          urlBoxes: paramData.urlBoxes,
          urlUnitary: paramData.urlUnitary,
          zona: paramData.zona,
        })
        console.log('dispatch', this.dispatch)
        if (this.$route.params.tab && this.$route.params.tab === 1) {
          this.nextTap(1)
        }
      },
      goBack (tap) {
        if (tap === 1) {
          this.tabs = 0
        } else {
          this.$router.back()
        }
      },
    },
  }
</script>
