// import { Button } from 'antd'
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import DefaultComponents from './components/DefaultComponents';
import NotFoundPage from './pages/NotFoundPage';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { isJsonString } from './utils';
import jwt_decode from "jwt-decode";
import * as UserService from './services/userServices'
import { useDispatch } from 'react-redux'
import { updateUser } from './redux/slices/userSlice';

function App() {


  // useEffect(() => {
  //   fetchAPI()
  // }, [])

  // const fetchAPI = async () => {
  //   const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`)
  //   return res.data
  // }

  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchAPI })
  // console.log(query)

  const dispatch = useDispatch()

  useEffect(() => {
    const { storageData, decoded } = handleDecoded()
    if(decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData)
    }
    console.log('storageData', storageData)
  }, [])

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if(storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
      decoded = jwt_decode(storageData)
    }
    console.log(',,,,,', storageData)
    return { decoded, storageData }
  }

  // const handleDecoded = () => {
  //   let storageData = user?.access_token || localStorage.getItem('access_token')
  //   let decoded = {}
  //   if (storageData && isJsonString(storageData) && !user?.access_token) {
  //     storageData = JSON.parse(storageData)
  //     decoded = jwt_decode(storageData)
  //   }
  //   return { decoded, storageData }
  // }


  UserService.axiosJWT.interceptors.request.use( async (config) => {
    //Chạy vào đây trước khi getDetails, mình sẽ check nếu token hết hạn, thì sẽ gọi đến refreshToken và lấy thằng access token mới đập vào thằng config, và getDetails sẽ có access token mới
    //decoded?.exp là thời gian token hết hạn
    const currentTime = new Date() //thời gian hiện tại
    const { decoded } = handleDecoded()
    console.log(',,.,.,.,.,', decoded)
    console.log(decoded?.exp < currentTime.getTime() / 1000)
    if(decoded?.exp < currentTime.getTime() / 1000) {
      console.log('config', config)
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
      return config;
    } else {
      console.log('config', config)
      return config;
    }
    
  }, (err) => {
    return Promise.reject(err);
  })

  const handleGetDetailsUser = async (id, token) => {
    console.log('///', token)
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))
    console.log('res', res)
  }

  // const handleGetDetailsUser = async (id, token) => {
  //   let storageRefreshToken = localStorage.getItem('refresh_token')
  //   const refreshToken = JSON.parse(storageRefreshToken)
  //   const res = await UserService.getDetailsUser(id, token)
  //   dispatch(updateUser({ ...res?.data, access_token: token, refreshToken: refreshToken}))
  // }


  return (
    <div>
      {/* <HeaderComponents /> */}
      <Router>
        <Routes>
          {routes.map((route, index) => {
            const Page = route.page
            const Layout = route.isShowHeader ? DefaultComponents : NotFoundPage
            return (
              <Route key={index} path={route.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            )
          })}
        </Routes>
      </Router>
    </div>
  )
}
export default App;


