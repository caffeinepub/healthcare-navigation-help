import { Link } from '@tanstack/react-router';
import { ArrowRight, MapPin, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Hero image */}
      <div className="relative h-[520px] md:h-[600px]">
        <img
          src="/assets/generated/hero-banner.dim_1440x600.png"
          alt="Community healthcare navigation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary-foreground rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
                <MapPin className="w-3.5 h-3.5" />
                Serving Leominster, MA & Surrounding Communities
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5 text-balance">
                Healthcare Navigation Help
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                No one should miss medical care because the system is confusing, overwhelming, or hard to afford.
                We help you find care, understand costs, and make confident decisions.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg">
                  <Link to="/find-care">
                    Find Affordable Care <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/40 text-white hover:bg-white/20 font-bold">
                  <Link to="/navigation-tools">
                    Explore Navigation Tools
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center gap-3">
              <Users className="w-6 h-6 opacity-80" />
              <div className="text-left">
                <div className="font-bold text-lg">Community First</div>
                <div className="text-sm opacity-80">Families, youth & individuals</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Shield className="w-6 h-6 opacity-80" />
              <div className="text-left">
                <div className="font-bold text-lg">Free Guidance</div>
                <div className="text-sm opacity-80">No cost to access our tools</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <MapPin className="w-6 h-6 opacity-80" />
              <div className="text-left">
                <div className="font-bold text-lg">Local Focus</div>
                <div className="text-sm opacity-80">Leominster, MA & beyond</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
