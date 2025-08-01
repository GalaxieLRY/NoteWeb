---
title: 【Vue】router
date: 2025-07-22
draft: false
---

Vue的router下index.js模板代码

```javascript
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import { store_State_init } from "@/store";
import jwt from "jsonwebtoken";
import moment from "dayjs";
import { Message } from "element-ui";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/index/content" },
  {
    path: "/index",
    component: (resolve) => require(["@/views/index/index.vue"], resolve),
    children: [
      {
        path: "content",
        name: "首页的内容（首页中的首页）",
        component: (resolve) => require(["@/views/index/content.vue"], resolve),
      },
      {
        path: "members",
        name: "成员",
        component: (resolve) => require(["@/views/members/index.vue"], resolve),
      },
      // 博客
      {
        path: "blog",
        meta: { requiresAuth: true },
        component: (resolve) => require(["@/views/blog/index.vue"], resolve),
      },
      {
        path: "*",
        component: (resolve) =>
          require(["@/views/otherPages/404.vue"], resolve),
      },
    ],
  },
  // 注册
  {
    path: "/register",
    component: (resolve) => require(["@/views/register/index.vue"], resolve),
  },
  // 登录
  {
    path: "/login",
    component: (resolve) => require(["@/views/login/index.vue"], resolve),
  },
  // 作品
  {
    path: "/index/works",
    component: (resolve) => require(["@/views/works/index.vue"], resolve),
  },
  // 重置密码
  {
    path: "/resetPassword",
    component: (resolve) =>
      require(["@/views/resetPassword/index.vue"], resolve),
  },
  // 用户中心
  {
    path: "/userCenter",
    meta: { requiresAuth: true },
    component: (resolve) => require(["@/views/userCenter/index.vue"], resolve),
  },
  // 404 表示请求的页面不存在、已被删除或无法访问
  {
    path: "/404",
    component: (resolve) => require(["@/views/otherPages/404.vue"], resolve),
  },
  // 未匹配到的路由，重定向到 /404
  { path: "*", redirect: "/404" },
];

const router = new VueRouter({
  routes,
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  const token = store.state.token;
  if (token) {
    const payload = jwt.decode(token);
    // token过期 —— 当前时间超过token的过期时间
    if (moment().isAfter(moment(payload.exp * 1000))) {
      sessionStorage.clear();
      // 重置 vuex
      store.replaceState(store_State_init);

      Message({
        offset: 150,
        message: "登录已过期！",
        type: "warning",
      });
    }
  }

  // 需鉴权的路由—— 判断路由的meta元数据中，是否requiresAuth为true
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 判断用户是否已登录
    if (store.state.isLogin) {
      // 已登录，则跳转到目标路由（需要用户登录的页面）
      next();
    } else {
      // 未登录，跳转到登录页
      next("/login");
    }
  } else {
    // 公共页面，直接跳转到目标路由
    next();
  }
});

export default router;
```