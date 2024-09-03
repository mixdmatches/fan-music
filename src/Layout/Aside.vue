<template>
  <div id="aside">
    <img src="" alt="" />
    <!-- <h2>音乐平台</h2> -->
    <div class="aside-container1" router>
      <router-link
        tag="span"
        :to="item.path"
        class="aside-tab"
        v-for="(item, index) in subnavitem"
        :key="index"
        active-class="active"
        :class="{ active: $route.path === item.path }"
      >
        <i :class="item.icon"></i>
        <p>{{ item.name }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
      subnavitem: [
        { name: "发现", path: "/find", icon: "el-icon-s-home" },
        { name: "播客", path: "/podcast", icon: "el-icon-magic-stick" },
        { name: "社区", path: "/community", icon: "el-icon-chat-round" },
        { name: "我喜欢的音乐", path: "/love", icon: "bi bi-heart" },
      ],
      activeTab: "发现",
    };
  },
  methods: {
    click(item) {
      console.log("点击了");
    },
  },
};
</script>

<style lang="less" scoped>
#aside {
  text-align: center;
  grid-area: sidebar;
  background-color: var(--base-aside);

  /* border-radius: 20px; */
  img {
    width: 100%;
  }

  .aside-container1 {
    padding: 0 20px 0 20px;
    // border-bottom: 1px solid #ccc;
    span {
      cursor: pointer;
      padding: 10px;
      margin-top: 5px;
      display: flex;
      border-radius: 10px;
      i {
        color: #787f8d;
      }
      p {
        margin-left: 10px;
        color: #787f8d;
        text-align: center;
        font-size: 12px;
        font-weight: lighter;
      }
    }

    .active {
      background-color: rgb(252, 61, 75);
      color: white;
    }

    span:hover {
      background-color: #d9d9d9;
    }

    span.active i {
      color: white;
    }

    span.active p {
      color: white;
    }
    span.active:hover {
      background-color: rgb(252, 61, 75);
    }
  }

  // #el-menu {
  //   padding: 0 20px 0 20px;
  //   background-color: rgb(240, 243, 246);
  //   #el-menu-item {
  //     cursor: pointer;
  //     padding: 10px;
  //     margin-top: 5px;
  //     display: flex;
  //     border-radius: 10px;
  //     align-items: center;
  //     height: 35px;
  //     i {
  //       color: #787f8d;
  //     }
  //     p {
  //       margin-left: 10px;
  //       color: #787f8d;
  //       text-align: center;
  //       font-size: 12px;
  //       font-weight: lighter;
  //     }
  //   }
  //   .el-submenu__title {
  //     list-style: none;
  //   }
  //   #el-menu-item.is-active {
  //     background-color: rgb(252, 61, 75);
  //     color: white;
  //   }
  //   #el-menu-item:hover {
  //     background-color: #d9d9d9;
  //   }
  //   #el-menu-item:hover i {
  //     color: white;
  //   }
  //   #el-menu-item:hover p {
  //     color: white;
  //   }
  //   #el-menu-item.is-active i {
  //     color: white;
  //   }

  //   #el-menu-item.is-active p {
  //     color: white;
  //   }
  //   #el-menu-item.is-active:hover {
  //     background-color: rgb(252, 61, 75);
  //   }
  // }
}
</style>