import { routerRedux } from 'dva/router'
// import { loginByPassword, getCurrentUser } from '@/services/user'
import { encryptByAes } from '@/utils/utils'
import { setUserToken, getUserToken } from '@/utils/userToken'

export default {
  namespace: 'user',
  state: {
    // 登陆的时候会注入一次数据，数据内容比较多，与获取当前用户的不一致，判断需要用后者的数据
    userData: {},
  },
  effects: {
    // 获取当前用户
    // *getCurrentUser(_, { call, put }) {
    //   if (!getUserToken()) {
    //     yield put(routerRedux.push('/user/login'))
    //     return
    //   }
    //   const res = yield call(getCurrentUser)
    //   if (res && res.success) {
    //     yield put({
    //       type: 'saveUserData',
    //       payload: res.data,
    //     })
    //   }
    // },
  },
  reducers: {
    saveUserData(state, { payload }) {
      return {
        ...state,
        userData: {
          ...state.userData,
          ...payload,
        },
      }
    },
  },
}
