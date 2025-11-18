import React from "react";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Header />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 md:py-10">
        <Outlet />
      </main>
    </div>
  );
}
