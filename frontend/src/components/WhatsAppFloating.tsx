import React from "react";

const getWhatsAppHref = (): string | null => {
  const rawNumber = (import.meta.env.VITE_ADMIN_WHATSAPP as string) || "";
  if (!rawNumber) return null;

  // Sanitize to digits only and strip leading +
  const digits = rawNumber.replace(/[^0-9]/g, "");
  if (!digits) return null;

  const defaultText =
    (import.meta.env.VITE_WHATSAPP_DEFAULT_TEXT as string) ||
    "Hi, I would like to get assistance via SkillTwin.";
  const encoded = encodeURIComponent(defaultText);
  return `https://wa.me/${digits}?text=${encoded}`;
};

const WhatsAppFloating: React.FC = () => {
  const href = getWhatsAppHref();
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="relative">
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-green-500/30 blur-md scale-100 group-hover:scale-110 transition-transform"></span>
        {/* Button */}
        <div
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl border border-white/20 hover:bg-green-600 transition-colors"
        >
          {/* WhatsApp SVG icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="22"
            height="22"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M19.11 17.18c-.27-.14-1.57-.77-1.81-.86-.24-.09-.42-.14-.6.14-.18.27-.69.86-.84 1.03-.15.18-.31.2-.58.07-.27-.14-1.13-.42-2.16-1.35-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.41.12-.55.13-.13.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.6-1.44-.82-1.97-.22-.53-.44-.46-.6-.46-.16 0-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.98 2.66 1.12 2.84.14.18 1.94 2.96 4.7 4.04.66.27 1.18.43 1.58.55.66.21 1.27.18 1.75.11.53-.08 1.57-.64 1.8-1.27.22-.63.22-1.17.16-1.27-.07-.11-.24-.18-.51-.32z"/>
            <path d="M26.88 5.12A13.9 13.9 0 0 0 16 1.33 13.93 13.93 0 0 0 2.67 21.8L1 31l9.39-1.64A13.93 13.93 0 0 0 30.67 16c0-3.72-1.45-7.22-3.79-9.55zm-10.88 22.7c-2.57 0-4.94-.77-6.92-2.09l-.5-.33-5.57.97 1.05-5.44-.35-.53a11.92 11.92 0 1 1 12.29 7.42z"/>
          </svg>
        </div>
      </div>
    </a>
  );
};

export default WhatsAppFloating;


