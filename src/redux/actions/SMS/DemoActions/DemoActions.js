
import React from 'react'


export const StoreCommentData = (data) => {

  return {
    type: 'StoreCommentData',
    payload: data
  }
}


export const StorePostData = (data) => {

  return {
    type: 'StorePostData',
    payload: data
  }
}


export const StoreTodoData = (data) => {

  return {
    type: 'StoreTodoData',
    payload: data
  }
}

