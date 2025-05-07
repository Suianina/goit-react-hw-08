import { Suspense } from "react";
import AppBar from "./AppBar/AppBar";

const Layout = ({ children }) => {
  return (
    <>
      <AppBar />
      <main className="pages">
        <Suspense fallback={null}>{children}</Suspense>
      </main>
    </>
  );
}

export default Layout;