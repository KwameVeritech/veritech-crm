import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Get all deals for analytics
    const deals = await prisma.deal.findMany({
      include: { company: true },
    });

    // Calculate monthly won revenue
    const monthlyRevenue: Record<string, number> = {};
    deals
      .filter((d) => d.stage === 'won')
      .forEach((deal) => {
        const month = deal.closeDate.toISOString().slice(0, 7);
        monthlyRevenue[month] = (monthlyRevenue[month] || 0) + deal.value;
      });

    // Calculate deals by stage
    const dealsByStage: Record<string, number> = {};
    deals.forEach((deal) => {
      dealsByStage[deal.stage] =
        (dealsByStage[deal.stage] || 0) + 1;
    });

    // Calculate revenue by industry
    const revenueByIndustry: Record<string, number> = {};
    deals
      .filter((d) => d.stage === 'won')
      .forEach((deal) => {
        const industry = deal.company.industry;
        revenueByIndustry[industry] =
          (revenueByIndustry[industry] || 0) + deal.value;
      });

    // Get contacts by status
    const contacts = await prisma.contact.findMany();
    const contactsByStatus: Record<string, number> = {};
    contacts.forEach((contact) => {
      contactsByStatus[contact.status] =
        (contactsByStatus[contact.status] || 0) + 1;
    });

    // Get top open deals
    const topOpenDeals = deals
      .filter((d) => d.stage !== 'won' && d.stage !== 'lost')
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    return NextResponse.json({
      monthlyRevenue,
      dealsByStage,
      revenueByIndustry,
      contactsByStatus,
      topOpenDeals,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

