import { useState } from 'react';
import { BookOpen, Users, Clock, TrendingUp, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SubjectCardProps {
  subject: {
    id: string;
    name: string;
    color: string;
    icon: React.ComponentType<any>;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    nextLesson: string;
    studyTime: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    description: string;
  };
  onClick: (subjectId: string) => void;
}

export function SubjectCard({ subject, onClick }: SubjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = subject.icon;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-secondary text-secondary-foreground';
      case 'Intermediate': return 'bg-warning text-warning-foreground';
      case 'Advanced': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card 
      className={cn(
        "card-subject group cursor-pointer transition-all duration-300",
        isHovered && "shadow-glow border-primary/30"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(subject.id)}
    >
      {/* Background decoration */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 opacity-5 rounded-bl-full"
        style={{ backgroundColor: subject.color }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="p-3 rounded-xl text-white shadow-md"
              style={{ backgroundColor: subject.color }}
            >
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">{subject.name}</h3>
              <Badge variant="secondary" className={getDifficultyColor(subject.difficulty)}>
                {subject.difficulty}
              </Badge>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {subject.description}
        </p>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">
              {subject.completedLessons}/{subject.totalLessons} lessons
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${subject.progress}%`,
                backgroundColor: subject.color
              }}
            />
          </div>
          <div className="text-right text-sm text-muted-foreground mt-1">
            {subject.progress}% complete
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{subject.studyTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">On track</span>
          </div>
        </div>

        {/* Next lesson */}
        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Next lesson:</div>
              <div className="text-sm text-muted-foreground">{subject.nextLesson}</div>
            </div>
            <Button 
              size="sm" 
              className="btn-outline text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onClick(subject.id);
              }}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}