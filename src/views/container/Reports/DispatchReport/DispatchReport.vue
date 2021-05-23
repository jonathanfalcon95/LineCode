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
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">
          {{ title }}
        </div>
        <v-fab-transition>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                dark
                absolute
                top
                right
                fab
                v-on="on"
                @click="createItem"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>{{ $t("tooltip.new") }}</span>
          </v-tooltip>
        </v-fab-transition>
      </template>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        class="ml-auto"
        :label="searchLabel"
        hide-details
        single-line
        style="max-width: 250px;"
      />

      <v-divider class="mt-3" />

      <v-data-table
        :headers="headers"
        :items="items"
        :search.sync="search"
        :sort-by="['normalizedUserName']"
        :sort-desc="[false, true]"
        multi-sort
        class="elevation-1"
      >
        <template v-slot:[`item.actions`]="{ item }">
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
                  @click="showItem(item)"
                >
                  mdi-eye
                </v-icon>
              </template>
              <span>{{ $t("tooltip.show") }}</span>
            </v-tooltip>
          </v-fab-transition>
          <v-fab-transition>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon
                  :key="3"
                  small
                  fab
                  color="edit"
                  class="px-1 ml-1"
                  v-on="on"
                  @click="editItem(item)"
                >
                  mdi-microsoft-excel
                </v-icon>
              </template>
              <span>{{ $t("tooltip.edit") }}</span>
            </v-tooltip>
          </v-fab-transition>
          <v-fab-transition>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon
                  :key="4"
                  small
                  fab
                  color="delete"
                  class="px-1 ml-1"
                  v-on="on"
                  @click="deleteItem(item)"
                >
                  mdi-file-pdf
                </v-icon>
              </template>
              <span>{{ $t("tooltip.delete") }}</span>
            </v-tooltip>
          </v-fab-transition>
        </template>
      </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>
  import { getAllDispatch } from '@/api/modules'
  // import i18n from '@/i18n'
  export default {
    name: 'DashboardDataTables',

    data: () => ({
      hidden: false,
      tabs: 0,
      title: 'Despachos',
      headers: [
        {
          text: 'Fecha',
          value: 'fechaCargaEst',
        },
        {
          text: 'Campaña',
          value: 'campana',
        },

        {
          text: 'Porteo',
          value: 'bodega',
        },
        {
          text: 'Zona',
          value: 'zona',
        },
        {
          sortable: false,
          text: 'Actions',
          value: 'actions',
        },
      ],
      items: [],
      search: undefined,
      searchLabel: 'Search',
    }),
    async mounted () {
      this.loadItemsData()
    },
    methods: {
      async  loadItemsData () {
        let serviceResponse = await getAllDispatch()
        if (serviceResponse) {
          console.log(serviceResponse)
          this.items = serviceResponse.data
        //   console.log(this.items)
        } else {
          console.log(serviceResponse)
          const params = { text: serviceResponse.message.text }
          window.getApp.$emit('SHOW_ERROR', params)
        }
      },
      createItem () {
        console.log('create')
      },
      showItem (item) {
        console.log(item)
        this.$router.push({
          name: 'DispatchReportDetail',
          params: {
            data: item,
          },
        })
      },
      editItem (item) {
        console.log(item)
        // this.$router.push({
        //   name: 'UsersFrom',
        //   params: {
        //     option: 3, // option 3 to edit
        //     userData: item,
        //   },
        // })
      },
      deleteItem (item) {
        console.log(item)
        console.log('Delete')
      },
    },
  }
</script>
