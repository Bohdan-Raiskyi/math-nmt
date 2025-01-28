import { Plan } from "@prisma/client";
import { prisma } from "../../../../lib/db";
import { NextResponse } from "next/server"
import { endDateValidator, hoursValidator } from "../route";

export async function GET(request: Request, contex: { params: { planID: string } }) {
  try {
    const { params } = await contex;
    const { planID } = await params;

    const plan = await prisma.plan.findUniqueOrThrow(
      {
        where: {
          id: planID,
        }
      }
    );
    return NextResponse.json(plan, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({ error: `PlanID error: ${error.message}` }, { status: 503 });
  }
};

export async function PUT(request: Request, contex: { params: { planID: string } }) {
  try {
    const { params } = await contex;
    const { planID } = await params;

    const body = await request.json();

    if (!body.hours) throw new Error("Require hours");
    if (!body.endDate) throw new Error("Require endDate");

    hoursValidator(body.hours);
    endDateValidator(body.endDate);

    const plan: Plan = body;

    const updatePlan = await prisma.plan.update({
      where: {
        id: planID
      },
      data: plan
    });
    return NextResponse.json(updatePlan, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({ error: `PlanID error: ${error.message}` }, { status: 503 });
  }
}

export async function PATCH(request: Request, contex: { params: { planID: string } }) {
  try {
    const { params } = await contex;
    const { planID } = await params;

    const body = await request.json();

    if (body.hours) hoursValidator(body.hours);
    if (body.endDate) endDateValidator(body.endDate);

    const plan: Plan = body;

    const updatePlan = await prisma.plan.update({
      where: {
        id: planID
      },
      data: plan
    });
    return NextResponse.json(updatePlan, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({ error: `PlanID error: ${error.message}` }, { status: 503 });
  }
}

export async function DELETE(request: Request, contex: { params: { planID: string } }) {
  try {
    const { params } = await contex;
    const { planID } = await params;

    const deletedPlan = await prisma.plan.delete({
      where: {
        id: planID
      }
    });
    return NextResponse.json(deletedPlan, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({ error: `PlanID error: ${error.message}` }, { status: 503 });
  }
}