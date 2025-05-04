import { type NextRequest, NextResponse } from "next/server"
import { getStudentById, getCourseById, enrollStudent, unenrollStudent } from "@/lib/db"

export async function POST(request: NextRequest, { params }: { params: { id: string; cid: string } }) {
  const student = getStudentById(params.id)
  const course = getCourseById(params.cid)

  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 })
  }

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 })
  }

  const enrollment = enrollStudent(params.id, params.cid)
  return NextResponse.json({ message: "Student enrolled successfully", enrollment }, { status: 201 })
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string; cid: string } }) {
  const student = getStudentById(params.id)
  const course = getCourseById(params.cid)

  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 })
  }

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 })
  }

  const success = unenrollStudent(params.id, params.cid)

  if (!success) {
    return NextResponse.json({ error: "Student is not enrolled in this course" }, { status: 404 })
  }

  return new NextResponse(null, { status: 204 })
}
