import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/pages/Index'),
      children: [
        {
          name: 'Lock',
          path: 'lock',
          component: () => import('@/views/pages/Lock'),
        },
        {
          name: 'Login',
          path: 'login',
          component: () => import('@/views/pages/Authentication/Login'),
        },
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/container/Dashboard'),
        },

        {
          name: 'Register',
          path: 'register',
          component: () => import('@/views/pages/Register'),
        },
      ],
    },
    {
      path: '/home',
      component: () => import('@/views/container/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: 'dashboard',
          component: () => import('@/views/container/Dashboard'),
        },
        // Users
        {
          name: 'Users',
          path: 'users/users',
          component: () => import('@/views/container/Users/Users'),
        },
        {
          name: 'UsersFrom',
          path: 'users/form',
          component: () => import('@/views/container/Users/UsersFrom'),
        },
        // Roles
        {
          name: 'Roles',
          path: 'roles/roles',
          component: () => import('@/views/container/Roles/Roles'),
        },
        {
          name: 'RolesFrom',
          path: 'roles/form',
          component: () => import('@/views/container/Roles/RolesForm'),
        },
        // Inquiries
        {
          name: 'Inquiries',
          path: 'admin/inquiries',
          component: () => import('@/views/container/Inquiries/Inquiries'),
        },
        {
          name: 'InquiryForm',
          path: 'admin/inquiries/form',
          component: () => import('@/views/container/Inquiries/InquiryForm'),
        },
        // Evidences
        {
          name: 'Evidences',
          path: 'admin/evidences',
          component: () => import('@/views/container/Evidences/Evidences'),
        },
        {
          name: 'EvidenceForm',
          path: 'admin/evidences/form',
          component: () => import('@/views/container/Evidences/EvidenceForm'),
        },
        // Roads
        {
          name: 'Roads',
          path: 'admin/roads',
          component: () => import('@/views/container/Roads/Roads'),
        },
        {
          name: 'RoadForm',
          path: 'admin/roads/form',
          component: () => import('@/views/container/Roads/RoadForm'),
        },
        // Zones
        {
          name: 'Zones',
          path: 'admin/zones',
          component: () => import('@/views/container/Zones/Zones'),
        },
        {
          name: 'ZoneForm',
          path: 'admin/zones/form',
          component: () => import('@/views/container/Zones/ZoneForm'),
        },
        // Warehouses
        {
          name: 'Warehouses',
          path: 'admin/warehouses',
          component: () => import('@/views/container/Warehouses/Warehouses'),
        },
        {
          name: 'WarehouseForm',
          path: 'admin/warehouses/form',
          component: () => import('@/views/container/Warehouses/WarehouseForm'),
        },
        // Representatives
        {
          name: 'Representatives',
          path: 'admin/representatives',
          component: () =>
            import('@/views/container/Representatives/Representatives'),
        },
        {
          name: 'RepresentativeForm',
          path: 'admin/representatives/form',
          component: () =>
            import('@/views/container/Representatives/RepresentativeForm'),
        },
        // Activities
        {
          name: 'Activities',
          path: 'admin/activities',
          component: () =>
            import('@/views/container/Activities/Activities'),
        },
        {
          name: 'ActivityForm',
          path: 'admin/activities/form',
          component: () =>
            import('@/views/container/Activities/ActivityForm'),
        },
        // Incidents
        {
          name: 'Incidents',
          path: 'admin/incidents',
          component: () =>
            import('@/views/container/Incidents/Incidents'),
        },
        {
          name: 'IncidentForm',
          path: 'admin/incidents/form',
          component: () =>
            import('@/views/container/Incidents/IncidentForm'),
        },
        // Reports
        // Dispatch Report
        {
          name: 'DispatchReport',
          path: 'reports/dispatch-report',
          component: () =>
            import('@/views/container/Reports/DispatchReport/DispatchReport'),
        },
        {
          name: 'DispatchReportDetail',
          path: 'reports/dispatch-details',
          component: () =>
            import('@/views/container/Reports/DispatchReport/DispatchReportDetail'),
        },
         // Donwload Report
         {
          name: 'DonwloadReport',
          path: 'reports/donwload-report',
          component: () =>
            import('@/views/container/Reports/DonwloadReport/DonwloadReport'),
        },
        {
          name: 'DonwloadReportDetail',
          path: 'reports/donwload-report-detail',
          component: () =>
            import('@/views/container/Reports/DonwloadReport/DonwloadReportDetail'),
        },
        // Warehouse Report
        {
          name: 'WarehouseReport',
          path: 'reports/warehouse-report',
          component: () =>
            import('@/views/container/Reports/WarehouseReport'),
        },
        // Reports Dashboard
        // Dispatch
        {
          name: 'DispatchDashboard',
          path: 'reports/dispatch-dashboard',
          component: () =>
            import('@/views/container/Reports/DispatchDashboard'),
        },
        // Transport
        {
          name: 'TransportDashboard',
          path: 'reports/transport-dashboard',
          component: () =>
            import('@/views/container/Reports/TransportDashboard'),
        },

      ],
    },
    {
      path: '*',
      component: () => import('@/views/pages/Index'),
      children: [
        {
          name: '404 Error',
          path: '',
          component: () => import('@/views/pages/Error'),
        },
      ],
    },
  ],
});
