const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Check if data already exists
  const existingCompanies = await prisma.company.count();
  if (existingCompanies > 0) {
    console.log('Database already seeded. Skipping.');
    return;
  }

  console.log('Seeding database...');

  // Create companies
  const companies = await Promise.all([
    prisma.company.create({
      data: {
        name: 'TechFlow Solutions',
        industry: 'Software',
        size: '50-100',
        location: 'London',
        revenue: 2500000,
      },
    }),
    prisma.company.create({
      data: {
        name: 'Digital Innovations Ltd',
        industry: 'Consulting',
        size: '100-500',
        location: 'Manchester',
        revenue: 5000000,
      },
    }),
    prisma.company.create({
      data: {
        name: 'CloudFirst Systems',
        industry: 'Cloud Services',
        size: '10-50',
        location: 'Bristol',
        revenue: 1200000,
      },
    }),
    prisma.company.create({
      data: {
        name: 'Enterprise Data Corp',
        industry: 'Data Analytics',
        size: '500+',
        location: 'London',
        revenue: 15000000,
      },
    }),
    prisma.company.create({
      data: {
        name: 'SecureNet Technologies',
        industry: 'Cybersecurity',
        size: '50-100',
        location: 'Edinburgh',
        revenue: 3200000,
      },
    }),
    prisma.company.create({
      data: {
        name: 'Mobile Ventures',
        industry: 'Mobile Apps',
        size: '20-50',
        location: 'London',
        revenue: 800000,
      },
    }),
    prisma.company.create({
      data: {
        name: 'AI Pioneers Inc',
        industry: 'Artificial Intelligence',
        size: '100-500',
        location: 'Cambridge',
        revenue: 8500000,
      },
    }),
    prisma.company.create({
      data: {
        name: 'FinTech Accelerators',
        industry: 'Financial Tech',
        size: '50-100',
        location: 'London',
        revenue: 4200000,
      },
    }),
    prisma.company.create({
      data: {
        name: 'GreenTech Solutions',
        industry: 'Sustainability',
        size: '30-50',
        location: 'Oxford',
        revenue: 1500000,
      },
    }),
    prisma.company.create({
      data: {
        name: 'MediaStream Digital',
        industry: 'Media & Entertainment',
        size: '100-500',
        location: 'London',
        revenue: 6800000,
      },
    }),
    prisma.company.create({
      data: {
        name: 'HealthTech Innovations',
        industry: 'Healthcare',
        size: '50-100',
        location: 'Birmingham',
        revenue: 2800000,
      },
    }),
    prisma.company.create({
      data: {
        name: 'E-Commerce Plus',
        industry: 'Retail',
        size: '200-500',
        location: 'Leeds',
        revenue: 9200000,
      },
    }),
  ]);

  // Create contacts
  const contacts = await Promise.all([
    prisma.contact.create({
      data: {
        firstName: 'James',
        lastName: 'Mitchell',
        email: 'james.mitchell@techflow.com',
        phone: '+44 20 7946 0958',
        status: 'active',
        owner: 'Sarah',
        companyId: companies[0].id,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: 'Emma',
        lastName: 'Thompson',
        email: 'emma.thompson@techflow.com',
        phone: '+44 20 7946 0959',
        status: 'active',
        owner: 'Sarah',
        companyId: companies[0].id,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: 'Michael',
        lastName: 'Chen',
        email: 'michael.chen@digitalinnovations.com',
        phone: '+44 161 496 0000',
        status: 'active',
        owner: 'John',
        companyId: companies[1].id,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: 'Sophie',
        lastName: 'Williams',
        email: 'sophie.williams@digitalinnovations.com',
        phone: '+44 161 496 0001',
        status: 'inactive',
        owner: 'John',
        companyId: companies[1].id,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: 'David',
        lastName: 'Brown',
        email: 'david.brown@cloudfirst.com',
        phone: '+44 117 929 0000',
        status: 'active',
        owner: 'Lisa',
        companyId: companies[2].id,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: 'Rachel',
        lastName: 'Green',
        email: 'rachel.green@enterprisedata.com',
        phone: '+44 20 7946 1000',
        status: 'active',
        owner: 'Sarah',
        companyId: companies[3].id,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: 'Oliver',
        lastName: 'Martinez',
        email: 'oliver.martinez@enterprisedata.com',
        phone: '+44 20 7946 1001',
        status: 'active',
        owner: 'Sarah',
        companyId: companies[3].id,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: 'Isabella',
        lastName: 'Anderson',
        email: 'isabella.anderson@securenet.com',
        phone: '+44 131 225 0000',
        status: 'active',
        owner: 'Mike',
        companyId: companies[4].id,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: 'Lucas',
        lastName: 'Taylor',
        email: 'lucas.taylor@mobileventures.com',
        phone: '+44 20 7946 2000',
        status: 'active',
        owner: 'Lisa',
        companyId: companies[5].id,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: 'Mia',
        lastName: 'Johnson',
        email: 'mia.johnson@aipioneers.com',
        phone: '+44 1223 000 000',
        status: 'active',
        owner: 'John',
        companyId: companies[6].id,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: 'Ethan',
        lastName: 'Davis',
        email: 'ethan.davis@aipioneers.com',
        phone: '+44 1223 000 001',
        status: 'active',
        owner: 'John',
        companyId: companies[6].id,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: 'Ava',
        lastName: 'Wilson',
        email: 'ava.wilson@fintech.com',
        phone: '+44 20 7946 3000',
        status: 'active',
        owner: 'Sarah',
        companyId: companies[7].id,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: 'Noah',
        lastName: 'Garcia',
        email: 'noah.garcia@fintech.com',
        phone: '+44 20 7946 3001',
        status: 'inactive',
        owner: 'Sarah',
        companyId: companies[7].id,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: 'Charlotte',
        lastName: 'Rodriguez',
        email: 'charlotte.rodriguez@greentech.com',
        phone: '+44 1865 000 000',
        status: 'active',
        owner: 'Lisa',
        companyId: companies[8].id,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: 'Liam',
        lastName: 'Lee',
        email: 'liam.lee@mediastream.com',
        phone: '+44 20 7946 4000',
        status: 'active',
        owner: 'Mike',
        companyId: companies[9].id,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: 'Amelia',
        lastName: 'White',
        email: 'amelia.white@mediastream.com',
        phone: '+44 20 7946 4001',
        status: 'active',
        owner: 'Mike',
        companyId: companies[9].id,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: 'Benjamin',
        lastName: 'Harris',
        email: 'benjamin.harris@healthtech.com',
        phone: '+44 121 200 0000',
        status: 'active',
        owner: 'John',
        companyId: companies[10].id,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: 'Harper',
        lastName: 'Clark',
        email: 'harper.clark@healthtech.com',
        phone: '+44 121 200 0001',
        status: 'active',
        owner: 'John',
        companyId: companies[10].id,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: 'Mason',
        lastName: 'Lewis',
        email: 'mason.lewis@ecommerceplus.com',
        phone: '+44 113 200 0000',
        status: 'active',
        owner: 'Lisa',
        companyId: companies[11].id,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: 'Evelyn',
        lastName: 'Walker',
        email: 'evelyn.walker@ecommerceplus.com',
        phone: '+44 113 200 0001',
        status: 'active',
        owner: 'Lisa',
        companyId: companies[11].id,
      },
    }),
  ]);

  // Create deals
  const deals = await Promise.all([
    prisma.deal.create({
      data: {
        title: 'Enterprise License - Year 1',
        value: 150000,
        stage: 'won',
        probability: 100,
        closeDate: new Date('2024-01-15'),
        companyId: companies[0].id,
        contactId: contacts[0].id,
      },
    }),
    prisma.deal.create({
      data: {
        title: 'Implementation Services',
        value: 45000,
        stage: 'won',
        probability: 100,
        closeDate: new Date('2024-02-20'),
        companyId: companies[0].id,
        contactId: contacts[1].id,
      },
    }),
    prisma.deal.create({
      data: {
        title: 'Consulting Engagement',
        value: 85000,
        stage: 'negotiation',
        probability: 75,
        closeDate: new Date('2024-08-30'),
        companyId: companies[1].id,
        contactId: contacts[2].id,
      },
    }),
    prisma.deal.create({
      data: {
        title: 'Cloud Migration Project',
        value: 120000,
        stage: 'proposal',
        probability: 60,
        closeDate: new Date('2024-09-15'),
        companyId: companies[2].id,
        contactId: contacts[4].id,
      },
    }),
    prisma.deal.create({
      data: {
        title: 'Data Platform License',
        value: 250000,
        stage: 'won',
        probability: 100,
        closeDate: new Date('2024-03-10'),
        companyId: companies[3].id,
        contactId: contacts[5].id,
      },
    }),
    prisma.deal.create({
      data: {
        title: 'Analytics Dashboard',
        value: 75000,
        stage: 'won',
        probability: 100,
        closeDate: new Date('2024-04-05'),
        companyId: companies[3].id,
        contactId: contacts[6].id,
      },
    }),
    prisma.deal.create({
      data: {
        title: 'Security Audit & Implementation',
        value: 95000,
        stage: 'negotiation',
        probability: 80,
        closeDate: new Date('2024-08-20'),
        companyId: companies[4].id,
        contactId: contacts[7].id,
      },
    }),
    prisma.deal.create({
      data: {
        title: 'Mobile App Development',
        value: 65000,
        stage: 'proposal',
        probability: 50,
        closeDate: new Date('2024-10-01'),
        companyId: companies[5].id,
        contactId: contacts[8].id,
      },
    }),
    prisma.deal.create({
      data: {
        title: 'AI Model Development',
        value: 180000,
        stage: 'negotiation',
        probability: 70,
        closeDate: new Date('2024-09-30'),
        companyId: companies[6].id,
        contactId: contacts[9].id,
      },
    }),
    prisma.deal.create({
      data: {
        title: 'AI Integration Services',
        value: 95000,
        stage: 'proposal',
        probability: 55,
        closeDate: new Date('2024-10-15'),
        companyId: companies[6].id,
        contactId: contacts[10].id,
      },
    }),
    prisma.deal.create({
      data: {
        title: 'Payment Gateway Integration',
        value: 55000,
        stage: 'won',
        probability: 100,
        closeDate: new Date('2024-05-12'),
        companyId: companies[7].id,
        contactId: contacts[11].id,
      },
    }),
    prisma.deal.create({
      data: {
        title: 'Trading Platform License',
        value: 200000,
        stage: 'negotiation',
        probability: 85,
        closeDate: new Date('2024-08-25'),
        companyId: companies[7].id,
        contactId: contacts[12].id,
      },
    }),
    prisma.deal.create({
      data: {
        title: 'Sustainability Consulting',
        value: 40000,
        stage: 'proposal',
        probability: 45,
        closeDate: new Date('2024-11-01'),
        companyId: companies[8].id,
        contactId: contacts[13].id,
      },
    }),
    prisma.deal.create({
      data: {
        title: 'Content Management System',
        value: 110000,
        stage: 'won',
        probability: 100,
        closeDate: new Date('2024-06-18'),
        companyId: companies[9].id,
        contactId: contacts[14].id,
      },
    }),
    prisma.deal.create({
      data: {
        title: 'Video Streaming Platform',
        value: 160000,
        stage: 'negotiation',
        probability: 72,
        closeDate: new Date('2024-09-10'),
        companyId: companies[9].id,
        contactId: contacts[15].id,
      },
    }),
    prisma.deal.create({
      data: {
        title: 'Healthcare IT System',
        value: 135000,
        stage: 'proposal',
        probability: 65,
        closeDate: new Date('2024-10-20'),
        companyId: companies[10].id,
        contactId: contacts[16].id,
      },
    }),
    prisma.deal.create({
      data: {
        title: 'Patient Portal Development',
        value: 78000,
        stage: 'won',
        probability: 100,
        closeDate: new Date('2024-07-08'),
        companyId: companies[10].id,
        contactId: contacts[17].id,
      },
    }),
    prisma.deal.create({
      data: {
        title: 'E-Commerce Platform Upgrade',
        value: 220000,
        stage: 'negotiation',
        probability: 78,
        closeDate: new Date('2024-08-15'),
        companyId: companies[11].id,
        contactId: contacts[18].id,
      },
    }),
    prisma.deal.create({
      data: {
        title: 'Inventory Management System',
        value: 95000,
        stage: 'proposal',
        probability: 60,
        closeDate: new Date('2024-10-30'),
        companyId: companies[11].id,
        contactId: contacts[19].id,
      },
    }),
    prisma.deal.create({
      data: {
        title: 'Logistics Optimization',
        value: 140000,
        stage: 'won',
        probability: 100,
        closeDate: new Date('2024-05-25'),
        companyId: companies[11].id,
        contactId: contacts[18].id,
      },
    }),
  ]);

  // Create activities
  await Promise.all([
    prisma.activity.create({
      data: {
        type: 'call',
        description: 'Initial discovery call',
        companyId: companies[0].id,
        contactId: contacts[0].id,
        dealId: deals[0].id,
      },
    }),
    prisma.activity.create({
      data: {
        type: 'email',
        description: 'Sent proposal document',
        companyId: companies[0].id,
        contactId: contacts[1].id,
        dealId: deals[1].id,
      },
    }),
    prisma.activity.create({
      data: {
        type: 'meeting',
        description: 'Contract negotiation meeting',
        companyId: companies[1].id,
        contactId: contacts[2].id,
        dealId: deals[2].id,
      },
    }),
    prisma.activity.create({
      data: {
        type: 'call',
        description: 'Follow-up on cloud migration timeline',
        companyId: companies[2].id,
        contactId: contacts[4].id,
        dealId: deals[3].id,
      },
    }),
    prisma.activity.create({
      data: {
        type: 'email',
        description: 'Sent invoice for data platform',
        companyId: companies[3].id,
        contactId: contacts[5].id,
        dealId: deals[4].id,
      },
    }),
    prisma.activity.create({
      data: {
        type: 'meeting',
        description: 'Dashboard customization workshop',
        companyId: companies[3].id,
        contactId: contacts[6].id,
        dealId: deals[5].id,
      },
    }),
    prisma.activity.create({
      data: {
        type: 'call',
        description: 'Security requirements discussion',
        companyId: companies[4].id,
        contactId: contacts[7].id,
        dealId: deals[6].id,
      },
    }),
    prisma.activity.create({
      data: {
        type: 'email',
        description: 'Sent mobile app requirements document',
        companyId: companies[5].id,
        contactId: contacts[8].id,
        dealId: deals[7].id,
      },
    }),
    prisma.activity.create({
      data: {
        type: 'meeting',
        description: 'AI model scope definition',
        companyId: companies[6].id,
        contactId: contacts[9].id,
        dealId: deals[8].id,
      },
    }),
    prisma.activity.create({
      data: {
        type: 'call',
        description: 'AI integration technical discussion',
        companyId: companies[6].id,
        contactId: contacts[10].id,
        dealId: deals[9].id,
      },
    }),
    prisma.activity.create({
      data: {
        type: 'email',
        description: 'Payment gateway integration complete',
        companyId: companies[7].id,
        contactId: contacts[11].id,
        dealId: deals[10].id,
      },
    }),
    prisma.activity.create({
      data: {
        type: 'meeting',
        description: 'Trading platform license negotiation',
        companyId: companies[7].id,
        contactId: contacts[12].id,
        dealId: deals[11].id,
      },
    }),
    prisma.activity.create({
      data: {
        type: 'call',
        description: 'Sustainability strategy consultation',
        companyId: companies[8].id,
        contactId: contacts[13].id,
        dealId: deals[12].id,
      },
    }),
    prisma.activity.create({
      data: {
        type: 'email',
        description: 'CMS deployment completed',
        companyId: companies[9].id,
        contactId: contacts[14].id,
        dealId: deals[13].id,
      },
    }),
    prisma.activity.create({
      data: {
        type: 'meeting',
        description: 'Video streaming platform architecture review',
        companyId: companies[9].id,
        contactId: contacts[15].id,
        dealId: deals[14].id,
      },
    }),
    prisma.activity.create({
      data: {
        type: 'call',
        description: 'Healthcare IT compliance discussion',
        companyId: companies[10].id,
        contactId: contacts[16].id,
        dealId: deals[15].id,
      },
    }),
    prisma.activity.create({
      data: {
        type: 'email',
        description: 'Patient portal launched',
        companyId: companies[10].id,
        contactId: contacts[17].id,
        dealId: deals[16].id,
      },
    }),
    prisma.activity.create({
      data: {
        type: 'meeting',
        description: 'E-commerce platform upgrade planning',
        companyId: companies[11].id,
        contactId: contacts[18].id,
        dealId: deals[17].id,
      },
    }),
    prisma.activity.create({
      data: {
        type: 'call',
        description: 'Inventory system requirements gathering',
        companyId: companies[11].id,
        contactId: contacts[19].id,
        dealId: deals[18].id,
      },
    }),
    prisma.activity.create({
      data: {
        type: 'email',
        description: 'Logistics optimization delivered',
        companyId: companies[11].id,
        contactId: contacts[18].id,
        dealId: deals[19].id,
      },
    }),
  ]);

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

