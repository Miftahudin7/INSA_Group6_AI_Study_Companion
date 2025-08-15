import { useState, useCallback } from 'react';
import { Upload as UploadIcon, FileText, File, X, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  status: 'uploading' | 'completed' | 'failed';
  progress: number;
}

export default function Upload() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const validTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    files.forEach((file) => {
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Unsupported File Type",
          description: `${file.name} is not a supported file type. Please upload PDF, TXT, or DOC files.`,
          variant: "destructive",
        });
        return;
      }

      const newFile: UploadedFile = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
        status: 'uploading',
        progress: 0,
      };

      setUploadedFiles(prev => [...prev, newFile]);

      // Simulate upload progress
      simulateUpload(newFile.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setUploadedFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          const newProgress = Math.min(file.progress + Math.random() * 30, 100);
          if (newProgress >= 100) {
            clearInterval(interval);
            toast({
              title: "Upload Complete",
              description: `${file.name} has been uploaded successfully.`,
            });
            return { ...file, progress: 100, status: 'completed' as const };
          }
          return { ...file, progress: newProgress };
        }
        return file;
      }));
    }, 500);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('text')) return '📝';
    if (type.includes('word')) return '📃';
    return '📄';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-primary rounded-xl">
            <UploadIcon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Upload Study Materials</h1>
            <p className="text-muted-foreground">Add documents to your study library</p>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <Card className="animate-slide-up">
        <div
          className={`p-8 border-2 border-dashed rounded-xl transition-all duration-300 ${
            dragActive 
              ? 'border-primary bg-primary/5 scale-105' 
              : 'border-muted-foreground/30 hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <UploadIcon className={`mx-auto h-16 w-16 mb-4 transition-colors ${
              dragActive ? 'text-primary' : 'text-muted-foreground'
            }`} />
            <h3 className="text-xl font-semibold mb-2">
              {dragActive ? 'Drop files here' : 'Upload your study materials'}
            </h3>
            <p className="text-muted-foreground mb-6">
              Drag and drop files here, or click to browse
            </p>
            
            <div className="space-y-4">
              <input
                type="file"
                multiple
                accept=".pdf,.txt,.doc,.docx"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button className="btn-hero cursor-pointer">
                  <UploadIcon className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
              </label>
              
              <div className="text-sm text-muted-foreground">
                <p>Supported formats: PDF, TXT, DOC, DOCX</p>
                <p>Maximum file size: 50MB per file</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-xl font-semibold mb-4">Uploaded Files</h2>
          <div className="space-y-3">
            {uploadedFiles.map((file) => (
              <Card key={file.id} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">
                    {getFileIcon(file.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium truncate">{file.name}</h3>
                      <Badge 
                        variant={file.status === 'completed' ? 'default' : 'secondary'}
                        className={
                          file.status === 'completed' 
                            ? 'bg-secondary text-secondary-foreground' 
                            : ''
                        }
                      >
                        {file.status === 'completed' && <Check className="h-3 w-3 mr-1" />}
                        {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{formatFileSize(file.size)}</span>
                      <span>{new Date(file.uploadedAt).toLocaleDateString()}</span>
                    </div>
                    
                    {file.status === 'uploading' && (
                      <div className="mt-2">
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {Math.round(file.progress)}% uploaded
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(file.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Recent Uploads */}
      <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Processing Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">📚 What happens after upload?</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Documents are automatically processed</li>
                <li>• Text is extracted and indexed</li>
                <li>• AI tools can summarize and create quizzes</li>
                <li>• Content becomes searchable</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">🔒 Privacy & Security</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Files are encrypted during upload</li>
                <li>• Only you have access to your documents</li>
                <li>• Data is stored securely</li>
                <li>• You can delete files anytime</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}