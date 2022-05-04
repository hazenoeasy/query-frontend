import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/LayoutHome.vue'),
      children: [
        {
          path: '/',
          name: 'indexPage',
          component: () => import('@/views/IndexView.vue'),
        },
        {
          path: '/topicRoot',
          name: 'topicRoot',
          component: () => import('@/views/TopicRootView.vue'),
        },
        {
          path: '/topic/:parentId',
          name: 'topicPage',
          component: () => import('@/views/TopicPage.vue'),
        },
        {
          path: '/question/:qid',
          name: 'QuestionDetail',
          component: () => import('@/views/QuestionDetail.vue'),
        },
      ],
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

export default router;
