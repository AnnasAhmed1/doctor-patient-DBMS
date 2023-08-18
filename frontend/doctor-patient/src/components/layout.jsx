import React from "react";
import bgImage from "../assets/home_background.jpg";

const Layout = ({ children }) => {
  return (
    <main
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="bg-[#242B2E] h-screen overflow-hidden "
    >
      <section className="bg-gray-400 bg-opacity-75 h-screen flex justify-center items-center">
        <section className="w-[500px] min-h-[350px] flex/ flex-col justify-center items-center gap-2 py-4 rounded-lg bg-white shadow-lg">
          {children}
        </section>
      </section>
    </main>
  );
};

export default Layout;
