import { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Clock, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface StudySession {
  id: string;
  title: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  type: 'study' | 'quiz' | 'review';
  color: string;
}

const mockSessions: StudySession[] = [
  {
    id: '1',
    title: 'Math: Calculus Review',
    subject: 'Mathematics',
    date: '2024-01-16',
    time: '14:00',
    duration: '1h 30m',
    type: 'study',
    color: '#10B981',
  },
  {
    id: '2',
    title: 'Physics Quiz Prep',
    subject: 'Physics',
    date: '2024-01-17',
    time: '16:00',
    duration: '45m',
    type: 'quiz',
    color: '#8B5CF6',
  },
  {
    id: '3',
    title: 'English Literature Essay',
    subject: 'English',
    date: '2024-01-18',
    time: '10:00',
    duration: '2h',
    type: 'study',
    color: '#3B82F6',
  },
];

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sessions] = useState<StudySession[]>(mockSessions);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'study': return 'bg-primary text-primary-foreground';
      case 'quiz': return 'bg-warning text-warning-foreground';
      case 'review': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-primary rounded-xl">
              <CalendarIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Study Calendar</h1>
              <p className="text-muted-foreground">Plan and track your study sessions</p>
            </div>
          </div>
          <Button className="btn-hero">
            <Plus className="h-4 w-4 mr-2" />
            Add Session
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <Card className="p-6 animate-slide-up">
            <h2 className="text-xl font-semibold mb-4">January 2024</h2>
            
            {/* Simple calendar grid */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }, (_, i) => {
                const date = i - 6; // Start from previous month
                const isCurrentMonth = date > 0 && date <= 31;
                const hasSession = [16, 17, 18].includes(date);
                
                return (
                  <div
                    key={i}
                    className={`aspect-square p-2 text-center cursor-pointer rounded-lg transition-all hover:bg-muted ${
                      isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'
                    } ${hasSession ? 'bg-primary/10 border border-primary/30' : ''}`}
                  >
                    <div className="text-sm">{date > 0 && date <= 31 ? date : ''}</div>
                    {hasSession && (
                      <div className="w-2 h-2 bg-primary rounded-full mx-auto mt-1" />
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Upcoming Sessions */}
        <div className="space-y-6">
          <Card className="p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-xl font-semibold mb-4">Upcoming Sessions</h2>
            <div className="space-y-4">
              {sessions.map((session) => (
                <div key={session.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50">
                  <div 
                    className="w-3 h-3 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: session.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm">{session.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{session.subject}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{session.time} • {session.duration}</span>
                    </div>
                    <Badge variant="outline" className={`text-xs mt-2 ${getTypeColor(session.type)}`}>
                      {session.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Study Stats */}
          <Card className="p-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="font-semibold mb-4">This Week</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Sessions planned</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total hours</span>
                <span className="font-medium">12h 30m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Completed</span>
                <span className="font-medium">5/8</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-5/8 transition-all duration-300" />
              </div>
              <div className="text-xs text-muted-foreground mt-1">62% completed</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}