import { NavLink } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Upload, 
  Brain, 
  Calendar, 
  Settings,
  FileText,
  Users,
  BarChart3,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Subjects', href: '/subjects', icon: BookOpen },
  { name: 'Notes', href: '/notes', icon: FileText },
  { name: 'AI Tools', href: '/ai-tools', icon: Brain },
  { name: 'Upload Files', href: '/upload', icon: Upload },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Study Groups', href: '/groups', icon: Users },
  { name: 'Progress', href: '/progress', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">BR</span>
              </div>
              <span className="font-semibold">BrightRoot</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="md:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={() => window.innerWidth < 768 && onClose()}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-muted",
                        isActive 
                          ? "bg-primary text-primary-foreground shadow-sm" 
                          : "text-muted-foreground hover:text-foreground"
                      )
                    }
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </NavLink>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <div className="rounded-lg bg-muted p-3 text-center">
              <div className="text-sm font-medium mb-1">Study Streak</div>
              <div className="text-2xl font-bold text-primary">7 days</div>
              <div className="text-xs text-muted-foreground">Keep it up! 🔥</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}