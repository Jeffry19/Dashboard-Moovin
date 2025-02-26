import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Phome from '../pages/Phome/Phome';



function Routing() {
  return (
    <div>

        <Router>

            <Routes>

                <Route path='/' element={<Phome/>}></Route>


            </Routes>


        </Router>
     
    </div>
  )
}

export default Routing
