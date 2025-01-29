import { Plan } from "@prisma/client";
import { prisma } from "@db";
import { NextResponse } from "next/server"

export const MIN_DAYS = 80;

export const MIN_HOURS = 80;

export function endDateValidator(date: Date) {
    const now: Date = new Date();
    const newDate: Date = new Date(now);
    newDate.setDate(newDate.getDate() + MIN_DAYS);
    const date1: Date = new Date(date);
    if (date1 < newDate) throw new Error(`Minimum end date is ${newDate} or min amount of days is ${MIN_DAYS}`);
}

export function hoursValidator(hours: number) {
    if (hours < MIN_HOURS) throw new Error(`Minimum amount of hours equals ${MIN_HOURS}`);
}

export async function GET() {
    try {
        const plans = await prisma.plan.findMany();
        return NextResponse.json(plans, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ error: `Prisma error: ${error.message}` }, { status: 503 });
    }
};


export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body.userID) throw new Error("Require userID");

        hoursValidator(body.hours);
        endDateValidator(body.endDate);

        const plan: Plan = body;

        const newPlan = await prisma.plan.create({ data: plan });

        return NextResponse.json(newPlan, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ error: `Plan error: ${error.message}` }, { status: 503 });
    }
};