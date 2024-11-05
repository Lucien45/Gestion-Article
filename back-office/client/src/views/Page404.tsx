import React from 'react'
import { Link } from 'react-router-dom'
import error from '../assets/error.svg'
import '../assets/css/error.css'

const Page404: React.FC  = () => {
  return (
    <>
        <br />
        <br />
        <body className="error text-center">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 mr-auto mt-5 text-md-left text-center">
                    </div>
                </div>
            </div>
            <div className="container-fluid error-content">
                <div className="">
                    <h1 className="error-number">404</h1>
                    <p className="mini-text">Ooops!</p>
                    <p className="error-text mb-5 mt-1">The page you requested was not found!</p>
                    <img src={error} alt="cork-admin-404" className="error-img"/>
                    <Link to="/admin/" className="btn btn-dark mt-5">Go Back</Link>
                </div>
            </div>
        </body>
    </>
  )
}

export default Page404