import { Brain, Upload, FileText, Calendar, Zap, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

const quickActions = [
  {
    id: 'ai-summarize',
    title: 'AI Summarizer',
    description: 'Get quick summaries of your study materials',
    icon: Brain,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    id: 'upload-file',
    title: 'Upload Document',
    description: 'Add new study materials to your library',
    icon: Upload,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
  {
    id: 'new-note',
    title: 'Create Note',
    description: 'Start a new study note or journal entry',
    icon: FileText,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    id: 'schedule-study',
    title: 'Schedule Study',
    description: 'Plan your next study session',
    icon: Calendar,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
  {
    id: 'quick-quiz',
    title: 'Quick Quiz',
    description: 'Test your knowledge with AI-generated questions',
    icon: Zap,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
  },
  {
    id: 'set-goal',
    title: 'Set Goal',
    description: 'Define your learning objectives',
    icon: Target,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
];

export function QuickActions({ onActionClick }: QuickActionsProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.id}
              variant="ghost"
              className="h-auto p-4 flex-col items-start text-left hover:bg-muted/50 transition-all duration-200 hover:scale-105"
              onClick={() => onActionClick(action.id)}
            >
              <div className={`p-2 rounded-lg ${action.bgColor} mb-3`}>
                <Icon className={`h-5 w-5 ${action.color}`} />
              </div>
              <div className="w-full">
                <div className="font-medium text-sm mb-1">{action.title}</div>
                <div className="text-xs text-muted-foreground">{action.description}</div>
              </div>
            </Button>
          );
        })}
      </div>
    </Card>
  );
}