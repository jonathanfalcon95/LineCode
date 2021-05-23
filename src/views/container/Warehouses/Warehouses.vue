<template>
  <v-container
    id="data-tables"
    tag="section"
  >
    <base-material-card
      color="primary"
      icon="mdi-store"
      inline
      class="px-5 py-3"
    >
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">
          {{ $t("warehouses.warehouses") }}
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
                @click="onCreateWarehouse"
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
            text: 'Bodega',
            value: 'nombreBodega',
          },
          {
            text: 'Estado',
            value: 'estadoBodega',
          },
          {
            text: 'Pais',
            value: 'paisBodega',
          },
          {
            text: 'Domicilio',
            value: 'domicilioBodega',
          },
          {
            text: 'Status',
            value: 'habilitadoBodega',
          },
          {
            sortable: false,
            text: 'Acciones',
            value: 'actions',
            align: 'right',
          },
        ]"
        :items="warehouses"
        :search.sync="search"
        :items-per-page="-1"
        :sort-by="['encuestaValor']"
        :sort-desc="[false, true]"
        multi-sort
        class="elevation-1 text-right"
      >
        <template v-slot:item.estadoBodega="{ item }">
          {{ transforState(item.estadoBodega) }}
        </template>
        <template v-slot:item.paisBodega="{ item }">
          {{ transforCountry(item.paisBodega) }}
        </template>
        <template v-slot:item.domicilioBodega="{ item }">
          {{ transforAddress(item.domicilioBodega) }}
        </template>
        <template v-slot:item.habilitadoBodega="{ item }">
          {{ transforStatus(item.habilitadoBodega) }}
        </template>
        <template v-slot:item.actions="{ item }">
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
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          {{ $t("delete.title") }}
        </v-card-title>

        <v-card-text class="text-center">
          {{ $t("delete.confirm") }}
        </v-card-text>
        <v-card-actions class="text-center">
          <v-spacer />
          <v-btn
            text
            color="green darken-1"
            @click="dialog = false"
          >
            {{ $t("no") }}
          </v-btn>
          <v-btn
            color="green darken-1"
            text
          >
            {{ $t("yes") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import { getWarehouses } from '../../../api/modules';
  import i18n from '@/i18n';

  export default {
    name: 'WarehouseComponent',
    data: () => ({
      search: '',
      dialog: false,
      selectWarehouse: {},
      fab: null,
      warehouses: [],
    }),
    computed: {},
    mounted: async function () {
      this.allWarehouses();
    },
    methods: {
      async allWarehouses () {
        let response = await getWarehouses();
        console.log('data', response)
        if (response.ok === 1) {
          const warehouses = response.data;
          this.warehouses = warehouses;
        } else {
          this.$toasted.error(i18n.t('message.apiError404'), {
            theme: 'outline',
            position: 'top-right',
            duration: 5000,
          });
        }
      },
      transforState: function (state) {
        let text = '';
        if (state) {
          text = state;
        } else {
          text = 'Toluca';
        }
        return text;
      },
      transforCountry: function (country) {
        let text = '';
        if (country) {
          text = country;
        } else {
          text = 'Mexico';
        }
        return text;
      },
      transforAddress: function (address) {
        let text = '';
        if (address) {
          text = address;
        } else {
          text = 'zona industrial I';
        }
        return text;
      },
      transforStatus: function (status) {
        let text = '';
        if (status === 'A') {
          text = i18n.t('status.active');
        } else {
          text = i18n.t('status.inactive');
        }
        return text;
      },
      onCreateWarehouse () {
        this.$router.push({
          name: 'WarehouseForm',
          params: {
            option: 1, // option 1 to create
          },
        });
      },
      onShowWarehouse (item) {
        this.$router.push({
          name: 'WarehouseForm',
          params: {
            option: 2, // option 2 to show
            data: item,
          },
        });
      },
      onShowListWarehouse (item) {
        this.$router.push({
          name: 'WarehouseForm',
          params: {
            option: 2, // option 2 to show
            data: item,
            tab: 1,
          },
        });
      },
      onEditWarehouse (item) {
        this.$router.push({
          name: 'WarehouseForm',
          params: {
            option: 3, // option 2 to edit
            data: item,
          },
        });
      },
      // onSelectWarehouse (item) {
      //   this.selectWarehouse = item;
      //   this.$swal({
      //     title: i18n.t('delete.title'),
      //     text: i18n.t('delete.confirm'),
      //     showCancelButton: true,
      //     confirmButtonColor: '#1dbf73',
      //     cancelButtonColor: '#d33',
      //     confirmButtonText: i18n.t('confirms.confirm'),
      //     cancelButtonText: i18n.t('confirms.deny'),
      //     icon: 'warning',
      //   }).then(async (result) => {
      //     if (result.value) {
      //       let response = await deleteWarehouse(item.id);

      //       if (response.ok === 1) {
      //         this.allWarehouse();
      //         this.$toasted.show(response.message.text, {
      //           theme: 'outline',
      //           position: 'top-right',
      //           duration: 5000,
      //         });
      //       } else {
      //         this.$toasted.error(response.message.text, {
      //           theme: 'outline',
      //           position: 'top-right',
      //           duration: 5000,
      //         });
      //       }
      //     }
      //   });
      // },
    },
  };
</script>

<style>
#lateral .v-btn--example {
  bottom: 0;
  position: absolute;
  margin: 0 0 16px 16px;
}
</style>
