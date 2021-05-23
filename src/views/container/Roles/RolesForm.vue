<template>
  <v-container
    id="role-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <base-material-card
        color="primary"
        icon="mdi-account-outline"
      >
        <template v-slot:heading>
          <v-tabs
            v-model="tabs"
            background-color="transparent"
            slider-color="white"
          >
            <v-tab class="mr-3">
              <v-icon class="mr-2">
                mdi-account-key
              </v-icon>
              {{ getTitleButton }}
            </v-tab>
          </v-tabs>
        </template>

        <v-card-text style="height: 100px; position: relative">
          <v-fab-transition>
            <v-btn
              fab
              dark
              small
              color="primary"
              absolute
              right
              top
              @click="$router.go(-1)"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-card-text>
        <v-tabs-items
          v-model="tabs"
          class="transparent"
        >
          <v-tab-item :kei="0">
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col
                    cols="12"
                    sm="4"
                  >
                    <v-text-field
                      v-model="roleData.name"
                      class="purple-input"
                      :label="$t('roles.name')"
                      :disabled="option === 2 ? true : false"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    sm="4"
                  >
                    <v-select
                      v-model="roleData.funtions"
                      multiple
                      :items="functions"
                      :label="$t('roles.functions')"
                      item-text="text"
                      item-value="value"
                      :disabled="option === 2 ? true : false"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    class="text-right"
                  >
                    <v-btn
                      v-if="option !== 2"
                      color="primary"
                      class="mr-0"
                      @click="submit"
                    >
                      {{ getTitleButton }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-tab-item>
        </v-tabs-items>
      </base-material-card>
    </v-row>
  </v-container>
</template>

<script>
  import i18n from '@/i18n';
  import { editRoles, createRoles } from '@/api/modules';
  export default {
    data: () => ({
      select: { state: 'Florida', abbr: 'FL' },
      items: [
        { state: 'Florida', abbr: 'FL' },
        { state: 'Georgia', abbr: 'GA' },
        { state: 'Nebraska', abbr: 'NE' },
        { state: 'California', abbr: 'CA' },
        { state: 'New York', abbr: 'NY' },
      ],
      tabs: 0,
      option: 0,
      title: '',
      roleData: {
        name: '',
        funtions: [],
      },
      functions: [
        { text: 'Modulo de usuarios', value: '1' },
        { text: 'Modulo de Roles', value: '2' },
        { text: 'Modulo de bodega', value: '3' },
        { text: 'Modulo de zonas', value: '4' },
        { text: 'Modulo de Encuestas', value: '5' },
        { text: 'Modulo de Representantes', value: '6' },
        { text: 'Modulo de Evidencias', value: '7' },
        { text: 'Reporte de Despachos', value: '8' },
      ],
    }),
    computed: {
      getTitle () {
        if (this.option === 1) return i18n.t('roles.create');
        else if (this.option === 2) return i18n.t('roles.show');
        else if (this.option === 3) return i18n.t('roles.edit');
        else return i18n.t('roles.title');
      },
      getTitleButton () {
        if (this.option === 1) return i18n.t('crud.create');
        else if (this.option === 2) return i18n.t('crud.show');
        else if (this.option === 3) return i18n.t('crud.edit');
        else return i18n.t('roles.title');
      },
    },
    mounted () {
      // console.log($t('roles.title'))
      this.initialize();
    },
    methods: {
      initialize () {
        this.option = this.$route.params.option;
        console.log(this.option);
        if (this.option === 3 || this.option === 2) {
          this.roleData = this.$route.params.roleData;
          console.log(this.roleData);
        }
      },
      async submit () {
        console.log(this.roleData);
        if (this.option === 1) {
          let serviceResponse = await createRoles(this.roleData);
          console.log(serviceResponse);
          window.getApp.$emit('SHOW_MESSAGE', { text: 'Guardado con exito' });
          if (serviceResponse.succeeded) {
            console.log(serviceResponse);
            window.getApp.$emit('SHOW_MESSAGE', { text: 'Guardado con exito' });
          } else {
            console.log(serviceResponse);
            const params = { text: serviceResponse.message.text };
            window.getApp.$emit('SHOW_ERROR', params);
          }
        } else if (this.option === 3) {
          let serviceResponse = await editRoles(this.roleData.id, this.roleData);
          if (serviceResponse.ok === 1) {
            console.log(serviceResponse);
          } else {
            console.log(serviceResponse);
            const params = { text: serviceResponse.message.text };
            window.getApp.$emit('SHOW_ERROR', params);
          }
        }
      },
    }, //
  };
</script>
