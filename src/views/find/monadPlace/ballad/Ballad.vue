<template>
  <div class="monad">
    <div class="monad-items">
      <SongMonadItem
        :monadListItem="item"
        :monadIndex="index"
        v-for="(item, index) in MonadList"
        :key="item.id"
      ></SongMonadItem>
    </div>
  </div>
</template>

<script>
// 网络请求
import { getMonad } from "@/api/findMusic/monadPlace/monadPlace";
import SongMonadItem from "@/components/SongMonadItem.vue";
export default {
  name: "Ballad",
  components: {
    SongMonadItem,
  },
  data() {
    return {
      // 歌单列表
      MonadList: [],
    };
  },
  methods: {
    async getMonadBy(cat, limit) {
      await getMonad(cat, limit).then((res) => {
        this.MonadList = res.playlists;
        console.log(res.playlists);
      });
    },
  },
  created() {
    this.getMonadBy("民谣", 48);
  },
};
</script>

<style lang="less" scoped>
.monad {
  height: 222px;
  p {
    display: block;
    float: left;
    color: black;
    font-size: 16px;
  }

  .monad-items {
    float: left;
    width: 100%;
    margin-top: 10px;
    // background-color: aqua;
    // display: flex;
    display: flex;
    flex-wrap: wrap;
    /* 开启flex布局 */
    justify-content: space-between;

    /* 水平方向上两边对齐 */
    // .m-item {
    //   position: relative;

    //   .cover {
    //     display: block;
    //     width: 190px;
    //     border-radius: 10px;
    //   }

    //   .logo-small {
    //     position: absolute;
    //     top: 5px;
    //     left: 5px;
    //     width: 20px;
    //   }

    //   .playCount {
    //     position: absolute;
    //     top: 5px;
    //     right: 5px;
    //     padding: 5px;
    //     border-radius: 5px;
    //     color: white;
    //     font-family: "Arial", sans-serif;
    //     font-size: 10px;
    //     background-color: rgba(158, 158, 158, 0.5);
    //   }

    //   .text-bottom {
    //     position: absolute;
    //     width: 100%;
    //     height: 20%;
    //     bottom: 0px;
    //     right: 0;
    //     border-bottom-left-radius: 10px;
    //     /* 左下角圆角 */
    //     border-bottom-right-radius: 10px;
    //     /* 右下角圆角 */
    //     background-color: rgba(158, 158, 158, 0.5);
    //     padding-top: 6px;

    //     p {
    //       margin-left: 6px;
    //       color: white;
    //       font-size: 12px;
    //     }
    //   }
    // }
  }
}
</style>