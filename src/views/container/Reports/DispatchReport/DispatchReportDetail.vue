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
              mdi-clipboard-list-outline
            </v-icon>
            Resumen
          </v-tab>
          <v-tab class="mr-2">
            <v-icon class="mr-1">
              mdi-file-image
            </v-icon>
            Evidencia
          </v-tab>
          <v-tab class="mr-2">
            <v-icon class="mr-1">
              mdi-playlist-check
            </v-icon>
            Registro de actividad
          </v-tab>
          <v-tab class="mr-2">
            <v-icon class="mr-1">
              clipboard-file-outline
            </v-icon>
            Reportes
          </v-tab>
          <v-tab class="mr-2">
            <v-icon class="mr-1">
              mdi-playlist-star
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
                      Despacho
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
                  <v-list class="py-0 px-8">
                    <v-list-item
                      dense
                      class="justify-start"
                    >
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-title v-text="'Campaña 202101'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0 text-end" />
                    </v-list-item>
                    <v-list-item
                      dense
                      class="justify-start"
                    >
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-title v-text="'Zona 108'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0 text-end" />
                    </v-list-item>
                    <v-list-item
                      dense
                      class="justify-start"
                    >
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-title v-text="'Porteo Toluca'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0 text-end" />
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
                  <v-list
                    class="px-8"
                    dense
                  >
                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="text-start"
                          v-text="'Legada Real Planta Avon'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'01/06/2020 '"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="text-start"
                          v-text="'Salida Real Planta Avon'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'01/06/2020 '"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="text-start"
                          v-text="'Llegada Programada'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'02/06/2020 '"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="text-start"
                          v-text="'No. de placas'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'95AJ9T//53UA1E'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="text-start"
                          v-text="'No. de camión'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'102TOL10'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between mt-1">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="text-start"
                          v-text="'Tiempo de operación:'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'04hrs. 15min.'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between mt-1">
                      <v-list-item-content>
                        <v-list-item-title
                          class="text-start"
                          v-text="'Observaciones:'"
                        />
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'Observaciones'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content>
                        <v-list-item-title
                          class="text-start"
                          v-text="'Nombre de Transportista'"
                        />
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title
                          class="grey--text text-end"
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
                  <v-list
                    class="px-8"
                    dense
                  >
                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-title
                          class="font-weight-bold"
                          v-text="'Detalle del Pedido'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="''"
                        />
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider />

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-title
                          class="font-weight-bold"
                          v-text="'Importe'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'$1,345,978.00'"
                        />
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider />

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-title
                          class="font-weight-bold"
                          v-text="'CODs'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'298'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-title v-text="'CODs Enviados'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'298'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-title v-text="'CODs Facturados'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'298'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-title v-text="'CODs Pendientes'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider />

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-title
                          class="font-weight-bold"
                          v-text="'Cantidad de Bultos'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'981'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-title v-text="'Cajas'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'740'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-title v-text="'Unitarios'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'241'"
                        />
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider />

                    <v-list-item class="justify-space-between mt-1">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-title v-text="'Premios'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="text-start">
                        <v-list-item-title v-text="'Normales'" />
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="text-start">
                        <v-list-item-title v-text="'Especiales'" />
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider />

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="text-start">
                        <v-list-item-title v-text="'VEA'" />
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="text-start">
                        <v-list-item-title v-text="'Material Promocional'" />
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider />

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="text-start">
                        <v-list-item-title v-text="'Miscelaneos'" />
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="text-start">
                        <v-list-item-title v-text="'Caja Papeleria'" />
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title
                          class="grey--text text-end"
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

        <v-tab-item :kei="1">
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
                      Despacho
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
                  md="8"
                  class="text-center"
                >
                  <v-list class="py-0 px-8">
                    <v-list-item
                      dense
                      class="justify-start"
                    >
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="font-weight-bold text-start"
                          v-text="'Llegada'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0 text-end" />
                    </v-list-item>
                    <v-list-item
                      dense
                      class="justify-start"
                    >
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="text-start text-no-wrap"
                          v-text="'¿El transporte llegó con sello en buen estado?'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="text-end"
                          v-text="'Si'"
                        />
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                      dense
                      class="justify-start"
                    >
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-title
                          class="text-no-wrap"
                          v-text="'¿El operador llegó a tiempo según llegada programada?'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="text-end"
                          v-text="'Si'"
                        />
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="3"
                  class="text-center"
                >
                  <v-list-item-content :elevation="0">
                    <v-avatar
                      size="150"
                      tile
                      class="my-5"
                    >
                      <img
                        alt="Avatar"
                        :elevation="0"
                        src="https://previews.123rf.com/images/eugenesergeev/eugenesergeev1407/eugenesergeev140700096/29792135-las-puertas-traseras-del-nuevo-cami%C3%B3n-de-carga-blanco.jpg"
                      >
                    </v-avatar>
                    <v-list-item-subtitle
                      class="text-uppercase"
                      v-text="'Foto de Camion'"
                    />
                  </v-list-item-content>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="3"
                  class="text-center"
                >
                  <v-list-item-content :elevation="0">
                    <v-avatar
                      size="150"
                      tile
                      class="my-5"
                    >
                      <img
                        alt="Avatar"
                        :elevation="0"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQLphqwwt7el7UkwDAbq3a8kx06EzwweuuEfKutEx50rdWiQxVcSI7hnGShfYakG9JOMA&usqp=CAU"
                      >
                    </v-avatar>
                    <v-list-item-subtitle
                      class="text-uppercase"
                      v-text="'Foto de Transportista'"
                    />
                  </v-list-item-content>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="3"
                  class="text-center"
                >
                  <v-list-item-content :elevation="0">
                    <v-avatar
                      size="150"
                      tile
                      class="my-5"
                    >
                      <img
                        alt="Avatar"
                        :elevation="0"
                        src="https://img.automexico.com/2019/01/14/b09YwtPD/tipos-de-licencia-de-conducir-ad5d.jpg"
                      >
                    </v-avatar>
                    <v-list-item-subtitle
                      class="text-uppercase"
                      v-text="'Foto de Licencia'"
                    />
                  </v-list-item-content>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="3"
                  class="text-center"
                >
                  <v-list-item-content :elevation="0">
                    <v-avatar
                      size="150"
                      tile
                      class="my-5"
                    >
                      <img
                        alt="Avatar"
                        :elevation="0"
                        src="https://cartade.info/wp-content/uploads/2018/04/carta-porte-7.jpg"
                      >
                    </v-avatar>
                    <v-list-item-subtitle
                      class="text-uppercase"
                      v-text="'Foto de Carta Porte'"
                    />
                  </v-list-item-content>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  class="text-center"
                >
                  <v-list
                    class="px-8"
                    dense
                  >
                    <v-list-item class="justify-space-between my-4">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="font-weight-bold text-start"
                          v-text="'Salida'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="''"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="my-2">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-subtitle
                          v-text="'¿La carga está bien estibada?'"
                        />
                        <v-list-item-title
                          class="font-weight-medium text-start"
                          v-text="'Foto de Carga '"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0" />
                    </v-list-item>

                    <v-list-item class="my-2">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-subtitle
                          v-text="'¿La carga tiene las barras de tensión acomodadas?'"
                        />
                        <v-list-item-title
                          class="font-weight-medium text-start"
                          v-text="'Foto de Barras de tensión '"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0" />
                    </v-list-item>

                    <v-list-item class="my-2">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-subtitle
                          v-text="'¿Se entregaron sellos en buen estado?'"
                        />
                        <v-list-item-title
                          class="font-weight-medium text-start"
                          v-text="'Foto de Sellos'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0" />
                    </v-list-item>

                    <v-list-item class="my-2">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-subtitle
                          v-text="'¿Se entregó carta Porte?'"
                        />
                        <v-list-item-title
                          class="font-weight-medium text-start"
                          v-text="'Foto de Carta Porte'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0" />
                    </v-list-item>

                    <v-list-item class="my-2">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-subtitle
                          v-text="'¿Se cargaron cajas de miscelaneos?'"
                        />
                        <v-list-item-title
                          class="font-weight-medium text-start"
                          v-text="'Foto de Miscelaneos'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0" />
                    </v-list-item>
                  </v-list>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  class="align-center"
                />
              </v-row>
            </v-container>
          </template>
        </v-tab-item>
        <v-tab-item :kei="2">
          <v-container class="py-0">
            <v-text-field
              v-model="search"
              dense
              append-icon="mdi-magnify"
              class="ml-auto"
              :label="$t('search')"
              hide-details
              single-line
              style="max-width: 250px"
            />

            <v-divider class="mt-3" />

            <v-data-table
              :headers="[
                {
                  text: 'Fecha',
                  value: 'actividadFecha',
                },
                {
                  text: 'Usuario',
                  value: 'usuario',
                },
                {
                  text: 'Descripcion',
                  value: 'descripcion',
                },
                {
                  sortable: false,
                  text: 'Acciones',
                  value: 'actions',
                  align: 'right',
                },
              ]"
              :items="activities"
              :search.sync="search"
              :items-per-page="-1"
              :sort-by="['usuario']"
              :sort-desc="[false, true]"
              multi-sort
              class="elevation-1 text-right"
            >
              <template
                v-slot:[`item.actions`]="{ item }"
              >
                <v-fab-transition>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon
                        :key="1"
                        small
                        fab
                        color="watch"
                        class="px-1 ml-1"
                        v-on="on"
                        @click="onShowActivity(item)"
                      >
                        mdi-eye
                      </v-icon>
                    </template>
                    <span>{{ $t("tooltip.show") }}</span>
                  </v-tooltip>
                </v-fab-transition>
              </template>
            </v-data-table>
          </v-container>
        </v-tab-item>
        <v-tab-item :kei="3">
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
                      Despacho
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
                  <v-list
                    dense
                    class="px-8"
                  >
                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="font-weight-black text-start"
                          v-text="'Detalle de Faltantes'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="''"
                        />
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider />

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="font-weight-bold text-start"
                          v-text="'Cantidad de Bultos faltantes'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-title v-text="'Cajas faltantes'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-title v-text="'Unitarios faltantes'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider />

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="font-weight-bold text-start"
                          v-text="'Premios faltantes'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-title v-text="'Normales faltantes'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-title v-text="'Especiales faltantes'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider />

                    <v-list-item class="justify-space-between mt-1">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-title v-text="'VEAs faltantes'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-title v-text="'Material Promocional faltantes'" />
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider />

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="font-weight-bold text-start"
                          v-text="'Miscelaneos faltantes'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-title
                          class="font-weight-bold"
                          v-text="'Caja Papeleria faltantes'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'0'"
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
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  class="text-center"
                >
                  <v-list
                    dense
                    class="px-8"
                  >
                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="font-weight-black text-start"
                          v-text="'Detalle de Dañados'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="''"
                        />
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider />

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="font-weight-bold text-start"
                          v-text="'Cantidad de Bultos dañados'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-title v-text="'Cajas dañados'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-title v-text="'Unitarios dañados'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider />

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-title
                          class="font-weight-bold"
                          v-text="'Premios dañados'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-title v-text="'Normales dañados'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-title v-text="'Especiales dañados'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider />

                    <v-list-item class="justify-space-between mt-1">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-title v-text="'VEAs dañados'" />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-title v-text="'Material Promocional dañados'" />
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider />

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-title
                          class="font-weight-bold"
                          v-text="'Miscelaneos dañados'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'0'"
                        />
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="justify-space-between">
                      <v-list-item-content class="pa-0 text-start">
                        <v-list-item-title
                          class="font-weight-bold"
                          v-text="'Caja Papeleria dañados'"
                        />
                      </v-list-item-content>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="grey--text text-end"
                          v-text="'0'"
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
                />
              </v-row>
              <v-row class="justify-start">
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  class="text-center"
                >
                  <v-list-item-content :elevation="0">
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
                        :elevation="0"
                        src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Firma_Len%C3%ADn_Moreno_Garc%C3%A9s.png"
                      >
                    </v-avatar>
                    <v-list-item-subtitle
                      class="text-uppercase"
                      v-text="'Manuel Peréz'"
                    />
                  </v-list-item-content>
                </v-col>
              </v-row>
            </v-container>
          </template>
        </v-tab-item>
        <v-tab-item :kei="4">
          <v-container class="py-0">
            <v-text-field
              v-model="search"
              dense
              append-icon="mdi-magnify"
              class="ml-auto"
              :label="$t('search')"
              hide-details
              single-line
              style="max-width: 250px"
            />

            <v-divider class="mt-3" />

            <v-data-table
              lst-evide
              :headers="[
                {
                  text: 'Fecha',
                  value: 'incidentFecha',
                },
                {
                  text: 'Usuario',
                  value: 'idUsuario',
                },
                {
                  text: 'Descripcion',
                  value: 'descripcion',
                },
                {
                  sortable: false,
                  text: 'Acciones',
                  value: 'actions',
                  align: 'right',
                },
              ]"
              :items="incidents"
              :search.sync="search"
              :items-per-page="-1"
              :sort-by="['idUsuario']"
              :sort-desc="[false, true]"
              multi-sort
              class="elevation-1 text-right"
            >
              <template
                v-slot:[`item.actions`]="{ item }"
              >
                <v-fab-transition>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon
                        :key="1"
                        small
                        fab
                        color="watch"
                        class="px-1 ml-1"
                        v-on="on"
                        @click="onShowIncident(item)"
                      >
                        mdi-eye
                      </v-icon>
                    </template>
                    <span>{{ $t("tooltip.show") }}</span>
                  </v-tooltip>
                </v-fab-transition>
              </template>
            </v-data-table>
          </v-container>
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
    name: 'DispatchReportDetailComponent',
    components: {
    //   Summary,
    },
    data: () => ({
      tabs: 0,
      search: '',
      dateCurrent: moment().format('dddd, MMMM Do YYYY'),
      activities: [
        {
          idActividad: 0,
          idDespacho: 'Toluca',
          actividadFecha: '2021-04-29T12:59:44.904Z',
          descripcion: 'Inicio de proceso de carga carga',
          usuario: 'Manuel Pérez',
        },
        {
          idActividad: 1,
          idDespacho: 'Toluca',
          actividadFecha: '2021-04-29T12:59:44.904Z',
          descripcion: 'Toma de evidencia llegada',
          usuario: 'Manuel Pérez',
        },
        {
          idActividad: 2,
          idDespacho: 'Toluca',
          actividadFecha: '2021-04-29T12:59:44.904Z',
          descripcion: 'Encuesta llegada',
          usuario: 'Manuel Pérez',
        },
        {
          idActividad: 3,
          idDespacho: 'Toluca',
          actividadFecha: '2021-04-29T12:59:44.904Z',
          descripcion: 'Seleccion de cargadores',
          usuario: 'Manuel Pérez',
        },
      ],
      incidents: [
        {
          idIncident: 0,
          idDespacho: 32,
          incidentFecha: '2021-04-29T12:59:44.904Z',
          idUsuario: 'Juan Gil',
          descripcion: 'Caja de vasos rotos',
          lstEvidencias: [
            {
              incidentEnlace: 'https://thumbs.dreamstime.com/z/caja-de-cart%C3%B3n-desgastada-concepto-seguro-contra-p%C3%A9rdidas-y-da%C3%B1os-rota-con-un-agujero-grande-170023271.jpg',
            },
          ],
        },
        {
          idIncident: 1,
          idDespacho: 32,
          incidentFecha: '2021-04-29T12:59:44.904Z',
          idUsuario: 'Juan Gil',
          descripcion: 'Cargador, cortadura con vidrio',
          lstEvidencias: [
            {
              incidentEnlace: 'https://st2.depositphotos.com/1111793/5217/i/950/depositphotos_52172617-stock-photo-injured-hand-with-bloody-bandage.jpg',
            },
          ],
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
      onShowActivity (item) {
        this.$router.push({
          name: 'ActivityForm',
          params: {
            option: 2, // option 2 to show
            data: item,
          },
        });
      },
      onShowIncident (item) {
        this.$router.push({
          name: 'IncidentForm',
          params: {
            option: 2, // option 2 to show
            data: item,
          },
        });
      },
    },
  }
</script>
