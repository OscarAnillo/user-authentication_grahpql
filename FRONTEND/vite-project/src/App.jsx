import { useQuery } from '@apollo/client';
import { ALL_MESSAGES } from './Queries/queries'

import { Routes, Route} from 'react-router-dom';

/* Components */
import { NavBar } from './Components/Navbar'

/* Pages */
import { HomePage } from './Pages/Home';
import { Register } from './Pages/Register';
import { Login } from './Pages/Login';

import './App.css'

function App() {
  const result = useQuery(ALL_MESSAGES);
  const {data, loading} = result;

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/'  element={<HomePage messages={data?.allMessages} loading={loading} />} />
        <Route path='/login'  element={<Login />} />
        <Route path='/register'  element={<Register />} />
      </Routes>
    </div>
      
    
  )
}

export default App
