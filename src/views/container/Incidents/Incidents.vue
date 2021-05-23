<template>
  <v-container
    id="data-tables"
    tag="section"
    class="py-0"
  >
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
</template>

<script>
  import { getEvidences, deleteEvidence } from '../../../api/modules';
  import i18n from '@/i18n';

  export default {
    name: 'EvidencesComponent',
    data: () => ({
      search: '',
      dialog: false,
      selectEvidenceonCreateEvidence: {},
      fab: null,
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
    }),
    computed: {},
    mounted: async function () {
      this.allEvidences();
    },
    methods: {
      allEvidences: async function () {
        let response = await getEvidences();

        if (response.ok === 1) {
          const evidences = response.data;
          this.evidences = evidences;
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
      onCreateEvidence () {
        this.$router.push({
          name: 'EvidenceForm',
          params: {
            option: 1, // option 1 to create
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
      onEditEvidence (item) {
        this.$router.push({
          name: 'EvidenceForm',
          params: {
            option: 3, // option 2 to edit
            data: item,
          },
        });
      },
      onSelectEvidence (item) {
        this.selectEvidence = item;
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
          if (result.value) {
            let response = await deleteEvidence(item.id);

            if (response.ok === 1) {
              this.allEvidences();
              this.$toasted.show(response.message.text, {
                theme: 'outline',
                position: 'top-right',
                duration: 5000,
              });
            } else {
              this.$toasted.error(response.message.text, {
                theme: 'outline',
                position: 'top-right',
                duration: 5000,
              });
            }
          }
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
