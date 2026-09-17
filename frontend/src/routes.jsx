import { createBrowserRouter } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import NovoAgendamento from "./pages/client/NovoAgendamento.jsx";
import MeusAgendamentos from "./pages/client/MeusAgendamentos.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <NovoAgendamento /> },
      { path: "meus-agendamentos", element: <MeusAgendamentos /> },
    ],
  },
]);
