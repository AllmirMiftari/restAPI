import { type NextRequest, NextResponse } from "next/server"
import { getAllStudents, createStudent } from "@/lib/db"

export async function GET() {
  const students = getAllStudents()
  return NextResponse.json(students)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    const newStudent = createStudent({
      name: body.name,
      email: body.email,
    })

    return NextResponse.json(newStudent, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
