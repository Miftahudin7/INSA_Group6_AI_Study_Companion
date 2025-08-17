from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from typing import List, Optional
from ..models.exams import Exam, ExamSolution
from ..schemas.exams import ExamCreate, ExamUpdate, ExamSearch, ExamSolutionCreate

class ExamsService:
    def __init__(self, db: Session):
        self.db = db

    def get_exams(self, skip: int = 0, limit: int = 100, search: Optional[ExamSearch] = None) -> List[Exam]:
        query = self.db.query(Exam)
        
        if search:
            if search.subject:
                query = query.filter(Exam.subject.ilike(f"%{search.subject}%"))
            if search.exam_year:
                query = query.filter(Exam.exam_year == search.exam_year)
            if search.exam_type:
                query = query.filter(Exam.exam_type.ilike(f"%{search.exam_type}%"))
            if search.search:
                search_term = f"%{search.search}%"
                query = query.filter(
                    or_(
                        Exam.title.ilike(search_term),
                        Exam.subject.ilike(search_term),
                        Exam.description.ilike(search_term)
                    )
                )
        
        return query.offset(skip).limit(limit).all()

    def get_exam(self, exam_id: int) -> Optional[Exam]:
        return self.db.query(Exam).filter(Exam.id == exam_id).first()

    def create_exam(self, exam: ExamCreate) -> Exam:
        db_exam = Exam(**exam.dict())
        self.db.add(db_exam)
        self.db.commit()
        self.db.refresh(db_exam)
        return db_exam

    def update_exam(self, exam_id: int, exam: ExamUpdate) -> Optional[Exam]:
        db_exam = self.get_exam(exam_id)
        if db_exam:
            update_data = exam.dict(exclude_unset=True)
            for field, value in update_data.items():
                setattr(db_exam, field, value)
            self.db.commit()
            self.db.refresh(db_exam)
        return db_exam

    def delete_exam(self, exam_id: int) -> bool:
        db_exam = self.get_exam(exam_id)
        if db_exam:
            self.db.delete(db_exam)
            self.db.commit()
            return True
        return False

    def search_exams(self, search: ExamSearch) -> List[Exam]:
        return self.get_exams(search=search)

    def get_exam_solutions(self, exam_id: int) -> List[ExamSolution]:
        return self.db.query(ExamSolution).filter(ExamSolution.exam_id == exam_id).order_by(ExamSolution.question_number).all()

    def create_exam_solution(self, exam_id: int, solution: ExamSolutionCreate) -> ExamSolution:
        db_solution = ExamSolution(**solution.dict(), exam_id=exam_id)
        self.db.add(db_solution)
        self.db.commit()
        self.db.refresh(db_solution)
        return db_solution

    def get_statistics(self) -> dict:
        total_exams = self.db.query(Exam).count()
        subjects = self.db.query(Exam.subject).distinct().count()
        exam_types = self.db.query(Exam.exam_type).distinct().count()
        exam_years = self.db.query(Exam.exam_year).distinct().count()
        
        return {
            "total_exams": total_exams,
            "unique_subjects": subjects,
            "unique_exam_types": exam_types,
            "unique_exam_years": exam_years
        } 