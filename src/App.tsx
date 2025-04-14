// Helper type for window functions if needed in TypeScript
declare global {
  interface Window {
    changeSlide: (slideIndex: number) => void;
    nextSlide: () => void;
    prevSlide: () => void;
  }
}

import SlideShow from "./components/SlideShow";
import "./index.css";
import Section from "./components/Section";
import Quote from "./components/Quote";
import Header from "./components/Header";
import { useLanguage } from "./contexts/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import InteractiveCard from "./components/InteractiveCard";
import Footer from "./components/Footer";

// Simple SVG Section Divider Component
const SectionDivider = ({ className = "" }: { className?: string }) => (
  <div className={`overflow-hidden leading-[0] ${className}`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      className="relative block w-full h-[50px] sm:h-[100px]"
    >
      <path
        d="M1440,50 C1200,100 900,0 720,0 C540,0 240,100 0,50 L0,100 L1440,100 Z"
        className="fill-current"
      ></path>
    </svg>
  </div>
);

// Simple SVG Icons (Inline for simplicity, consider a library for more complex projects)
const ObjectiveIcon = () => (
  <svg
    className="w-8 h-8 inline-block mr-2 text-blue-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const SpaceTimeIcon = () => (
  <svg
    className="w-8 h-8 inline-block mr-2 text-indigo-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg> // Calendar for time/space
);
const UnityIcon = () => (
  <svg
    className="w-8 h-8 inline-block mr-2 text-emerald-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
    />
  </svg> // Chain link for unity
);
const TakeawayIcon = () => (
  <svg
    className="w-6 h-6 inline-block mr-2 text-yellow-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

function App() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  // Ref for parallax section
  const existenceSectionRef = useRef<HTMLElement>(null);

  // Scroll progress for parallax
  const { scrollYProgress: existenceScrollYProgress } = useScroll({
    target: existenceSectionRef,
    offset: ["start end", "end start"], // Track from when section starts entering to when it finishes exiting
  });

  // Transform scroll progress to y offset for the image (adjust range for desired speed)
  const existenceImageY = useTransform(
    existenceScrollYProgress,
    [0, 1],
    ["-20%", "20%"]
  );

  const slides = [
    {
      id: 1,
      img: "https://jobsgo.vn/blog/wp-content/uploads/2019/09/khach-quan-la-gi-1.jpg",
      alt: "marxist.analysis.slide1.alt",
      title: "marxist.analysis.slide1.title",
      points: [
        "marxist.core.point1",
        "marxist.analysis.slide1.point2",
        "marxist.analysis.slide1.point3",
      ],
    },
    {
      id: 2,
      img: "https://medlatec.vn/media/20293/content/20230505_con-nguoi-co-bao-nhieu-giac-quan.jpg",
      alt: "marxist.analysis.slide2.alt",
      title: "marxist.analysis.slide2.title",
      points: [
        "marxist.analysis.slide2.point1",
        "marxist.core.point3",
        "marxist.analysis.slide2.point3",
      ],
    },
    {
      id: 3,
      img: "https://image.luatvietnam.vn/uploaded/twebp/images/original/2023/06/20/Y-thuc-la-gi__2006092957.jpeg",
      alt: "marxist.analysis.slide3.alt",
      title: "marxist.analysis.slide3.title",
      points: [
        "marxist.analysis.slide3.point1",
        "marxist.analysis.slide3.point2",
        "marxist.analysis.slide3.point3",
      ],
    },
  ];

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: {
      offset: { x: number; y: number };
      velocity: { x: number; y: number };
    }
  ) => {
    const swipeThreshold = width / 4;
    const swipePower = (offset: number, velocity: number) => {
      return Math.abs(offset) * velocity;
    };
    const swipe = swipePower(info.offset.x, info.velocity.x);

    if (swipe < -swipeThreshold) {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? prev : prev + 1));
    } else if (swipe > swipeThreshold) {
      setCurrentSlide((prev) => (prev === 0 ? prev : prev - 1));
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-full bg-white">
      <Header />
      <SlideShow />

      <main className="flex-grow mt-16 max-w-full overflow-hidden">
        {/* Intro Section - Centered Layout Enhanced */}
        <Section
          id="intro"
          title="intro.title"
          className="py-20 relative overflow-hidden bg-white"
        >
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob z-0"></div>
          <div className="absolute top-32 -left-24 w-80 h-80 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 z-0"></div>
          <div className="absolute -bottom-24 right-10 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000 z-0"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 lg:px-8">
            <div className="space-y-8 text-center">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl md:text-2xl leading-relaxed text-gray-700"
              >
                {t("intro.text1")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="relative mt-12 inline-block"
              >
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg -z-10 blur-xl opacity-40 transform -rotate-2 group-hover:rotate-0 transition-transform"></div>
                  <p className="text-lg md:text-xl font-semibold leading-relaxed p-6 bg-white/80 backdrop-blur-md rounded-lg border border-gray-100/50 shadow-lg">
                    <ObjectiveIcon /> {t("intro.objective")}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </Section>

        <SectionDivider className="text-stone-100" />

        {/* History Section - Combined Idealism/Materialism Prep */}
        <div
          id="history"
          className="bg-stone-100 py-20 relative overflow-hidden font-serif text-[#222]"
        >
          {/* Subtle background pattern from Idealism section kept */}
          <div
            className="absolute inset-0 opacity-5 transition-transform duration-[3000ms] ease-in-out"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm32-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: "80px 80px",
            }}
          ></div>
          <h2 className="text-4xl md:text-5xl font-light text-center mb-16 text-gray-800 px-6">
            {t("history.title")}
          </h2>

          {/* Idealism Sub-section */}
          <div
            id="history-idealism"
            className="mb-24 px-6 sm:px-10 lg:px-8 max-w-6xl mx-auto"
          >
            <h3 className="text-3xl md:text-4xl font-light leading-tight mb-12 text-center">
              <span className="font-medium relative inline-block">
                <span className="relative z-10">
                  {t("history.idealism.title")}
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-2 bg-yellow-300 -rotate-1 -z-10 transform origin-bottom-right transition-transform duration-500 hover:rotate-0"></span>
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center perspective [perspective:2000px]">
              <motion.div
                initial={{ opacity: 0, x: -80, rotateY: 35 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 1.0,
                  delay: 0.1,
                  type: "spring",
                  stiffness: 40,
                }}
                className="transform-style-preserve-3d group"
              >
                <motion.div
                  className="relative transition-transform duration-300 group-hover:shadow-2xl rounded-xl"
                  whileHover={{
                    translateY: -10,
                    rotateY: -8,
                    rotateX: 5,
                    scale: 1.06,
                  }}
                >
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-lg blur-md opacity-20 group-hover:opacity-60 transition duration-700 group-hover:duration-300 animate-pulse"></div>
                  <div className="zoom-container rounded-xl overflow-hidden relative">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuLuLTZA0Gvk3JAd4wzi7D9T9l8G2x8F9pCg&s"
                      alt={t("history.idealism.title")}
                      className="w-full shadow-xl relative transform transition duration-700 group-hover:scale-[1.05] zoom-image"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 80, rotateY: -35 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 1.0,
                  delay: 0.2,
                  type: "spring",
                  stiffness: 40,
                }}
                className="space-y-8 text-lg transform-style-preserve-3d group font-serif"
              >
                <motion.div
                  className="backdrop-blur-sm bg-white/50 p-6 rounded-xl shadow-md transition-all duration-300 border border-amber-100/50 group-hover:shadow-xl group-hover:bg-white/60"
                  whileHover={{
                    translateY: -8,
                    rotateY: 5,
                    rotateX: -4,
                    scale: 1.04,
                  }}
                >
                  <h4 className="text-xl font-semibold mb-4 text-gray-800 border-b border-amber-200 pb-2">
                    {t("history.idealism.title")}
                  </h4>
                  <ul className="list-disc list-inside space-y-3 leading-relaxed">
                    <li className="transform transition hover:translate-x-1.5 duration-300 hover:text-amber-700">
                      {t("history.idealism.point1_alt")}
                    </li>
                    <li className="transform transition hover:translate-x-1.5 duration-300 hover:text-amber-700">
                      {t("history.idealism.point2")}
                    </li>
                    <li className="transform transition hover:translate-x-1.5 duration-300 hover:text-amber-700">
                      {t("history.idealism.point3")}
                    </li>
                  </ul>
                </motion.div>
                <motion.div
                  className="backdrop-blur-sm bg-white/50 p-6 rounded-xl shadow-md transition-all duration-300 border border-amber-100/50 group-hover:shadow-xl group-hover:bg-white/60"
                  whileHover={{
                    translateY: -8,
                    rotateY: 5,
                    rotateX: -4,
                    scale: 1.04,
                  }}
                >
                  <h4 className="text-xl font-semibold mb-4 text-gray-800 border-b border-amber-200 pb-2">
                    {t("history.consequences.title")}
                  </h4>
                  <ul className="list-disc list-inside space-y-3 leading-relaxed">
                    <li className="transform transition hover:translate-x-1.5 duration-300 hover:text-amber-700">
                      {t("history.consequences.point1")}
                    </li>
                    <li className="transform transition hover:translate-x-1.5 duration-300 hover:text-amber-700">
                      {t("history.consequences.point2")}
                    </li>
                    <li className="transform transition hover:translate-x-1.5 duration-300 hover:text-amber-700">
                      {t("history.consequences.point3")}
                    </li>
                  </ul>
                </motion.div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="max-w-3xl mx-auto mt-16"
            >
              <Quote
                text={t("history.idealism.quote.text")}
                author={t("history.idealism.quote.author")}
                className="text-amber-800 bg-amber-50 border-amber-400"
              />
            </motion.div>
          </div>

          {/* Materialism Cards Sub-section */}
          <div id="history-materialism-cards" className="px-6 sm:px-10 lg:px-8">
            <h3 className="text-3xl md:text-4xl font-light leading-tight mb-12 text-center">
              <span className="font-medium text-blue-700">
                {t("history.materialism.subtitle")}
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
              {[
                {
                  delay: 0.1,
                  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyazO_8y9viLzrpJWw4Tbj-RLelx9_HL-mYA&s",
                  alt: "history.materialism.ancient.alt",
                  title: "history.materialism.ancient.title",
                  desc: "history.materialism.ancient.description",
                  period: "history.materialism.ancient.period",
                },
                {
                  delay: 0.2,
                  img: "https://www.epochtimesviet.com/wp-content/uploads/2023/09/id5379479-Vliet_Willem_van_der_-_An_Allegory_-_1627-1-1200x900.jpg.webp.jpeg",
                  alt: "history.materialism.consistent.alt",
                  title: "history.materialism.consistent.title",
                  desc: "history.materialism.consistent.description",
                  period: null,
                },
                {
                  delay: 0.3,
                  img: "https://nghiencuulichsu.com/wp-content/uploads/2018/05/christopher-columbus-58b9ca2c5f9b58af5ca6b758.jpg",
                  alt: "history.materialism.renaissance.alt",
                  title: "history.materialism.renaissance.title",
                  desc: "history.materialism.renaissance.description",
                  period: "history.materialism.renaissance.period",
                },
              ].map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: card.delay }}
                  className="text-center space-y-4 p-6 bg-white/50 border border-gray-200/50 rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-xl group cursor-pointer backdrop-blur-sm transform-style-preserve-3d"
                  whileHover={{ scale: 1.08, rotateY: 8, rotateX: -5, z: 20 }}
                  style={{ perspective: 1000 }}
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={card.img}
                      alt={t(card.alt)}
                      className="rounded-lg shadow-md w-full h-64 object-cover transition-all duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="text-xl font-semibold mt-4 group-hover:text-blue-700 transition-colors text-gray-800">
                    {t(card.title)}
                  </h4>
                  <p className="text-gray-600 transition-all duration-300 leading-relaxed whitespace-pre-line text-sm">
                    {t(card.desc)}
                  </p>
                  {card.period && (
                    <p className="text-xs text-gray-500 italic pt-2">
                      {t(card.period)}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <SectionDivider className="text-slate-100 transform scale-x-[-1]" />

        {/* Marxist View Cards Section - Enhanced Hover */}
        <div id="marxist-view" className="bg-slate-100 py-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-light text-center mb-16 text-gray-800">
              {t("marxist.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  delay: 0.1,
                  img: "https://tuoitrehaugiang.org.vn/images/post/1393/1715825519252090554-leninjpg",
                  alt: "marxist.context.alt",
                  title: "marxist.context.title",
                  contentKey: "context",
                },
                {
                  delay: 0.2,
                  img: "https://redsvn.net/wp-content/uploads/2020/04/Lenin.jpg",
                  alt: "marxist.method.alt",
                  title: "marxist.method.title",
                  contentKey: "method",
                },
                {
                  delay: 0.3,
                  img: "https://btgtu.binhthuan.dcs.vn/uploads/News/files/202004/lenin07112017105648.jpg",
                  alt: "marxist.definition.alt",
                  title: "marxist.definition.title",
                  contentKey: "definition",
                },
              ].map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: card.delay }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl border border-gray-200/80 hover:border-gray-300 flex flex-col"
                  whileHover={{ y: -10, scale: 1.03, rotateZ: 1 }}
                >
                  <div className="h-56 overflow-hidden">
                    <img
                      src={card.img}
                      alt={t(card.alt)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold mb-3 text-gray-800">
                      {t(card.title)}
                    </h3>
                    <div className="overflow-hidden transition-all duration-500 ease-in-out max-h-0 group-hover:max-h-[500px] focus-within:max-h-[500px] mt-auto">
                      {card.contentKey === "context" && (
                        <>
                          <p className="text-gray-700 mt-2 text-sm leading-relaxed">
                            {t("marxist.context.description")}
                          </p>
                          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-600 text-sm leading-relaxed">
                            <li>{t("marxist.context.point1")}</li>
                            <li>{t("marxist.context.point2")}</li>
                            <li>{t("marxist.context.point3")}</li>
                          </ul>
                        </>
                      )}
                      {card.contentKey === "method" && (
                        <>
                          <p className="text-gray-700 mt-2 text-sm leading-relaxed">
                            {t("marxist.method.description")}
                          </p>
                          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-600 text-sm leading-relaxed">
                            <li>{t("marxist.core.point3")}</li>
                            <li>{t("marxist.method.point2")}</li>
                            <li>{t("marxist.method.point3")}</li>
                          </ul>
                        </>
                      )}
                      {card.contentKey === "definition" && (
                        <>
                          <blockquote className="text-gray-700 mt-2 italic border-l-4 border-blue-500 pl-4 py-1 bg-blue-50 rounded-r-lg text-sm leading-relaxed">
                            "{t("marxist.quote")}"
                          </blockquote>
                          <p className="text-right text-gray-500 mt-1 text-xs">
                            {t("marxist.definition.author")}
                          </p>
                          <h4 className="text-sm font-semibold mt-3 mb-1 text-gray-700">
                            {t("marxist.core.title")}
                          </h4>
                          <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm leading-relaxed">
                            <li>{t("marxist.core.point1")}</li>
                            <li>{t("marxist.core.point2")}</li>
                            <li>{t("marxist.core.point3")}</li>
                          </ul>
                        </>
                      )}
                      <button
                        className="opacity-0 h-0 w-0"
                        aria-hidden="true"
                        tabIndex={-1}
                      >
                        Expand
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <SectionDivider className="text-white" />

        {/* Marxist Analysis Slideshow Section - Refactored with Framer Motion Carousel */}
        <div className="bg-white py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-8">
            <h2 className="text-4xl font-light text-center mb-4 text-gray-800">
              {t("marxist.analysis.title")}
            </h2>
            <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              {t("marxist.analysis.subtitle")}
            </p>
            <div className="relative" ref={carouselRef}>
              <motion.div
                className="flex cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{
                  right: 0,
                  left: -width * (slides.length - 1),
                }}
                initial={{ x: 0 }}
                animate={{ x: -currentSlide * width }}
                transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
                onDragEnd={handleDragEnd}
              >
                {slides.map((slide) => (
                  <motion.div
                    key={slide.id}
                    className="w-full flex-shrink-0"
                    style={{ width: "100%" }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                      <div className="h-80 md:h-auto overflow-hidden">
                        <img
                          src={slide.img}
                          alt={t(slide.alt)}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-center space-y-4 p-8 md:p-12 bg-gray-50">
                        <h3 className="text-xl md:text-2xl font-bold text-blue-800 mb-1">
                          {t(slide.title)}
                        </h3>
                        <ul className="list-disc list-inside space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
                          {slide.points.map((pointKey, index) => (
                            <li key={index}>{t(pointKey)}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <div className="flex justify-center mt-6 space-x-3">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 hover:scale-125 ${
                      currentSlide === index
                        ? "bg-blue-600"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`${t("slideshow.goToSlide")} ${index + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <SectionDivider className="text-slate-100" />

        {/* Methodology Section - Changed Layout (Grid) */}
        <div
          id="methodology"
          className="py-20 bg-slate-100 perspective [perspective:2000px]"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-8">
            <h2 className="text-4xl font-light text-center mb-4 text-gray-800 animate-fade-down animate-once animate-duration-[800ms]">
              {t("methodology.title")}
            </h2>
            <p className="text-center text-lg text-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed animate-fade-down animate-delay-[200ms] animate-once animate-duration-[800ms]">
              {t("methodology.subtitle")}
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="max-w-md mx-auto mb-12 rounded-xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-[1.02]"
            >
              <img
                src="https://th.bing.com/th/id/OIP.7pyWW3QtkN655OG-q_DUzwHaIA?rs=1&pid=ImgDetMain"
                alt={t("methodology.alt")}
                className="w-full h-auto"
              />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  delay: 0.2,
                  titleKey: "methodology.point1.title",
                  descKey: "methodology.point1.description",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 h-6 w-6 mr-3 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                  gridClassName: "",
                },
                {
                  delay: 0.3,
                  titleKey: "methodology.point2.title",
                  descKey: "methodology.point2.description",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 h-6 w-6 mr-3 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  ),
                  gridClassName: "",
                },
                {
                  delay: 0.4,
                  titleKey: "methodology.point3.title",
                  descKey: "methodology.point3.description",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 h-6 w-6 mr-3 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                  gridClassName: "",
                },
                {
                  delay: 0.5,
                  titleKey: "methodology.point4.title",
                  descKey: "methodology.point4.description",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 h-6 w-6 mr-3 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  ),
                  gridClassName: "",
                },
                {
                  delay: 0.6,
                  titleKey: "methodology.point5.title",
                  descKey: "methodology.point5.description",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 h-6 w-6 mr-3 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  ),
                  gridClassName: "lg:col-start-2",
                },
              ].map((point, index) => (
                <InteractiveCard
                  key={index}
                  icon={point.icon}
                  titleKey={point.titleKey}
                  descKey={point.descKey}
                  delay={point.delay}
                  gridClassName={point.gridClassName}
                />
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-16 max-w-3xl mx-auto bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg shadow"
            >
              <h4 className="text-lg font-semibold text-yellow-800 mb-2">
                <TakeawayIcon /> {t("methodology.takeaway.title")}
              </h4>
              <p className="text-yellow-700">
                {t("methodology.takeaway.text")}
              </p>
            </motion.div>
          </div>
        </div>

        <SectionDivider className="text-white" />

        {/* Existence - Motion/Stillness Tabs Section - Enhanced Tabs */}
        <div
          id="existence"
          className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-8">
            <h2 className="text-4xl font-light text-center mb-16 text-gray-800 animate-fade-down animate-once animate-duration-[800ms]">
              {t("existence.title")}
            </h2>
            <div className="mb-12 flex justify-center">
              <div className="inline-flex rounded-lg shadow-sm bg-white p-1 space-x-1">
                <button
                  id="tab-motion-1"
                  className="px-5 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 data-[active=true]:bg-indigo-100 data-[active=true]:text-indigo-700 text-gray-600 hover:bg-indigo-50"
                  onClick={(e) => {
                    /* ... tab handler ... */ e.currentTarget.setAttribute(
                      "data-active",
                      "true"
                    );
                    document
                      .getElementById("tab-motion-2")
                      ?.setAttribute("data-active", "false");
                    document
                      .getElementById("content-motion-1")
                      ?.classList.remove("hidden");
                    document
                      .getElementById("content-motion-2")
                      ?.classList.add("hidden");
                  }}
                  data-active="true"
                >
                  {t("existence.tabs.nature_features")} { /* Updated key */ }
                </button>
                <button
                  id="tab-motion-2"
                  className="px-5 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 data-[active=true]:bg-indigo-100 data-[active=true]:text-indigo-700 text-gray-600 hover:bg-indigo-50"
                  onClick={(e) => {
                    /* ... tab handler ... */ e.currentTarget.setAttribute(
                      "data-active",
                      "true"
                    );
                    document
                      .getElementById("tab-motion-1")
                      ?.setAttribute("data-active", "false");
                    document
                      .getElementById("content-motion-2")
                      ?.classList.remove("hidden");
                    document
                      .getElementById("content-motion-1")
                      ?.classList.add("hidden");
                  }}
                  data-active="false"
                >
                  {t("existence.tabs.forms_relations")} { /* Updated key */ }
                </button>
              </div>
            </div>

            <div
              id="content-motion-1"
              className="animate-fade animate-once animate-duration-[800ms]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100/80"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-5">
                    <h3 className="text-xl font-bold">{t('existence.motion.what_is.title')}</h3> { /* Removed numbering, using key */ }
                    <p className="text-sm italic opacity-90">{t('existence.motion.what_is.subtitle')}</p>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 text-white flex items-center justify-center mt-1 text-xs font-bold">
                        1
                      </div>
                      <p className="ml-3 text-gray-700 leading-relaxed text-sm">
                        {t("existence.motion.description")}
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 text-white flex items-center justify-center mt-1 text-xs font-bold">
                        2
                      </div>
                      <p className="ml-3 text-gray-700 leading-relaxed text-sm">
                        {t("existence.motion.what_is.point2")}
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 text-white flex items-center justify-center mt-1 text-xs font-bold">
                        3
                      </div>
                      <p className="ml-3 text-gray-700 leading-relaxed text-sm">
                        {t("existence.motion.what_is.point3")}
                      </p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="sticky top-24 rounded-lg overflow-hidden shadow-lg self-start"
                >
                  <img
                    src="https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=891&q=80"
                    alt={t("existence.motion.alt")}
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden mb-12 border border-gray-100/80"
              >
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-5">
                  <h3 className="text-xl font-bold">{t('existence.motion.features.title')}</h3> { /* Removed numbering, using key */ }
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center mt-1 text-xs font-bold">
                        1
                      </div>
                      <div className="ml-3">
                        <h4 className="font-semibold text-gray-800">
                          {t("existence.motion.features.point1.title")}
                        </h4>
                        <p className="text-gray-700 leading-relaxed mt-1">
                          {t("existence.motion.point1")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center mt-1 text-xs font-bold">
                        2
                      </div>
                      <div className="ml-3">
                        <h4 className="font-semibold text-gray-800">
                          {t("existence.motion.features.point2.title")}
                        </h4>
                        <p className="text-gray-700 leading-relaxed mt-1">
                          {t("existence.motion.point2")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center mt-1 text-xs font-bold">
                        3
                      </div>
                      <div className="ml-3">
                        <h4 className="font-semibold text-gray-800">
                          {t("existence.motion.features.point3.title")}
                        </h4>
                        <p className="text-gray-700 leading-relaxed mt-1">
                          {t("existence.motion.point3")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center mt-1 text-xs font-bold">
                        4
                      </div>
                      <div className="ml-3">
                        <h4 className="font-semibold text-gray-800">
                          {t("existence.motion.features.point4.title")}
                        </h4>
                        <p className="text-gray-700 leading-relaxed mt-1">
                          {t("existence.motion.features.point4.description")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Quote
                  text={t("existence.motion.quote.text")}
                  author={t("existence.motion.quote.author")}
                  className="text-indigo-800 bg-indigo-50 border-indigo-300 max-w-3xl mx-auto"
                />
              </motion.div>
            </div>

            <div
              id="content-motion-2"
              className="hidden animate-fade animate-once animate-duration-[800ms]"
            >
              <div className="mb-16 animate-fade-up animate-once animate-duration-[800ms]">
                <h3 className="text-3xl font-light text-center mb-4 text-gray-800">{t('existence.basic_forms.title')}</h3>
                <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">{t('existence.basic_forms.subtitle')}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-4xl mx-auto text-center">
                  {[
                    { key: 'mechanical', color: 'bg-blue-100', textColor: 'text-blue-800' },
                    { key: 'physical', color: 'bg-purple-100', textColor: 'text-purple-800' },
                    { key: 'chemical', color: 'bg-amber-100', textColor: 'text-amber-800' },
                    { key: 'biological', color: 'bg-green-100', textColor: 'text-green-800' },
                    { key: 'social', color: 'bg-red-100', textColor: 'text-red-800' },
                  ].map((form, index) => (
                    <motion.div
                      key={form.key}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`p-5 rounded-lg shadow-md ${form.color} ${form.textColor} font-medium transform transition hover:scale-105 hover:shadow-lg`}
                    >
                      {t(`existence.basic_forms.${form.key}`)}
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden mb-12 border border-gray-100/80"
              >
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-5"><h3 className="text-xl font-bold">{t('existence.stillness.title')}</h3></div>
                <div className="p-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div>
                       <h4 className="font-bold text-lg text-gray-800 mb-3">{t('existence.stillness.what_is.title')}</h4>
                       <div className="space-y-4">
                         <div className="flex items-start"><div className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-500 text-white flex items-center justify-center mt-1 text-xs">✓</div><p className="ml-3 text-gray-700 leading-relaxed">{t('existence.stillness.what_is.point1')}</p></div>
                         <div className="flex items-start"><div className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-500 text-white flex items-center justify-center mt-1 text-xs">✓</div><p className="ml-3 text-gray-700 leading-relaxed">{t('existence.stillness.what_is.point2')}</p></div>
                         <div className="flex items-start"><div className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-500 text-white flex items-center justify-center mt-1 text-xs">✓</div><p className="ml-3 text-gray-700 leading-relaxed">{t('existence.stillness.what_is.point3')}</p></div>
                       </div>
                     </div>
                     <div>
                       <h4 className="font-bold text-lg text-gray-800 mb-3">{t('existence.stillness.relationship.title')}</h4>
                       <div className="space-y-4">
                         <div className="flex items-start"><div className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-500 text-white flex items-center justify-center mt-1 text-xs">✓</div><p className="ml-3 text-gray-700 leading-relaxed">{t('existence.stillness.relationship.point1')}</p></div>
                         <div className="flex items-start"><div className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-500 text-white flex items-center justify-center mt-1 text-xs">✓</div><p className="ml-3 text-gray-700 leading-relaxed">{t('existence.stillness.relationship.point2')}</p></div>
                       </div>
                     </div>
                   </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <SectionDivider className="text-white" />

        {/* Marxist View Simplified Section - Centered Layout */}
        <Section id="marxist-view-simplified" className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12"
            >
              <Quote
                text={t("marxist.quote")}
                author={t("marxist.definition.author")}
                className="bg-blue-50 border-blue-300 text-blue-900"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-md border border-gray-100 inline-block max-w-md text-left"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">
                <ObjectiveIcon /> {t("marxist.core.title")}
              </h3>
              <ul className="list-disc pl-6 space-y-3 leading-relaxed text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">✓</span>
                  <span>{t("marxist.core.point1")}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">✓</span>
                  <span>{t("marxist.core.point2")}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">✓</span>
                  <span>{t("marxist.core.point3")}</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </Section>

        <SectionDivider className="text-slate-100" />

        {/* Existence Simplified Section - Interleaved with Icons */}
        <Section
          id="existence-simplified"
          ref={existenceSectionRef}
          className="py-20 bg-slate-100 overflow-hidden"
        >
          <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-8">
            <h2 className="text-4xl font-light text-center mb-16 text-gray-800">
              {t("existence.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-10"
              >

                <div className="bg-white p-6 rounded-lg shadow border border-gray-100/50">
                  <h3 className="text-xl font-semibold mb-3 text-indigo-700 flex items-center">
                    <SpaceTimeIcon /> {t("existence.spacetime.title")}
                  </h3>
                  <p className="mb-4 leading-relaxed text-gray-700 text-sm">
                    {t("existence.spacetime.description")}
                  </p>
                  <ul className="list-none space-y-2 leading-relaxed text-gray-600 text-sm">
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2 mt-1 text-xs">
                        ◆
                      </span>
                      <span>{t("existence.spacetime.point1")}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2 mt-1 text-xs">
                        ◆
                      </span>
                      <span>{t("existence.spacetime.point2")}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2 mt-1 text-xs">
                        ◆
                      </span>
                      <span>{t("existence.spacetime.point3")}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2 mt-1 text-xs">
                        ◆
                      </span>
                      <span>{t("existence.spacetime.point4")}</span>
                    </li>

                  </ul>
                </div>
              </motion.div>
              <div className="sticky top-24 self-start rounded-lg overflow-hidden shadow-lg">
                <motion.div style={{ y: existenceImageY }}>
                  <img
                    src="https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=891&q=80"
                    alt={t("existence.alt")}
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </Section>

        <SectionDivider className="text-slate-100" />

        {/* Unity Simplified Section - Full Width Concept */}
        <Section id="unity-simplified" className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-4xl font-light mb-6 text-gray-800">
                {t("unity.title")}
              </h2>
              <p className="text-lg leading-relaxed text-gray-700 mb-10 max-w-3xl mx-auto">
                {t("unity.description")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-slate-50 p-6 rounded-lg shadow border border-gray-100 text-left h-full"
              >
                <h4 className="font-semibold text-emerald-700 mb-2 flex items-center">
                  <UnityIcon /> Biểu hiện 1
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t("unity.point1")}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-slate-50 p-6 rounded-lg shadow border border-gray-100 text-left h-full"
              >
                <h4 className="font-semibold text-emerald-700 mb-2 flex items-center">
                  <UnityIcon /> Biểu hiện 2
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t("unity.point2")}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-slate-50 p-6 rounded-lg shadow border border-gray-100 text-left h-full"
              >
                <h4 className="font-semibold text-emerald-700 mb-2 flex items-center">
                  <UnityIcon /> Biểu hiện 3
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t("unity.point3")}
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12"
            >
              <h4 className="text-xl font-semibold mb-6 text-blue-700">
                {t("unity.evidence.title")}
              </h4>
              <ul className="list-disc pl-6 space-y-3 leading-relaxed text-gray-600 text-left max-w-2xl mx-auto">
                <li>{t("unity.evidence.point1")}</li>
                <li>{t("unity.evidence.point2")}</li>
                <li>{t("unity.evidence.point3")}</li>
              </ul>
            </motion.div>
          </div>
        </Section>

        <SectionDivider className="text-slate-100" />

        {/* Conclusion Section - Enhanced Centered Layout */}
        <Section id="conclusion" className="py-20 bg-slate-100">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
            className="space-y-8 max-w-3xl mx-auto text-center px-6 sm:px-10 lg:px-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-light text-gray-800 mb-6"
            >
              {t("conclusion.title")}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-8 rounded-lg shadow-md border border-gray-100/50 text-left"
            >
              <p className="text-lg font-semibold text-gray-800 mb-4">
                {t("conclusion.intro")}
              </p>
              <ul className="list-none space-y-3 leading-relaxed text-gray-700">
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-start"
                >
                  <span className="text-green-500 mr-2 mt-1 font-bold">✓</span>
                  <span>{t("conclusion.point1")}</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-start"
                >
                  <span className="text-green-500 mr-2 mt-1 font-bold">✓</span>
                  <span>{t("conclusion.point2")}</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-start"
                >
                  <span className="text-green-500 mr-2 mt-1 font-bold">✓</span>
                  <span>{t("conclusion.point3")}</span>
                </motion.li>
              </ul>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg md:text-xl mt-10 leading-relaxed text-gray-800 pt-6 border-t border-gray-200"
            >
              {t("conclusion.summary")}
            </motion.p>
          </motion.div>
        </Section>
      </main>
      {/* Add Footer component here */}
      <Footer />
    </div>
  );
}

export default App;
