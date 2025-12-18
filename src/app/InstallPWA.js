"use client";
import { useEffect, useState } from "react";

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true); // You can show your own button
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("PWA installed");
      } else {
        console.log("PWA install dismissed");
      }
      setDeferredPrompt(null);
      setShowPrompt(false);
    });
  };

  return (
    showPrompt && (
      <div className="fixed bottom-4 left-4 bg-white border shadow-lg px-4 py-2 rounded z-50">
        <p className="text-black mb-2">Install this app?</p>
        <button
          onClick={handleInstallClick}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Install
        </button>
      </div>
    )
  );
}
