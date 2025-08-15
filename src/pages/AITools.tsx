import { useState } from 'react';
import { Brain, FileText, Zap, BookOpen, MessageSquare, Upload } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface AITool {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  isActive: boolean;
}

const aiTools: AITool[] = [
  {
    id: 'summarizer',
    name: 'AI Summarizer',
    description: 'Get concise summaries of long texts and documents',
    icon: FileText,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    isActive: true,
  },
  {
    id: 'quiz-generator',
    name: 'Quiz Generator',
    description: 'Create custom quizzes from your study materials',
    icon: Zap,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
    isActive: true,
  },
  {
    id: 'flashcards',
    name: 'Flashcard Creator',
    description: 'Generate flashcards automatically from notes',
    icon: BookOpen,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    isActive: true,
  },
  {
    id: 'tutor-chat',
    name: 'AI Tutor Chat',
    description: 'Get personalized help and explanations',
    icon: MessageSquare,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    isActive: false,
  },
];

export default function AITools() {
  const [selectedTool, setSelectedTool] = useState<string>('summarizer');
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');
  const { toast } = useToast();

  const handleToolSelect = (toolId: string) => {
    const tool = aiTools.find(t => t.id === toolId);
    if (!tool?.isActive) {
      toast({
        title: "Coming Soon!",
        description: "This AI tool will be available in the next update.",
        variant: "default",
      });
      return;
    }
    setSelectedTool(toolId);
    setResult('');
  };

  const handleProcessText = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text to process.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      switch (selectedTool) {
        case 'summarizer':
          setResult(`📝 Summary:\n\nThis is a mock AI-generated summary of your input text. In the actual implementation, this would be processed by a language model to provide concise, accurate summaries.\n\nKey points:\n• Main concepts identified\n• Important details preserved\n• Length reduced by ~70%\n• Readability improved`);
          break;
        case 'quiz-generator':
          setResult(`🧠 Generated Quiz:\n\n1. What is the main topic discussed in the text?\n   a) Option A\n   b) Option B\n   c) Option C\n   d) Option D\n\n2. Which concept is most important?\n   a) Concept 1\n   b) Concept 2\n   c) Concept 3\n   d) Concept 4\n\n3. True or False: The text discusses advanced concepts.\n\nAnswers: 1-c, 2-a, 3-True`);
          break;
        case 'flashcards':
          setResult(`🗂️ Generated Flashcards:\n\nCard 1:\nFront: Key concept from your text\nBack: Detailed explanation and examples\n\nCard 2:\nFront: Important definition\nBack: Clear, memorable definition\n\nCard 3:\nFront: Critical relationship\nBack: How concepts connect together\n\n(5 more cards created...)`);
          break;
        default:
          setResult('Processing complete!');
      }
      setIsProcessing(false);
      toast({
        title: "Processing Complete!",
        description: "Your AI tool has finished processing your text.",
      });
    }, 2000);
  };

  const selectedToolData = aiTools.find(tool => tool.id === selectedTool);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-primary rounded-xl">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AI Study Tools</h1>
            <p className="text-muted-foreground">Enhance your learning with artificial intelligence</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tool Selection */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Available Tools</h2>
          {aiTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card
                key={tool.id}
                className={`p-4 cursor-pointer transition-all duration-200 hover:scale-105 ${
                  selectedTool === tool.id 
                    ? 'ring-2 ring-primary shadow-glow' 
                    : 'hover:shadow-lg'
                } ${!tool.isActive ? 'opacity-60' : ''}`}
                onClick={() => handleToolSelect(tool.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${tool.bgColor}`}>
                    <Icon className={`h-5 w-5 ${tool.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{tool.name}</h3>
                      {!tool.isActive && (
                        <Badge variant="secondary" className="text-xs">Soon</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Tool Interface */}
        <div className="lg:col-span-2 space-y-6">
          {selectedToolData && (
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-xl ${selectedToolData.bgColor}`}>
                  <selectedToolData.icon className={`h-6 w-6 ${selectedToolData.color}`} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{selectedToolData.name}</h2>
                  <p className="text-muted-foreground">{selectedToolData.description}</p>
                </div>
              </div>

              {/* Input Section */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {selectedTool === 'summarizer' && 'Text to Summarize'}
                    {selectedTool === 'quiz-generator' && 'Study Material for Quiz'}
                    {selectedTool === 'flashcards' && 'Content for Flashcards'}
                  </label>
                  <Textarea
                    placeholder={`Enter your text here...${selectedTool === 'summarizer' ? ' (Paste article, notes, or any text you want summarized)' : selectedTool === 'quiz-generator' ? ' (Paste study material to generate quiz questions)' : ' (Enter content to create flashcards from)'}`}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={8}
                    className="resize-none"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <Button 
                    onClick={handleProcessText}
                    disabled={isProcessing || !inputText.trim()}
                    className="btn-hero"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Brain className="h-4 w-4 mr-2" />
                        {selectedTool === 'summarizer' && 'Generate Summary'}
                        {selectedTool === 'quiz-generator' && 'Create Quiz'}
                        {selectedTool === 'flashcards' && 'Create Flashcards'}
                      </>
                    )}
                  </Button>

                  <Button variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Results Section */}
              {result && (
                <div className="space-y-4">
                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-3">Results</h3>
                    <Card className="p-4 bg-muted/30">
                      <pre className="whitespace-pre-wrap text-sm text-foreground font-mono">
                        {result}
                      </pre>
                    </Card>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Copy Results
                    </Button>
                    <Button variant="outline" size="sm">
                      Save to Notes
                    </Button>
                    <Button variant="outline" size="sm">
                      Export
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}