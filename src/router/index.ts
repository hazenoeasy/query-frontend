import { createRouter, createWebHistory } from 'vue-router';
import { userStore } from '@/store';
import UserApi from '@/api/user';
import { ElMessage } from 'element-plus';
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
        {
          path: '/login',
          name: 'LoginView',
          component: () => import('@/views/LoginView.vue'),
        },
        {
          path: '/register',
          name: 'RegisterView',
          component: () => import('@/views/RegisterView.vue'),
        },
        {
          path: '/createQuestion',
          name: 'createQuestion',
          component: () => import('@/views/CreateQuestion.vue'),
          meta: {
            requireLogin: true,
          },
        },
        {
          path: '/userCenter',
          name: 'userCenter',
          component: () => import('@/views/UserCenterView.vue'),
          meta: {
            requireLogin: true,
          },
        },
      ],
    },
  ],
});
router.beforeEach((to, from, next) => {
  const token: string = userStore().getToken;
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (userStore().username == undefined || userStore().username == null || userStore().username == '') {
        UserApi.getUserInfo(token)
          .then((response) => {
            userStore().setUsername(response.data.data.username);
            next();
          })
          .catch(() => {
            ElMessage({
              type: 'warning',
              showClose: true,
              message: '登录已过期',
            });
            next({ path: '/' });
          });
      } else {
        next();
      }
    }
  } else {
    if (to.matched.some((r) => r.meta.requireLogin)) {
      ElMessage({
        type: 'warning',
        showClose: true,
        message: '请先登录哦',
      });
      next({ name: 'LoginView' });
    } else {
      next();
    }
  }
});

export default router;
