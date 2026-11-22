<template>
  <div id="search">
    <span class="result">{{ keyword }}的相关搜索如下</span>
    <!-- 导航标签 -->
    <BlackTabNav
      :TypeList="searchTypeList"
      @tabClick="tabClick"
    ></BlackTabNav>
    <SearchResult
      :type="type"
      :result="result"
      :keyword="keyword"
    ></SearchResult>
    <!-- <div class="resultList">
      <div id="table">
        <div id="thead">
          <span>标题</span>
          <span>专辑</span>
          <span>喜欢</span>
          <span>时长</span>
        </div>

        <div id="tbody">
          <div id="tr" v-for="item in songList" :key="item.id">
            <span class="title">
              <div class="song">
                <img :src="item.al.picUrl" alt="" />
                <span class="songInfo">
                  <p class="songName">{{ item.name }}</p>
                  <p class="songer">{{ item.ar[0].name }}</p>
                </span>
              </div>
              <div class="workPlay">
                <span class="play">
                  <i class="bi bi-play-fill"></i>
                </span>
                <span class="download">
                  <i class="bi bi-download"></i>
                </span>
                <span class="morework">
                  <i class="bi bi-filter-left"></i>
                </span>
              </div>
            </span>
            <span class="album">{{ item.al.name }}</span>
            <span class="like">
              <span class="love">
                <i class="bi bi-heart"></i>
              </span>
            </span>
            <span class="totalTime">{{ item.dt }}</span>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
// 网络请求
import { getSearchResult } from "@/api/search/search";
// 引入导航组件
import BlackTabNav from "@/components/BlackTabNav.vue";
// 引入搜索结果组件
import SearchResult from "./searchResult/SearchResult.vue";

const route = useRoute();

// 搜索关键词
const keyword = computed(() => route.query.keyword);
// 搜索结果
const result = ref({});
// 搜索种类
const searchTypeList = [
  { name: "单曲", type: 1, thead: ["标题", "专辑", "喜欢", "时长"] },
  { name: "专辑", type: 10, thead: ["标题", "作者", "时间"] },
  { name: "歌手", type: 100 },
  { name: "歌单", type: 1000, thead: ["标题", "歌曲数", "创作者", "播放量"] },
];
const type = ref(1);
const limit = 40;
const offset = 0;

// 根据关键词和类型搜索
const getSearchResultBy = async (keyWords, limit, offset, type) => {
  const res = await getSearchResult(keyWords, limit, offset, type);
  result.value = res.result;
};
// 切换搜索类型
const tabClick = (item) => {
  type.value = item.type;
  getSearchResultBy(keyword.value, limit, offset, type.value);
};

onMounted(() =>
  getSearchResultBy(keyword.value, limit, offset, type.value)
);
</script>

<style lang="less" scoped>
#search {
  .result {
    margin-top: 20px;
    color: #ccc;
    font-size: 12px;
  }
  .resultList {
    // margin-top: 20px;
    #table {
      width: 100%;
      // 表格头部
      #thead {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #ccc;
        span {
          // text-align: center;
          color: rgb(143, 149, 162);
          padding-left: 10px;
          font-size: 12px;
        }
        span:nth-child(1) {
          width: 50%;
        }
        span:nth-child(2) {
          width: 40%;
        }
        span:nth-child(3) {
          width: 5%;
        }
        span:nth-child(4) {
          width: 5%;
        }
      }
      // 表格主体
      #tbody {
        margin-top: 10px;
        #tr {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 10px;
          .title {
            width: 50%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            .song {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              img {
                width: 40px;
                height: 40px;
                border-radius: 5px;
              }

              .songInfo {
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: baseline;
                margin-left: 15px;
                p {
                  white-space: nowrap; /* 防止文本换行 */
                  color: black;
                  font-weight: lighter;
                }

                .songName {
                  font-size: 16px;
                  color: #000000;
                }

                .songer {
                  color: #787f8d;
                  font-size: 12px;
                }
              }
            }

            .workPlay {
              color: rgb(143, 149, 162);
              display: flex;
              justify-content: center;
              align-items: center;
              margin-right: 30px;
              gap: 20px;
              .play {
                font-size: 20px;
              }
            }
          }
          .album {
            width: 40%;
            padding-left: 10px;
            color: rgb(143, 149, 162);
          }
          .like {
            // text-align: center;
            padding-left: 10px;
            width: 5%;
            color: rgb(143, 149, 162);
          }
          .totalTime {
            // text-align: center;
            // padding-left: 10px;
            font-size: 12px;
            width: 5%;
            color: rgb(143, 149, 162);
          }
          span:nth-child(1) {
            width: 50%;
          }
          span:nth-child(2) {
            width: 40%;
          }
          span:nth-child(3) {
            width: 5%;
          }
          span:nth-child(4) {
            width: 5%;
          }
        }
        #tr:hover {
          border-radius: 10px;
          background-color: white;
        }
      }
    }
  }
}
</style>