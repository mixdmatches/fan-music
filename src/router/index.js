import Vue from 'vue'
import VueRouter from 'vue-router'

// 1.发现
const Find = () => import("../views/find/Find.vue")
// 精选
const Coiffed = () => import("../views/find/coiffedChoice/Coiffed.vue")
// 排行榜
const Leaderboard = () => import("../views/find/leaderboard/Leaderboard.vue")
// 歌单广场
const MonadPlace = () => import("../views/find/monadPlace/MonadPlace.vue")
const Ballad = () => import("../views/find/monadPlace/ballad/Ballad.vue")
const Chinese = () => import("../views/find/monadPlace/chinese/Chinese.vue")
const Commend = () => import("../views/find/monadPlace/commend/Commend.vue")
const Electronic = () => import("../views/find/monadPlace/electronic/Electronic.vue")
const LightMusic = () => import("../views/find/monadPlace/lightMusic/LightMusic.vue")
const Rock = () => import("../views/find/monadPlace/rock/Rock.vue")
// 歌手
const Singer = () => import("../views/find/singer/Singer.vue")
// VIP
const VIP = () => import("../views/find/VIP/VIP.vue")


// 2.社区
const Community = () => import("../views/community/Community.vue")
// 3.播客
const Podcast = () => import("../views/podcast/Podcast.vue")
Vue.use(VueRouter)

// 4.搜索
const Search = () => import("../views/search/Search.vue")

// 5.歌单详情
const MonadDetail = () => import("../views/monadDetail/MonadDetail.vue")
// 6.专辑详情
const ZhuanjiDetail = () => import('../views/zhuanjidetail/ZhuanjiDetail.vue')
// 7.歌手主页
const SingerDetail = () => import('../views/singerDetail/SingerDetail.vue')
// 8.喜欢的音乐
const Love = () => import("../views/Love/Love.vue")
const routes = [
  // 1.发现音乐
  {
    path: '/',
    redirect: "/find",
  },
  {
    path: "/find",
    component: Find,
    name: "Find",
    redirect: '/find/coiffed',
    children: [
      // 精选
      {
        path: 'coiffed',
        name: "Coiffed",
        component: Coiffed
      },
      // 排行榜
      {
        path: 'leaderboard',
        name: "Leaderboard",
        component: Leaderboard
      },
      // 歌单广场
      {
        path: 'monadplace',
        name: "MonadPlace",
        component: MonadPlace,
        redirect: '/find/monadplace/commend',
        children: [
          {
            path: 'commend',
            name: "Commend",
            component: Commend
          },
          {
            path: 'ballad',
            name: "Ballad",
            component: Ballad
          },
          {
            path: 'chinese',
            name: "Chinese",
            component: Chinese
          },
          {
            path: 'lightMusic',
            name: "LightMusic",
            component: LightMusic
          },
          {
            path: 'electronic',
            name: "Electronic",
            component: Electronic
          },
          {
            path: 'rock',
            name: "Rock",
            component: Rock
          }
        ]
      },
      // 歌手
      {
        path: 'singer',
        name: "Singer",
        component: Singer
      },
      // VIP
      {
        path: 'vip',
        name: "VIP",
        component: VIP
      }
    ]
  },
  // 2.社区
  {
    path: "/community",
    component: Community,
    name: "Community"
  },
  // 3.播客
  {
    path: "/podcast",
    component: Podcast,
    name: "Podcast"
  },
  // 4.搜索
  {
    path: "/search",
    component: Search,
    name: "Search",
    props: true // 开启 props 传参
  },
  // 5.歌单详情
  {
    path: "/monaddetail",
    component: MonadDetail,
    name: "MonadDetail",
    props: true // 开启props传参
  },
  // 6.专辑详情
  {
    path: '/zhuanjidetail',
    component: ZhuanjiDetail,
    name: "ZhuanjiDetail",
    props: true
  },
  // 7.歌手主页
  {
    path: '/singerdetail',
    component: SingerDetail,
    name: 'SingerDetail',
    porps: true
  },
  // 8.喜欢的音乐
  {
    path: '/love',
    component: Love,
    name: 'Love'
  }
]
const router = new VueRouter({
  routes
})
// router.beforeEach((to, from, next) => {
//   if (to.path === from.path) {
//     // 如果目标路由与当前路由相同，则不执行导航操作
//     next(false)
//   } else {
//     // 否则，继续导航
//     next()
//   }
// })
export default router
