import request from './http'
const prefix = process.env.MODE === 'development' ? '/api' : ''
export function login(url, data) {
  return request({
    url: prefix + url,
    method: 'POST',
    data
  })
}

export function getRequest (url, data) {
  return request({
    url,
    method: 'get',
    params: data
  })
}

export function postRequest (url, data) {
  return request({
    url,
    method: 'post',
    data
  })
}

