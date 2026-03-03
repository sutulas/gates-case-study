import { Heart, Calendar, Leaf, HelpCircle, Globe, XCircle, BookMarked } from 'lucide-react'

const capabilities = [
  { icon: Calendar, title: 'ANC visit schedule', desc: 'Information about the recommended 8 antenatal care contacts and what happens at each visit.' },
  { icon: Leaf, title: 'Nutrition and supplements', desc: 'Guidance on eating well during pregnancy, and information about recommended supplements like iron and folic acid.' },
  { icon: Heart, title: 'Common pregnancy experiences', desc: 'Understanding nausea, back pain, fatigue, heartburn, and other normal pregnancy symptoms.' },
  { icon: HelpCircle, title: 'Questions to ask your health worker', desc: 'Helping you prepare for your appointments with questions about your care.' },
  { icon: Globe, title: 'Why ANC matters', desc: 'Explaining the importance of regular antenatal care for you and your baby.' },
]

const limitations = [
  'Diagnose medical conditions or complications',
  'Prescribe or recommend specific medications or dosages',
  'Provide emergency medical assistance',
  'Give advice specific to your individual medical history',
]

export function AboutPage() {
  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: 'var(--color-app-bg)' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 40px' }}>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '14px',
              backgroundColor: 'var(--color-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Heart size={28} color="#FFFFFF" fill="#FFFFFF" />
            </div>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--color-text-primary)', margin: 0 }}>About Amara</h1>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '15px', margin: '4px 0 0' }}>Your antenatal care companion</p>
            </div>
          </div>
          <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)', lineHeight: '1.7', margin: 0 }}>
            Amara is a conversational assistant designed to support young mothers through their pregnancy journey. She provides evidence-based information grounded in WHO antenatal care guidelines, delivered with warmth and without judgment.
          </p>
        </div>

        {/* What Amara can help with */}
        <div style={{ marginBottom: '24px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '16px', marginTop: 0 }}>
            What Amara can help with
          </h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            {capabilities.map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ display: 'flex', gap: '12px', padding: '12px', backgroundColor: 'var(--color-primary-light)', borderRadius: '8px' }}>
                <Icon size={20} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: '500', color: 'var(--color-text-primary)', fontSize: '14px', marginBottom: '2px' }}>{title}</div>
                  <div style={{ color: 'var(--color-text-secondary)', fontSize: '13px', lineHeight: '1.5' }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What Amara cannot do */}
        <div style={{ marginBottom: '24px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '16px', marginTop: 0 }}>
            What Amara cannot do
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '12px', marginTop: 0 }}>
            Amara is not a doctor or nurse and cannot replace professional medical care.
          </p>
          <div style={{ display: 'grid', gap: '8px' }}>
            {limitations.map((item) => (
              <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '10px 12px', border: '1px solid #FECACA', borderRadius: '8px', backgroundColor: '#FEF2F2' }}>
                <XCircle size={16} style={{ color: '#DC2626', flexShrink: 0, marginTop: '1px' }} />
                <span style={{ fontSize: '14px', color: '#7F1D1D' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Grounded in WHO guidelines */}
        <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px', marginTop: 0 }}>
            <BookMarked size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
            Grounded in WHO guidelines
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
            Amara's responses are grounded in the WHO "Recommendations on Antenatal Care for a Positive Pregnancy Experience" — a comprehensive global guideline covering routine ANC for pregnant women and adolescent girls. This guideline emphasizes person-centred, rights-based, respectful care and recommends a minimum of 8 contacts during pregnancy.
          </p>
        </div>

      </div>
    </div>
  )
}
