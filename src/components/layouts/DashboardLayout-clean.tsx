import { ReactNode, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  BookOpen,
  MessageSquare,
  ClipboardList,
  User,
  LogOut,
  Settings,
  PenTool,
  Award,
  Menu,
  X,
  Bell,
  Search,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const professorLinks = [
    { to: '/prof/dashboard', icon: LayoutDashboard, label: 'Tableau de bord', count: null },
    { to: '/prof/students', icon: Users, label: 'Étudiants', count: 156 },
    { to: '/prof/courses', icon: BookOpen, label: 'Cours', count: 12 },
    { to: '/prof/assignments', icon: ClipboardList, label: 'Devoirs', count: 8 },
    { to: '/prof/messages', icon: MessageSquare, label: 'Messages', count: 24 },
    { to: '/prof/analytics', icon: Award, label: 'Analytiques', count: null },
  ];

  const studentLinks = [
    { to: '/student/dashboard', icon: LayoutDashboard, label: 'Tableau de bord', count: null },
    { to: '/student/courses', icon: BookOpen, label: 'Mes Cours', count: 4 },
    { to: '/student/assignments', icon: ClipboardList, label: 'Devoirs', count: 6 },
    { to: '/student/chatbot', icon: MessageSquare, label: 'Assistant IA', count: null },
    { to: '/student/progress', icon: Award, label: 'Progrès', count: null },
    { to: '/student/practice', icon: PenTool, label: 'Exercices', count: 23 },
  ];

  const links = user?.role === 'professor' ? professorLinks : studentLinks;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-72 transform glass-strong border-r transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-border/50">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-glow hover:scale-110 transition-transform">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                EduMath AI
              </span>
            </Link>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden hover:bg-background/50"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 px-4 py-6">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              
              return (
                <div
                  key={link.to}
                  className={`transform transition-all duration-200 hover:scale-105 ${
                    isActive ? 'animate-scale-in' : ''
                  }`}
                >
                  <Link
                    to={link.to}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow'
                        : 'text-foreground/70 hover:text-foreground hover:bg-background/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 ${isActive ? 'text-white' : ''}`} />
                      {link.label}
                    </div>
                    {link.count && (
                      <Badge 
                        variant={isActive ? "secondary" : "outline"} 
                        className={`text-xs ${isActive ? 'bg-white/20 text-white border-white/30' : ''}`}
                      >
                        {link.count}
                      </Badge>
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* User Profile Section */}
          <div className="border-t border-border/50 p-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-background/50 hover:bg-background/70 transition-colors">
              <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name || 'Utilisateur'}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Top Header */}
        <header className="glass-light border-b sticky top-0 z-30 animate-slide-in-down">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden hover:bg-background/50"
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              <div className="hidden md:flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="w-64 pl-10 pr-4 py-2 text-sm bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="relative hover:bg-background/50">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-destructive border-0">
                  3
                </Badge>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-background/50">
                    <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                        {user?.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 glass-strong border-border/50" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuItem className="hover:bg-background/50">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-background/50">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Paramètres</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuItem 
                    className="text-destructive hover:bg-destructive/10"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Se déconnecter</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 animate-fade-in">
          <div className="mx-auto max-w-7xl space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
