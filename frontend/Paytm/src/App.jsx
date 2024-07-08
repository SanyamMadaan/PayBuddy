import {BrowserRouter,Routes,Route} from'react-router-dom';
import {SignUp} from './pages/SignUp';
import { Signin } from './pages/Signin';
import { Dashboard } from './pages/Dashboard';
import { Send } from './pages/Send';

function App(){
return(
<BrowserRouter>
<Routes>
  <Route path="/" element={<Signin/>}></Route>
  <Route path="/signup" element={<SignUp/>}></Route>
  <Route path="/dashboard" element={<Dashboard/>}></Route>
  <Route path="/send" element={<Send/>}></Route>
</Routes>
</BrowserRouter>
)
}

export default App;