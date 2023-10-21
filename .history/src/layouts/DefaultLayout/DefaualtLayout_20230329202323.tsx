import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";

export function DefaultLayout() {
  return (
    <div>
      <Header />
      {/* irá pegar a pagina acessada atualmente, partir do path especificado no Router.tsx */}
      <Outlet />
    </div>
  );
}
