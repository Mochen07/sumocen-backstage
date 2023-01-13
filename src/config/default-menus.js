/**
 * @description 默认的菜单数据
 * @param ...
 * @todo 改版。老页面保持不变。
 */
export default [
  // lod page
  {"id":1,"title":"首页","_key":"/home","icon":"home","parentID":0},
  {"id":2,"title":"个人信息","_key":"/user","icon":"user","parentID":0},
  {"id":3,"title":"菜单管理","_key":"/menus","icon":"appstore","parentID":0},
  {"id":8,"title":"文档管理","_key":"/document","icon":"appstore","parentID":0},
  {"id":4,"title":"资源管理","_key":"/image","icon":"container","parentID":0,"children":[
      {"id":5,"title":"首页swiper","_key":"/image/swiper","icon":"android","parentID":4},
      {"id":6,"title":"Python","_key":"/question/python","icon":"bug","parentID":4},
      {"id":7,"title":"H5","_key":"/question/h5","icon":"html5","parentID":4}
    ]
  },
  {"id":8,"title":"统计","_key":"/charts","icon":"area-chart","parentID":0,"children":[
      {"id":9,"title":"柱形图","_key":"/charts/bar","icon":"bar-chart","parentID":8},
      {"id":10,"title":"折线图","_key":"/charts/line","icon":"line-chart","parentID":8},
      {"id":11,"title":"饼图","_key":"/charts/pie","icon":"pie-chart","parentID":8}
    ]
  },
  // new page
  {"id":12,"title":"文章列表","_key":"/article","icon":"appstore","parentID":0},
]