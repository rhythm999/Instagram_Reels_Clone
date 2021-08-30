import LoginPage from "./Component/LoginPage"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './Component/Home'
import Upload from './Component/Upload'
import AuthProvider from "./Component/AuthProvider";
import Profile from "./Component/Profile"


function App() {


  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
          <Route path="/profile">
              <Profile  />
            </Route>
            <Route path="/home">
              <Home  />
            </Route>
            <Route path="/upload">
              <Upload />
            </Route>
            <Route path="/">
              <LoginPage  />
            </Route>
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
