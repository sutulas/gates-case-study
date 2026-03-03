export function SafetyPage() {
  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: 'var(--color-app-bg)' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 40px' }}>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--color-text-primary)', margin: '0 0 8px' }}>Safety Guide</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '15px', margin: 0 }}>
            Know the warning signs and when to seek care immediately
          </p>
        </div>

        {/* Emergency banner */}
        <div style={{ marginBottom: '24px', backgroundColor: '#FEF2F2', border: '2px solid #DC2626', borderRadius: '12px', padding: '20px 24px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '24px', flexShrink: 0 }}>🚨</span>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#DC2626', margin: '0 0 8px' }}>If you have an emergency</h2>
              <p style={{ color: '#7F1D1D', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
                If you are experiencing any of the symptoms listed below, <strong>do not wait</strong>. Go to your nearest health facility immediately, call your local emergency number, or contact your health worker right away.
              </p>
            </div>
          </div>
        </div>

        {/* Danger signs */}
        <div style={{ marginBottom: '24px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '16px', marginTop: 0 }}>
            Danger Signs — Seek Care Immediately
          </h2>
          <div style={{ display: 'grid', gap: '10px' }}>
            {[
              { sign: 'Heavy vaginal bleeding', detail: 'Any significant bleeding during pregnancy is a serious warning sign.' },
              { sign: 'Severe headache', detail: "Especially if it doesn't go away with rest or is accompanied by vision changes." },
              { sign: 'Vision changes', detail: 'Blurred vision, seeing spots or flashes of light, or sudden vision loss.' },
              { sign: 'Difficulty breathing', detail: 'Shortness of breath or chest pain that is severe or comes on suddenly.' },
              { sign: 'Chest pain', detail: 'Any new or severe chest pain or pressure should be evaluated immediately.' },
              { sign: 'Severe abdominal pain', detail: 'Intense pain in the belly that is constant or getting worse.' },
              { sign: 'Sudden swelling', detail: 'Rapid swelling of the face, hands, or feet — especially combined with headache.' },
              { sign: 'Fever', detail: 'A temperature above 38°C (100.4°F) — can indicate infection requiring treatment.' },
              { sign: 'Baby moving less or not moving', detail: 'Reduced fetal movements after 28 weeks should be evaluated promptly.' },
              { sign: 'Convulsions or seizures', detail: 'Any seizure during pregnancy is a medical emergency.' },
            ].map(({ sign, detail }) => (
              <div key={sign} style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #FECACA', backgroundColor: '#FEF2F2' }}>
                <div style={{ fontWeight: '600', color: '#DC2626', fontSize: '14px', marginBottom: '2px' }}>⚠ {sign}</div>
                <div style={{ color: '#7F1D1D', fontSize: '13px', lineHeight: '1.5' }}>{detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Normal vs concerning */}
        <div style={{ marginBottom: '24px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '16px', marginTop: 0 }}>
            Normal Pregnancy Symptoms
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '12px', marginTop: 0 }}>
            These experiences are common and usually not dangerous, though you should always mention them to your health worker:
          </p>
          <div style={{ display: 'grid', gap: '8px' }}>
            {[
              'Nausea and vomiting, especially in the first trimester',
              'Mild fatigue and tiredness',
              'Mild heartburn or indigestion',
              'Mild back pain and pelvic discomfort',
              'Frequent urination',
              "Mild swelling of feet and ankles, especially at day's end",
              'Breast tenderness',
              'Mild headaches',
            ].map((item) => (
              <div key={item} style={{ display: 'flex', gap: '10px', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'var(--color-primary-light)', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                <span style={{ color: 'var(--color-primary)', flexShrink: 0 }}>✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mental health */}
        <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px', marginTop: 0 }}>
            💙 Your Mental Wellbeing Matters Too
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: '1.7', marginBottom: '12px', marginTop: 0 }}>
            Pregnancy can bring many emotions — joy, fear, anxiety, and sadness. All of these are normal. If you are feeling persistently sad, hopeless, or overwhelmed, please speak with your health worker. Mental health support during pregnancy is an important part of your care.
          </p>
          <div style={{ padding: '12px 16px', borderRadius: '8px', backgroundColor: 'var(--color-primary-light)', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
            <strong style={{ color: 'var(--color-primary)' }}>Remember:</strong> You are not alone. Your health worker is there to support you — not to judge you.
          </div>
        </div>

      </div>
    </div>
  )
}
