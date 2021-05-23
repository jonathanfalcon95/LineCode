<template>
  <v-container
    id="representative"
    tag="section"
    fluid
  >
    <v-row justify="center">
      <base-material-card
        icon="mdi-account-multiple"
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
                mdi-account-multiple
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
                      md="3"
                    >
                      <v-text-field
                        v-model="representative.nombreRepresentante"
                        class="purple-input"
                        :label="$t('representatives.name') + ' (*)'"
                        :readonly="!isSaveMode"
                        :rules="nameRules"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="3"
                    >
                      <v-text-field
                        v-model="representative.apellidoRepresentante"
                        class="purple-input"
                        :label="$t('representatives.lastname') + ' (*)'"
                        :readonly="!isSaveMode"
                        :rules="lastnameRules"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="3"
                    >
                      <v-text-field
                        v-model="representative.telefRepresentante"
                        class="purple-input"
                        :label="$t('representatives.phone') + ' (*)'"
                        :readonly="!isSaveMode"
                        :rules="phoneRules"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="3"
                    >
                      <v-text-field
                        v-model="representative.direccionRepresentante"
                        class="purple-input"
                        :label="$t('representatives.direction') + ' (*)'"
                        :readonly="!isSaveMode"
                        :rules="directionRules"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="3"
                    >
                      <v-text-field
                        v-model="representative.latitudRepresentante"
                        class="purple-input"
                        :label="$t('representatives.latitude') + ' (*)'"
                        :readonly="!isSaveMode"
                        :rules="latitudeRules"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="3"
                    >
                      <v-text-field
                        v-model="representative.longitudRepresentante"
                        class="purple-input"
                        :label="$t('representatives.longitude') + ' (*)'"
                        :readonly="!isSaveMode"
                        :rules="longitudeRules"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="3"
                    >
                      <v-file-input
                        accept="image/png"
                        :placeholder="$t('representatives.select-image')"
                        :label="$t('representatives.avatar') + ' (*)'"
                        prepend-icon="mdi-camera"
                        :disabled="!isSaveMode"
                        :rules="avatarRules"
                        @change="onFileSelectedAvatar($event)"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="3"
                    >
                      <v-file-input
                        accept="image/png"
                        :placeholder="$t('representatives.select-image')"
                        :label="$t('representatives.facade') + ' (*)'"
                        prepend-icon="mdi-camera"
                        :disabled="!isSaveMode"
                        :rules="facadeRules"
                        @change="onFileSelectedFacade($event)"
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
  import { putRepresentative, postRepresentative, uploadFile } from '../../../api/modules';
  // import { blobToFile } from '../../../utils/toFile';

  const representative = {
    idrepresentante: 0,
    nombreRepresentante: null,
    apellidoRepresentante: null,
    direccionRepresentante: null,
    latitudRepresentante: null,
    longitudRepresentante: null,
    telefRepresentante: null,
    avatarRepresentante: null,
    fachadaRepresentante: null,
    idBodega: 1,
    athome: false,
  };

  export default {
    name: 'RepresentativeFormComponent',
    components: {
      compOptionsBottomTap: OptionsBottomTap,
    },
    data: () => ({
      tabs: 0,
      valid: true,
      representative: Object.assign(representative),
      isSaveMode: false,
      option: null,
      search: '',
      imageDataAvatar: null,
      urlImageAvatar: null,
      imageDataFacade: null,
      urlImageFacade: null,
      nameRules: [
        (v) => !!v || i18n.t('representatives.name') + i18n.t('required.null'),
        (v) =>
          (v && v.length <= 250) ||
          i18n.t('representatives.name') + i18n.t('required.length-250'),
      ],
      lastnameRules: [
        (v) => !!v || i18n.t('representatives.lastname') + i18n.t('required.null'),
      ],
      directionRules: [
        (v) => !!v || i18n.t('representatives.direction') + i18n.t('required.null'),
      ],
      latitudeRules: [
        (v) => !!v || i18n.t('representatives.latitude') + i18n.t('required.null'),
      ],
      longitudeRules: [
        (v) => !!v || i18n.t('representatives.longitude') + i18n.t('required.null'),
      ],
      phoneRules: [
        (v) => !!v || i18n.t('representatives.phone') + i18n.t('required.null'),
      ],
      avatarRules: [
        (v) => !!v || i18n.t('representatives.avatar') + i18n.t('required.null'),
      ],
      facadeRules: [
        (v) => !!v || i18n.t('representatives.facade') + i18n.t('required.null'),
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
            return i18n.t('representatives.representative-create');
          case 2:
            return i18n.t('representatives.representative-show');
          case 3:
            return i18n.t('representatives.representative-edit');
          default:
            return 0;
        }
      },
      getTitleButton: function () {
        if (this.option === 1) return i18n.t('crud.create');
        else if (this.option === 2) return i18n.t('crud.show');
        else if (this.option === 3) return i18n.t('crud.edit');
        else return i18n.t('representatives.representative');
      },
    },
    async mounted () {
      this.initialize();

      if (this.option === undefined) {
        this.$router.push({ name: 'Representatives' });
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
          this.representative = Object.assign(representative, {
            idrepresentante: paramData.idrepresentante,
            nombreRepresentante: paramData.nombreRepresentante,
            apellidoRepresentante: paramData.apellidoRepresentante,
            direccionRepresentante: paramData.direccionRepresentante,
            latitudRepresentante: paramData.latitudRepresentante,
            longitudRepresentante: paramData.longitudRepresentante,
            telefRepresentante: paramData.telefRepresentante,
            avatarRepresentante: paramData.avatarRepresentante,
            fachadaRepresentante: paramData.fachadaRepresentante,
            idBodega: paramData.idBodega,
            athome: paramData.athome,
          });
        }
        if (this.option === 1 || this.option === 3) {
          this.isSaveMode = true;
        }
        if (this.representative === undefined) {
          this.$router.push({ name: 'Representatives' });
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
      onFileSelectedAvatar: function (e) {
        try {
          this.cleanImageAvatar()
          console.log('e', e)
          const type = e.type.split('/').pop()
          if (e && (type === 'jpeg' || type === 'jpg' || type === 'png')) {
            this.imageDataAvatar = e
            if (e) { this.urlImageAvatar = URL.createObjectURL(this.imageDataAvatar) }
          } else {
            this.cleanImageAvatar()
          }
        } catch (error) {

        }
      },
      cleanImageAvatar: function () {
        this.imageDataAvatar = null
        this.urlImageAvatar = null
      },
      onFileSelectedFacade: function (e) {
        try {
          this.cleanImageFacade()
          console.log('e', e)
          const type = e.type.split('/').pop()
          if (e && (type === 'jpeg' || type === 'jpg' || type === 'png')) {
            this.imageDataFacade = e
            if (e) { this.urlImageFacade = URL.createObjectURL(this.imageDataFacade) }
          } else {
            this.cleanImageFacade()
          }
        } catch (error) {

        }
      },
      cleanImageFacade: function () {
        this.imageDataFacade = null
        this.urlImageFacade = null
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
        if (!this.imageDataAvatar) {
          this.$toasted.error((i18n.t('representatives.select-image') + ' ' + i18n.t('representatives.avatar')), {
            theme: 'outline',
            position: 'top-right',
            duration: 5000,
          })
          return
        }
        if (!this.imageDataFacade) {
          this.$toasted.error((i18n.t('representatives.select-image') + ' ' + i18n.t('representatives.facade')), {
            theme: 'outline',
            position: 'top-right',
            duration: 5000,
          })
          return
        }
        if (this.$refs.form.validate() && this.imageDataAvatar && this.imageDataFacade) {
          const formDataAvatar = new FormData();
          formDataAvatar.append('file', this.imageDataAvatar);
          const responseDataAvatar = await uploadFile(formDataAvatar)
          if (responseDataAvatar.ok === 1) {
            this.representative.avatarRepresentante = responseDataAvatar.data[0].uri
          } else {
            const params = { text: 'Error guardando la imagen del avatar' };
            window.getApp.$emit('SHOW_ERROR', params);
          }

          const formDataFacade = new FormData();
          formDataFacade.append('file', this.imageDataFacade);
          const responseDataFacade = await uploadFile(formDataFacade)
          if (responseDataFacade.ok === 1) {
            this.representative.fachadaRepresentante = responseDataFacade.data[0].uri
          } else {
            const params = { text: 'Error guardando la imagen de la fachada' };
            window.getApp.$emit('SHOW_ERROR', params);
          }

          if (this.representative.urlImageAvatar && this.representative.urlImageFacade) {
            const requestData = Object.assign(representative, {
              idrepresentante: this.representative.nombreRepresentante,
              nombreRepresentante: this.representative.nombreRepresentante,
              apellidoRepresentante: this.representative.apellidoRepresentante,
              direccionRepresentante: this.representative.direccionRepresentante,
              latitudRepresentante: this.representative.latitudRepresentante,
              longitudRepresentante: this.representative.longitudRepresentante,
              telefRepresentante: this.representative.telefRepresentante,
              avatarRepresentante: this.representative.avatarRepresentante,
              fachadaRepresentante: this.representative.fachadaRepresentante,
              idBodega: 1,
              athome: false,
            });

            if (this.option === 1) {
              let responseData = await postRepresentative(requestData);
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
              let responseData = await putRepresentative(
                this.representative.idrepresentante,
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
          } else {
            const params = { text: 'Las imagenes no se han almacenado en blob storaage' };
            window.getApp.$emit('SHOW_ERROR', params);
          }
        }
      },
      onCancelButton: function (val) {
        this.tabs = 0;
        this.$refs.form.resetValidation();
        this.representative = Object.assign(this.representative, {
          idrepresentante: 0,
          nombreRepresentante: null,
          apellidoRepresentante: null,
          direccionRepresentante: null,
          latitudRepresentante: null,
          longitudRepresentante: null,
          telefRepresentante: null,
          avatarRepresentante: null,
          fachadaRepresentante: null,
          idBodega: 1,
          athome: false,
        });
      },
      descriptionRules (value) {
        if (!value || value.length <= 200) {
          return true;
        } else {
          return i18n.t('representatives.description') + i18n.t('required.length-200');
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
