import { useState } from "react";
import LoginPage from "./LoginPage"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './Home'
import Upload from './Upload'
import AuthProvider from "./AuthProvider";

function App() {

  let [User, setUser] = useState(null);
  console.log(User);

  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
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
