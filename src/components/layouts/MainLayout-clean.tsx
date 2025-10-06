import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="page-container">
      <header className="glass-strong border-b sticky top-0 z-50 animate-slide-in-down">
        <div className="content-container py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-glow hover:scale-110 active:scale-95 transition-transform">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  EduMath AI
                </span>
                <span className="text-xs text-muted-foreground">Smart Learning Platform</span>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center gap-8">
              <Link 
                to="/features" 
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2 group"
              >
                <BookOpen className="h-4 w-4 group-hover:scale-110 transition-transform" />
                Features
              </Link>
              <Link 
                to="/about" 
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2 group"
              >
                <Users className="h-4 w-4 group-hover:scale-110 transition-transform" />
                About
              </Link>
              <Link 
                to="/testimonials" 
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2 group"
              >
                <Star className="h-4 w-4 group-hover:scale-110 transition-transform" />
                Reviews
              </Link>
            </nav>
            
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild size="sm" className="btn-gradient">
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="animate-fade-in">
        {children}
      </main>

      <footer className="glass-light border-t mt-20 animate-slide-in-up">
        <div className="content-container py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-secondary">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">EduMath AI</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Revolutionizing mathematics education through AI-powered personalized learning experiences.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link to="/integrations" className="hover:text-foreground transition-colors">Integrations</Link></li>
                <li><Link to="/api" className="hover:text-foreground transition-colors">API</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link to="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/help" className="hover:text-foreground transition-colors">Help Center</Link></li>
                <li><Link to="/docs" className="hover:text-foreground transition-colors">Documentation</Link></li>
                <li><Link to="/community" className="hover:text-foreground transition-colors">Community</Link></li>
                <li><Link to="/status" className="hover:text-foreground transition-colors">Status</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 EduMath AI. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
