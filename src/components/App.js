import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Home from './Home'
import MultiRowBasicExample from './examples/MultiRowBasic'
import MultiRowStructuredExample from './examples/MultiRowStructured'
import MultiRowCustomCellExample from './examples/MultiRowCustomCell'
import MultiRowAsyncResourceExample from './examples/MultiRowAsyncResource'
import MultiRowTotallingExample from './examples/MultiRowTotalling'

export default function App () {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/examples/multi_row_basic" element={<MultiRowBasicExample/>}/>
          <Route path="/examples/multi_row_structured" element={<MultiRowStructuredExample/>}/>
          <Route path="/examples/multi_row_custom_cell" element={<MultiRowCustomCellExample/>}/>
          <Route path="/examples/multi_row_async_resource" element={<MultiRowAsyncResourceExample/>}/>
          <Route path="/examples/multi_row_totalling" element={<MultiRowTotallingExample/>}/>
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
      </Router>
    </>
  )
}
