<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <base-material-card
        class="max-full-width"
        icon="mdi-account-outline"
        inline
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
                mdi-account
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
            <v-container class="py-0">
              <v-form-base
                id="form-base-person"
                :model="model"
                :schema="schema"
                @input:form-base-person="handleInput"
              />

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
            </v-container>
          </v-tab-item>
          <v-tab-item :kei="1">
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                  >
                    <v-select
                      color="secondary"
                      item-color="secondary"
                      :label="$t('users.role')"
                      multiple
                      :items="role"
                    >
                      <template v-slot:item="{ attrs, item, on }">
                        <v-list-item
                          v-bind="attrs"
                          active-class="secondary elevation-4 white--text"
                          class="mx-3 mb-2 v-sheet"
                          elevation="0"
                          v-on="on"
                        >
                          <v-list-item-content>
                            <v-list-item-title v-text="item" />
                          </v-list-item-content>

                          <v-scale-transition>
                            <v-list-item-icon
                              v-if="attrs.inputValue"
                              class="my-3"
                            >
                              <v-icon>mdi-check</v-icon>
                            </v-list-item-icon>
                          </v-scale-transition>
                        </v-list-item>
                      </template>
                    </v-select>
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
  import i18n from '@/i18n'
  import { editUsers, createUsers, getRoles } from '@/api/modules'
  import VFormBase from 'vuetify-form-base'
  import userjson from './user.json'
  import { rules } from '../../../utils/validators'

  export default {
    components: { VFormBase },
    data: () => ({
      dataInput: userjson.inputs,
      tabs: 0,
      option: 0,
      rowAttribute: { justify: 'center', align: 'center', noGutters: true },
      title: '',
      selectData: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      data: {
        status: '',
        status_str: '',
        type: '',
        obj: {},
      },
      types: [i18n.t('users.doctor'), i18n.t('users.pharmacist')],
      type: '',
      role: [
        'Fight Club',
        'Godfather',
        'Godfather II',
        'Godfather III',
        'Goodfellas',
        'Pulp Fiction',
        'Scarface',
      ],
      model: {
        avatar:
          'https://image.freepik.com/vector-gratis/perfil-avatar-hombre-icono-redondo_24640-14049.jpg',
        nombreCompleto: '',
        accessFailedCount: 0,
        password: 'Avon.360',
        idBodega: 0,
        rol: '5b9212e2-af0d-4b3b-9313-74593ee85185',
        seleccionado: true,
        userName: '',
        email: '',
        phoneNumber: '',
      },
      schema: {
        nombreCompleto: {
          type: 'text',
          label: 'Nombre',
          col: 3,
          offset: 1,
        },
        password: {
          type: 'text',
          ext: 'password',
          label: 'Password',
          clearable: true,
          col: 3,
          offset: 1,
        },
        email: {
          type: 'text',
          ext: 'email',
          label: 'Correo',
          rules: [rules.requiredEmail, rules.validEmail],
          col: 3,
          offset: 1,
        },
        userName: {
          type: 'text',
          label: 'Nombre de Usuario',
          col: 3,
          offset: 1,
        },
        phoneNumber: {
          type: 'tel',
          label: 'Teléfono',
          col: 3,
          offset: 1,
        },
        rol: {
          type: 'select',
          label: 'Rol',
          itemText: 'name',
          itemValue: 'val',
          items: [

          ],
          col: 3,
          offset: 1,
        },
        idBodega: {
          type: 'select',
          label: 'Bodega',
          items: [1],
          col: 3,
          offset: 1,
        },
      },
    }),
    computed: {
      getOption () {
        return this.option
      },
      getTitle () {
        if (this.option === 1) return i18n.t('users.create')
        else if (this.option === 2) return i18n.t('users.show')
        else if (this.option === 3) return i18n.t('users.edit')
        else return i18n.t('users.title')
      },
      getTitleButton () {
        if (this.option === 1) return i18n.t('crud.create')
        else if (this.option === 2) return i18n.t('crud.show')
        else if (this.option === 3) return i18n.t('crud.edit')
        else return i18n.t('users.title')
      },
    },
    async mounted () {
      this.handleRoles()
      this.initialize()
      console.log(this.dataInput)
    },
    methods: {
      validate () {
        this.$refs.myForm.validate()
      },
      async handleRoles () {
        let serviceResponse = await getRoles()
        let items = Object.entries(serviceResponse).map(e => e[1])
        items.map(item => {
          this.schema.rol.items.push({ name: item.name, val: item.id })
        })
        console.log(this.schema.rol)
      },
      handleInput (val) {
        console.log(val)
      },
      printData (data) {
        console.log(data)
      },
      initialize () {
        this.option = this.$route.params.option
        if (this.option === 3 || this.option === 2) {
          this.model = this.$route.params.userData
        }
      },
      async submit () {
        if (this.option === 1) {
          console.log(this.model)
          let serviceResponse = await createUsers(this.model)
          if (serviceResponse.succeeded) {
            console.log(serviceResponse)
            window.getApp.$emit('SHOW_MESSAGE', { text: 'Guardado con exito' })
          } else {
            console.log(serviceResponse)
            // const params = { text: serviceResponse.message.text }
            window.getApp.$emit('SHOW_ERROR', { text: 'Error al guardar datos' })
          }
        } else if (this.option === 3) {
          let serviceResponse = await editUsers(this.data.id, this.data)
          if (serviceResponse.ok === 1) {
            console.log(serviceResponse)
          } else {
            console.log(serviceResponse)
            const params = { text: serviceResponse.message.text }
            window.getApp.$emit('SHOW_ERROR', params)
          }
        }
      },
    }, //
  }
</script>
