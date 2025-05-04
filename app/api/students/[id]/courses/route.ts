import { type NextRequest, NextResponse } from "next/server"
import { getStudentById, getStudentCourses } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const student = getStudentById(params.id)

  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 })
  }

  const courses = getStudentCourses(params.id)
  return NextResponse.json(courses)
}
