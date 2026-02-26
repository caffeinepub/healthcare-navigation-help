export interface JourneyStep {
  title: string;
  description: string;
  actionLabel?: string;
  actionLink?: string;
  tip?: string;
}

export interface Journey {
  id: string;
  title: string;
  description: string;
  icon: string;
  steps: JourneyStep[];
}

export const journeys: Journey[] = [
  {
    id: 'no-insurance',
    title: 'I Need Care But Have No Insurance',
    description: 'Step-by-step guidance to access healthcare even without insurance coverage.',
    icon: '🏥',
    steps: [
      {
        title: 'Assess Your Immediate Need',
        description:
          'First, determine how urgent your health need is. If you are experiencing a life-threatening emergency, call 911 or go to the nearest emergency room immediately — hospitals must treat you regardless of insurance status. For non-emergency needs, you have more options to explore.',
        tip: 'Emergency rooms cannot turn you away due to inability to pay. This is protected by federal law (EMTALA).',
      },
      {
        title: 'Find a Community Health Center',
        description:
          'Federally Qualified Health Centers (FQHCs) and community health centers provide care on a sliding-fee scale based on your income. Many charge as little as $20–$40 per visit. In Leominster and surrounding communities, there are several options available to you.',
        actionLabel: 'Find Local Resources',
        actionLink: '/resources',
        tip: 'Bring proof of income (pay stubs, tax return) to qualify for the lowest fees.',
      },
      {
        title: 'Apply for MassHealth or ConnectorCare',
        description:
          'Massachusetts offers MassHealth (Medicaid) for low-income residents and ConnectorCare for those who earn a bit more. You may qualify for free or very low-cost coverage. Applications can be submitted online, by phone, or in person at your local MassHealth Enrollment Center.',
        actionLabel: 'Learn About Financial Assistance',
        actionLink: '/financial-assistance',
        tip: 'You can apply for MassHealth at any time — there is no enrollment period restriction.',
      },
      {
        title: 'Ask About Hospital Financial Assistance',
        description:
          'Most hospitals in Massachusetts are required to offer charity care or financial assistance programs. If you receive a bill you cannot afford, contact the hospital\'s billing department and ask specifically about their "Financial Assistance Program" or "Charity Care." You may qualify for significant bill reduction or forgiveness.',
        actionLabel: 'Understand Medical Bills',
        actionLink: '/medical-bills',
      },
      {
        title: 'Explore Free Clinics and Prescription Help',
        description:
          'Free clinics, community health fairs, and prescription assistance programs can help cover gaps. Many pharmaceutical companies offer Patient Assistance Programs (PAPs) for medications. Ask your provider or pharmacist about these options.',
        tip: 'NeedyMeds.org and RxAssist.org are free resources to find prescription assistance programs.',
      },
      {
        title: 'Follow Up and Build a Care Relationship',
        description:
          'Once you have accessed care, try to establish a relationship with a primary care provider. Having a regular doctor helps you manage your health proactively, catch issues early, and navigate the system more easily over time.',
        actionLabel: 'Prepare for Your Appointment',
        actionLink: '/appointment-prep',
      },
    ],
  },
  {
    id: 'confusing-bill',
    title: 'I Received a Confusing Medical Bill',
    description: 'Navigate your medical bill step by step — understand charges, spot errors, and find help.',
    icon: '📄',
    steps: [
      {
        title: 'Don\'t Panic — You Have Time and Rights',
        description:
          'Receiving a large or confusing medical bill can be stressful, but you have rights and options. Most providers will work with you. Do not ignore the bill, but also know that you have time to review it carefully before paying.',
        tip: 'You have the right to request an itemized bill — a detailed list of every charge. This is your legal right.',
      },
      {
        title: 'Request an Itemized Bill',
        description:
          'Call the billing department and ask for an itemized statement. This lists every service, supply, and charge individually. Compare it to your Explanation of Benefits (EOB) from your insurance company if you have insurance. Look for duplicate charges, services you didn\'t receive, or incorrect dates.',
        actionLabel: 'Learn About Medical Bills',
        actionLink: '/medical-bills',
      },
      {
        title: 'Check for Common Billing Errors',
        description:
          'Billing errors are surprisingly common. Look for: duplicate charges for the same service, incorrect patient information, wrong diagnosis or procedure codes, charges for services you didn\'t receive, and unbundling (charging separately for services that should be billed together).',
        tip: 'Studies show that up to 80% of medical bills contain errors. Always review carefully.',
      },
      {
        title: 'Contact Your Insurance Company',
        description:
          'If you have insurance, call the member services number on your insurance card. Ask them to explain what was covered, what was denied, and why. If a claim was denied, you have the right to appeal. Ask for the denial reason in writing.',
        actionLabel: 'Understand Insurance Terms',
        actionLink: '/insurance-guide',
      },
      {
        title: 'Negotiate or Request a Payment Plan',
        description:
          'Most hospitals and providers will negotiate bills or set up payment plans. Call the billing department, explain your financial situation, and ask about: payment plans with no interest, prompt-pay discounts, financial hardship programs, and charity care eligibility.',
      },
      {
        title: 'Seek Additional Help if Needed',
        description:
          'If you are still struggling, contact your state\'s consumer protection office, a patient advocate, or a nonprofit credit counseling agency. In Massachusetts, the Health Safety Net program may also help cover costs for uninsured or underinsured residents.',
        actionLabel: 'Find Financial Assistance',
        actionLink: '/financial-assistance',
      },
    ],
  },
  {
    id: 'find-specialist',
    title: 'I Need to Find a Specialist',
    description: 'A guided path to finding the right specialist and making the most of your visit.',
    icon: '🔍',
    steps: [
      {
        title: 'Start With Your Primary Care Provider',
        description:
          'The best first step is to talk with your primary care provider (PCP). They can evaluate your condition, provide a referral if needed, and recommend specialists they trust. Many insurance plans require a referral from your PCP before seeing a specialist.',
        tip: 'If you don\'t have a PCP, a community health center can help you establish care.',
      },
      {
        title: 'Understand Your Insurance Coverage',
        description:
          'Before scheduling with a specialist, check your insurance plan. Key questions: Does your plan require a referral? Is the specialist in-network? What is your copay or coinsurance for specialist visits? What is your deductible status?',
        actionLabel: 'Learn Insurance Terms',
        actionLink: '/insurance-guide',
      },
      {
        title: 'Find In-Network Specialists',
        description:
          'Use your insurance company\'s online provider directory to find in-network specialists. Seeing an in-network provider significantly reduces your out-of-pocket costs. You can also ask your PCP for recommendations and verify those providers are in your network.',
      },
      {
        title: 'Schedule and Prepare for Your Appointment',
        description:
          'When scheduling, ask about wait times, what to bring, and whether you need to bring your referral. Prepare by writing down your symptoms, questions, and medical history. Bring your insurance card, a photo ID, and any relevant medical records or test results.',
        actionLabel: 'Use the Appointment Checklist',
        actionLink: '/appointment-prep',
      },
      {
        title: 'Advocate for Yourself During the Visit',
        description:
          'During your appointment, don\'t hesitate to ask questions. Ask the specialist to explain your diagnosis in plain language, what your treatment options are, what happens if you don\'t treat it, and what the expected costs will be. Take notes or bring someone with you.',
        tip: 'It\'s okay to ask for a second opinion. Good doctors welcome this.',
      },
      {
        title: 'Follow Up and Coordinate Care',
        description:
          'After your specialist visit, make sure your PCP receives the specialist\'s notes and recommendations. Keep track of any follow-up appointments, tests, or prescriptions. If you have questions about next steps, call the specialist\'s office — that\'s what they\'re there for.',
      },
    ],
  },
];
