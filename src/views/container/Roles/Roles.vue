<template>
  <v-container
    id="data-tables"
    tag="section"
  >
    <base-material-card
      color="primary"
      icon="mdi-vuetify"
      inline
      class="px-5 py-3"
    >
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">
          {{ $t("roles.title") }}
        </div>
        <v-fab-transition>
          <v-btn
            fab
            dark
            color="primary"
            absolute
            right
            top
            @click="createRole"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>
      </template>

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        class="ml-auto"
        label="Search"
        hide-details
        single-line
        style="max-width: 250px;"
      />

      <v-divider class="mt-3" />

      <v-data-table
        :headers="headers"
        :items="items"
        :search.sync="search"
        :sort-by="['name', 'office']"
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
                  @click="showRole(item)"
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
                  @click="editRole(item)"
                >
                  mdi-pencil
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
                  @click="deleteRole(item)"
                >
                  mdi-delete
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
  import { getRoles } from '@/api/modules'
  import i18n from '@/i18n'

  export default {
    name: 'DashboardDataTables',

    data: () => ({
      hidden: false,
      headers: [
        {
          text: i18n.t('id'),
          value: 'id',
        },
        {
          text: i18n.t('roles.name'),
          value: 'name',
        },

        {
          sortable: false,
          text: 'Actions',
          value: 'actions',
        },
      ],
      items: [

      ],
      search: undefined,
    }),
    async mounted () {
      this.loadRolesData();
    // window.getApp.$emit("SHOW_ERROR", "34534535")
    },
    methods: {
      async loadRolesData () {
        console.log('mounted')
        let serviceResponse = await getRoles()
        this.items = Object.entries(serviceResponse).map(e => e[1])
        console.log(this.items)
        let arrayOfObj = Object.entries(serviceResponse).map((e) => ({ [e[0]]: e[1] }));
        console.log(arrayOfObj)
      },
      createRole () {
        console.log('create')
        this.$router.push({
          name: 'RolesFrom',
          params: {
            option: 1, // option 1 to create
          },
        })
      },
      showRole (item) {
        console.log(item)
        this.$router.push({
          name: 'RolesFrom',
          params: {
            option: 2, // option 2 to show
            roleData: item,
          },
        })
      },
      editRole (item) {
        console.log(item)
        this.$router.push({
          name: 'RolesFrom',
          params: {
            option: 3, // option 3 to edit
            roleData: item,
          },
        })
      },
      deleteRole (item) {
        console.log(item)
        console.log('Delete')
      },
    },
  }
</script>
