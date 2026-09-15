import Header from "./Header";
import Footer from "./Footer";

import { Outlet, useLocation } from "react-router-dom";

export default function AppLayout() {
  const location = useLocation();

  const activeTab =
    location.pathname === "/meus-agendamentos"
      ? "meus-agendamentos"
      : "agendar";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 px-4 py-5 pb-20 md:px-8 md:py-8 md:pb-8">
        <div className="md:max-w-5xl md:mx-auto">
          <Outlet />
        </div>
      </main>

      <Footer activeTab={activeTab} />
    </div>
  );
}
