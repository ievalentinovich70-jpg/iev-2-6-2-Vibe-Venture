import { NextResponse } from "next/server";
import { saveApplication } from "@/lib/db";
import { applicationSchema } from "@/lib/validation";

/**
 * POST /api/applications
 * Принимает JSON с полями формы, повторно валидирует через Zod
 * и сохраняет заявку в SQLite.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { errors: [{ path: "", message: "Некорректный JSON в теле запроса" }] },
      { status: 400 }
    );
  }

  const result = applicationSchema.safeParse(body);
  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
    return NextResponse.json({ errors }, { status: 400 });
  }

  const application = await saveApplication(result.data);
  return NextResponse.json({ application }, { status: 201 });
}