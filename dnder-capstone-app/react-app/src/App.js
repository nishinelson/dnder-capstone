import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import ProfilePage from "./components/ProfilePage"
import Splash from "./components/Splash"
import PCForm from "./components/PCForm"
import DMForm from "./components/DMForm"
import SwipePage from "./components/SwipePage"
import Chat from "./components/Chat"
import "./index.css"
// import { authenticate } from "./services/auth";
import { authenticate } from "./store/session";

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/profiles/me" exact={true}>
          <ProfilePage/>
        </ProtectedRoute>
        <ProtectedRoute path="/PC" exact={true}>
          <PCForm/>
        </ProtectedRoute>
        <ProtectedRoute path="/DM" exact={true}>
          <DMForm/>
        </ProtectedRoute>
        <ProtectedRoute path="/chat/:id" exact={true}>
          <Chat/>
        </ProtectedRoute>
        <ProtectedRoute path="/swipe/:card/:location" exact={true}>
          <SwipePage />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <Splash/>
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
