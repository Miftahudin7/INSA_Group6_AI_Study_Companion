import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Clock, Target, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SubjectCard } from '@/components/dashboard/SubjectCard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { subjects } from '@/data/subjects';

export default function Dashboard() {
  const navigate = useNavigate();
  const [currentTime] = useState(new Date());

  const handleSubjectClick = (subjectId: string) => {
    navigate(`/subjects/${subjectId}`);
  };

  const handleActionClick = (actionId: string) => {
    switch (actionId) {
      case 'ai-summarize':
      case 'quick-quiz':
        navigate('/ai-tools');
        break;
      case 'upload-file':
        navigate('/upload');
        break;
      case 'new-note':
        navigate('/notes');
        break;
      case 'schedule-study':
        navigate('/calendar');
        break;
      default:
        console.log('Action:', actionId);
    }
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const totalProgress = subjects.reduce((acc, subject) => acc + subject.progress, 0) / subjects.length;
  const totalStudyTime = subjects.reduce((acc, subject) => {
    const time = subject.studyTime.split('h');
    const hours = parseInt(time[0]);
    const minutes = time[1] ? parseInt(time[1].replace('m', '').trim()) : 0;
    return acc + hours + minutes / 60;
  }, 0);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              {getGreeting()}, Scholar! 🎓
            </h1>
            <p className="text-muted-foreground mt-2">
              Ready to continue your learning journey? You're doing great!
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{Math.round(totalProgress)}%</div>
            <div className="text-sm text-muted-foreground">Overall Progress</div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 card-gradient">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Active Subjects</div>
                <div className="text-xl font-bold">{subjects.length}</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 card-gradient">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Clock className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Study Time</div>
                <div className="text-xl font-bold">{Math.round(totalStudyTime)}h</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 card-gradient">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Avg Progress</div>
                <div className="text-xl font-bold">{Math.round(totalProgress)}%</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 card-gradient">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Award className="h-5 w-5 text-warning" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Streak</div>
                <div className="text-xl font-bold">7 days</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="animate-slide-up">
        <QuickActions onActionClick={handleActionClick} />
      </div>

      {/* Subjects Grid */}
      <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Your Subjects</h2>
          <div className="text-sm text-muted-foreground">
            {subjects.filter(s => s.progress < 100).length} active • {subjects.filter(s => s.progress === 100).length} completed
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => (
            <div 
              key={subject.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <SubjectCard 
                subject={subject} 
                onClick={handleSubjectClick}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Study Tips */}
      <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <Card className="p-6 bg-gradient-card border-primary/20">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Today's Study Tip 💡</h3>
              <p className="text-muted-foreground">
                Use the Pomodoro Technique: Study for 25 minutes, then take a 5-minute break. 
                This helps maintain focus and improves retention. Try it with our built-in timer!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}