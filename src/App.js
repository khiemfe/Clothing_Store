// import { Button } from 'antd'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import DefaultComponents from './components/DefaultComponents';
import NotFoundPage from './pages/NotFoundPage';

function App() {
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


