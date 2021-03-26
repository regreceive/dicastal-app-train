import { IBestAFSRoute } from '@umijs/plugin-layout/src/types/interface';

const routes: IBestAFSRoute[] = [
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '/welcome',
    component: '@/layouts/HolyGrailLayout',
    routes: [
      {
        path: '.',
        component: '@/pages',
        title: '欢迎',
      },
    ],
  },
];

export default routes;
