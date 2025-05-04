export interface Student {
  id: string
  name: string
  email: string
}

export interface Course {
  id: string
  title: string
  description: string
  instructor: string
}

export interface Enrollment {
  studentId: string
  courseId: string
}
