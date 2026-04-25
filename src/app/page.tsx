"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function clamp(val: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, val));
}
function sub(p: number, a: number, b: number) {
  return clamp((p - a) / (b - a));
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * clamp(t);
}
function ease(t: number) {
  const c = clamp(t);
  return 1 - Math.pow(1 - c, 3);
}
function sectionProgress(el: HTMLElement | null): number {
  if (!el) return 0;
  const rect = el.getBoundingClientRect();
  const h = el.offsetHeight - window.innerHeight;
  if (h <= 0) return 0;
  return clamp(-rect.top / h);
}
function fadeUp(opacity: number, yStart = 32): React.CSSProperties {
  return {
    opacity,
    transform: `translateY(${lerp(yStart, 0, opacity)}px)`,
    willChange: "opacity, transform",
  };
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
function withBasePath(path: string) {
  return `${basePath}${path}`;
}

const EV_EXPLORER_URL = "https://www.tesla.com/";
const EV_RESEARCH_URL = "https://www.iea.org/reports/global-ev-outlook-2024";

export default function Home() {
  const heroRef     = useRef<HTMLElement>(null);
  const compareRef  = useRef<HTMLElement>(null);
  const emissRef    = useRef<HTMLElement>(null);
  const perfRef     = useRef<HTMLElement>(null);
  const costRef     = useRef<HTMLElement>(null);
  const chargRef    = useRef<HTMLElement>(null);
  const interiorRef = useRef<HTMLElement>(null);

  const [heroP,   setHeroP]   = useState(0);
  const [compP,   setCompP]   = useState(0);
  const [emissP,  setEmissP]  = useState(0);
  const [perfP,   setPerfP]   = useState(0);
  const [costP,   setCostP]   = useState(0);
  const [chargP,  setChargP]  = useState(0);
  const [intP,    setIntP]    = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [pageH,   setPageH]   = useState(1);

  useEffect(() => {
    const update = () => {
      setScrollY(window.scrollY);
      setPageH(Math.max(1, document.body.scrollHeight - window.innerHeight));
      setHeroP(sectionProgress(heroRef.current));
      setCompP(sectionProgress(compareRef.current));
      setEmissP(sectionProgress(emissRef.current));
      setPerfP(sectionProgress(perfRef.current));
      setCostP(sectionProgress(costRef.current));
      setChargP(sectionProgress(chargRef.current));
      setIntP(sectionProgress(interiorRef.current));
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const hTitleIn  = ease(sub(heroP, 0.00, 0.18));
  const hSubIn    = ease(sub(heroP, 0.13, 0.28));
  const hCtaIn    = ease(sub(heroP, 0.24, 0.36));
  const hExitOut  = 1 - ease(sub(heroP, 0.62, 0.90));
  const hImgScale = lerp(1.05, 1.14, heroP);

  const cGasIn  = ease(sub(compP, 0.00, 0.22));
  const cGasOut = 1 - ease(sub(compP, 0.38, 0.60));
  const cEvIn   = ease(sub(compP, 0.55, 0.82));

  const eIn        = ease(sub(emissP, 0.00, 0.18));
  const eCounter   = lerp(156, 0, ease(sub(emissP, 0.08, 0.64)));
  const eDetailsIn = ease(sub(emissP, 0.50, 0.76));

  const pEnter     = ease(sub(perfP, 0.00, 0.18));
  const pGasBar    = lerp(0, 100, ease(sub(perfP, 0.04, 0.45)));
  const pEvBar     = lerp(0,  42, ease(sub(perfP, 0.26, 0.65)));
  const pBadgeIn   = ease(sub(perfP, 0.42, 0.60));
  const pDetailsIn = ease(sub(perfP, 0.62, 0.82));

  const coEnter  = ease(sub(costP, 0.00, 0.18));
  const coGasH   = lerp(0, 280, ease(sub(costP, 0.04, 0.52)));
  const coEvH    = lerp(0, 124, ease(sub(costP, 0.20, 0.62)));
  const coTextIn = ease(sub(costP, 0.60, 0.82));

  const chEnter  = ease(sub(chargP, 0.00, 0.20));
  const chFill   = lerp(0, 78, ease(sub(chargP, 0.08, 0.60)));
  const chTextIn = ease(sub(chargP, 0.50, 0.76));

  const iImgScale = lerp(1.12, 1.00, ease(sub(intP, 0.00, 0.65)));
  const iTextIn   = ease(sub(intP, 0.14, 0.50));
  const iBenefits = ease(sub(intP, 0.44, 0.72));

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-700 ${
          scrollY > 80 ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-white/65">
            Electric / Future
          </p>
          <a
            href="#close"
            className="rounded-full border border-white/18 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/65 transition-colors duration-200 hover:bg-white/10 hover:text-white"
          >
            Make the switch
          </a>
        </div>
        <div className="h-[1.5px] bg-white/8">
          <div
            className="h-full bg-white/55 transition-none"
            style={{ width: `${(scrollY / pageH) * 100}%` }}
          />
        </div>
      </nav>

      {/* 1 — HERO */}
      <section ref={heroRef} style={{ height: "300vh" }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden bg-black">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0e1a35] via-[#101010] to-[#0b0b0b]" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ transform: `scale(${hImgScale})`, willChange: "transform" }}
          >
            <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#2864f0]/35 blur-3xl" />
            <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[#39d98a]/25 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#f5c518]/20 blur-3xl" />
          </div>
          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            style={{ opacity: hExitOut, willChange: "opacity" }}
          >
            <p
              style={fadeUp(hTitleIn, 20)}
              className="text-[11px] font-semibold uppercase tracking-[0.48em] text-white/50"
            >
              The electric age
            </p>
            <h1
              style={fadeUp(hTitleIn, 56)}
              className="mt-5 max-w-5xl text-[clamp(46px,9.5vw,136px)] font-semibold uppercase leading-[0.85] tracking-[-0.055em] text-white"
            >
              The last gas car has already been built.
            </h1>
            <p
              style={fadeUp(hSubIn, 28)}
              className="mt-8 max-w-lg text-xl leading-9 text-white/65"
            >
              Electric vehicles are faster, cleaner, and dramatically cheaper to run. Scroll to see
              why there is no going back.
            </p>
            <p
              style={{ opacity: hCtaIn }}
              className="mt-12 text-[11px] font-semibold uppercase tracking-[0.44em] text-white/30"
            >
              Scroll to explore
            </p>
          </div>
        </div>
      </section>

      {/* Image showcase — clean Swiss grid */}
      <section className="relative bg-[#f4f0e8] px-6 py-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-black/40">
                Visual story
              </p>
              <h2 className="mt-3 text-[clamp(28px,4.2vw,52px)] font-semibold uppercase leading-[0.9] tracking-[-0.045em] text-black">
                The EV experience, frame by frame.
              </h2>
            </div>
            <p className="hidden max-w-sm text-sm leading-7 text-black/55 md:block">
              A calm, editorial preview of the same EV journey: design, charging, battery systems,
              and everyday driving comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                resolvedSrc: withBasePath("/images/EV cars.png"),
                alt: "A lineup of electric vehicles",
                label: "EV lineup",
              },
              {
                resolvedSrc: withBasePath("/images/EV car charging.png"),
                alt: "Electric vehicle plugged into a charger",
                label: "Home and fast charging",
              },
              {
                resolvedSrc: withBasePath("/images/EV car battery.png"),
                alt: "Electric vehicle battery technology",
                label: "Battery systems",
              },
              {
                resolvedSrc: withBasePath("/images/EV car interior.png"),
                alt: "Modern electric vehicle interior",
                label: "Interior comfort",
              },
              {
                resolvedSrc: withBasePath("/images/Tesla.png"),
                alt: "Tesla electric vehicle exterior",
                label: "Tesla exterior",
              },
              {
                resolvedSrc: withBasePath("/images/Tesla interior.png"),
                alt: "Tesla electric vehicle interior",
                label: "Tesla interior",
              },
              {
                resolvedSrc: withBasePath("/images/Rivian.png"),
                alt: "Rivian electric vehicle exterior",
                label: "Rivian exterior",
              },
              {
                resolvedSrc: withBasePath("/images/Rivian interior.png"),
                alt: "Rivian electric vehicle interior",
                label: "Rivian interior",
              },
              {
                resolvedSrc: withBasePath("/images/Types of EV cars.png"),
                alt: "Different types of electric vehicles",
                label: "Types of EV cars",
              },
            ].map((item) => (
              <figure
                key={item.resolvedSrc}
                className="group overflow-hidden rounded-[1.4rem] border border-black/10 bg-white"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.resolvedSrc}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <figcaption className="border-t border-black/10 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-black/55">
                  {item.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 2 — GAS VS EV */}
      <section ref={compareRef} style={{ height: "340vh" }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden bg-[#0a0a0a]">
          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            style={{
              opacity: cGasIn * cGasOut,
              transform: `translateY(${lerp(28, 0, cGasIn)}px)`,
              willChange: "opacity, transform",
            }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.46em] text-white/30">
              The old way
            </p>
            <h2 className="mt-4 text-[clamp(32px,6vw,82px)] font-semibold uppercase leading-none tracking-[-0.05em] text-white/25 line-through decoration-red-500 decoration-[5px]">
              Internal combustion
            </h2>
            <div className="mt-10 grid w-full max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { label: "CO2 tailpipe", value: "156g",   note: "Per km. Every km."        },
                { label: "Annual fuel",  value: "$3,200", note: "Volatile. Non-negotiable." },
                { label: "Engine parts", value: "2,000+", note: "Every one can fail."       },
                { label: "0-60 mph",     value: "7.4 s",  note: "Waiting for the shift."   },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-[1.5rem] border border-white/6 bg-red-950/20 p-5 text-center"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/28">
                    {s.label}
                  </p>
                  <p className="mt-3 text-[clamp(22px,3.2vw,34px)] font-semibold tracking-[-0.04em] text-red-400">
                    {s.value}
                  </p>
                  <p className="mt-2 text-xs text-white/28">{s.note}</p>
                </div>
              ))}
            </div>
          </div>
          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            style={{
              opacity: cEvIn,
              transform: `translateY(${lerp(48, 0, cEvIn)}px)`,
              willChange: "opacity, transform",
            }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.46em] text-white/40">
              Now meet electric
            </p>
            <h2 className="mt-4 text-[clamp(32px,6vw,82px)] font-semibold uppercase leading-none tracking-[-0.05em] text-white">
              Pure upgrade.
            </h2>
            <div className="mt-10 grid w-full max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { label: "CO2 tailpipe",  value: "0g",    note: "Zero. Exactly zero."   },
                { label: "Annual energy", value: "$700",  note: "78% cheaper than gas." },
                { label: "Moving parts",  value: "~20",   note: "Radically simpler."    },
                { label: "0-60 mph",      value: "3.1 s", note: "Instant torque. Now."  },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-[1.5rem] border border-emerald-500/15 bg-emerald-950/30 p-5 text-center"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/40">
                    {s.label}
                  </p>
                  <p className="mt-3 text-[clamp(22px,3.2vw,34px)] font-semibold tracking-[-0.04em] text-emerald-400">
                    {s.value}
                  </p>
                  <p className="mt-2 text-xs text-white/42">{s.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3 — EMISSIONS COUNTER */}
      <section ref={emissRef} style={{ height: "270vh" }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden bg-[#f4f0e8]">
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <p
              style={{ opacity: eIn }}
              className="text-[11px] font-semibold uppercase tracking-[0.46em] text-black/38"
            >
              CO2 tailpipe emissions
            </p>
            <div style={{ opacity: eIn, willChange: "opacity" }}>
              <div className="mt-4 flex items-end justify-center gap-4">
                <span className="tabular-nums text-[clamp(72px,16vw,216px)] font-semibold leading-none tracking-[-0.07em] text-black">
                  {Math.round(eCounter)}
                </span>
                <div className="mb-3 text-left">
                  <span className="text-[clamp(22px,3.5vw,52px)] font-semibold leading-none tracking-[-0.04em] text-black/35">
                    g/km
                  </span>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.32em] text-black/28">
                    tailpipe CO2
                  </p>
                </div>
              </div>
            </div>
            <div style={fadeUp(eDetailsIn, 24)} className="mt-12 w-full max-w-lg space-y-5">
              {[
                { label: "Average petrol car",       note: "156 g CO2/km",         pct: "100%", color: "bg-red-400"     },
                { label: "EV with grid electricity", note: "53 g CO2/km lifecycle", pct: "34%",  color: "bg-amber-400"   },
                { label: "EV with renewable energy", note: "~5 g CO2/km lifecycle", pct: "3%",   color: "bg-emerald-500" },
              ].map((bar) => (
                <div key={bar.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.28em] text-black/48">
                    <span>{bar.label}</span>
                    <span>{bar.note}</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-black/8">
                    <div className={`h-full rounded-full ${bar.color}`} style={{ width: bar.pct }} />
                  </div>
                </div>
              ))}
              <p className="pt-3 text-sm leading-7 text-black/52">
                With renewable charging, lifecycle emissions drop by up to{" "}
                <strong className="font-semibold text-black">97%</strong> compared to petrol.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — PERFORMANCE BAR RACE */}
      <section ref={perfRef} style={{ height: "310vh" }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden bg-[#111111]">
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
            <p
              style={{ opacity: pEnter }}
              className="text-[11px] font-semibold uppercase tracking-[0.46em] text-white/32"
            >
              0-60 mph acceleration
            </p>
            <h2
              style={fadeUp(pEnter, 28)}
              className="mt-4 text-center text-[clamp(44px,8.5vw,116px)] font-semibold uppercase leading-[0.86] tracking-[-0.055em] text-white"
            >
              Instant torque.
              <span className="block text-[#2864f0]">No excuses.</span>
            </h2>
            <div className="mt-14 w-full max-w-2xl space-y-7">
              <div style={{ opacity: sub(perfP, 0.02, 0.20) }}>
                <div className="mb-2.5 flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-white/32">
                    Gas sedan (average)
                  </p>
                  <p className="text-base font-semibold text-red-400">7.4 seconds</p>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-red-400 transition-none"
                    style={{ width: `${pGasBar}%`, willChange: "width" }}
                  />
                </div>
              </div>
              <div style={{ opacity: sub(perfP, 0.20, 0.40) }}>
                <div className="mb-2.5 flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-white/32">
                    Electric vehicle
                  </p>
                  <p className="text-base font-semibold text-emerald-400">3.1 seconds</p>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-emerald-400 transition-none"
                    style={{ width: `${pEvBar}%`, willChange: "width" }}
                  />
                </div>
              </div>
              <div
                style={{ opacity: pBadgeIn }}
                className="flex items-center gap-4 rounded-[1.4rem] border border-emerald-500/18 bg-emerald-950/30 px-5 py-4"
              >
                <span className="text-3xl font-semibold tracking-[-0.05em] text-emerald-400">
                  2.4x
                </span>
                <p className="text-sm text-white/50">faster off the line with zero mechanical delay</p>
              </div>
            </div>
            <p
              style={fadeUp(pDetailsIn, 20)}
              className="mt-10 max-w-xl text-center text-lg leading-8 text-white/50"
            >
              Electric motors deliver 100% of their torque from 0 RPM. No gear changes, no turbo
              lag, no revving. Just silent, immediate power the instant you press the pedal.
            </p>
          </div>
        </div>
      </section>

      {/* 5 — COST BAR CHART */}
      <section ref={costRef} style={{ height: "330vh" }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden bg-[#f4f0e8]">
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
            <p
              style={{ opacity: coEnter }}
              className="text-[11px] font-semibold uppercase tracking-[0.46em] text-black/38"
            >
              5-year ownership cost
            </p>
            <h2
              style={fadeUp(coEnter, 28)}
              className="mt-4 text-center text-[clamp(34px,7vw,96px)] font-semibold uppercase leading-[0.86] tracking-[-0.055em] text-black"
            >
              Save $10,000.
              <span className="block text-[#2864f0]">Over five years.</span>
            </h2>
            <div
              style={{ opacity: sub(costP, 0.04, 0.22) }}
              className="mt-14 flex items-end justify-center gap-16"
            >
              <div className="flex flex-col items-center gap-5">
                <div
                  className="relative flex w-32 items-start justify-center rounded-t-[1.4rem] bg-red-400 transition-none"
                  style={{ height: `${coGasH}px`, minHeight: 4, willChange: "height" }}
                >
                  {coGasH > 90 && (
                    <span className="mt-5 text-xl font-semibold text-white">$18,000</span>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/38">
                    Gas vehicle
                  </p>
                  <p className="mt-1 text-xs font-semibold text-red-500">Fuel + maintenance</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-5">
                <div
                  className="relative flex w-32 items-start justify-center rounded-t-[1.4rem] bg-emerald-500 transition-none"
                  style={{ height: `${coEvH}px`, minHeight: 4, willChange: "height" }}
                >
                  {coEvH > 55 && (
                    <span className="mt-5 text-xl font-semibold text-white">$8,000</span>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/38">
                    Electric vehicle
                  </p>
                  <p className="mt-1 text-xs font-semibold text-emerald-600">Energy + maintenance</p>
                </div>
              </div>
            </div>
            <p
              style={fadeUp(coTextIn, 20)}
              className="mt-10 max-w-lg text-center text-lg leading-8 text-black/58"
            >
              Electricity beats gas at the pump. EVs skip oil changes, need fewer brake pads thanks
              to regenerative braking, and have far fewer components that wear out.
            </p>
            <div style={fadeUp(coTextIn, 16)} className="mt-8 grid grid-cols-3 gap-4 text-center">
              {[
                { label: "Annual fuel saving", value: "~$2,500"  },
                { label: "Maintenance saving", value: "~$500/yr" },
                { label: "5-year total",        value: "$10,000+" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-[1.4rem] border border-black/10 bg-white/80 px-4 py-4"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-black/38">
                    {s.label}
                  </p>
                  <p className="mt-2 text-xl font-semibold tracking-[-0.04em] text-black">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6 — CHARGING */}
      <section ref={chargRef} style={{ height: "270vh" }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1220] via-[#121212] to-[#070707]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(40,100,240,0.25),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(57,217,138,0.18),transparent_40%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/40 to-black/72" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <p
              style={{ opacity: chEnter }}
              className="text-[11px] font-semibold uppercase tracking-[0.46em] text-white/48"
            >
              Charging
            </p>
            <h2
              style={fadeUp(chEnter, 32)}
              className="mt-5 max-w-4xl text-[clamp(38px,8vw,112px)] font-semibold uppercase leading-[0.85] tracking-[-0.055em] text-white"
            >
              Wake up full. Every morning.
            </h2>
            <div
              style={{ opacity: sub(chargP, 0.10, 0.32) }}
              className="mt-12 w-full max-w-xs rounded-[2rem] border border-white/14 bg-white/8 p-6 backdrop-blur-lg"
            >
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/48">
                  Battery charging overnight
                </p>
                <p className="text-sm font-semibold text-emerald-400">{Math.round(chFill)}%</p>
              </div>
              <div className="mt-4 h-4 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-emerald-400 transition-none"
                  style={{ width: `${chFill}%`, willChange: "width" }}
                />
              </div>
              <p className="mt-3 text-[10px] text-white/32">
                Plugged in at home. No gas station required.
              </p>
            </div>
            <div
              style={fadeUp(chTextIn, 22)}
              className="mt-10 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <div className="rounded-[1.5rem] border border-red-500/14 bg-red-950/22 p-5 text-left backdrop-blur-md">
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-red-400/60">
                  Gas station
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/48">
                  <li>Detour from your route</li>
                  <li>Queue, pay, pump, leave</li>
                  <li>Prices change every week</li>
                  <li>Fumes, noise, time lost</li>
                </ul>
              </div>
              <div className="rounded-[1.5rem] border border-emerald-500/18 bg-emerald-950/22 p-5 text-left backdrop-blur-md">
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-emerald-400">
                  EV charging
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/65">
                  <li>Plug in at home while you sleep</li>
                  <li>Charge at work, often for free</li>
                  <li>10-min fast charge adds 100+ miles</li>
                  <li>Full battery every single morning</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7 — INTERIOR */}
      <section ref={interiorRef} style={{ height: "270vh" }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden bg-black">
          <div
            className="absolute inset-0"
            style={{ transform: `scale(${iImgScale})`, willChange: "transform" }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(120deg,#0b0b0b_10%,#141b2f_45%,#1f1f1f_100%)]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/86 via-black/44 to-black/10" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-16 lg:px-24">
            <p
              style={{ opacity: iTextIn }}
              className="text-[11px] font-semibold uppercase tracking-[0.46em] text-white/42"
            >
              The cabin redesigned
            </p>
            <h2
              style={fadeUp(iTextIn, 28)}
              className="mt-5 max-w-2xl text-[clamp(38px,7.5vw,100px)] font-semibold uppercase leading-[0.86] tracking-[-0.055em] text-white"
            >
              Quieter. Wider. Smarter.
            </h2>
            <p
              style={fadeUp(iTextIn, 20)}
              className="mt-6 max-w-lg text-xl leading-9 text-white/62"
            >
              No engine under the hood means total redesign freedom. EV cabins gain flat floors,
              panoramic glass roofs, and whisper-quiet acoustics.
            </p>
            <div
              style={fadeUp(iBenefits, 18)}
              className="mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3"
            >
              {[
                { stat: "10 dB", label: "Quieter cabin", note: "No engine roar at highway speed"  },
                { stat: "Flat",  label: "Open floor",     note: "No transmission tunnel below you" },
                { stat: "OTA",   label: "Live updates",   note: "Car improves while you sleep"     },
              ].map((item) => (
                <div
                  key={item.stat}
                  className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm"
                >
                  <p className="text-[clamp(20px,2.4vw,28px)] font-semibold uppercase tracking-[-0.04em] text-white">
                    {item.stat}
                  </p>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/42">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm text-white/38">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8 — VERDICT */}
      <section
        id="close"
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 py-28 text-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#101629] to-[#000000]">
          <div className="absolute inset-0 bg-black/58" />
        </div>
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[5%]  top-[17%]    h-20 w-20 rounded-full bg-[#e6483d] opacity-75" />
          <div className="absolute right-[9%] bottom-[18%] h-24 w-24 bg-[#f5c518] opacity-75" />
          <div className="absolute right-[4%] top-[11%]    h-16 w-16 rounded-full bg-[#2864f0] opacity-75" />
          <div className="absolute left-[2%]  bottom-[32%] h-14 w-14 rounded-full border-[6px] border-white/12" />
        </div>
        <div className="relative z-10 max-w-5xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.46em] text-white/30">
            The verdict
          </p>
          <h2 className="mt-6 text-[clamp(46px,9vw,128px)] font-semibold uppercase leading-[0.84] tracking-[-0.06em] text-white">
            Electric is not a compromise.
            <span className="block text-[#2864f0]">It is an upgrade.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-xl leading-9 text-white/58">
            Faster acceleration. Zero tailpipe emissions. 78% cheaper to fuel. Fewer repairs. A
            cabin redesigned from the ground up. Electric is better in every way that matters.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a
              href={EV_EXPLORER_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-black transition-transform duration-200 hover:-translate-y-0.5"
            >
              Explore EVs
            </a>
            <a
              href={EV_RESEARCH_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-8 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-white/68 transition-all duration-200 hover:border-white/30 hover:text-white"
            >
              Read the research
            </a>
          </div>
          <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { value: "0g",   sub: "Tailpipe CO2",    accent: "text-emerald-400" },
              { value: "78%",  sub: "Cheaper to fuel", accent: "text-emerald-400" },
              { value: "2.4x", sub: "Faster 0-60",     accent: "text-[#2864f0]"  },
              { value: "$10k", sub: "5-yr savings",     accent: "text-emerald-400" },
            ].map((item) => (
              <div
                key={item.value}
                className="rounded-[1.75rem] border border-white/8 bg-white/5 p-5 text-center"
              >
                <p className={`text-4xl font-semibold uppercase tracking-[-0.05em] ${item.accent}`}>
                  {item.value}
                </p>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/30">
                  {item.sub}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-16 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/18">
            EV / Future · Scrollytelling · Guna Banka
          </p>
        </div>
      </section>
    </>
  );
}
