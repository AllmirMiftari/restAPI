import { type NextRequest, NextResponse } from "next/server"
import { getCourseById, updateCourse, deleteCourse } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const course = getCourseById(params.id)

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 })
  }

  return NextResponse.json(course)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const updatedCourse = updateCourse(params.id, body)

    if (!updatedCourse) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    return NextResponse.json(updatedCourse)
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const success = deleteCourse(params.id)

  if (!success) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 })
  }

  return new NextResponse(null, { status: 204 })
}
