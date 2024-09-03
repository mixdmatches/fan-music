## 路由设计
- 发现
  1. 精选
  2. 歌单广场
  3. 排行榜
  4. 歌手
  5. VIP
- 播客
- 社区


<!-- 官方推荐 -->
```
<!-- 官方推荐 -->
  <div class="commend">
    <!-- 头部 -->
    <div class="header">
      <span
        v-for="(item, index) in headerNavBar"
        :key="item.puth"
        :class="{ active: activeTab === index }"
        @click="activeTab = index"
        >{{ item.name }}</span
      >
    </div>
    <!-- 下部分内容 -->
    <!-- 三图轮播 -->
    <div class="rotation">
      <img src="@/assets/images/b1.jpg" alt="" />
      <img src="@/assets/images/b2.jpg" alt="" />
      <img src="@/assets/images/b3.jpg" alt="" />
    </div>
    <!-- 官方歌单 -->
    <div class="monad">
      <p>官方歌单<i class="el-icon-arrow-right"></i></p>
      <div class="monad-items">
        <!-- 单个歌单 -->
        <div class="m-item">
          <!-- 歌单封面 -->
          <img class="cover" src="@/assets/images/p2.jpg" alt="" />
          <!-- logo标 -->
          <img
            class="logo-small"
            src="../assets/images/logo-black.png"
            alt=""
          />
          <!-- 播放量 -->
          <span class="playCount"
            ><i class="el-icon-caret-right"></i>28.4万</span
          >
          <!-- 底部文字描述 -->
          <span class="text-bottom">
            <p>「纯音乐」你偶尔需要安静的发泄</p>
          </span>
        </div>

      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="newMusic">
      <!-- 标题 -->
      <p>最新音乐<i class="el-icon-arrow-right"></i></p>
      <!-- 一些歌 -->
      <div class="newMusic-items">
        <!-- 单首歌 -->
        <div class="n-item">
          <img src="../assets/images/n1.jpg" alt="" />
          <span class="song">
            <p class="songName">Wake</p>
            <p class="songer">圈圈菌</p>
          </span>
        </div>
      </div>
    </div>
    <!-- 精选有声书 -->
    <div class="newMusic">
      <!-- 标题 -->
      <p>精选有声书<i class="el-icon-arrow-right"></i></p>
      <!-- 一些歌 -->
      <div class="newMusic-items">
        <!-- 单首歌 -->
        <div class="n-item">
          <img src="../assets/images/n1.jpg" alt="" />
          <span class="song">
            <p class="songName">Wake</p>
            <p class="songer">圈圈菌</p>
          </span>
        </div>
      </div>
    </div>
    <!-- 热门播客 -->
    <div class="newMusic">
      <!-- 标题 -->
      <p>热门播客<i class="el-icon-arrow-right"></i></p>
      <!-- 一些歌 -->
      <div class="newMusic-items">
        <!-- 单首歌 -->
        <div class="n-item">
          <img src="../assets/images/n1.jpg" alt="" />
          <span class="song">
            <p class="songName">Wake</p>
            <p class="songer">圈圈菌</p>
          </span>
        </div>
      </div>
    </div>
  </div>
```
# 侧边栏(路由导航)
```
<template>
  <div id="aside">
    <img src="../assets/images/logo.png" class="img-responsive" alt="Image" />
    <div class="aside-container1" router :default-active="defaultActive">
      <span
        class="aside-tab"
        v-for="(item, index) in subnavitem"
        :key="index"
        :class="{ active: activeTab === index }"
        @click="activeTab = index"
      >
        <i :class="item.icon"></i>
        <p>{{ item.name }}</p>
      </span>
    </div>
  </div>
</template>

<script>
// Vue.use(MenuItem)
export default {
  name: "Aside",
  data() {
    return {
      subnavitem: [
        { name: "发现", path: "/find", icon: "el-icon-s-home" },
        { name: "播客", path: "/podcast", icon: "el-icon-magic-stick" },
        { name: "社区", path: "/community", icon: "el-icon-chat-round" },
      ],
      activeTab: 0,
    };
  },
};
</script>

<style lang="less" scoped>
#aside {
  text-align: center;
  grid-area: sidebar;
  background-color: rgb(240, 243, 246);

  /* border-radius: 20px; */
  img {
    width: 100%;
  }

  .aside-container1 {
    padding: 0 20px 0 20px;
    .aside-tab {
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

    .aside-tab.active {
      background-color: rgb(252, 61, 75);
      color: white;
    }

    .aside-tab:hover {
      background-color: #d9d9d9;
    }

    .aside-tab.active i {
      color: white;
    }

    .aside-tab.active p {
      color: white;
    }
    .aside-tab.active:hover {
      background-color: rgb(252, 61, 75);
    }
  }
}
</style>
```

