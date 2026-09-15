import { CalendarDays, ClipboardList } from "lucide-react";

import NavItem from "../components/ui/NavItem";

export default function Footer({ activeTab }) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200">
      <nav className="flex justify-around items-center py-2">
        <NavItem
          to="/"
          icon={CalendarDays}
          label="Agendar"
          isActive={activeTab === "agendar"}
        />
        <NavItem
          to="/meus-agendamentos"
          icon={ClipboardList}
          label="Meus Agendamentos"
          isActive={activeTab === "meus-agendamentos"}
        />
      </nav>
    </footer>
  );
}
