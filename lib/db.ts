import type { Student, Course, Enrollment } from "./types"
import { v4 as uuidv4 } from "uuid"

// In-memory database
let students: Student[] = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com" },
]

let courses: Course[] = [
  {
    id: "1",
    title: "Introduction to JavaScript",
    description: "Learn the basics of JavaScript",
    instructor: "Dr. Smith",
  },
  {
    id: "2",
    title: "Advanced React",
    description: "Deep dive into React hooks and patterns",
    instructor: "Prof. Johnson",
  },
  {
    id: "3",
    title: "Database Design",
    description: "Learn how to design efficient databases",
    instructor: "Dr. Williams",
  },
]

let enrollments: Enrollment[] = [
  { studentId: "1", courseId: "1" },
  { studentId: "1", courseId: "2" },
  { studentId: "2", courseId: "2" },
]

// Student operations
export const getAllStudents = () => students

export const getStudentById = (id: string) => students.find((student) => student.id === id)

export const createStudent = (student: Omit<Student, "id">) => {
  const newStudent = { ...student, id: uuidv4() }
  students.push(newStudent)
  return newStudent
}

export const updateStudent = (id: string, studentData: Partial<Omit<Student, "id">>) => {
  const index = students.findIndex((student) => student.id === id)
  if (index === -1) return null

  students[index] = { ...students[index], ...studentData }
  return students[index]
}

export const deleteStudent = (id: string) => {
  const index = students.findIndex((student) => student.id === id)
  if (index === -1) return false

  students = students.filter((student) => student.id !== id)
  // Also delete all enrollments for this student
  enrollments = enrollments.filter((enrollment) => enrollment.studentId !== id)
  return true
}

// Course operations
export const getAllCourses = () => courses

export const getCourseById = (id: string) => courses.find((course) => course.id === id)

export const createCourse = (course: Omit<Course, "id">) => {
  const newCourse = { ...course, id: uuidv4() }
  courses.push(newCourse)
  return newCourse
}

export const updateCourse = (id: string, courseData: Partial<Omit<Course, "id">>) => {
  const index = courses.findIndex((course) => course.id === id)
  if (index === -1) return null

  courses[index] = { ...courses[index], ...courseData }
  return courses[index]
}

export const deleteCourse = (id: string) => {
  const index = courses.findIndex((course) => course.id === id)
  if (index === -1) return false

  courses = courses.filter((course) => course.id !== id)
  // Also delete all enrollments for this course
  enrollments = enrollments.filter((enrollment) => enrollment.courseId !== id)
  return true
}

// Enrollment operations
export const enrollStudent = (studentId: string, courseId: string) => {
  // Check if student and course exist
  const student = getStudentById(studentId)
  const course = getCourseById(courseId)
  if (!student || !course) return null

  // Check if enrollment already exists
  const existingEnrollment = enrollments.find((e) => e.studentId === studentId && e.courseId === courseId)
  if (existingEnrollment) return existingEnrollment

  // Create new enrollment
  const newEnrollment = { studentId, courseId }
  enrollments.push(newEnrollment)
  return newEnrollment
}

export const unenrollStudent = (studentId: string, courseId: string) => {
  const index = enrollments.findIndex((e) => e.studentId === studentId && e.courseId === courseId)
  if (index === -1) return false

  enrollments = enrollments.filter((e) => !(e.studentId === studentId && e.courseId === courseId))
  return true
}

export const getStudentCourses = (studentId: string) => {
  const studentEnrollments = enrollments.filter((e) => e.studentId === studentId)
  return studentEnrollments.map((e) => getCourseById(e.courseId)).filter(Boolean)
}

export const getCourseStudents = (courseId: string) => {
  const courseEnrollments = enrollments.filter((e) => e.courseId === courseId)
  return courseEnrollments.map((e) => getStudentById(e.studentId)).filter(Boolean)
}
