import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const stage = searchParams.get('stage');

    const where: any = {};
    if (stage) where.stage = stage;

    const deals = await prisma.deal.findMany({
      where,
      include: { company: true, contact: true },
      orderBy: { closeDate: 'asc' },
    });

    return NextResponse.json(deals);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch deals' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const deal = await prisma.deal.create({
      data: body,
      include: { company: true, contact: true },
    });
    return NextResponse.json(deal, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create deal' },
      { status: 500 }
    );
  }
}

