"use client";

import { useEffect, useState } from "react";

const CODE_TO_EMOJI: Record<number, { emoji: string; label: string }> = {
  0: { emoji: "☀️", label: "Clear sky" },
  1: { emoji: "🌤️", label: "Mostly clear" },
  2: { emoji: "⛅", label: "Partly cloudy" },
  3: { emoji: "☁️", label: "Overcast" },
  45: { emoji: "🌫️", label: "Fog" },
  48: { emoji: "🌫️", label: "Freezing fog" },
  51: { emoji: "🌦️", label: "Drizzle" },
  61: { emoji: "🌧️", label: "Rain" },
  71: { emoji: "🌨️", label: "Snow" },
  80: { emoji: "🌦️", label: "Showers" },
  95: { emoji: "⛈️", label: "Thunderstorm" },
};

export default function WeatherWidget() {
  const [temp, setTemp] = useState<number | undefined>();
  const [code, setCode] = useState<number | undefined>();
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    const load = async (lat: number, lon: number, locLabel: string) => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`;
        const res = await fetch(url);
        const json = await res.json();
        if (!mounted) return;
        setTemp(json?.current?.temperature_2m);
        setCode(json?.current?.weather_code);
        setLabel(locLabel);
      } catch {
        // ignore errors
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          load(pos.coords.latitude, pos.coords.longitude, "Votre position");
        },
        () => {
          // fallback Paris
          load(48.8566, 2.3522, "Paris");
        }
      );
    } else {
      load(48.8566, 2.3522, "Paris");
    }

    return () => {
      mounted = false;
    };
  }, []);

  if (temp === undefined || code === undefined) return null;

  const meta = CODE_TO_EMOJI[code] ?? { emoji: "🌡️", label: "" };

  return (
    <div className="items-center gap-2 rounded-md bg-white/10 px-3 py-2 backdrop-blur-sm">
      <span className="text-xl">{meta.emoji}</span>
      <span className="text-sm md:text-base">
        {Math.round(temp)}°C · {meta.label}
        {label ? ` – ${label}` : ""}
      </span>
    </div>
  );
}
