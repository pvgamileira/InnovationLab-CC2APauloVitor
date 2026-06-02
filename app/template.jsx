'use client';

export default function Template({ children }) {
  return (
    <div className="animate-fade-in animate-slide-up min-h-screen">
      {children}
    </div>
  );
}
