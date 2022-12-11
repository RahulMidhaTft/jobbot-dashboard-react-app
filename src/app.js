import React, { useContext } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

import { BaseLayout } from "./components/layouts/base-layout-component";
import { AuthProvider, AuthContext } from "./context/auth-context";
import { DashboardPage } from "./pages/dashboard/dashboard-page";
import { LoginPage } from "./pages/login/login-page";
import { ProfilesPage } from "./pages/profiles/profiles-page";
import { SubscriptionsPage } from "./pages/subscriptions/subscriptions-page";
import { ClicksPage } from "./pages/clicks/clicks-page";

const queryClient = new QueryClient();

function PrivateOutlet() {
  const { token } = useContext(AuthContext);
  return token ? <Outlet /> : <Navigate to="/login" />;
}

export const App = () => (
  <AuthProvider>
    <Router>
      <QueryClientProvider client={queryClient}>
        <QueryParamProvider ReactRouterRoute={Route}>
          <BaseLayout>
            <Routes>
              <Route path="/login" element={<LoginPage />} />

              <Route path="/" element={<PrivateOutlet />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="profiles" element={<ProfilesPage />} />
                <Route path="subscriptions" element={<SubscriptionsPage />} />
                <Route path="clicks" element={<ClicksPage />} />
              </Route>
            </Routes>
          </BaseLayout>
        </QueryParamProvider>
      </QueryClientProvider>
    </Router>
  </AuthProvider>
);