# 底部
```
<template>
  <div id="footer">
    <audio src=""></audio>
    <!-- 左边 -->
    <div class="footer-left">
      <!-- 播放封面 -->
      <div class="imgs">
        <img class="img1" src="../assets/images/cp2.png" alt="" />
        <img class="img2" src="../assets/images/n1.jpg" alt="" />
      </div>
      <!-- 封面右边部分 -->
      <div class="footer-left-right">
        <!-- 歌名歌手 -->
        <div class="songInfo">
          <p class="songName">Wake-</p>
          <p class="songerName">圈圈菌</p>
        </div>
        <!-- 收藏,评论,转发,下载-->
        <div class="worktop">
          <span><i class="bi bi-download"></i></span>
          <span><i class="bi bi-folder-plus"></i></span>
          <span class="remarkcount">
            <i class="bi bi-chat-dots"></i>
            <i class="count">999+</i>
          </span>
          <span><i class="bi bi-box-arrow-up-right"></i></span>
        </div>
      </div>
    </div>
    <!-- 中间 -->
    <div class="footer-among">
      <div class="among-top">
        <!-- 喜欢 -->
        <span class="child"><i class="bi bi-heart"></i></span>
        <!-- 上一首 -->
        <span class="child"><i class="bi bi-skip-start-fill"></i></span>
        <!-- 播放/暂 -->
        <span class="child"><i class="bi bi-play-fill"></i></span>
        <!-- 下一首 -->
        <span class="child"><i class="bi bi-skip-end-fill"></i></span>
        <!-- 循环播放... -->
        <span class="child"><i class="bi bi-repeat"></i></span>
      </div>
      <div class="among-bottom">
        <p class="current-time">00:34</p>
        <span class="music_progress_bar">
          <span class="music_progress_inline"></span>
        </span>
        <p class="time">03:55</p>
      </div>
    </div>
    <!-- 右边 -->
    <div class="footer-right">
      <!-- <span class="timbre">
          <p>极高</p>
        </span> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="less" scoped>
#footer {
  grid-area: footer;
  background-color: rgb(250, 250, 250);
  border-top: 1px #ccc solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  // 底部左边
  .footer-left {
    width: 200px;
    height: 100%;
    // background-color: aqua;
    margin-left: 20px;
    display: flex;
    align-items: center;

    // 播放封面
    .imgs {
      position: relative;

      .img1 {
        width: 50px;
      }

      .img2 {
        position: absolute;
        border-radius: 50%;
        width: 35px;
        top: 8px;
        left: 7px;
      }
    }

    // 封面右边部分
    .footer-left-right {
      margin-left: 20px;
      display: flex;
      flex-direction: column;

      .songInfo {
        display: flex;
        align-items: center;

        p {
          float: left;
          font-weight: lighter;
        }

        .songerName {
          font-size: 12px;
          color: #787f8d;
        }
      }

      .worktop {
        display: flex;
        gap: 20px;

        span {
          color: #787f8d;
        }

        .remarkcount {
          position: relative;

          .count {
            position: absolute;
            top: 0;
            right: -9px;
            font-size: 7px;
            background-color: white;
          }
        }
      }
    }
  }

  // 底部中间
  .footer-among {
    width: 350px;
    height: 100%;

    .among-top {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 70%;
      gap: 15px;

      span {
        // font-weight: lighter;
        color: #787f8d;
        font-size: 20px;
      }

      .child:nth-child(3) {
        font-size: 40px;
      }
    }

    .among-bottom {
      height: 30%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;

      .music_progress_bar {
        width: 100%;
        height: 4px;
        border-radius: 2px;
        background-color: rgb(218, 220, 223);

        .music_progress_inline {
          display: block;
          width: 10%;
          height: 100%;
          background-color: red;
        }
      }

      p {
        font-weight: lighter;
        font-size: 9px;
        color: #787f8d;
      }
    }
  }

  // 底部右边
  .footer-right {
    width: 200px;
    height: 100%;
    // background-color: aqua;
  }
}
</style>
```

