<template>
  <v-container
    id="warehouse"
    tag="section"
    fluid
  >
    <v-row justify="center">
      <base-material-card
        icon="mdi-file-image"
        inline
        class="max-full-width"
        width="100%"
        color="primary"
      >
        <template v-slot:heading>
          <v-tabs
            v-model="tabs"
            background-color="transparent"
            slider-color="white"
          >
            <v-tab class="mr-3">
              <v-icon class="mr-2">
                mdi-file-image
              </v-icon>
              {{ modeI18Title }}
            </v-tab>
          </v-tabs>
        </template>

        <v-card-text style="position: relative">
          <v-fab-transition>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  fab
                  dark
                  small
                  color="primary"
                  absolute
                  top
                  right
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
        </v-card-text>

        <v-tabs-items
          v-model="tabs"
          class="transparent"
        >
          <v-tab-item :kei="1">
            <v-container fluid>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                class="mt-5"
              >
                <v-container class="max-full-width">
                  <v-row>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="warehouse.nombreBodega"
                        class="purple-input"
                        :label="$t('warehouses.name') + ' (*)'"
                        :readonly="!isSaveMode"
                        :rules="nameRules"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="warehouse.domicilioBodega"
                        class="purple-input"
                        :label="$t('warehouses.address') + ' (*)'"
                        :readonly="!isSaveMode"
                        :rules="addressRules"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                    >
                      <v-text-field
                        v-model="warehouse.paisBodega"
                        class="purple-input"
                        :label="$t('warehouses.state')"
                        :readonly="!isSaveMode"
                        :rules="stateRules"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                    >
                      <v-text-field
                        v-model="warehouse.paisBodega"
                        class="purple-input"
                        :label="$t('warehouses.country') + ' (*)'"
                        :readonly="!isSaveMode"
                        :rules="countryRules"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                    >
                      <v-text-field
                        v-model="warehouse.estadoBodega"
                        class="purple-input"
                        :label="$t('warehouses.status') + ' (*)'"
                        :readonly="!isSaveMode"
                        :rules="statusRules"
                      />
                    </v-col>
                  </v-row>
                  <compOptionsBottomTap
                    :tap-number="1"
                    :is-mode-save="isSaveMode"
                    :info-required="isSaveMode"
                    :no-cancel="option === 3"
                    :no-save="!isSaveMode"
                    :no-arrow="true"
                    @onSave="onSave"
                    @onCancelButton="onCancelButton"
                  />
                </v-container>
              </v-form>
            </v-container>
          </v-tab-item>
        </v-tabs-items>
      </base-material-card>
    </v-row>
  </v-container>
</template>

<script>
  import i18n from '@/i18n';
  import OptionsBottomTap from '../components/core/OptionsBottomTap';
  import { postWarehouse, putWarehouse } from '../../../api/modules';

  const warehouse = {
    domicilioBodega: null,
    estadoBodega: null,
    habilitadoBodega: null,
    idBodega: 0,
    nombreBodega: null,
    paisBodega: null,
  };

  export default {
    name: 'WarehouseFormComponent',
    components: {
      compOptionsBottomTap: OptionsBottomTap,
    },
    data: () => ({
      tabs: 0,
      valid: false,
      warehouse: Object.assign(warehouse),
      isSaveMode: false,
      option: null,
      nameRules: [
        (v) => !!v || i18n.t('warehouses.name') + i18n.t('required.null'),
      ],
      addressRules: [
        (v) => !!v || i18n.t('warehouses.address') + i18n.t('required.null'),
      ],
      stateRules: [
        (v) => !!v || i18n.t('warehouses.state') + i18n.t('required.null'),
      ],
      countryRules: [
        (v) => !!v || i18n.t('warehouses.country') + i18n.t('required.null'),
      ],
      statusRules: [
        (v) => !!v || i18n.t('warehouses.status') + i18n.t('required.null'),
      ],
    }),
    computed: {
      modeI18Title: function () {
        switch (this.option) {
          case 1:
            return i18n.t('warehouses.warehouse-create');
          case 2:
            return i18n.t('warehouses.warehouse-show');
          case 3:
            return i18n.t('warehouses.warehouse-edit');
          default:
            return 0;
        }
      },
    },
    async mounted () {
      this.initialize();
      this.option = this.$route.params.option;
      if (this.option === undefined) {
        this.$router.push({ name: 'Warehouses' });
      }
    },
    beforeDestroy: function () {
      this.onCancelButton();
    },
    methods: {
      initialize () {
        this.option = this.$route.params.option;
        if (this.option === 3 || this.option === 2) {
          let paramData = this.$route.params.data;
          this.warehouse = Object.assign(warehouse, {
            domicilioBodega: paramData.domicilioBodega,
            estadoBodega: paramData.estadoBodega,
            habilitadoBodega: paramData.habilitadoBodega,
            idBodega: paramData.idBodega,
            nombreBodega: paramData.nombreBodega,
            paisBodega: paramData.paisBodega,
          });
        }
        if (this.option === 1 || this.option === 3) {
          this.isSaveMode = true;
        }
        if (this.warehouse === undefined) {
          this.$router.push({ name: 'Warehouses' });
        }
      },
      goBack (tab) {
        if (tab === 1) {
          this.tabs = 0;
        } else if (tab === 2) {
          this.tabs = 1;
        } else {
          this.$router.back();
        }
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
      onlyNumber ($event) {
        let keyCode = $event.keyCode ? $event.keyCode : $event.which;
        if (keyCode === 44 || keyCode === 46) {
          $event.preventDefault();
        }
        if ($event.target.value > 10) $event.target.value = 0;

        if (keyCode < 48 || keyCode > 57) {
          $event.preventDefault();
        }
      },
      onSave: async function () {
        if (this.$refs.form.validate()) {
          const requestData = Object.assign(warehouse, {
            estadoBodega: this.warehouse.estadoBodega,
            habilitadoBodega: this.warehouse.habilitadoBodega,
            idBodega: this.warehouse.idBodega,
            nombreBodega: this.warehouse.nombreBodega,
            paisBodega: this.warehouse.paisBodega,
          });

          if (this.option === 1) {
            let responseData = await postWarehouse(requestData);
            if (responseData.ok === 1) {
              this.$toasted.show(responseData.messaje, {
                theme: 'outline',
                position: 'top-right',
                duration: 5000,
              });
              this.$router.go(-1);
            } else {
              const params = { text: responseData.message.text };
              window.getApp.$emit('SHOW_ERROR', params);
            }
          } else if (this.option === 3) {
            let responseData = await putWarehouse(
              this.warehouse.idEvidencia,
              requestData
            );
            if (responseData.ok === 1) {
              this.$toasted.show(responseData.messaje, {
                theme: 'outline',
                position: 'top-right',
                duration: 5000,
              });
              this.$router.go(-1);
            } else {
              const params = { text: responseData.message.text };
              window.getApp.$emit('SHOW_ERROR', params);
            }
          }
        }
      },
      onCancelButton: function (val) {
        this.tabs = 0;
        this.$refs.form.resetValidation();
        this.warehouse = Object.assign(this.warehouse, {
          domicilioBodega: null,
          estadoBodega: null,
          habilitadoBodega: null,
          idBodega: 0,
          nombreBodega: null,
          paisBodega: null,
        });
      },
      headerRules (value) {
        if (!value || value.length <= 250) {
          return true;
        } else {
          return i18n.t('warehouses.header') + i18n.t('required.length-250');
        }
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

.max-full-width {
  width: 100%;
}
</style>
