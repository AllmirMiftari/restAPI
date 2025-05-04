import { type NextRequest, NextResponse } from "next/server"
import { getCourseById, getCourseStudents } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const course = getCourseById(params.id)

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 })
  }

  const students = getCourseStudents(params.id)
  return NextResponse.json(students)
}