# main
```
<template>
  <div id="main">
    <!-- 侧边导航 -->
    <div class="aside">
      <Aside></Aside>
    </div>
    <!-- 主路由视图 -->
    <router-view></router-view>
  </div>
</template>

<script>
import Aside from "@/Layout/Aside.vue";
export default {
  name: "Main",
  components: {
    Aside,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
#main {
  overflow-y: scroll;
  text-align: center;
  grid-area: content;
  background-color: rgb(247, 249, 252);
  padding: 0 20px 0 20px;
}
</style>
```

# 顶部
```
<template>
  <div id="header">
    <div class="header-left">
      <span class="back">
        <i class="el-icon-arrow-left"></i>
      </span>
      <span class="back">
        <i class="el-icon-arrow-right"></i>
      </span>
      <input type="text" placeholder="输入文本" />
      <span class="search">
        <i class="el-icon-search"></i>
      </span>
    </div>
    <div class="header-right">
      <!-- 头像 -->
      <img src="../assets/images/singerload.png" alt="" />
      <p>未登录</p>
      <span class="mail">
        <i class="bi bi-bell"></i>
      </span>
      <span class="setting">
        <i class="bi bi-gear"></i>
      </span>
      <span class="skin">
        <i class="bi bi-moon"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="less" scoped>
// 顶部
#header {
  text-align: center;
  grid-area: header;
  background-color: rgb(247, 249, 252);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 20px;

  div {
    display: flex;
    align-items: center;
    width: 300px;
    height: 60%;
    // justify-content: center;
    gap: 8px;
  }

  // 顶部左边
  .header-left {
    .back {
      display: flex;
      width: 20px;
      height: 28px;
      border-radius: 6px;
      border: 1px solid #ccc;
      align-items: center;
      justify-content: center;

      i {
        color: #ccc;
      }
    }

    input {
      font-weight: lighter;
      height: 30px;
      width: 200px;
      border-style: none;
      border-radius: 8px;
      background: linear-gradient(to right, #e6f9ff, #f6f2ff, #ffeefa);
      outline: none;
      font-size: 12px;
      /* 移除焦点时的边框 */
      border: 1px solid transparent;
      /* 透明边框，以便显示渐变效果 */
      text-indent: 10px;
      /* 向右移动文本5像素 */
      color: rgb(64, 73, 94);
    }

    .search {
      display: flex;
      width: 25px;
      height: 30px;
      border-radius: 5px;
      // border: 1px solid #ccc;
      align-items: center;
      justify-content: center;
      background-color: #ffeefa;

      i {
        color: #ccc;
      }
    }
  }

  // 顶部右边
  .header-right {
    cursor: pointer;
    justify-content: right;
    img {
      width: 20px;
      border-radius: 10px;
    }

    p {
      font-size: 12px;
      font-weight: lighter;
      color: #787f8d;
    }

    span {
      color: #787f8d;
    }
  }
}
</style>
```