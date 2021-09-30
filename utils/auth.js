import Cookies from 'js-cookie'

const TokenKey = 'Token'

export function getToken (name) {
  if (name !== undefined) {
    return Cookies.get(name)
  } else {
    return Cookies.get(TokenKey)
  }
}

export function setToken (token, name) {
  if (name !== undefined) {
    return Cookies.set(name, token)
  } else {
    return Cookies.set(TokenKey, token)
  }
}

export function removeToken (name) {
  if (name !== undefined) {
    return Cookies.remove(name)
  } else {
    return Cookies.remove(TokenKey)
  }
}

export const routes = [
  {
    path: '/',
    title: '首页',
    children: []
  },
  {
    path: '/venue',
    title: '场地',
    disabled: true,
    children: [
      {
        path: '/venue/venuereserve',
        title: '场地预约'
      },
      {
        path: '/venue/reservehistory',
        title: '场馆预定历史'
      },
      {
        path: '/venue/personalvenuesforbooking',
        title: '场馆预定申请查看'
      },
      {
        path: '/venue/booknotification',
        title: '场馆预定通知'
      },
      {
        path: '/venue/commentconsultation',
        title: '场地评论/咨询'
      }
    ]
  },
  {
    path: '/1',
    title: '活动',
    children: []
  },
  {
    path: '/2',
    title: '培训',
    children: []
  },
  {
    path: '/info',
    title: '个人中心',
    disabled: true,
    children: [
      {
        path: '/info/datamodify',
        title: '个人信息'
      }
    ]
  }
]

