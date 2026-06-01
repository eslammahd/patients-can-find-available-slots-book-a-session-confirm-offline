import Link from 'next/link';

export default function HomePage() {
  const specialties = [
    { icon: '🧠', label: 'Anxiety & Stress' },
    { icon: '💭', label: 'Depression' },
    { icon: '🤝', label: 'Relationship Issues' },
    { icon: '😴', label: 'Sleep Disorders' },
    { icon: '🌱', label: 'Personal Growth' },
    { icon: '💔', label: 'Grief & Loss' },
  ];

  const steps = [
    { num: '01', title: 'Browse Available Slots', desc: 'Pick a time that fits your schedule from Dr. Saad\'s live availability.' },
    { num: '02', title: 'Fill in Your Details', desc: 'Share your name, contact info, and a brief note about what you\'d like help with.' },
    { num: '03', title: 'Confirm Payment', desc: 'Pay via Instapay or Vodafone Cash and submit your reference number.' },
    { num: '04', title: 'Meet Online', desc: 'Receive a Zoom or Google Meet link once Dr. Saad reviews your booking.' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <section className="pt-12 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-sage-100 text-sage-700 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 bg-sage-500 rounded-full"></span>
          Now Accepting New Patients
        </div>
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sage-400 to-sage-700 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg">
          S
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Dr. Saad El Mahdy</h1>
        <p className="text-lg text-sage-700 font-medium mb-3">MD · Licensed Therapist</p>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
          Compassionate, evidence-based mental health care — delivered entirely online,
          so you can get support from wherever you feel most comfortable.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/book" className="btn-primary text-base">Book a Session →</Link>
          <a href="#how-it-works" className="btn-secondary text-base">How It Works</a>
        </div>
      </section>

      <div className="grid grid-cols-3 gap-4 mb-16 text-center">
        {[
          { num: '10+', label: 'Years Experience' },
          { num: '100%', label: 'Online Sessions' },
          { num: '24h', label: 'Booking Confirmed' },
        ].map((item) => (
          <div key={item.label} className="card py-4">
            <p className="text-2xl font-bold text-sage-700">{item.num}</p>
            <p className="text-xs text-gray-500 mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Areas of Focus</h2>
        <p className="text-gray-500 text-center mb-8">Dr. Saad provides support across a wide range of mental health concerns.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {specialties.map((s) => (
            <div key={s.label} className="card flex items-center gap-3 py-4">
              <span className="text-2xl">{s.icon}</span>
              <span className="text-sm font-medium text-gray-700">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">How It Works</h2>
        <p className="text-gray-500 text-center mb-8">Four simple steps, no phone calls needed.</p>
        <div className="grid sm:grid-cols-2 gap-6">
          {steps.map((step) => (
            <div key={step.num} className="card flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center text-sage-700 font-bold text-sm flex-shrink-0">
                {step.num}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <div className="bg-gradient-to-br from-sage-600 to-sage-800 rounded-3xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-3">Ready to take the first step?</h2>
          <p className="text-sage-200 mb-8 max-w-md mx-auto">
            Browse available times and book your first session today — it only takes a few minutes.
          </p>
          <Link href="/book" className="inline-block bg-white text-sage-800 font-semibold py-3 px-8 rounded-xl hover:bg-gray-50 transition-colors">
            See Available Slots →
          </Link>
        </div>
      </section>
    </div>
  );
}
