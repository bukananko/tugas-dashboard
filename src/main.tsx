import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import HomePage from "./pages/home";
import Login from "./pages/login";
import Coupon from "./pages/coupon";
import Order from "./pages/order";
import ExportCoupon from "./pages/export-coupon";
import { Toaster } from "@/components/ui/sonner";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
    errorElement: (
      <div className="text-3xl font-bold flex justify-center items-center h-screen">
        404 | Not found
      </div>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/coupon",
        element: <Coupon />,
      },
      {
        path: "/coupon/export",
        element: <ExportCoupon />,
      },
      {
        path: "/order",
        element: <Order />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>
);
