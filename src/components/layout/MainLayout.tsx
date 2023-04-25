import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Head>
        <title>workoutbud</title>
        <meta
          name="description"
          content="Automate question paper generation from a crowd-sourced question bank."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/workoutbud.png" />
      </Head>
      <main className="px-40 py-8 min-h-screen">
        <Navbar />
        {children}
        <Footer />
      </main>
    </>
  );
};

export default MainLayout;
