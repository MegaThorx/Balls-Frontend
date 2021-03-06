import axios from 'axios'
import store from '../store/index'

const url = `${process.env.SERVER_IP}/api/pattern`

const config = () => {
  return {
    headers: {
      'authorization': store && store.getters && store.getters.token
    }
  }
}

export default {
  readAll: () => {
    return axios.get(`${url}/all`, config())
      .then(res => {
        console.log('res', res)
        if (res.data && res.data.message) {
          console.log(res.data.message)
          return Promise.reject(res.data.message)
        }
        return Promise.resolve(res.data)
      }).catch(err => {
        console.log(err)
        return Promise.reject(err.message)
      })
  },
  readOne: (args) => {
    return axios.get(`${url}/${args._id}`, config())
      .then(res => {
        return Promise.resolve(res.data)
      })
  },
  create: (args) => {
    return axios.put(`${url}`, args, config())
  },
  update: (args) => {
    return axios.post(`${url}/${args._id}`, args, config())
  },
  delete: (args) => {
    return axios.delete(`${url}/${args._id}`, config())
      .then(res => {
        return Promise.resolve(res.data)
      })
  },
  play: (args) => {
    return axios.post(`${url}/play/${args._id}`, config())
  }
}
