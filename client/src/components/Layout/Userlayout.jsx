import React from 'react'
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from '../../redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Userlayout() {
  return (
    <>
      <div className='overflow-hidden'>
        <Provider store={store}>
          <Header />
          <Outlet />
          <Footer />

        </Provider>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        theame="dark"
        />
      </div>

    </>
  )
}

export default Userlayout;