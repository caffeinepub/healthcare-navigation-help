import { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X, Heart, LogIn, LogOut, User, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Find Care', path: '/find-care' },
  { label: 'Insurance Guide', path: '/insurance-guide' },
  { label: 'Appointment Prep', path: '/appointment-prep' },
  { label: 'Medical Bills', path: '/medical-bills' },
  { label: 'Financial Help', path: '/financial-assistance' },
  { label: 'Resources', path: '/resources' },
  { label: 'Nav Tools', path: '/navigation-tools' },
  { label: 'About', path: '/about' },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { login, clear, loginStatus, identity, isLoggingIn } = useInternetIdentity();

  const isAuthenticated = loginStatus === 'success' && !!identity;

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  const truncatedPrincipal = identity
    ? (() => {
        const p = identity.getPrincipal().toString();
        return p.length > 12 ? `${p.slice(0, 5)}…${p.slice(-4)}` : p;
      })()
    : null;

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-xs">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="/assets/generated/logo-icon.dim_128x128.png"
              alt="Healthcare Navigation Help"
              className="w-9 h-9 rounded-lg object-cover"
            />
            <div className="hidden sm:block">
              <span className="font-serif font-bold text-primary text-lg leading-tight block">
                Healthcare Navigation
              </span>
              <span className="text-xs text-muted-foreground font-medium tracking-wide">
                Help · Leominster, MA
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/70 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth + Mobile hamburger */}
          <div className="flex items-center gap-2">
            {/* Auth button — desktop */}
            <div className="hidden xl:flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-primary/5 border border-primary/20 rounded-full px-3 py-1">
                    <User className="w-3 h-3 text-primary" />
                    {truncatedPrincipal}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clear}
                    className="gap-1.5 text-xs"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={login}
                  disabled={isLoggingIn}
                  className="gap-1.5 text-xs"
                >
                  {isLoggingIn ? (
                    <span className="w-3.5 h-3.5 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <LogIn className="w-3.5 h-3.5" />
                  )}
                  {isLoggingIn ? 'Signing in…' : 'Sign In'}
                </Button>
              )}
            </div>

            {/* Mobile hamburger */}
            <Button
              variant="ghost"
              size="icon"
              className="xl:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-border bg-card animate-fade-in">
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/70 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Auth section in mobile menu */}
            <div className="mt-2 pt-2 border-t border-border">
              {isAuthenticated ? (
                <div className="flex flex-col gap-2 px-1">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground px-3 py-1">
                    <User className="w-3 h-3 text-primary" />
                    Signed in as {truncatedPrincipal}
                  </span>
                  <button
                    onClick={() => { clear(); setMobileOpen(false); }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { login(); setMobileOpen(false); }}
                  disabled={isLoggingIn}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-primary hover:bg-primary/5 transition-colors w-full disabled:opacity-60"
                >
                  {isLoggingIn ? (
                    <span className="w-4 h-4 border-2 border-primary/40 border-t-primary rounded-full animate-spin" />
                  ) : (
                    <LogIn className="w-4 h-4" />
                  )}
                  {isLoggingIn ? 'Signing in…' : 'Sign In'}
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'healthcare-navigation-help'
  );

  return (
    <footer className="bg-foreground/5 border-t border-border mt-16">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img
                src="/assets/generated/logo-icon.dim_128x128.png"
                alt="Logo"
                className="w-8 h-8 rounded-lg object-cover"
              />
              <span className="font-serif font-bold text-primary">Healthcare Navigation Help</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Helping individuals and families in Leominster, MA and surrounding communities navigate
              healthcare with confidence.
            </p>
            {/* Creator & Contact Info */}
            <div className="mt-4 pt-4 border-t border-border/60">
              <p className="text-sm font-semibold text-foreground mb-1">Made by Leyna Gagnon</p>
              <a
                href="mailto:leynag48@gmail.com"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                leynag48@gmail.com
              </a>
              <p className="text-xs text-muted-foreground mt-1">Questions? Feel free to reach out!</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li><Link to="/find-care" className="hover:text-primary transition-colors">Find Affordable Care</Link></li>
              <li><Link to="/insurance-guide" className="hover:text-primary transition-colors">Insurance Guide</Link></li>
              <li><Link to="/appointment-prep" className="hover:text-primary transition-colors">Appointment Prep</Link></li>
              <li><Link to="/medical-bills" className="hover:text-primary transition-colors">Medical Bill Guide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">More Resources</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li><Link to="/financial-assistance" className="hover:text-primary transition-colors">Financial Assistance</Link></li>
              <li><Link to="/resources" className="hover:text-primary transition-colors">Community Resources</Link></li>
              <li><Link to="/navigation-tools" className="hover:text-primary transition-colors">Navigation Tools</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>© {year} Healthcare Navigation Help · Leominster, MA</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-accent-coral fill-current" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
