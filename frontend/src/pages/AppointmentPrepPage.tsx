import { useState } from 'react';
import { Printer, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChecklistSection, type ChecklistItem } from '../components/ChecklistSection';
import { ProgressIndicator } from '../components/ProgressIndicator';

const checklistData: { title: string; icon: string; items: ChecklistItem[] }[] = [
  {
    title: 'Documents to Bring',
    icon: '📋',
    items: [
      { id: 'doc-1', label: 'Insurance card (front and back)', detail: 'Bring your most current insurance card. If you have multiple, bring all of them.' },
      { id: 'doc-2', label: 'Photo ID (driver\'s license or state ID)', detail: 'Required for identity verification at most healthcare facilities.' },
      { id: 'doc-3', label: 'List of current medications', detail: 'Include medication name, dosage, and how often you take it. Include vitamins and supplements.' },
      { id: 'doc-4', label: 'Referral paperwork (if required)', detail: 'Check with your insurance if a referral is needed before your specialist visit.' },
      { id: 'doc-5', label: 'Previous medical records or test results', detail: 'Especially relevant if seeing a new provider or specialist.' },
      { id: 'doc-6', label: 'Emergency contact information', detail: 'Name and phone number of someone to contact if needed.' },
    ],
  },
  {
    title: 'Questions to Ask Your Provider',
    icon: '❓',
    items: [
      { id: 'q-1', label: 'What is my diagnosis or what do you think is wrong?', detail: 'Ask them to explain in plain language, not medical jargon.' },
      { id: 'q-2', label: 'What are my treatment options?', detail: 'Ask about all options, including doing nothing, and the pros and cons of each.' },
      { id: 'q-3', label: 'What happens if I don\'t treat this?', detail: 'Understanding the risk of inaction helps you make an informed decision.' },
      { id: 'q-4', label: 'Are there any tests needed? Why?', detail: 'Ask what the test is for and what happens based on different results.' },
      { id: 'q-5', label: 'What are the expected costs?', detail: 'Ask about costs before agreeing to tests or procedures. You can ask for a cost estimate.' },
      { id: 'q-6', label: 'When should I follow up or call if things don\'t improve?', detail: 'Get specific guidance on what symptoms to watch for and when to seek further care.' },
    ],
  },
  {
    title: 'Personal Advocacy Tips',
    icon: '💪',
    items: [
      { id: 'adv-1', label: 'Write down your symptoms before the visit', detail: 'Note when they started, how severe they are, and what makes them better or worse.' },
      { id: 'adv-2', label: 'Bring a trusted person with you if possible', detail: 'A friend or family member can help you remember information and ask questions.' },
      { id: 'adv-3', label: 'Take notes during the appointment', detail: 'Write down the diagnosis, treatment plan, and any instructions given.' },
      { id: 'adv-4', label: 'Ask for written instructions or a visit summary', detail: 'Most providers can give you a printed or electronic summary of your visit.' },
      { id: 'adv-5', label: 'Don\'t leave until you understand the next steps', detail: 'It\'s okay to ask the provider to repeat or clarify anything you didn\'t understand.' },
    ],
  },
];

const allItems = checklistData.flatMap((section) => section.items);

export function AppointmentPrepPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checked).filter(Boolean).length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-3">
              <ClipboardList className="w-4 h-4" />
              Appointment Preparation
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Appointment Checklist
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Use this checklist to prepare for your doctor or hospital visit. Check off each item
                  as you complete it. You can print this page to take with you.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handlePrint}
                className="shrink-0 no-print font-semibold"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-10">
            <ProgressIndicator completed={completedCount} total={allItems.length} />
          </div>

          {/* Checklist Sections */}
          {checklistData.map((section) => (
            <ChecklistSection
              key={section.title}
              title={section.title}
              icon={section.icon}
              items={section.items}
              checked={checked}
              onToggle={toggle}
            />
          ))}

          {/* Tip */}
          <div className="bg-secondary rounded-xl p-5 border border-border mt-4">
            <p className="text-sm text-foreground/80">
              <span className="font-bold text-primary">💡 Remember: </span>
              You are your own best advocate. It's always okay to ask questions, request clarification,
              or ask for a second opinion. Healthcare providers want you to understand your care.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
