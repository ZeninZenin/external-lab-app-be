import { Lecture } from 'src/lectures/lectures.schema';

export type CreateLectureDto = Lecture;

export type UpdateLectureDto = Partial<Lecture>;
