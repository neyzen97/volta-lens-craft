const photos = [
  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80&auto=format&fit=crop",
];

export function PhotoStrip() {
  const doubled = [...photos, ...photos];

  return (
    <div className="w-full overflow-hidden bg-[#F5F0E8] py-6 border-b border-border">
      <div
        className="flex gap-4"
        style={{
          animation: "scroll-left 35s linear infinite",
          width: "max-content",
        }}
      >
        {doubled.map((url, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 w-[280px] md:w-[360px] h-[180px] md:h-[220px] overflow-hidden"
          >
            <img
              src={url}
              alt={`Mission Voltra ${i + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Leger overlay */}
            <div className="absolute inset-0 bg-[#F5F0E8]/10" />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
