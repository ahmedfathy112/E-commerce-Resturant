import React from "react";

const Loading = ({ message = "Page is loading ...!" }) => {
  return (
    <div className="fixed h-dvh inset-0 z-50 flex items-center justify-center bg-black/60">
      <style>{`
        @keyframes float-up-down {
          0% { transform: translateY(0); opacity: 0.95; }
          50% { transform: translateY(-14px); opacity: 1; }
          100% { transform: translateY(0); opacity: 0.95; }
        }
        @keyframes float-subtle {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }
        .loading-box {
          animation: float-up-down 1.6s ease-in-out infinite;
          will-change: transform;
        }
        .loading-marker {
          animation: float-subtle 1.6s ease-in-out infinite;
        }
        .loading-text {
          animation: float-subtle 1.6s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .loading-box,
          .loading-marker,
          .loading-text { animation: none; }
        }
      `}</style>

      <div className="loading-box flex flex-col items-center gap-4 bg-[#111] bg-opacity-90 text-white rounded-xl !px-8 !py-6 shadow-xl">
        <div className="text-center">
          <div className="loading-text text-lg font-semibold">{message}</div>
          <div className="mt-2 text-sm text-white/70">Please wait...</div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
