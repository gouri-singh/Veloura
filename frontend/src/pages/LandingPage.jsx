import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <div className="max-w-3xl glass-panel p-12 md:p-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gold-champagne/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-velvet-purple/40 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
        
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold font-serif text-white tracking-wide mb-4">
            VELOURA
          </h1>
          <p className="text-xl md:text-2xl text-gold-champagne font-light italic mb-8 font-serif">
            "Wear What Truly Fits You."
          </p>
          <p className="text-gray-300 mb-10 max-w-lg mx-auto font-light leading-relaxed">
            Experience AI-powered personal styling. We curate the best fashion from across the web, tailored perfectly to your unique body, skin tone, and style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth" className="btn-gold text-lg px-10">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
