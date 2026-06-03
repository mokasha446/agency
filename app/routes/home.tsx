import { useState } from "react";
import type { Route } from "./+types/home";
import Footer from "../components/Common/Footer";
import Navbar from "../components/Common/Navbar";
import Preloader from "../components/Common/Preloader";
import Contact from "../components/Sections/Contact";
import CostEstimator from "../components/Sections/CostEstimator";
import Hero from "../components/Sections/Hero";
import Portfolio from "../components/Sections/Portfolio";
import Services from "../components/Sections/Services";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nexa Studio | Next-Gen Web & Mobile Solutions" },
    {
      name: "description",
      content:
        "A development agency building full-stack web, mobile, software, and cloud deployment solutions.",
    },
  ];
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-[#05070d] text-white">
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      <div
        className={`transition-all duration-700 ${
          isLoading
            ? "pointer-events-none translate-y-3 opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <Navbar />
        <main className="overflow-hidden bg-[#05070d]">
          <Hero />
          <Services />
          <Portfolio />
          <CostEstimator />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
