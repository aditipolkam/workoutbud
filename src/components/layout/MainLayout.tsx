import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="px-40 py-8">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
