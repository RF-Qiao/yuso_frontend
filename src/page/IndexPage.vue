<template>
  <a-input-search
    v-model:value="searchText"
    placeholder="input search text"
    enter-button="Search"
    size="large"
    @search="onSearch"
  />
  <a-tabs v-model:activeKey="activeKey" @change="onTabchage">
    <a-tab-pane key="post" tab="文章">
      <PostList />
    </a-tab-pane>
    <a-tab-pane key="picture" tab="图片" force-render>图片</a-tab-pane>
    <a-tab-pane key="user" tab="用户">用户</a-tab-pane>
  </a-tabs>
</template>
<script setup lang="ts">
import { ref, watchEffect } from "vue";
import PostList from "@/page/PostList.vue";
import { useRoute, useRouter } from "vue-router";
import myAxios from "@/plugins/myAxios";

myAxios.get("/post/get/vo?id=" + "123456").then((res) => {
  console.log(res);
});
//导入 route 和 router
const router = useRouter();
const route = useRoute();
const context = ref("");
const searchText = ref("");
const activeKey = route.params.category;
// 初始化查询参数 initSearchParams
const initSearchParams = {
  text: "",
  pageSize: 10,
  PageNum: 1,
};
const SearchParams = ref(initSearchParams);
/**
 * SearchParams.value 和 ...initSearchParams 有以下区别  SearchParams.value 获取响应式的值，...initSearchParams,可以将一个对象进行展开
 * 获得新对象，不会对原对象进行改变。
 */
watchEffect(() => {
  SearchParams.value = {
    ...initSearchParams,
    text: route.query.text,
  } as any;
});
//把参数带入到url中
const onSearch = (searchValue: string) => {
  //用户操作同步url
  router.push({
    query: {
      // 展开后就得到了原有参数对象中的所有键值对
      ...SearchParams.value,
      text: searchValue,
    },
  });
  alert(searchValue);
};

const onTabchage = (key: string) => {
  router.push({
    path: `/${key}`,
    query: SearchParams.value,
  });
};
</script>
