<template>
  <v-container
    id="inquiry"
    tag="section"
    fluid
  >
    <v-row justify="center">
      <base-material-card
        icon="mdi-text-box-check-outline"
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
                mdi-text-box-check-outline
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
                        v-model="inquiry.preguntaEncuesta"
                        class="purple-input"
                        :label="$t('inquiries.inquiry') + ' (*)'"
                        :readonly="!isSaveMode"
                        :rules="inquiryRules"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <!-- <v-select
                        v-model="inquiry.modulo"
                        :items="modules"
                        item-value="id"
                        item-text="description"
                        :label="$t('inquiries.module') + ' (*)'"
                        :rules="moduleRules"
                      /> -->
                      <v-text-field
                        v-model="inquiry.modulo"
                        class="purple-input"
                        :label="$t('inquiries.module') + ' (*)'"
                        :readonly="!isSaveMode"
                        :rules="moduleRules"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model.number="inquiry.orden"
                        type="number"
                        min="0"
                        class="purple-input"
                        :label="$t('inquiries.order') + ' (*)'"
                        :readonly="!isSaveMode"
                        :rules="orderRules"
                        @keypress="onlyNumber"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-checkbox
                        v-model="inquiry.requerida"
                        color="primary"
                        :label="$t('inquiries.inquiry-required')"
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
  import { putInquiry, postInquiry } from '../../../api/modules';

  const inquiry = {
    idEncuesta: 0,
    modulo: null,
    orden: null,
    preguntaEncuesta: null,
    requerida: false,
  };

  export default {
    name: 'InquityFormComponent',
    components: {
      compOptionsBottomTap: OptionsBottomTap,
    },
    data: () => ({
      tabs: 0,
      valid: true,
      inquiry: Object.assign(inquiry),
      isSaveMode: false,
      option: null,
      search: '',
      inquiryRules: [
        (v) => !!v || i18n.t('inquiries.inquiry') + i18n.t('required.null'),
        (v) =>
          (v && v.length <= 250) ||
          i18n.t('inquiries.inquiry') + i18n.t('required.length-250'),
      ],
      moduleRules: [
        (v) => !!v || i18n.t('inquiries.module') + i18n.t('required.null'),
      ],
      orderRules: [
        (v) => !!v || i18n.t('inquiries.order') + i18n.t('required.null'),
      ],
      modules: [
        {
          id: 1,
          description: 'Carga',
        },
        {
          id: 2,
          description: 'Descarga',
        },
        {
          id: 3,
          description: 'Reparto',
        },
      ],
    }),
    computed: {
      status: function () {
        return [
          { text: i18n.t('status.active'), value: 'A' },
          { text: i18n.t('status.inactive'), value: 'I' },
        ];
      },
      modeI18Title: function () {
        switch (this.option) {
          case 1:
            return i18n.t('inquiries.inquiry-create');
          case 2:
            return i18n.t('inquiries.inquiry-show');
          case 3:
            return i18n.t('inquiries.inquiry-edit');
          default:
            return 0;
        }
      },
      getTitleButton: function () {
        if (this.option === 1) return i18n.t('crud.create');
        else if (this.option === 2) return i18n.t('crud.show');
        else if (this.option === 3) return i18n.t('crud.edit');
        else return i18n.t('inquiries.inquiry');
      },
    },
    async mounted () {
      this.initialize();

      if (this.option === undefined) {
        this.$router.push({ name: 'Inquiries' });
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
          this.inquiry = Object.assign(inquiry, {
            idEncuesta: paramData.idEncuesta,
            modulo: paramData.modulo,
            orden: paramData.orden,
            preguntaEncuesta: paramData.preguntaEncuesta,
            requerida: paramData.requerida,
          });
        }
        if (this.option === 1 || this.option === 3) {
          this.isSaveMode = true;
        }
        if (this.inquiry === undefined) {
          this.$router.push({ name: 'Inquiries' });
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
          const requestData = Object.assign(inquiry, {
            idEncuesta: this.inquiry.idEncuesta,
            modulo: this.inquiry.modulo,
            orden: this.inquiry.orden,
            preguntaEncuesta: this.inquiry.preguntaEncuesta,
            requerida: this.inquiry.requerida,
          });
          if (this.option === 1) {
            let responseData = await postInquiry(requestData);
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
            let responseData = await putInquiry(
              this.inquiry.idEncuesta,
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
        this.inquiry = Object.assign(this.inquiry, {
          idEncuesta: 0,
          modulo: null,
          orden: null,
          preguntaEncuesta: null,
          requerida: null,
        });
      },
      descriptionRules (value) {
        if (!value || value.length <= 200) {
          return true;
        } else {
          return i18n.t('inquiries.description') + i18n.t('required.length-200');
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
