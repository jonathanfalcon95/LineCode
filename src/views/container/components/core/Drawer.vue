<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    mobile-break-point="960"
    app
    width="280"
    v-bind="$attrs"
  >
    <!-- <template v-slot:img="props">
      <v-img
        :gradient="`to bottom, ${barColor}`"
        v-bind="props"
      />
    </template> -->

    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title
          class="text-uppercase font-weight-regular display-2 text-center"
        >
          <div style="padding-left:20%">
            <v-img
              :src="require(`@/assets/logo1.png`)"
              width="80%"
            />
          </div>
          <!-- <span class="logo-mini">TRES60</span> -->
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider class="mb-1" />

    <v-list
      dense
      nav
    >
      <base-item-group :item="profile" />
    </v-list>

    <v-divider class="mb-2" />

    <v-list
      expand
      nav
    >
      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />

      <template v-for="(item, i) in computedItems">
        <base-item-group
          v-if="item.children && item.visible"
          :key="`group-${i}`"
          :item="item"
          color="black"
        >
          <!--  -->
        </base-item-group>

        <base-item
          v-else-if="!item.children && item.visible"
          :key="`item-${i}`"
          :item="item"
        />
      </template>

      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
  import { mapState, mapGetters } from 'vuex';

  export default {
    name: 'DashboardCoreDrawer',

    props: {
      expandOnHover: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      funcIds: [],
      items: [
        {
          id: 0,
          icon: 'mdi-view-dashboard',
          title: 'dashboard',
          to: '/home/dashboard',
          visible: true,
        },
        {
          id: 8,
          group: '/home/reports',
          icon: 'mdi-store',
          title: 'Reportes',
          visible: true,
          children: [
            {
              id: 22,
              visible: true,
              title: 'Procesos',
              to: '*',

            },
            {
              id: 8,
              visible: false,
              title: 'Despacho',
              to: 'dispatch-report',

            },
            {
              id: 100,
              visible: false,
              title: 'Despacho Dashboard',
              to: 'dispatch-dashboard',

            },
            {
              id: 101,
              visible: false,
              title: 'Transporte Dashboard',
              to: 'transport-dashboard',

            },
            {
              id: 8,
              visible: false,
              title: 'Descarga',
              to: 'donwload-report',
            },
            {
              id: 24,
              visible: false,
              title: 'Devolución',
              to: '*',
            },
            {
              id: 25,
              visible: false,
              title: 'Reparto',
              to: '*',
            },
            {
              id: 26,
              visible: false,
              title: 'Ventanilla',
              to: '*',
            },
            {
              id: 27,
              visible: false,
              title: 'Devoluciones',
              to: '*',
            },
          ],
        },
        {
          icon: 'mdi-store',
          title: 'Rastreo',
          to: '*',
        },
        {
          icon: 'mdi-store',
          title: 'Incidencias',
          to: '*',
        },
        {
          id: 3,
          visible: true,
          group: '/home/admin',
          icon: 'mdi-store',
          title: 'Administración',
          children: [
            {
              id: 5,
              visible: false,

              title: 'Encuestas',
              to: 'inquiries',
            },
            {
              id: 7,
              visible: false,
              title: 'Evidencias',
              to: 'evidences',
            },
            {
              title: 'Rutas',
              to: 'roads',
            },
            {
              id: 4,
              visible: false,
              title: 'Zonas',
              to: 'zones',
            },
            {
              id: 3,
              visible: false,
              title: 'Bodegas',
              to: 'warehouses',
            },
            {
              id: 6,
              visible: false,
              title: 'Representantes',
              to: 'Representatives',
            },
          ],
        },
        {
          group: '/home',
          icon: 'mdi-store',
          title: 'Acciones',
          children: [
            {
              title: 'Subir pedidos',
              to: 'upload/dispatch',
            },
            {
              title: 'Generar devolución',
              to: '*',
            },
            {
              title: 'Cambiar apariencia',
              to: '*',
            },
          ],
        },
        {
          id: 1,
          visible: false,
          to: '/home/users/users',
          icon: 'mdi-account-tie',
          title: 'users.title',
        },
        {
          id: 2,
          visible: false,
          to: '/home/roles/roles',
          icon: 'mdi-account-key',
          title: 'roles.title',
        },
      ],
    }),
    computed: {
      ...mapGetters(['user']),
      ...mapState(['barColor', 'barImage']),
      drawer: {
        get () {
          return this.$store.state.drawer;
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val);
        },
      },
      computedItems () {
        return this.items.map(this.mapItem);
      },
      profile () {
        return {
          avatarUrl: this.user.avatar,
          avatar: true,
          group: '',
          title: this.user.fullName,
          children: [
            {
              href: '',
              title: this.$t('my-profile'),
            },
          ],
        };
      },
    },
    watch: {
      '$vuetify.breakpoint.smAndDown' (val) {
        this.$emit('update:expandOnHover', !val);
      },
    },
    mounted () {
      console.log(this.user);
      this.user.claims.map((data) => {
        let value = parseInt(data.value);
        if (!isNaN(value)) {
          this.funcIds.push(value);
        }
      });

      console.log(this.funcIds);
    },
    methods: {
      mapItem (item) {
        return {
          ...item,
          children: item.children ? item.children.map(this.mapItem) : undefined,
          title: this.$t(item.title),
          // visible: this.funcIds.includes(item.id),
          visible: true, // test view drawer. Disable in prod.
        };
      },
      setItems () {
        console.log('setitems');
        this.items[1] = {};
        console.log(this.items);
        this.items.map(this.mapItem);
      },
    },
  };
</script>

<style lang="sass">
@import '~vuetify/src/styles/tools/_rtl.sass'

#core-navigation-drawer
  &.v-navigation-drawer--mini-variant
    .v-list-item
      justify-content: flex-start !important

    .v-list-group--sub-group
      display: block !important

  .v-list-group__header.v-list-item--active:before
    opacity: .24

  .v-list-item
    &__icon--text,
    &__icon:first-child
      justify-content: center
      text-align: center
      width: 20px

      +ltr()
        margin-right: 24px
        margin-left: 12px !important

      +rtl()
        margin-left: 24px
        margin-right: 12px !important

  .v-list--dense
    .v-list-item
      &__icon--text,
      &__icon:first-child
        margin-top: 10px

  .v-list-group--sub-group
    .v-list-item
      +ltr()
        padding-left: 8px

      +rtl()
        padding-right: 8px

    .v-list-group__header
      +ltr()
        padding-right: 0

      +rtl()
        padding-right: 0

      .v-list-item__icon--text
        margin-top: 19px
        order: 0

      .v-list-group__header__prepend-icon
        order: 2

        +ltr()
          margin-right: 8px

        +rtl()
          margin-left: 8px
</style>
