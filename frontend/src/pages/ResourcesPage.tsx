import { Calendar, Leaf, HelpCircle, ChevronRight } from 'lucide-react'

const ancSchedule = [
  { week: '< 12 weeks', contact: 'Contact 1', desc: 'First visit: health history, weight, blood pressure, blood tests, urine test, first ultrasound if available.' },
  { week: '20 weeks', contact: 'Contact 2', desc: 'Fetal growth check, blood pressure, urine, nutritional advice.' },
  { week: '26 weeks', contact: 'Contact 3', desc: 'Blood pressure, urine, anemia screening, emotional wellbeing check.' },
  { week: '30 weeks', contact: 'Contact 4', desc: 'Blood pressure, urine, fetal presentation, birth planning discussion.' },
  { week: '34 weeks', contact: 'Contact 5', desc: 'Blood pressure, urine, fetal movements, review birth plan.' },
  { week: '36 weeks', contact: 'Contact 6', desc: 'Blood pressure, urine, fetal position, discuss signs of labour.' },
  { week: '38 weeks', contact: 'Contact 7', desc: 'Blood pressure, urine, fetal wellbeing, readiness for birth.' },
  { week: '40 weeks', contact: 'Contact 8', desc: 'Final check, post-dates discussion, newborn care planning.' },
]

const nutritionItems = [
  { item: 'Folic acid', desc: 'Critical in early pregnancy to prevent neural tube defects. Start before conception if possible.' },
  { item: 'Iron supplements', desc: 'Recommended daily to prevent anemia, especially important in the second and third trimesters.' },
  { item: 'Calcium', desc: "Important for your baby's bone development and maintaining your own bone health." },
  { item: 'Protein-rich foods', desc: "Beans, eggs, meat, fish, and dairy support your baby's growth and development." },
  { item: 'Fruits and vegetables', desc: 'Provide vitamins, minerals, and fiber. Aim for variety and different colors.' },
  { item: 'Water', desc: 'Stay well hydrated — at least 8-10 glasses per day to support your increased blood volume.' },
]

const questions = [
  'How is my baby growing?',
  'Are my blood pressure and weight normal?',
  'What supplements should I be taking?',
  'What should I eat more or less of?',
  'How will I know when labour has started?',
  'Where should I go to give birth?',
  'What are the warning signs I should watch for?',
  'How can my partner or family support me?',
]

export function ResourcesPage() {
  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: 'var(--color-app-bg)' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 40px' }}>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--color-text-primary)', margin: '0 0 8px' }}>ANC Resources</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '15px', margin: 0 }}>
            Evidence-based information to guide your pregnancy journey
          </p>
        </div>

        {/* 8-Visit Schedule */}
        <div style={{ marginBottom: '24px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '4px', marginTop: 0 }}>
            <Calendar size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
            The 8-Contact ANC Schedule
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', marginBottom: '20px', marginTop: '4px' }}>WHO recommends at least 8 antenatal care contacts</p>
          <div style={{ display: 'grid', gap: '10px' }}>
            {ancSchedule.map(({ week, contact, desc }) => (
              <div key={contact} style={{ display: 'flex', gap: '12px', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', alignItems: 'flex-start' }}>
                <div style={{
                  minWidth: '80px', textAlign: 'center', padding: '6px 8px',
                  backgroundColor: 'var(--color-primary-light)', borderRadius: '6px',
                  color: 'var(--color-primary)', fontSize: '12px', fontWeight: '600',
                }}>
                  <div>{week}</div>
                </div>
                <div>
                  <div style={{ fontWeight: '500', color: 'var(--color-text-primary)', fontSize: '14px', marginBottom: '2px' }}>{contact}</div>
                  <div style={{ color: 'var(--color-text-secondary)', fontSize: '13px', lineHeight: '1.5' }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nutrition */}
        <div style={{ marginBottom: '24px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '16px', marginTop: 0 }}>
            <Leaf size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
            Nutrition During Pregnancy
          </h2>
          <div style={{ display: 'grid', gap: '10px' }}>
            {nutritionItems.map(({ item, desc }) => (
              <div key={item} style={{ padding: '12px', borderRadius: '8px', backgroundColor: 'var(--color-primary-light)' }}>
                <div style={{ fontWeight: '500', color: 'var(--color-primary)', fontSize: '14px', marginBottom: '2px' }}>{item}</div>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '13px', lineHeight: '1.5' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Questions for your health worker */}
        <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '16px', marginTop: 0 }}>
            <HelpCircle size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
            Questions to Ask Your Health Worker
          </h2>
          <div style={{ display: 'grid', gap: '8px' }}>
            {questions.map((q) => (
              <div key={q} style={{ display: 'flex', gap: '10px', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '14px', color: 'var(--color-text-secondary)', alignItems: 'center' }}>
                <ChevronRight size={14} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <span>{q}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
