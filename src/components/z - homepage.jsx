import React, { Fragment, useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header, { Appcontext } from "./a - header";
import Timer from "./b - timer";
import TodoList from "./c - todo list";
import Documentation from "./d - documentation";
import Login from "./e - Login";
import Signup from "./g - signup";
import ResetPassword from "./f - resetPassword";
import "../index.css";
export default function HomePage() {
  const [Mode, SetMode] = useState("naturale");
  const silverMode = useContext(Appcontext);
  useEffect(() => {
    console.log("silverMode changed:", silverMode);
  }, [silverMode]);
  return (
    <Fragment>
      <div id={Mode === "silver" ? "silver" : "naturale"}>
        <div className="Application">
          {/* <h1>{Mode}</h1> */}
          <BrowserRouter basename="/pomodoro-tech-timer">
          {/* <BrowserRouter> */}
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Header
                      Switcher={(value) => SetMode(value)}
                      onSwitch={(value) => SetMode(value)}
                    />
                    <Timer />
                    <TodoList />
                    <Documentation />
                  </>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </Fragment>
  );
}
