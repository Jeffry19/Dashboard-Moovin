import { useState } from 'react'
import DashboardLayoutBasic from './layouts/sidebar/sidebar'

import Routing from './routes/Routing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div>
    <Routing/>
    <DashboardLayoutBasic/>

     </div>
    </>
  )
}

export default App
