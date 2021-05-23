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
          <v-btn
            :key="'1'+item.normalizedUserName"
            color="blue"
            fab
            class="px-1 ml-1"
            x-small
            @click="showItem(item)"
          >
            <v-icon
              small
              v-text="'mdi-eye'"
            />
          </v-btn>
          <v-btn
            :key="'2'+item.normalizedUserName"
            color="green"
            fab
            class="px-1 ml-1"
            x-small
            @click="editItem(item)"
          >
            <v-icon
              small
              v-text="'mdi-microsoft-excel'"
            />
          </v-btn>
          <v-btn
            :key="'3'+item.normalizedUserName"
            color="red"
            fab
            class="px-1 ml-1"
            x-small
            @click="deleteItem(item)"
          >
            <v-icon
              small
              v-text="'mdi-file-pdf'"
            />
          </v-btn>
        </template>
      </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>
  import { getAllDispatch } from '@/api/modules'
  import i18n from '@/i18n'
  export default {
    name: 'WarehouseReportComponent',

    data: () => ({
      hidden: false,
      title: i18n.t('warehouses.warehouses'),
      headers: [
        {
          text: 'Nombre',
          value: 'name',
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
