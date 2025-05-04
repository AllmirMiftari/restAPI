import { type NextRequest, NextResponse } from "next/server"
import { getAllCourses, createCourse } from "@/lib/db"

export async function GET() {
  const courses = getAllCourses()
  return NextResponse.json(courses)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.description || !body.instructor) {
      return NextResponse.json({ error: "Title, description, and instructor are required" }, { status: 400 })
    }

    const newCourse = createCourse({
      title: body.title,
      description: body.description,
      instructor: body.instructor,
    })

    return NextResponse.json(newCourse, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
