import axios from 'axios';

export const getTaskList = (userId) => {
  return axios.get(`http://localhost:3251/v1/user/${userId}/task`, {
    headers:{"Content-Type": "application/json"}
  }).then(res => res.data);
}

export const createTask = (userId, task) => {
  return axios.post(
    `http://localhost:3251/v1/user/${userId}/task`,
    {
      task: task
    }).then(res => {
      console.log('res', res.data);
  })
}

export const updateTask = (userId, task, id) => {
  return axios.put(`http://localhost:3251/v1/user/${userId}/task/${id}`,
    {
      task: task
    }).then(res => {
    console.log('res', res.data);
  })
}

export const deleteTask = (userId, id) => {
  return axios.delete(`http://localhost:3251/v1/user/${userId}/task/${id}`,
    {
      headers:{"Content-Type": "application/json"}
    }).then(res => {
    console.log('res', res.data);
  })
}