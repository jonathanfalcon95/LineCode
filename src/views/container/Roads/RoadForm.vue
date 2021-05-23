<template>
  <v-container
    id="road"
    tag="section"
    fluid
  >
    <v-row justify="center">
      <base-material-card
        icon="mdi-road"
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
                mdi-road
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
                        v-model="road.nombreRuta"
                        class="purple-input"
                        :label="$t('roads.road') + ' (*)'"
                        :readonly="!isSaveMode"
                        :rules="roadRules"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                    >
                      <v-text-field
                        v-model="road.descreption"
                        class="purple-input"
                        :label="$t('roads.descreption')"
                        :readonly="!isSaveMode"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                    >
                      <v-select
                        v-model="road.zone"
                        :items="zones"
                        item-value="idZona"
                        item-text="nombreZona"
                        :label="$t('roads.zone') + ' (*)'"
                        :rules="zoneRules"
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
                    @nextTap="nextTap(1)"
                  />
                </v-container>
              </v-form>
            </v-container>
          </v-tab-item>
          <v-tab-item
            v-if="option !== 1"
            :kei="2"
          >
            <v-container
              fluid
              class="max-full-width"
            >
              <v-card>
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
                      text: $t('kitchens.name'),
                      value: 'name',
                    },
                    {
                      text: $t('kitchens.phone'),
                      value: 'phone_number',
                    },
                    {
                      text: $t('kitchens.status'),
                      value: 'status',
                    },
                    {
                      sortable: false,
                      text: $t('actions'),
                      value: 'actions',
                      align: 'right',
                    },
                  ]"
                  :items="road.kitchens"
                  :search.sync="search"
                  :items-per-page="-1"
                  :sort-by="['name']"
                  :sort-desc="[false, true]"
                  multi-sort
                  class="elevation-1 text-right"
                >
                  <template v-slot:item.status="{ item }">
                    {{ transforStatus(item.status) }}
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
                            @click="onShow(item)"
                          >
                            mdi-eye
                          </v-icon>
                        </template>
                        <span>{{ $t("tooltip.show") }}</span>
                      </v-tooltip>
                    </v-fab-transition>
                  </template>
                </v-data-table>
              </v-card>
              <compOptionsBottomTap
                :tap-number="1"
                :is-mode-save="option !== 2"
                :info-required="isSaveMode"
                :no-cancel="option === 3"
                :no-save="option !== 2"
                :no-arrow="true"
                @onSave="onSave"
                @onCancelButton="onCancelButton"
                @nextTap="nextTap(2)"
              />
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
  import { postInquity, putInquity } from '../../../api/modules';

  const road = {
    id: null,
    nombreRuta: null,
    descreption: null,
    zone: null,
  };

  export default {
    name: 'InquityFormComponent',
    components: {
      compOptionsBottomTap: OptionsBottomTap,
    },
    data: () => ({
      tabs: 0,
      tab2: false,
      valid: true,
      road: Object.assign(road),
      editMode: false,
      snackbar: false,
      isSaveMode: false,
      isTabMode: false,
      option: null,
      search: '',
      details: [],
      isModalOpen: false,
      selectItem: '',
      modalType: 1,
      charityOrg: [],
      charityOrgId: null,
      zones: [
        {
          idZona: 1,
          nombreZona: 'Z210',
          description: 'Zona 210',
        },
        {
          idZona: 2,
          nombreZona: 'Z108',
          description: 'Zona 108',
        },
      ],
      roadRules: [
        (v) => !!v || i18n.t('roads.road') + i18n.t('required.null'),
        (v) =>
          (v && v.length <= 250) ||
          i18n.t('roads.road') + i18n.t('required.length-250'),
      ],
      zoneRules: [(v) => !!v || i18n.t('roads.zone') + i18n.t('required.null')],
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
            return i18n.t('roads.road-create');
          case 2:
            return i18n.t('roads.road-show');
          case 3:
            return i18n.t('roads.road-edit');
          default:
            return 0;
        }
      },
      getTitleButton: function () {
        if (this.option === 1) return i18n.t('crud.create');
        else if (this.option === 2) return i18n.t('crud.show');
        else if (this.option === 3) return i18n.t('crud.edit');
        else return i18n.t('roads.road');
      },
    },
    async mounted () {
      this.initialize();

      if (this.option === undefined) {
        this.$router.push({ name: 'Roads' });
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
          this.road = Object.assign(road, {
            id: paramData.id,
            nombreRuta: paramData.nombreRuta,
            descreption: paramData.description,
            zone: paramData.zone,
          });
          this.details = paramData.charity_orgs;
          if (this.$route.params.tab && this.$route.params.tab === 1) {
            // eslint-disable-next-line no-unused-vars
            const timer = setTimeout(() => {
              this.tabs = 1;
              return {};
            }, 400);
          }
        }
        if (this.option !== 1) {
          this.tab2 = true;
        }
        if (this.option === 1 || this.option === 3) {
          this.editMode = false;
          this.isSaveMode = true;
        }
        // if (this.option === 2) {
        //   this.isSaveMode = false
        // }
        if (this.road === undefined) {
          this.$router.push({ name: 'Inquitys' });
        }
      },
      nextTap: function (val) {
        if (this.$refs.form.validate()) {
          this.tab2 = true;
          this.tabs = val;
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
      onShow: function (item) {
        this.$router.push({
          name: 'Kitchen',
          params: {
            option: 2,
            data: item,
          },
        });
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
      addItem: async function (val) {
        if (val) {
          const charity = await this.charityOrg.find(
            (element) => element.id === val
          );
          let valid = await this.details.find((item) => item.id === charity.id);
          if (valid) {
            this.$toasted.error(
              i18n.t('charityOrgs.charityOrgs') +
                ' ' +
                i18n.t('exists.duplicate'),
              {
                theme: 'outline',
                position: 'top-right',
                duration: 8000,
              }
            );
          } else {
            this.details.push({
              id: charity.id,
              name: charity.name,
              address: charity.address,
              email: charity.email,
              phone_number: charity.phone_number,
            });
          }
        } else {
          this.$toasted.error(
            i18n.t('charityOrgs.charityOrgs') + i18n.t('required.null'),
            {
              theme: 'outline',
              position: 'top-right',
              duration: 8000,
            }
          );
        }
      },
      deleteItem: function (value) {
        var id = this.details.findIndex((item) => item.id === value.id);
        this.details.splice(id, 1);
      },
      onSave: async function () {
        if (this.$refs.form.validate()) {
          var arr = [];
          var sum = false;
          var err = false;
          var cont = 0;
          if (this.details.length > 0) {
            for (let i = 0; i < this.details.length; i++) {
              if (
                this.details[i].percent === null ||
                this.details[i].percent === '' ||
                this.details[i].percent === undefined
              ) {
                sum = false;
                this.$toasted.error(i18n.t('charities.Distributioadd'), {
                  theme: 'outline',
                  position: 'top-right',
                  duration: 5000,
                });
                break;
              }
              if (this.details[i].percent === '0') {
                err = true;
                this.$toasted.error(i18n.t('charities.DistributionWarningZero'), {
                  theme: 'outline',
                  position: 'top-right',
                  duration: 5000,
                });
                break;
              } else {
                sum = true;
                arr.push({
                  id: this.details[i].id,
                  percent: this.details[i].percent,
                });
              }
            }
            arr.forEach(function (element) {
              cont += Number(element.percent);
            });
            if ((cont < 100 || cont > 100) && sum) {
              this.$toasted.error(i18n.t('charities.DistributionWarning'), {
                theme: 'outline',
                position: 'top-right',
                duration: 5000,
              });
            } else if (sum && cont === 100 && !err) {
              const data = Object.assign(road, {
                nombreRuta: this.road.nombreRuta,
                descreption: this.road.description,
                zone: this.road.zona,
              });

              if (this.option === 1) {
                let responseData = await postInquity(data);
                if (responseData.ok === 1) {
                  this.$toasted.show(responseData.message.text, {
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
                let responseData = await putInquity(data, this.road.id);
                if (responseData.ok === 1) {
                  this.$toasted.show(responseData.message.text, {
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
          } else {
            this.$toasted.error(i18n.t('SameDayMenus.addTable'), {
              theme: 'outline',
              position: 'top-right',
              duration: 5000,
            });
          }
        }
      },
      onCancelButton: function (val) {
        this.tabs = 0;
        this.$refs.form.resetValidation();
        this.details = [];
        this.road = Object.assign(this.road, {
          id: null,
          name: null,
          description: null,
          status: 'A',
          kitchens: [],
        });
      },
      descriptionRules (value) {
        if (!value || value.length <= 200) {
          return true;
        } else {
          return i18n.t('roads.description') + i18n.t('required.length-200');
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
