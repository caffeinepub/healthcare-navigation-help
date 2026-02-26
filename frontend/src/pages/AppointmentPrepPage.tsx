import { useState } from 'react';
import { ClipboardList, CheckCircle, Circle, FileText, MessageSquare, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

const initialChecklist: ChecklistItem[] = [
  { id: '1', text: 'Bring a valid photo ID', checked: false },
  { id: '2', text: 'Bring your insurance card (if you have one)', checked: false },
  { id: '3', text: 'Bring a list of all current medications and dosages', checked: false },
  { id: '4', text: 'Bring any relevant medical records or test results', checked: false },
  { id: '5', text: 'Write down your symptoms and when they started', checked: false },
  { id: '6', text: 'Prepare a list of questions to ask your doctor', checked: false },
  { id: '7', text: 'Know your family medical history if relevant', checked: false },
  { id: '8', text: 'Arrange transportation to and from the appointment', checked: false },
  { id: '9', text: 'Confirm the appointment time and location', checked: false },
  { id: '10', text: 'Bring a trusted person for support if needed', checked: false },
];

const questionsToAsk = [
  'What is my diagnosis, and what does it mean?',
  'What are my treatment options?',
  'What are the risks and benefits of each option?',
  'Are there any lifestyle changes I should make?',
  'What happens if I don\'t get treatment?',
  'Are there generic versions of any medications prescribed?',
  'When should I follow up, and what symptoms should prompt me to call sooner?',
  'Can you explain this in simpler terms?',
];

const advocacyTips = [
  {
    icon: MessageSquare,
    title: 'Speak Up',
    description:
      "Don't be afraid to ask questions or say you don't understand. It's your right to have clear explanations of your care.",
  },
  {
    icon: FileText,
    title: 'Request Records',
    description:
      'You have the right to access your medical records. Request copies after each visit to keep track of your health history.',
  },
  {
    icon: Shield,
    title: 'Know Your Rights',
    description:
      'You have the right to a second opinion, to refuse treatment, and to be treated with dignity and respect regardless of your background.',
  },
];

export default function AppointmentPrepPage() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist);

  const toggleItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const completedCount = checklist.filter((i) => i.checked).length;
  const progress = Math.round((completedCount / checklist.length) * 100);

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-3">
            <ClipboardList className="w-4 h-4" />
            Appointment Preparation
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Prepare for Your Appointment
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Be prepared and confident at your next healthcare appointment. Use this checklist to
            make the most of your visit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          {/* Checklist */}
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-primary" />
                  Pre-Appointment Checklist
                </CardTitle>
                <span className="text-sm text-muted-foreground">
                  {completedCount}/{checklist.length} done
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {checklist.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start gap-3 cursor-pointer"
                    onClick={() => toggleItem(item.id)}
                  >
                    {item.checked ? (
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    )}
                    <span
                      className={`text-sm ${
                        item.checked ? 'line-through text-muted-foreground' : 'text-foreground'
                      }`}
                    >
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
              {completedCount === checklist.length && (
                <div className="mt-4 p-3 bg-primary/10 rounded-lg text-center">
                  <p className="text-sm font-medium text-primary">
                    ✓ You're ready for your appointment!
                  </p>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  setChecklist((prev) => prev.map((i) => ({ ...i, checked: false })))
                }
              >
                Reset Checklist
              </Button>
            </CardContent>
          </Card>

          {/* Questions to Ask */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Questions to Ask Your Doctor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {questionsToAsk.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary font-bold mt-0.5">{idx + 1}.</span>
                    {q}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Advocacy Tips */}
        <section className="mt-8 max-w-5xl">
          <h2 className="text-xl font-bold mb-4 text-foreground">Patient Advocacy Tips</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {advocacyTips.map((tip) => {
              const Icon = tip.icon;
              return (
                <Card key={tip.title} className="border-border">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <CardTitle className="text-sm">{tip.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">{tip.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
