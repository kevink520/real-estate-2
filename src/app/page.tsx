import { AppProvider } from "@/components/providers/AppProvider";
import { CookieBar } from "@/components/chrome/CookieBar";
import { Cursor } from "@/components/chrome/Cursor";
import { Footer } from "@/components/chrome/Footer";
import { Header } from "@/components/chrome/Header";
import { Menu } from "@/components/chrome/Menu";
import { Preloader } from "@/components/chrome/Preloader";
import { About } from "@/components/sections/About";
import { Advantages } from "@/components/sections/Advantages";
import { Apartments } from "@/components/sections/Apartments";
import { Architecture } from "@/components/sections/Architecture";
import { DailySchedule } from "@/components/sections/DailySchedule";
import { Fitness } from "@/components/sections/Fitness";
import { Gallery } from "@/components/sections/Gallery";
import { Infrastructure } from "@/components/sections/Infrastructure";
import { Intro } from "@/components/sections/Intro";
import { Lobby } from "@/components/sections/Lobby";
import { Location } from "@/components/sections/Location";
import { MapArea } from "@/components/sections/MapArea";
import { Panorama } from "@/components/sections/Panorama";
import { Park } from "@/components/sections/Park";
import { Penthouses } from "@/components/sections/Penthouses";
import { Services } from "@/components/sections/Services";

export default function Home() {
  return (
    <AppProvider>
      <Preloader />
      <Header />
      <Menu />
      <main>
        <Intro />
        <About />
        <Location />
        <MapArea />
        <Panorama />
        <Architecture />
        <Gallery />
        <DailySchedule />
        <Lobby />
        <Advantages />
        <Fitness />
        <Infrastructure />
        <Park />
        <Apartments />
        <Services />
        <Penthouses />
      </main>
      <Footer />
      <CookieBar />
      <Cursor />
    </AppProvider>
  );
}
