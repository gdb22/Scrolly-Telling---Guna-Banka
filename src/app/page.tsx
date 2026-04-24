"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type StorySection = {
  id: string;
  step: string;
  title: string;
  summary: string;
  insight: string;
  image: string;
  alt: string;
  accent: string;
  accentSoft: string;
  accentText: string;
  statValue: string;
  statLabel: string;
  bullets: string[];
};

type PriorityLens = {
  id: string;
  label: string;
  metric: string;
  detail: string;
  sectionId: string;
};

type ComparisonMetricId = "range" | "charge" | "cost" | "comfort";

type ComparisonMetric = {
  id: ComparisonMetricId;
  label: string;
  unit: string;
  description: string;
  accent: string;
};

type EVProfile = {
  id: string;
  name: string;
  audience: string;
  sectionId: string;
  summary: string;
  values: Record<ComparisonMetricId, number>;
};

const storySections: StorySection[] = [
  {
    id: "switch",
    step: "01 / MARKET SHIFT",
    title: "Electric vehicles moved from niche signal to mainstream system.",
    summary:
      "The conversation is no longer whether EVs belong on the road. It is how fast cities, grids, and drivers can adapt to them.",
    insight:
      "Mass-market adoption now depends on trust: visible charging, understandable range, and vehicles that feel desirable before they feel technical.",
    image: "/images/EV cars.png",
    alt: "A lineup of electric cars displayed outdoors.",
    accent: "bg-[#e6483d]",
    accentSoft: "bg-[#e6483d]/12",
    accentText: "text-[#8c221a]",
    statValue: "4x",
    statLabel: "More EV choices on sale than just a few model cycles ago.",
    bullets: [
      "Automakers now compete on platform ecosystems, not only horsepower.",
      "New buyers expect clear ownership savings and cleaner city mobility.",
      "Visual design matters because EVs are consumer technology as much as transport.",
    ],
  },
  {
    id: "battery",
    step: "02 / BATTERY INTELLIGENCE",
    title: "The battery is the invisible architecture shaping confidence.",
    summary:
      "Battery technology determines range, charging behavior, thermal stability, and ultimately how relaxed a driver feels during a trip.",
    insight:
      "Good EV UX reduces cognitive load: drivers want predictable performance, smart routing, and transparent energy use—not more dashboard anxiety.",
    image: "/images/EV car battery.png",
    alt: "A close look at an EV battery system integrated into a vehicle chassis.",
    accent: "bg-[#f5c518]",
    accentSoft: "bg-[#f5c518]/14",
    accentText: "text-[#6e5300]",
    statValue: "15 min",
    statLabel: "A useful fast-charge window that can reshape trip planning.",
    bullets: [
      "Energy density improves vehicle packaging and frees interior space.",
      "Battery software is now part of the design language of the car.",
      "Thermal management separates a smooth ownership experience from a frustrating one.",
    ],
  },
  {
    id: "charging",
    step: "03 / CHARGING CULTURE",
    title: "Charging is where infrastructure becomes experience design.",
    summary:
      "The most important EV interaction often happens outside the car: at home, curbside, at work, or in high-speed corridors between cities.",
    insight:
      "A great charging experience feels frictionless, visible, and confidently timed. The best networks behave like wayfinding systems, not technical hurdles.",
    image: "/images/EV car charging.png",
    alt: "An electric car plugged into a charging station.",
    accent: "bg-[#2864f0]",
    accentSoft: "bg-[#2864f0]/12",
    accentText: "text-[#0d348c]",
    statValue: "80%",
    statLabel: "Charging milestones influence how people perceive convenience.",
    bullets: [
      "Home charging turns the vehicle into part of the daily routine.",
      "Public charging quality depends on signage, availability, and payment clarity.",
      "Route planning becomes storytelling when the interface explains the next stop.",
    ],
  },
  {
    id: "cabin",
    step: "04 / CABIN FUTURE",
    title: "EV interiors redefine calm, software, and spatial comfort.",
    summary:
      "Without the same packaging constraints as combustion platforms, cabins can become brighter, quieter, and more intentional in their ergonomics.",
    insight:
      "Interior quality is now measured in attention flow: fewer distractions, better materials, quieter travel, and controls that respect human focus.",
    image: "/images/EV car interior.png",
    alt: "The interior dashboard and seats of a modern electric vehicle.",
    accent: "bg-[#111111]",
    accentSoft: "bg-[#111111]/8",
    accentText: "text-[#111111]",
    statValue: "360°",
    statLabel: "A holistic cabin experience spanning comfort, display logic, and acoustics.",
    bullets: [
      "Flat floors and open layouts change how riders perceive space.",
      "Quiet drivetrains amplify the importance of materials and sound design.",
      "The most premium EV cabins feel editorial rather than overloaded.",
    ],
  },
];

