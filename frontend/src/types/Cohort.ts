import { Instructor } from "./Instructor";
import { Student } from "./Student";

export interface Cohort {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  location: string;
  course: string;
  instructors: Instructor[];
  students: Student[];
}
