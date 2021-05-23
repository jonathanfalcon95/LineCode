<template>
  <v-container
    id="data-tables"
    tag="section"
  >
    <base-material-card
      color="primary"
      icon="mdi-text-box-check-outline"
      inline
      class="px-5 py-3"
    >
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">
          {{ $t("inquiries.inquiries") }}
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
                @click="onCreateInquiry"
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
            text: 'Modulo',
            value: 'modulo',
          },
          {
            text: 'Encuesta',
            value: 'preguntaEncuesta',
          },
          {
            text: 'Orden',
            value: 'orden',
          },
          {
            text: 'Requerida',
            value: 'requerida',
          },
          {
            sortable: false,
            text: 'Acciones',
            value: 'actions',
            align: 'right',
          },
        ]"
        :items="inquiries"
        :search.sync="search"
        :items-per-page="-1"
        :sort-by="['encuestaValor']"
        :sort-desc="[false, true]"
        multi-sort
        class="elevation-1 text-right"
      >
        <template v-slot:item.requerida="{ item }">
          {{ transforRequired(item.requerida) }}
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
                  @click="onShowInquiry(item)"
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
                  @click="onEditInquiry(item)"
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
                  @click="onSelectInquiry(item)"
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
            @click="onDeleteInquiry(selectInquiry)"
          >
            {{ $t("yes") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import { getInquiries } from '../../../api/modules';
  import i18n from '@/i18n';

  export default {
    name: 'InquiriesComponent',
    data: () => ({
      search: '',
      dialog: false,
      selectInquiry: {},
      fab: null,
      inquiries: [],
    }),
    computed: {},
    mounted: async function () {
      this.allInquiries();
    },
    methods: {
      allInquiries: async function () {
        let response = await getInquiries();

        if (response.ok === 1) {
          const inquiries = response.data;
          this.inquiries = inquiries;
        } else {
          this.$toasted.error(i18n.t('message.apiError404'), {
            theme: 'outline',
            position: 'top-right',
            duration: 5000,
          });
        }
      },
      transforRequired: function (required) {
        let text = '';
        if (required) {
          text = 'Si';
        } else {
          text = 'No';
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
      onCreateInquiry () {
        this.$router.push({
          name: 'InquiryForm',
          params: {
            option: 1, // option 1 to create
          },
        });
      },
      onShowInquiry (item) {
        this.$router.push({
          name: 'InquiryForm',
          params: {
            option: 2, // option 2 to show
            data: item,
          },
        });
      },
      onEditInquiry (item) {
        this.$router.push({
          name: 'InquiryForm',
          params: {
            option: 3, // option 2 to edit
            data: item,
          },
        });
      },
      onSelectInquiry (item) {
        this.selectInquiry = item;
        this.$swal({
          title: i18n.t('delete.title'),
          text: i18n.t('delete.confirm'),
          showCancelButton: true,
          confirmButtonColor: '#1dbf73',
          cancelButtonColor: '#d33',
          confirmButtonText: i18n.t('confirms.confirm'),
          cancelButtonText: i18n.t('confirms.deny'),
          icon: 'warning',
        }).then(async (result) => {
          console.log('result', result)
          // if (result.value) {
          //   let response = await deleteInquirys(item.id);

          //   if (response.ok === 1) {
          //     this.allInquiries();
          //     this.$toasted.show(response.message.text, {
          //       theme: 'outline',
          //       position: 'top-right',
          //       duration: 5000,
          //     });
          //   } else {
          //     this.$toasted.error(response.message.text, {
          //       theme: 'outline',
          //       position: 'top-right',
          //       duration: 5000,
          //     });
          //   }
          // }
        });
      },
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
