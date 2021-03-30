import { IBestAFSRoute } from '@umijs/plugin-layout/src/types/interface';

const routes: IBestAFSRoute[] = [
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '/welcome',
    component: '@/layouts/BasicLayout',
    routes: [
      {
        path: '.',
        component: '@/pages',
        title: '欢迎',
      },
      {
        path: './page3',
        component: '@/pages/page3',
        title: '欢迎1',
      },
    ],
  },
  {
    path: '/page2',
    component: '@/layouts/BasicLayout',
    routes: [
      {
        path: '.',
        component: '@/pages/page2',
        title: '欢迎2',
      },
    ],
  },
];

export default routes;
