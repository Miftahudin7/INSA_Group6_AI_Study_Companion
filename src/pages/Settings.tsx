import { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Download } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const [profile, setProfile] = useState({
    name: 'Alex Student',
    email: 'alex@example.com',
    grade: '11th Grade',
  });

  const [notifications, setNotifications] = useState({
    studyReminders: true,
    deadlineAlerts: true,
    progressUpdates: false,
    weeklyReports: true,
  });

  const { toast } = useToast();

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-primary rounded-xl">
            <SettingsIcon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Customize your learning experience</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Navigation */}
        <div className="space-y-2">
          <Card className="p-4">
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-primary bg-primary/10">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Palette className="h-4 w-4 mr-2" />
                Appearance
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Privacy
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Data Export
              </Button>
            </nav>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <Card className="p-6 animate-slide-up">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="grade">Grade Level</Label>
                <Select value={profile.grade} onValueChange={(value) => setProfile({ ...profile, grade: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9th Grade">9th Grade</SelectItem>
                    <SelectItem value="10th Grade">10th Grade</SelectItem>
                    <SelectItem value="11th Grade">11th Grade</SelectItem>
                    <SelectItem value="12th Grade">12th Grade</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleSaveProfile} className="btn-secondary">
                Save Changes
              </Button>
            </div>
          </Card>

          {/* Notification Settings */}
          <Card className="p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="study-reminders">Study Reminders</Label>
                  <p className="text-sm text-muted-foreground">Get notified about scheduled study sessions</p>
                </div>
                <Switch
                  id="study-reminders"
                  checked={notifications.studyReminders}
                  onCheckedChange={(checked) => 
                    setNotifications({ ...notifications, studyReminders: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="deadline-alerts">Deadline Alerts</Label>
                  <p className="text-sm text-muted-foreground">Reminders for upcoming deadlines</p>
                </div>
                <Switch
                  id="deadline-alerts"
                  checked={notifications.deadlineAlerts}
                  onCheckedChange={(checked) => 
                    setNotifications({ ...notifications, deadlineAlerts: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="progress-updates">Progress Updates</Label>
                  <p className="text-sm text-muted-foreground">Daily progress summaries</p>
                </div>
                <Switch
                  id="progress-updates"
                  checked={notifications.progressUpdates}
                  onCheckedChange={(checked) => 
                    setNotifications({ ...notifications, progressUpdates: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weekly-reports">Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">Summary of your week's activities</p>
                </div>
                <Switch
                  id="weekly-reports"
                  checked={notifications.weeklyReports}
                  onCheckedChange={(checked) => 
                    setNotifications({ ...notifications, weeklyReports: checked })
                  }
                />
              </div>
            </div>
          </Card>

          {/* Study Preferences */}
          <Card className="p-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-xl font-semibold mb-4">Study Preferences</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="study-goal">Daily Study Goal</Label>
                <Select defaultValue="2hours">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1hour">1 hour</SelectItem>
                    <SelectItem value="2hours">2 hours</SelectItem>
                    <SelectItem value="3hours">3 hours</SelectItem>
                    <SelectItem value="4hours">4+ hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="session-length">Preferred Session Length</Label>
                <Select defaultValue="45min">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25min">25 minutes (Pomodoro)</SelectItem>
                    <SelectItem value="45min">45 minutes</SelectItem>
                    <SelectItem value="60min">60 minutes</SelectItem>
                    <SelectItem value="90min">90 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="difficulty">Default Difficulty Level</Label>
                <Select defaultValue="intermediate">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}