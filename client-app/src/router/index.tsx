import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Login from "../pages/login";
import Signup from "../pages/signup";
import LinkPage from "../pages/linkpage";
import Accounts from "../pages/account";
import Settings from "../pages/settings";
import Transactions from "../pages/transactions";
import RequireAuth from "./requireAuth";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/link"
          element={
            <RequireAuth>
              <LinkPage />
            </RequireAuth>
          }
        />
        <Route
          path="/accounts"
          element={
            <RequireAuth>
              <Accounts />
            </RequireAuth>
          }
        />
        <Route
          path="/settings"
          element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          }
        />
        <Route
          path="/transactions"
          element={
            <RequireAuth>
              <Transactions />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
