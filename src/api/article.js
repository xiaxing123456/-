// 文章信息模块

import request from "@/utils/request"

//查询文章
export const getArticle = params =>{
  return request({
    method:'GET',
    url:'/article',
    params
  })
}

//发表文章
export const postArticle  =  (data) =>{
  return request({
    method:'POST',
    url:'/article',
    data
  })
}

//获取用户文章
export const getUserArticle = params =>{
  return request({
    method:"GET",
    url:'/article/user',
    params
  })
}

