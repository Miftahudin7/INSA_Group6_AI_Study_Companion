import uuid
from datetime import datetime
from typing import List, Optional
from sqlalchemy.orm import Session
from ..models.chatbot import ChatMessage, ChatSession
from ..schemas.chatbot import ChatRequest, ChatResponse, ChatMessageCreate

class ChatbotService:
    def __init__(self, db: Session):
        self.db = db

    def generate_response(self, request: ChatRequest) -> ChatResponse:
        """Generate AI response using OpenAI or similar service"""
        # TODO: Integrate with OpenAI API
        # For now, return a mock response
        session_id = request.session_id or str(uuid.uuid4())
        
        # Mock AI response based on the message
        message = request.message.lower()
        if "physics" in message:
            response = "Physics is a fundamental science that studies matter, energy, and their interactions. Key topics include mechanics, thermodynamics, electromagnetism, and quantum physics. What specific physics concept would you like to learn about?"
        elif "chemistry" in message:
            response = "Chemistry is the study of matter and its properties, changes, and interactions. It covers topics like atomic structure, chemical bonding, reactions, and organic chemistry. What chemistry topic interests you?"
        elif "mathematics" in message or "math" in message:
            response = "Mathematics is the study of numbers, quantities, shapes, and patterns. It includes algebra, geometry, calculus, and statistics. Which area of mathematics would you like to explore?"
        elif "biology" in message:
            response = "Biology is the study of living organisms and their interactions. It covers cell biology, genetics, ecology, and human anatomy. What biological topic would you like to discuss?"
        elif "exam" in message or "test" in message:
            response = "Exam preparation is crucial for success. I can help you with study strategies, practice questions, and subject-specific preparation. What subject are you preparing for?"
        elif "help" in message or "?" in message:
            response = "I'm here to help you with your studies! I can assist with:\n- Subject explanations\n- Exam preparation\n- Study strategies\n- Practice questions\n\nWhat would you like to learn about?"
        else:
            response = "I'm your AI study assistant! I can help you with various subjects like physics, chemistry, mathematics, biology, and more. I can also assist with exam preparation and study strategies. What would you like to learn about?"

        return ChatResponse(
            message=response,
            session_id=session_id
        )

    def send_message(self, request: ChatRequest) -> ChatResponse:
        """Process a chat message and return response"""
        # Generate AI response
        response = self.generate_response(request)
        
        # Save user message
        user_message = ChatMessage(
            session_id=response.session_id,
            role="user",
            content=request.message
        )
        self.db.add(user_message)
        
        # Save assistant message
        assistant_message = ChatMessage(
            session_id=response.session_id,
            role="assistant",
            content=response.message
        )
        self.db.add(assistant_message)
        
        # Create or update session
        session = self.db.query(ChatSession).filter(ChatSession.id == response.session_id).first()
        if not session:
            session = ChatSession(
                id=response.session_id,
                title=request.message[:50] + "..." if len(request.message) > 50 else request.message
            )
            self.db.add(session)
        
        self.db.commit()
        
        return response

    def get_chat_history(self, session_id: str) -> List[ChatMessage]:
        """Get chat history for a session"""
        return self.db.query(ChatMessage).filter(
            ChatMessage.session_id == session_id
        ).order_by(ChatMessage.created_at).all()

    def get_chat_sessions(self) -> List[ChatSession]:
        """Get all chat sessions"""
        return self.db.query(ChatSession).order_by(ChatSession.updated_at.desc()).all()

    def delete_chat_session(self, session_id: str) -> bool:
        """Delete a chat session and all its messages"""
        # Delete messages first
        self.db.query(ChatMessage).filter(ChatMessage.session_id == session_id).delete()
        
        # Delete session
        session = self.db.query(ChatSession).filter(ChatSession.id == session_id).first()
        if session:
            self.db.delete(session)
            self.db.commit()
            return True
        return False

    def submit_feedback(self, message_id: int, feedback: str, comment: Optional[str] = None) -> bool:
        """Submit feedback for a message"""
        # TODO: Implement feedback storage
        # For now, just return success
        return True 