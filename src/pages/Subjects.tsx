import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, TrendingUp, Users, BookOpen, Play } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { subjects, getSubjectById } from '@/data/subjects';

export default function Subjects() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [selectedSubject] = useState(() => subjectId ? getSubjectById(subjectId) : null);

  if (subjectId && selectedSubject) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/subjects')}
            className="hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Subjects
          </Button>
        </div>

        <div className="animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <div 
              className="p-4 rounded-xl text-white shadow-lg"
              style={{ backgroundColor: selectedSubject.color }}
            >
              <selectedSubject.icon className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{selectedSubject.name}</h1>
              <p className="text-muted-foreground">{selectedSubject.description}</p>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Progress</div>
                  <div className="text-xl font-bold">{selectedSubject.progress}%</div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <BookOpen className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Lessons</div>
                  <div className="text-xl font-bold">{selectedSubject.completedLessons}/{selectedSubject.totalLessons}</div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Clock className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Study Time</div>
                  <div className="text-xl font-bold">{selectedSubject.studyTime}</div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Users className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Difficulty</div>
                  <div className="text-xl font-bold">{selectedSubject.difficulty}</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Topics */}
        <div className="animate-slide-up">
          <h2 className="text-xl font-semibold mb-4">Topics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {selectedSubject.topics.map((topic, index) => (
              <Badge 
                key={topic} 
                variant="secondary" 
                className="p-2 text-center justify-center"
              >
                {topic}
              </Badge>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {selectedSubject.recentActivity.map((activity, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'note' ? 'bg-primary/10' :
                    activity.type === 'quiz' ? 'bg-secondary/10' :
                    'bg-accent/10'
                  }`}>
                    {activity.type === 'note' && <BookOpen className="h-4 w-4 text-primary" />}
                    {activity.type === 'quiz' && <TrendingUp className="h-4 w-4 text-secondary" />}
                    {activity.type === 'lesson' && <Play className="h-4 w-4 text-accent" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{activity.title}</div>
                    <div className="text-sm text-muted-foreground">{activity.date}</div>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {activity.type}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Next Lesson */}
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Card className="p-6 bg-gradient-card border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Continue Learning</h3>
                <p className="text-muted-foreground mb-4">
                  Next: {selectedSubject.nextLesson}
                </p>
              </div>
              <Button className="btn-hero">
                <Play className="h-4 w-4 mr-2" />
                Start Lesson
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Subject overview page
  return (
    <div className="space-y-8">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">All Subjects</h1>
        <p className="text-muted-foreground">Explore your learning journey across different subjects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject, index) => (
          <Card
            key={subject.id}
            className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in`}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => navigate(`/subjects/${subject.id}`)}
          >
            <div className="flex items-center gap-4 mb-4">
              <div 
                className="p-3 rounded-xl text-white shadow-md"
                style={{ backgroundColor: subject.color }}
              >
                <subject.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{subject.name}</h3>
                <Badge variant="outline">{subject.difficulty}</Badge>
              </div>
            </div>

            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {subject.description}
            </p>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{subject.progress}%</span>
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
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                {subject.completedLessons}/{subject.totalLessons} lessons
              </div>
              <div className="text-sm text-muted-foreground">
                {subject.studyTime}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}