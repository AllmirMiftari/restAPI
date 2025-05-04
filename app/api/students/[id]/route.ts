import { type NextRequest, NextResponse } from "next/server"
import { getStudentById, updateStudent, deleteStudent } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const student = getStudentById(params.id)

  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 })
  }

  return NextResponse.json(student)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const updatedStudent = updateStudent(params.id, body)

    if (!updatedStudent) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 })
    }

    return NextResponse.json(updatedStudent)
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const success = deleteStudent(params.id)

  if (!success) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 })
  }

  return new NextResponse(null, { status: 204 })
}
