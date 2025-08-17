import { useState, useEffect } from "react";
import { ArrowRight, BookOpen, Brain, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Welcome = () => {
  const navigate = useNavigate();
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description:
        "Get personalized summaries, quizzes, and tutoring assistance",
    },
    {
      icon: BookOpen,
      title: "Smart Notes System",
      description:
        "Organize and search through your study materials efficiently",
    },
    {
      icon: Target,
      title: "Progress Tracking",
      description: "Monitor your learning journey across all subjects",
    },
    {
      icon: Users,
      title: "Collaborative Study",
      description: "Connect with classmates and study together",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <div className="absolute inset-0 opacity-10">
          <img
            src={heroImage}
            alt="Educational background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative px-6 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Group-6 Display - Prominent and Centered */}
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full shadow-lg mb-6">
                <span className="text-4xl font-bold text-primary-foreground">
                  G6
                </span>
              </div>
              <h1 className="text-6xl font-bold text-foreground mb-4">
                Group-6
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
            </div>

            {/* Main Title and Description */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-foreground">
                Welcome to BrightRoot Academy
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A personalized study platform for students (Grades 9–12) with
                AI-powered tools for summaries, quizzes, and intelligent
                tutoring assistance.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button
                size="lg"
                className="text-lg px-8 py-4 min-w-[200px]"
                onClick={handleGetStarted}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 min-w-[200px]"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Powerful Features for Modern Learning
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to excel in your studies, powered by
              artificial intelligence
            </p>
          </div>

          {/* Animated Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`group transition-all duration-500 hover:shadow-lg hover:scale-105 ${
                  currentFeature === index
                    ? "ring-2 ring-primary/30 shadow-lg scale-105"
                    : ""
                }`}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Subjects Preview */}
      <div className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Master Every Subject
            </h3>
            <p className="text-muted-foreground text-lg">
              Comprehensive support for Grades 9–12 curriculum
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: "English", color: "bg-purple-600", icon: "📚" },
              { name: "Mathematics", color: "bg-blue-600", icon: "🔢" },
              { name: "Physics", color: "bg-cyan-600", icon: "⚡" },
              { name: "Chemistry", color: "bg-green-600", icon: "🧪" },
              { name: "Biology", color: "bg-lime-600", icon: "🌱" },
            ].map((subject) => (
              <Card
                key={subject.name}
                className="group hover:shadow-md transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-6 text-center space-y-3">
                  <div
                    className={`w-12 h-12 ${subject.color} rounded-full flex items-center justify-center mx-auto text-2xl`}
                  >
                    {subject.icon}
                  </div>
                  <h4 className="font-semibold text-foreground">
                    {subject.name}
                  </h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h3 className="text-3xl font-bold text-foreground">
            Ready to Transform Your Learning?
          </h3>
          <p className="text-muted-foreground text-lg">
            Join thousands of students who are already using BrightRoot Academy
            to achieve academic excellence.
          </p>
          <Button
            size="lg"
            className="text-lg px-12 py-4"
            onClick={handleGetStarted}
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
