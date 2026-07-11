'use client'

export function RecommendationsCarousel({ recommendations }: { recommendations: any[] }) {
  if (!recommendations || recommendations.length === 0) return null

  // Duplicate the list so the loop is seamless
  const doubled = [...recommendations, ...recommendations]

  return (
    <div className="relative overflow-hidden group">
      <div className="flex gap-6 w-max animate-marquee group-hover:[animation-play-state:paused]">
        {doubled.map((r, i) => (
          <div
            key={i}
            className="w-[300px] md:w-[360px] flex-shrink-0 rounded-2xl border border-line-2 bg-panel p-6"
          >
            <div className="text-gold text-3xl font-serif leading-none mb-2">&ldquo;</div>
            <p className="text-cream leading-relaxed font-serif text-base min-h-[100px]">
              {r.text}
            </p>
            <div className="mt-5 pt-5 border-t border-line-2">
              <div className="text-cream font-medium text-sm">{r.name}</div>
              <div className="text-muted text-sm mt-1">{r.role}</div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  )
}