const priorityLenses: PriorityLens[] = [
  {
    id: "range",
    label: "Range confidence",
    metric: "Predictable distance",
    detail:
      "Drivers adopt EVs faster when route planning feels calm, transparent, and easy to trust.",
    sectionId: "battery",
  },
  {
    id: "charging",
    label: "Charging ease",
    metric: "Fast, visible access",
    detail:
      "Charging adoption improves when stations are easy to find, simple to use, and integrated into daily movement.",
    sectionId: "charging",
  },
  {
    id: "design",
    label: "Cabin design",
    metric: "Quiet spatial comfort",
    detail:
      "Interior calm and intuitive controls make electrification feel premium instead of purely technical.",
    sectionId: "cabin",
  },
  {
    id: "impact",
    label: "Urban impact",
    metric: "Cleaner daily mobility",
    detail:
      "The strongest value story pairs lower tailpipe emissions with quieter, more livable streets.",
    sectionId: "switch",
  },
];

const snapshotCards = [
  {
    value: "01",
    label: "Narrative built as a guided editorial scroll.",
  },
  {
    value: "04",
    label: "Visual chapters anchored to real EV imagery.",
  },
  {
    value: "UX",
    label: "Interactive controls that let the reader choose their lens.",
  },
];

const comparisonMetrics: ComparisonMetric[] = [
  {
    id: "range",
    label: "Range",
    unit: "mi",
    description: "Approximate distance confidence for a single full charge.",
    accent: "bg-[#2864f0]",
  },
  {
    id: "charge",
    label: "Fast charge",
    unit: "min",
    description: "Illustrative time to recover most of a useful trip window.",
    accent: "bg-[#e6483d]",
  },
  {
    id: "cost",
    label: "Monthly energy",
    unit: "$",
    description: "Estimated monthly charging cost under a typical ownership pattern.",
    accent: "bg-[#f5c518]",
  },
  {
    id: "comfort",
    label: "Cabin calm",
    unit: "/10",
    description: "A design-led score for quietness, spaciousness, and interface ease.",
    accent: "bg-[#111111]",
  },
];

const evProfiles: EVProfile[] = [
  {
    id: "commuter",
    name: "Urban commuter",
    audience: "Dense daily movement",
    sectionId: "charging",
    summary:
      "Best when charging access is visible, short stops are predictable, and city travel stays quiet and low-friction.",
    values: {
      range: 260,
      charge: 18,
      cost: 54,
      comfort: 7,
    },
  },
  {
    id: "touring",
    name: "Weekend touring",
    audience: "Long-distance flexibility",
    sectionId: "battery",
    summary:
      "Ideal for drivers who want stronger range buffers and fewer planning interruptions between destinations.",
    values: {
      range: 360,
      charge: 24,
      cost: 68,
      comfort: 8,
    },
  },
  {
    id: "premium",
    name: "Premium family",
    audience: "Comfort-first ownership",
    sectionId: "cabin",
    summary:
      "Balances confident charging, refined cabin materials, and calm UX for longer shared trips.",
    values: {
      range: 320,
      charge: 20,
      cost: 63,
      comfort: 9,
    },
  },
];

