import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

function TomatoClock(): React.JSX.Element {
  const [timeLeft, setTimeLeft] = useState<number>(
    Number(import.meta.env.VITE_DEFAULT_TIME) || 1500,
  );
  const [isActive, setIsActive] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    let timer: number | undefined;
    if (isActive && timeLeft > 0) {
      timer = window.setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      alert(t("timeUpAlert"));
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, t]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative flex h-screen items-center justify-center bg-background text-foreground transition-colors duration-500 font-sans">
      <div className="absolute right-5 top-5 flex gap-2">
        <button
          className="rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm transition-all hover:bg-secondary backdrop-blur-sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? t("darkTheme") : t("lightTheme")}
        </button>

        {/* 語言切換按鈕 */}

        <button
          className="rounded-full border border-border bg-secondary/50 text-secondary-foreground px-4 py-2 text-sm transition-all hover:bg-secondary backdrop-blur-sm cursor-pointer"
          onClick={() =>
            i18n.changeLanguage(i18n.language === "en" ? "zh" : "en")
          }
        >
          {t("changeLanguage")}
        </button>
      </div>

      <div className="w-[300px] rounded-xl bg-card p-8 text-center shadow-2xl border border-border transition-colors duration-500">
        <h1 className="text-2xl font-bold text-card-foreground">
          {t("timer.focusTimer")}
        </h1>

        <div className="my-6 text-6xl font-black text-primary tabular-nums">
          {formatTime(timeLeft)}
        </div>

        <div className="flex justify-center gap-3">
          {/* 開始/暫停按鈕 */}
          <button
            onClick={() => setIsActive(!isActive)}
            className={`flex-1 rounded-lg px-6 py-3 text-primary-foreground transition-colors font-medium ${
              isActive ? "bg-destructive" : "bg-primary"
            }`}
          >
            {isActive ? t("timer.pause") : t("timer.start")}
          </button>

          {/* 重設按鈕*/}
          <button
            onClick={() => {
              setIsActive(false);
              setTimeLeft(1500);
            }}
            className="rounded-lg bg-muted px-6 py-3 text-muted-foreground transition-colors hover:bg-muted/80 font-medium"
          >
            {t("timer.reset")}
          </button>
        </div>
        <div>
            

        </div>
      </div>
    </div>
  );
}


export default TomatoClock;

