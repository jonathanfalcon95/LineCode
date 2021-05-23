<template>
  <v-container
    id="activity"
    tag="section"
    fluid
  >
    <v-row justify="center">
      <base-material-card
        icon="mdi-playlist-check"
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
                mdi-playlist-check
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
                      md="4"
                    >
                      <v-text-field
                        v-model="activity.usuario"
                        class="purple-input"
                        :label="$t('activities.user') + ' (*)'"
                        :readonly="!isSaveMode"
                        :rules="userRules"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                    >
                      <v-text-field
                        v-model="activity.descripcion"
                        class="purple-input"
                        :label="$t('activities.description')"
                        :readonly="!isSaveMode"
                        :rules="[descriptionRules]"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                    >
                      <v-text-field
                        v-model="activity.actividadFecha"
                        class="purple-input"
                        :label="$t('activities.date') + ' (*)'"
                        :readonly="!isSaveMode"
                        :rules="dateRules"
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
  import moment from 'moment'

  const activity = {
    idActividad: null,
    idDespacho: null,
    actividadFecha: null,
    descripcion: null,
    usuario: null,
  };

  export default {
    name: 'ActivityFormComponent',
    components: {
      compOptionsBottomTap: OptionsBottomTap,
    },
    data: () => ({
      tabs: 0,
      valid: false,
      activity: Object.assign(activity),
      isSaveMode: false,
      option: null,
      search: '',
      userRules: [
        (v) => !!v || i18n.t('activities.user') + i18n.t('required.null'),
        (v) =>
          (v && v.length <= 250) ||
          i18n.t('activities.user') + i18n.t('required.length-250'),
      ],
      dateRules: [
        (v) => !!v || i18n.t('activities.date') + i18n.t('required.null'),
      ],
    }),
    computed: {
      modeI18Title: function () {
        switch (this.option) {
          case 1:
            return i18n.t('activities.activity-create');
          case 2:
            return i18n.t('activities.activity-show');
          case 3:
            return i18n.t('activities.activity-edit');
          default:
            return 0;
        }
      },
    },
    async mounted () {
      this.initialize();
      this.option = this.$route.params.option;
      if (this.option === undefined) {
        this.$router.back();
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
          console.log('params', paramData)
          this.activity = Object.assign(activity, {
            idActividad: paramData.idActividad,
            idDespacho: paramData.idDespacho,
            actividadFecha: moment(paramData.actividadFecha).format('DD/MM/YYYY HH:mm'),
            descripcion: paramData.descripcion,
            usuario: paramData.usuario,
          });
        }
        if (this.option === 1 || this.option === 3) {
          this.isSaveMode = true;
        }
        if (this.activity === undefined) {
          this.$router.back();
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
          const requestData = Object.assign(activity, {
            idActividad: this.activity.idActividad,
            idDespacho: this.activity.idDespacho,
            actividadFecha: this.activity.actividadFecha,
            descripcion: this.activity.descripcion,
            usuario: this.activity.usuario,
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
              this.activity.idEvidencia,
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
        this.activity = Object.assign(this.activity, {
          idActividad: null,
          idDespacho: null,
          actividadFecha: null,
          descripcion: null,
          usuario: null,
        });
      },
      descriptionRules (value) {
        if (!value || value.length <= 250) {
          return true;
        } else {
          return i18n.t('activities.description') + i18n.t('required.length-250');
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
