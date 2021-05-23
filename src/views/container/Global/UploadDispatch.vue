<template>
  <v-container
    id="role-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <base-material-card icon="mdi-account-outline">
        <template v-slot:heading>
          <v-tabs
            v-model="tabs"
            background-color="transparent"
            slider-color="white"
          >
            <v-tab class="mr-3">
              <v-icon class="mr-2">
                mdi-account-key
              </v-icon>
              {{ "Subir pedidos" }}
            </v-tab>
          </v-tabs>
        </template>

        <v-card-text style="height: 100px; position: relative">
          <v-fab-transition>
            <v-btn
              fab
              dark
              small
              color="primary"
              absolute
              right
              top
              @click="$router.go(-1)"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-card-text>
        <v-tabs-items
          v-model="tabs"
          class="transparent"
        >
          <v-tab-item :kei="0">
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col
                    cols="12"
                    sm="3"
                  >
                    <v-select
                      :items="process"
                      label="Seleccione Proceso"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="3"
                  >
                    <v-select
                      :items="plant"
                      label="Seleccione planta"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="3"
                  >
                    <v-select
                      :items="porteo"
                      label="Seleccione porteo"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="3"
                  >
                    <v-select
                      :items="zone"
                      label="Seleccione Zona"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    lg="6"
                  >
                    <v-menu
                      ref="menu1"
                      v-model="menu1"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="dateFormatted"
                          label="Date"
                          hint="MM/DD/YYYY format"
                          persistent-hint
                          prepend-icon="mdi-calendar"
                          v-bind="attrs"
                          @blur="date = parseDate(dateFormatted)"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="date"
                        no-title
                        @input="menu1 = false"
                      />
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    sm="3"
                  >
                    <v-file-input
                      v-model="form.units"
                      accept=".xlsx, .xls, .csv"
                      label="Cargar manifiesto de unitarios"
                      truncate-length="15"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="3"
                  >
                    <v-file-input
                      v-model="form.boxs"
                      accept=".xlsx, .xls, .csv"
                      label="Cargar manifiesto de Cajas"
                      truncate-length="15"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="3"
                  >
                    <v-text-field
                      v-model="form.boxPaper"
                      class="purple-input"
                      label="Cantidad de cajas de papeleria"
                      type="number"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="3"
                  >
                    <v-text-field
                      v-model="form.boxMis"
                      class="purple-input"
                      label="Cantidad de cajas de Miselaneos"
                      type="number"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-tab-item>
        </v-tabs-items>
      </base-material-card>
    </v-row>
  </v-container>
</template>

<script>
 // import i18n from '@/i18n'
  // import { editRoles, createRoles } from '@/api/modules'
  export default {
    data: (vm) => ({
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      tabs: 0,
      form: {},
      process: ['Despacho', 'Reparto'],
      plant: ['Celaya', 'Example'],
      porteo: ['Toluca'],
      zone: ['108', '101', '102'],
      transport: ['Juan', 'Transportista'],
    }),
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },
    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
    },
    mounted () {
      // console.log($t('roles.title'))
      this.initialize()
    },
    methods: {
      initialize () {
        console.log('initialize')
      },
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
    }, //
  }
</script>
