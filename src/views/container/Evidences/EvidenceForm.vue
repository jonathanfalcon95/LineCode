<template>
  <v-container
    id="evidence"
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
                        v-model="evidence.nombreEvidencia"
                        class="purple-input"
                        :label="$t('evidences.evidence') + ' (*)'"
                        :readonly="!isSaveMode"
                        :rules="evidenceRules"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="evidence.encabezado"
                        class="purple-input"
                        :label="$t('evidences.header')"
                        :readonly="!isSaveMode"
                        :rules="[headerRules]"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="3"
                    >
                      <v-text-field
                        v-model="evidence.modulo"
                        class="purple-input"
                        :label="$t('evidences.module') + ' (*)'"
                        :readonly="!isSaveMode"
                        :rules="moduleRules"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="3"
                    >
                      <v-text-field
                        v-model.number="evidence.orden"
                        type="number"
                        min="0"
                        class="purple-input"
                        :label="$t('evidences.order') + ' (*)'"
                        :readonly="!isSaveMode"
                        :rules="orderRules"
                        @keypress="onlyNumber"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="3"
                    >
                      <v-text-field
                        v-model="evidence.tipoEvidencia"
                        class="purple-input"
                        :label="$t('evidences.type') + ' (*)'"
                        :readonly="!isSaveMode"
                        :rules="typeRules"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="3"
                    >
                      <v-checkbox
                        v-model="evidence.requerida"
                        color="primary"
                        :label="$t('evidences.evidence-required')"
                        :readonly="!isSaveMode"
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
  import { postEvidence, putEvidence } from '../../../api/modules';

  const evidence = {
    encabezado: null,
    idEvidencia: 0,
    modulo: null,
    nombreEvidencia: null,
    orden: null,
    requerida: false,
    tipoEvidencia: null,
  };

  export default {
    name: 'EvidenceFormComponent',
    components: {
      compOptionsBottomTap: OptionsBottomTap,
    },
    data: () => ({
      tabs: 0,
      valid: false,
      evidence: Object.assign(evidence),
      isSaveMode: false,
      option: null,
      evidenceRules: [
        (v) => !!v || i18n.t('evidences.evidence') + i18n.t('required.null'),
        (v) =>
          (v && v.length <= 250) ||
          i18n.t('evidences.evidence') + i18n.t('required.length-250'),
      ],
      orderRules: [
        (v) => !!v || i18n.t('evidences.order') + i18n.t('required.null'),
      ],
      moduleRules: [
        (v) => !!v || i18n.t('evidences.module') + i18n.t('required.null'),
        (v) =>
          (v && v.length <= 250) ||
          i18n.t('evidences.module') + i18n.t('required.length-250'),
      ],
      typeRules: [
        (v) => !!v || i18n.t('evidences.type') + i18n.t('required.null'),
        (v) =>
          (v && v.length <= 250) ||
          i18n.t('evidences.type') + i18n.t('required.length-250'),
      ],
    }),
    computed: {
      modeI18Title: function () {
        switch (this.option) {
          case 1:
            return i18n.t('evidences.evidence-create');
          case 2:
            return i18n.t('evidences.evidence-show');
          case 3:
            return i18n.t('evidences.evidence-edit');
          default:
            return 0;
        }
      },
    },
    async mounted () {
      this.initialize();
      this.option = this.$route.params.option;
      if (this.option === undefined) {
        this.$router.push({ name: 'Evidences' });
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
          this.evidence = Object.assign(evidence, {
            encabezado: paramData.encabezado,
            idEvidencia: paramData.idEvidencia,
            modulo: paramData.modulo,
            nombreEvidencia: paramData.nombreEvidencia,
            orden: paramData.orden,
            requerida: paramData.requerida,
            tipoEvidencia: paramData.tipoEvidencia,
          });
        }
        if (this.option === 1 || this.option === 3) {
          this.isSaveMode = true;
        }
        if (this.evidence === undefined) {
          this.$router.push({ name: 'Evidences' });
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
          const requestData = Object.assign(evidence, {
            encabezado: this.evidence.encabezado,
            modulo: this.evidence.modulo,
            nombreEvidencia: this.evidence.nombreEvidencia,
            orden: this.evidence.orden,
            requerida: this.evidence.requerida,
            tipoEvidencia: this.evidence.tipoEvidencia,
          });

          if (this.option === 1) {
            let responseData = await postEvidence(requestData);
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
            let responseData = await putEvidence(
              this.evidence.idEvidencia,
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
        this.evidence = Object.assign(this.evidence, {
          encabezado: null,
          idEvidencia: null,
          modulo: null,
          nombreEvidencia: null,
          orden: null,
          requerida: null,
          tipoEvidencia: null,
        });
      },
      headerRules (value) {
        if (!value || value.length <= 250) {
          return true;
        } else {
          return i18n.t('evidences.header') + i18n.t('required.length-250');
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