export default function Home() {
  const [activeSectionId, setActiveSectionId] = useState(storySections[0].id);
  const [selectedLensId, setSelectedLensId] = useState(priorityLenses[0].id);
  const [selectedMetricId, setSelectedMetricId] = useState<ComparisonMetricId>(
    comparisonMetrics[0].id,
  );

  useEffect(() => {
    const sectionElements = document.querySelectorAll<HTMLElement>(
      "[data-story-section]",
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              second.intersectionRatio - first.intersectionRatio,
          )[0];

        if (visibleEntry?.target.id) {
          setActiveSectionId(visibleEntry.target.id.replace("story-", ""));
        }
      },
      {
        rootMargin: "-20% 0px -35% 0px",
        threshold: [0.2, 0.45, 0.7],
      },
    );

    sectionElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const activeSectionIndex = storySections.findIndex(
    (section) => section.id === activeSectionId,
  );

  const activeSection =
    storySections[activeSectionIndex] ?? storySections[0];

  const selectedLens =
    priorityLenses.find((lens) => lens.id === selectedLensId) ??
    priorityLenses[0];

  const selectedMetric =
    comparisonMetrics.find((metric) => metric.id === selectedMetricId) ??
    comparisonMetrics[0];

  const rankedProfiles = useMemo(() => {
    const direction = selectedMetricId === "charge" || selectedMetricId === "cost" ? 1 : -1;

    return [...evProfiles].sort((first, second) => {
      return direction * (first.values[selectedMetricId] - second.values[selectedMetricId]);
    });
  }, [selectedMetricId]);

  const metricDomain = useMemo(() => {
    const values = evProfiles.map((profile) => profile.values[selectedMetricId]);
    return {
      min: Math.min(...values),
      max: Math.max(...values),
    };
  }, [selectedMetricId]);

  const progressWidth = useMemo(() => {
    return `${((activeSectionIndex + 1) / storySections.length) * 100}%`;
  }, [activeSectionIndex]);

  const scrollToSection = (sectionId: string) => {
    document
      .getElementById(`story-${sectionId}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-float-slow absolute -left-12 top-24 h-48 w-48 rounded-full bg-[#e6483d]/18 blur-3xl" />
        <div className="animate-float-delayed absolute right-[-4rem] top-[18rem] h-64 w-64 rounded-full bg-[#2864f0]/16 blur-3xl" />
        <div className="animate-float-slow absolute bottom-20 left-1/3 h-56 w-56 rotate-12 bg-[#f5c518]/18 blur-3xl" />
        <div className="absolute left-[10%] top-[14%] h-16 w-16 rounded-full border-8 border-[#111111]/70" />
        <div className="absolute right-[14%] top-[8%] h-20 w-20 bg-[#2864f0]" />
        <div className="absolute bottom-[18%] right-[8%] h-24 w-24 rounded-full bg-[#e6483d]" />
      </div>

      <section className="border-b border-black/10 px-6 py-8 md:px-10 lg:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 text-xs font-medium uppercase tracking-[0.28em] text-black/55">
          <p>Spec-driven scrollytelling / EV futures</p>
          <p>Interactive editorial prototype</p>
        </div>
      </section>

      <section className="px-6 pb-14 pt-10 md:px-10 lg:px-12 lg:pb-20 lg:pt-14">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-start">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-black/55 shadow-[0_16px_60px_rgba(17,17,17,0.08)] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#e6483d]" />
              Bauhaus color + Swiss grid direction
            </div>

            <div className="space-y-6">
              <h1 className="max-w-4xl text-5xl font-semibold uppercase leading-[0.92] tracking-[-0.05em] text-black sm:text-6xl lg:text-8xl">
                Electric cars are
                <span className="block text-[#2864f0]">redesigning motion</span>
                <span className="block">from battery to boulevard.</span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-black/72 md:text-xl">
                This story uses scroll, image, typography, and reader-selected
                priorities to explain why EV adoption now hinges on confidence,
                charging clarity, and human-centered interior design.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => scrollToSection(storySections[0].id)}
                className="rounded-full bg-black px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-transform duration-200 hover:-translate-y-0.5"
              >
                Start the story
              </button>
              <button
                type="button"
                onClick={() => scrollToSection(selectedLens.sectionId)}
                className="rounded-full border border-black/15 bg-white/80 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black transition-colors duration-200 hover:bg-[#f5c518]"
              >
                Jump to {selectedLens.label}
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {snapshotCards.map((card) => (
                <div
                  key={card.value}
                  className="rounded-[1.75rem] border border-black/10 bg-white/80 p-5 shadow-[0_24px_80px_rgba(17,17,17,0.08)] backdrop-blur"
                >
                  <p className="text-2xl font-semibold uppercase tracking-[-0.06em] text-black">
                    {card.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-black/70">
                    {card.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-white/85 p-6 shadow-[0_32px_100px_rgba(17,17,17,0.08)] backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/50">
                  Reader lens
                </p>
                <h2 className="mt-2 text-2xl font-semibold uppercase tracking-[-0.04em] text-black">
                  What matters most to you?
                </h2>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#2864f0]" />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {priorityLenses.map((lens) => {
                const isSelected = lens.id === selectedLensId;

                return (
                  <button
                    key={lens.id}
                    type="button"
                    onClick={() => setSelectedLensId(lens.id)}
                    className={`rounded-[1.4rem] border px-4 py-4 text-left transition-all duration-200 ${
                      isSelected
                        ? "border-black bg-black text-white shadow-[0_24px_70px_rgba(17,17,17,0.2)]"
                        : "border-black/10 bg-[#f7f4ef] text-black hover:-translate-y-0.5 hover:border-black/30"
                    }`}
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] opacity-60">
                      {lens.label}
                    </p>
                    <p className="mt-3 text-lg font-semibold uppercase tracking-[-0.03em]">
                      {lens.metric}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-[1.6rem] border border-black/10 bg-[#f7f4ef] p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/45">
                  Active insight
                </p>
                <button
                  type="button"
                  onClick={() => scrollToSection(selectedLens.sectionId)}
                  className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2864f0]"
                >
                  Open chapter
                </button>
              </div>
              <p className="mt-4 text-2xl font-semibold uppercase tracking-[-0.04em] text-black">
                {selectedLens.metric}
              </p>
              <p className="mt-3 text-base leading-7 text-black/72">
                {selectedLens.detail}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-10 lg:px-12 lg:pb-28">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(300px,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
          <aside className="lg:sticky lg:top-8 lg:h-fit">
            <div className="space-y-5 rounded-[2rem] border border-black/10 bg-white/85 p-5 shadow-[0_32px_100px_rgba(17,17,17,0.08)] backdrop-blur md:p-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/50">
                  Scroll navigator
                </p>
                <div className="h-2 overflow-hidden rounded-full bg-black/8">
                  <div
                    className="h-full rounded-full bg-black transition-all duration-500"
                    style={{ width: progressWidth }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                {storySections.map((section, index) => {
                  const isActive = section.id === activeSectionId;

                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => scrollToSection(section.id)}
                      className={`flex w-full items-center justify-between rounded-[1.3rem] border px-4 py-4 text-left transition-all duration-200 ${
                        isActive
                          ? "border-black bg-black text-white"
                          : "border-black/10 bg-[#f7f4ef] text-black hover:border-black/25"
                      }`}
                    >
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] opacity-60">
                          {section.step}
                        </p>
                        <p className="mt-2 text-sm font-medium leading-6">
                          {section.title}
                        </p>
                      </div>
                      <span className="text-lg font-semibold">
                        0{index + 1}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="overflow-hidden rounded-[1.75rem] border border-black/10 bg-[#f7f4ef]">
                <div className={`h-3 w-full ${activeSection.accent}`} />
                <div className="relative aspect-[5/4] overflow-hidden">
                  <Image
                    key={activeSection.image}
                    src={activeSection.image}
                    alt={activeSection.alt}
                    fill
                    priority
                    className="object-cover transition duration-500"
                    sizes="(max-width: 1024px) 100vw, 36vw"
                  />
                </div>
                <div className="space-y-3 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/45">
                    Active visual
                  </p>
                  <p className="text-2xl font-semibold uppercase tracking-[-0.04em] text-black">
                    {activeSection.statValue}
                  </p>
                  <p className="text-sm leading-6 text-black/70">
                    {activeSection.statLabel}
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <div className="space-y-8">
            {storySections.map((section, index) => {
              const isActive = section.id === activeSectionId;

              return (
                <article
                  key={section.id}
                  id={`story-${section.id}`}
                  data-story-section
                  className={`motion-card rounded-[2rem] border p-7 shadow-[0_32px_100px_rgba(17,17,17,0.08)] transition-all duration-300 md:p-8 lg:min-h-[85vh] lg:p-10 ${
                    isActive
                      ? "border-black bg-white"
                      : "border-black/8 bg-white/72"
                  }`}
                >
                  <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_280px] lg:items-start">
                    <div className="space-y-6">
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`inline-flex rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] ${section.accentSoft} ${section.accentText}`}
                        >
                          {section.step}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-black/40">
                          Chapter 0{index + 1}
                        </span>
                      </div>

                      <div className="space-y-4">
                        <h2 className="max-w-3xl text-3xl font-semibold uppercase leading-tight tracking-[-0.05em] text-black md:text-5xl">
                          {section.title}
                        </h2>
                        <p className="max-w-2xl text-lg leading-8 text-black/72">
                          {section.summary}
                        </p>
                      </div>

                      <div className="grid gap-3 md:grid-cols-3">
                        {section.bullets.map((bullet) => (
                          <div
                            key={bullet}
                            className="rounded-[1.4rem] border border-black/10 bg-[#f7f4ef] p-4"
                          >
                            <p className="text-sm leading-6 text-black/72">
                              {bullet}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-[1.6rem] border border-black/10 bg-black px-5 py-6 text-white">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
                          Why this matters
                        </p>
                        <p className="mt-3 max-w-2xl text-lg leading-8 text-white/84">
                          {section.insight}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-[1.6rem] border border-black/10 bg-[#f7f4ef] p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/45">
                          Scene note
                        </p>
                        <p className="mt-4 text-4xl font-semibold uppercase tracking-[-0.07em] text-black">
                          {section.statValue}
                        </p>
                        <p className="mt-3 text-sm leading-6 text-black/72">
                          {section.statLabel}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedLensId(
                            priorityLenses[index % priorityLenses.length].id,
                          )
                        }
                        className={`flex w-full items-center justify-between rounded-[1.6rem] px-5 py-4 text-left text-sm font-semibold uppercase tracking-[0.18em] text-black transition-transform duration-200 hover:-translate-y-0.5 ${section.accentSoft}`}
                      >
                        Focus this lens
                        <span className="text-black/55">Tap</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 px-6 py-16 md:px-10 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/50">
              Comparison studio
            </p>
            <h2 className="max-w-2xl text-4xl font-semibold uppercase leading-tight tracking-[-0.05em] text-black md:text-5xl">
              Compare three EV ownership profiles through the lens you care about most.
            </h2>
            <p className="max-w-xl text-lg leading-8 text-black/72">
              This module turns the story into a hands-on planning tool. Swap metrics to see how different EV priorities change which profile feels strongest.
            </p>

            <div className="rounded-[1.8rem] border border-black/10 bg-white/80 p-5 shadow-[0_24px_80px_rgba(17,17,17,0.08)] backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/45">
                Active metric
              </p>
              <div className="mt-4 flex items-center gap-4">
                <div className={`h-12 w-12 rounded-2xl ${selectedMetric.accent}`} />
                <div>
                  <p className="text-2xl font-semibold uppercase tracking-[-0.04em] text-black">
                    {selectedMetric.label}
                  </p>
                  <p className="text-sm leading-6 text-black/70">
                    {selectedMetric.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5 rounded-[2rem] border border-black/10 bg-white/85 p-6 shadow-[0_32px_100px_rgba(17,17,17,0.08)] backdrop-blur">
            <div className="flex flex-wrap gap-3">
              {comparisonMetrics.map((metric) => {
                const isSelected = metric.id === selectedMetricId;

                return (
                  <button
                    key={metric.id}
                    type="button"
                    onClick={() => setSelectedMetricId(metric.id)}
                    className={`rounded-full border px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-200 ${
                      isSelected
                        ? "border-black bg-black text-white"
                        : "border-black/10 bg-[#f7f4ef] text-black hover:-translate-y-0.5 hover:border-black/30"
                    }`}
                  >
                    {metric.label}
                  </button>
                );
              })}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {rankedProfiles.map((profile, index) => {
                const value = profile.values[selectedMetricId];
                const width =
                  metricDomain.max === metricDomain.min
                    ? 100
                    : ((value - metricDomain.min) / (metricDomain.max - metricDomain.min)) * 100;

                return (
                  <div
                    key={profile.id}
                    className={`motion-card rounded-[1.75rem] border p-5 transition-all duration-300 ${
                      index === 0
                        ? "border-black bg-black text-white"
                        : "border-black/10 bg-[#f7f4ef] text-black"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] opacity-60">
                          {profile.audience}
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold uppercase tracking-[-0.04em]">
                          {profile.name}
                        </h3>
                      </div>
                      <span className="rounded-full border border-current/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]">
                        {index === 0 ? "Lead" : `0${index + 1}`}
                      </span>
                    </div>

                    <div className="mt-6 space-y-3">
                      <div className="flex items-end justify-between gap-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] opacity-60">
                          {selectedMetric.label}
                        </p>
                        <p className="text-4xl font-semibold uppercase tracking-[-0.07em]">
                          {selectedMetricId === "cost" ? "$" : ""}
                          {value}
                          {selectedMetricId === "range" ? " mi" : ""}
                          {selectedMetricId === "charge" ? " min" : ""}
                          {selectedMetricId === "comfort" ? "/10" : ""}
                        </p>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-current/10">
                        <div
                          className={`h-full rounded-full ${index === 0 ? "bg-white" : selectedMetric.accent}`}
                          style={{ width: `${Math.max(width, 18)}%` }}
                        />
                      </div>
                    </div>

                    <p className="mt-5 text-sm leading-6 opacity-80">
                      {profile.summary}
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-[1.2rem] border border-current/10 p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] opacity-55">
                          Range
                        </p>
                        <p className="mt-2 font-semibold">{profile.values.range} mi</p>
                      </div>
                      <div className="rounded-[1.2rem] border border-current/10 p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] opacity-55">
                          Charge
                        </p>
                        <p className="mt-2 font-semibold">{profile.values.charge} min</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => scrollToSection(profile.sectionId)}
                      className={`mt-6 w-full rounded-full border px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition-transform duration-200 hover:-translate-y-0.5 ${
                        index === 0
                          ? "border-white/20 bg-white text-black"
                          : "border-black/10 bg-white text-black"
                      }`}
                    >
                      Open relevant chapter
                    </button>
                  </div>
                );
              })}
            </div>

            <p className="text-xs leading-6 uppercase tracking-[0.18em] text-black/45">
              Illustrative comparison for storytelling purposes — meant to explain trade-offs, not represent one specific production vehicle.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 px-6 py-16 md:px-10 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/50">
              Takeaway
            </p>
            <h2 className="max-w-2xl text-4xl font-semibold uppercase leading-tight tracking-[-0.05em] text-black md:text-5xl">
              The best EV experience is not just efficient. It feels composed.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {priorityLenses.map((lens) => {
              const isSelected = lens.id === selectedLensId;

              return (
                <button
                  key={lens.id}
                  type="button"
                  onClick={() => {
                    setSelectedLensId(lens.id);
                    scrollToSection(lens.sectionId);
                  }}
                  className={`rounded-[1.75rem] border p-5 text-left transition-all duration-200 ${
                    isSelected
                      ? "border-black bg-black text-white"
                      : "border-black/10 bg-white/80 text-black hover:border-black/30"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] opacity-60">
                    {lens.label}
                  </p>
                  <p className="mt-3 text-2xl font-semibold uppercase tracking-[-0.04em]">
                    {lens.metric}
                  </p>
                  <p className="mt-3 text-sm leading-6 opacity-80">
                    {lens.detail}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
