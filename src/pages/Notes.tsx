import { useState } from 'react';
import { FileText, Plus, Search, Filter, Save, Bold, Italic, List } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Note {
  id: string;
  title: string;
  content: string;
  subject: string;
  tags: string[];
  lastEdited: string;
  created: string;
}

const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Shakespeare Analysis Notes',
    content: 'Key themes in Hamlet include revenge, madness, and mortality...',
    subject: 'English Literature',
    tags: ['Shakespeare', 'Drama', 'Analysis'],
    lastEdited: '2 hours ago',
    created: '2024-01-15',
  },
  {
    id: '2',
    title: 'Calculus Integration Formulas',
    content: 'Important integration techniques and formulas...',
    subject: 'Mathematics',
    tags: ['Calculus', 'Integration', 'Formulas'],
    lastEdited: 'Yesterday',
    created: '2024-01-14',
  },
  {
    id: '3',
    title: 'Photosynthesis Process',
    content: 'Light-dependent and light-independent reactions...',
    subject: 'Biology',
    tags: ['Photosynthesis', 'Plants', 'Energy'],
    lastEdited: '3 days ago',
    created: '2024-01-12',
  },
];

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleNoteSelect = (note: Note) => {
    if (isEditing) {
      // Save current note first
      handleSave();
    }
    setSelectedNote(note);
    setEditTitle(note.title);
    setEditContent(note.content);
    setIsEditing(false);
  };

  const handleNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      subject: 'General',
      tags: [],
      lastEdited: 'Just now',
      created: new Date().toISOString().split('T')[0],
    };
    
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setEditTitle(newNote.title);
    setEditContent(newNote.content);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!selectedNote) return;

    const updatedNote = {
      ...selectedNote,
      title: editTitle,
      content: editContent,
      lastEdited: 'Just now',
    };

    setNotes(notes.map(note => 
      note.id === selectedNote.id ? updatedNote : note
    ));
    setSelectedNote(updatedNote);
    setIsEditing(false);

    toast({
      title: "Note Saved",
      description: "Your note has been saved successfully.",
    });
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Notes Sidebar */}
      <div className="w-80 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Notes</h1>
          <Button onClick={handleNewNote} size="sm" className="btn-hero">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {filteredNotes.map((note) => (
            <Card
              key={note.id}
              className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                selectedNote?.id === note.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleNoteSelect(note)}
            >
              <h3 className="font-medium text-sm mb-2 line-clamp-1">{note.title}</h3>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {note.content || 'No content'}
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  {note.subject}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {note.lastEdited}
                </span>
              </div>
              {note.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {note.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {note.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{note.tags.length - 2}
                    </Badge>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col">
        {selectedNote ? (
          <>
            {/* Editor Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-4">
                {isEditing ? (
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="text-xl font-semibold border-none shadow-none p-0 h-auto"
                  />
                ) : (
                  <h2 className="text-xl font-semibold">{selectedNote.title}</h2>
                )}
              </div>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave} size="sm" className="btn-secondary">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button 
                      onClick={() => setIsEditing(false)} 
                      variant="outline" 
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)} size="sm" className="btn-outline">
                    Edit
                  </Button>
                )}
              </div>
            </div>

            {/* Toolbar */}
            {isEditing && (
              <div className="flex items-center gap-2 p-4 border-b bg-muted/30">
                <Button variant="ghost" size="sm">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <List className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 p-4">
              {isEditing ? (
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="Start writing your note..."
                  className="w-full h-full resize-none border-none shadow-none p-0 text-base leading-relaxed"
                />
              ) : (
                <div className="w-full h-full">
                  {selectedNote.content ? (
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap text-base leading-relaxed font-sans">
                        {selectedNote.content}
                      </pre>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground mt-8">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>This note is empty. Click Edit to add content.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-medium mb-2">Select a note to view</h3>
              <p>Choose a note from the sidebar or create a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}