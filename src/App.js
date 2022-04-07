import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
class App extends Component {
  render() {
    return (   
       
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>  
            <Route exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />           
            <Route exact path="/logout" name="Login Page" render={(props) => <Login {...props} />} />          
            <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
            {/* <Route path="/" name="Login Page" render={(props) => <Login {...props} />} />  */}
           
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    )
  }
}

export default App
