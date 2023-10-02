import React from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";

import {
  Routes,
  Route,
  //   Link,
  //   Redirect,
  //   useHistory,
  //   useLocation,
} from "react-router-dom";

function Site(props) {
  //   const [token, setToken] = React.useState(null);
  //   const history = useHistory();
  //   const { pathname } = useLocation();
  // chuck in another file, put set func in dashboard and variable inside view
  //   React.useEffect(() => {
  //     const lsToken = localStorage.getItem('token');
  //     if (lsToken) {
  //       setToken(lsToken);
  //     }
  //   }, []);

  //   React.useEffect(() => {
  //     if (token !== null) {
  //       if (pathname === '/login' || pathname === '/register') {
  //         history.push('/dashboard');
  //       }
  //     }
  //   }, [token]);
  //   const logout = async () => {
  //     const response = await fetch('http://localhost:5005/user/auth/logout', {
  //       method: 'POST',
  //       headers: {
  //         'Content-type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     await response.json();
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('ownerEmail');
  //     setToken(null);
  //     window.location = '/dashboard'
  //   }

  return (
    <div>
      <Routes>
        <Route path="/Register" element={<Register />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/">
          <b>Welcome</b>
        </Route> */}
      </Routes>
      {/* <Redirect to="/dashboard" /> */}
    </div>
  );
}

export default Site;
