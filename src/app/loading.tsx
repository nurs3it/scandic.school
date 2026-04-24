export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] left-[10%] w-32 h-32 bg-primary/[0.06] rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-[20%] right-[12%] w-40 h-40 bg-secondary/[0.04] rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '0.8s' }}
        />
        <div
          className="absolute top-[50%] right-[30%] w-20 h-20 bg-primary/[0.05] rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: '1.6s' }}
        />
      </div>

      {/* Logo + animation */}
      <div className="relative flex flex-col items-center z-10">
        {/* Rotating ring */}
        <div className="relative w-28 h-28 mb-8">
          {/* Outer spinning ring */}
          <div
            className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-primary border-r-primary/30"
            style={{ animation: 'loading-spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite' }}
          />
          {/* Inner counter-spinning ring */}
          <div
            className="absolute inset-2 rounded-full border-[2px] border-transparent border-b-secondary border-l-secondary/20"
            style={{ animation: 'loading-spin 1.8s cubic-bezier(0.5, 0, 0.5, 1) infinite reverse' }}
          />
          {/* Logo in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt=""
              width={44}
              height={44}
              className="w-11 h-11"
              style={{ animation: 'loading-pulse 2s ease-in-out infinite' }}
            />
          </div>
        </div>

        {/* Animated dots bar */}
        <div className="flex items-center gap-1.5 mb-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-primary/60"
              style={{
                animation: 'loading-bounce 1.4s ease-in-out infinite',
                animationDelay: `${i * 0.12}s`,
              }}
            />
          ))}
        </div>

        {/* Text */}
        <p
          className="text-secondary/70 text-sm font-medium tracking-wider uppercase"
          style={{ animation: 'loading-fade 2s ease-in-out infinite' }}
        >
          Заг��узка...
        </p>
      </div>
    </div>
  );
}
