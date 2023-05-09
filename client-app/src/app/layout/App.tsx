import { Container } from "semantic-ui-react";
import Navbar from "./components/common/Navbar";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import Home from "./pages/Home";

export const App = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ? (
        <Home />
      ) : (
        <>
          <Navbar />
          <Container style={{ marginTop: "7em" }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
};

export default observer(App);
