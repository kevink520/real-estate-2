import { AppProvider } from "@/components/providers/AppProvider";
import { ChapterRail } from "@/components/chrome/ChapterRail";
import { CookieBar } from "@/components/chrome/CookieBar";
import { Cursor } from "@/components/chrome/Cursor";
import { EnquiryDrawer } from "@/components/chrome/EnquiryDrawer";
import { Footer } from "@/components/chrome/Footer";
import { Grain } from "@/components/chrome/Grain";
import { Header } from "@/components/chrome/Header";
import { Menu } from "@/components/chrome/Menu";
import { Preloader } from "@/components/chrome/Preloader";
import { ThemeScroller } from "@/components/motion/ThemeScroller";
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
      {/* <main> lifts away at the end to uncover the fixed curtain footer beneath it. */}
      <main className="relative z-10 mb-[86svh] bg-bg">
        <Intro />
        <About />
        <Location />
        <Panorama />
        <Architecture />
        <Lobby />
        <Gallery />
        <DailySchedule />
        <Advantages />
        <Fitness />
        <Infrastructure />
        <Park />
        <Apartments />
        <Services />
        <Penthouses />
      </main>
      <Footer />
      <ThemeScroller />
      <ChapterRail />
      <EnquiryDrawer />
      <CookieBar />
      <Cursor />
      <Grain />
    </AppProvider>
  );
}
