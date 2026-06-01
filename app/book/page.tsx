'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

interface Slot {
  id: string;
  slot_start: string;
  slot_end: string;
  session_type: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export default function BookPage() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Slot | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('slots')
      .select('*')
      .eq('is_available', true)
      .gte('slot_start', new Date().toISOString())
      .order('slot_start', { ascending: true })
      .then(({ data, error: err }) => {
        if (!err && data) setSlots(data);
        setLoading(false);
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;
    setSubmitting(true);
    setError('');
    try {
      const supabase = createClient();
      const { data, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          slot_id: selected.id,
          patient_name: form.name,
          patient_email: form.email,
          patient_phone: form.phone,
          session_type: selected.session_type,
          notes: form.notes,
          status: 'pending_payment',
        })
        .select()
        .single();
      if (bookingError) throw bookingError;
      window.location.href = `/payment?booking_id=${data.id}&slot_start=${encodeURIComponent(selected.slot_start)}&patient_name=${encodeURIComponent(form.name)}`;
    } catch {
      setError('Something went wrong. Please try again.');
      setSubmitting(false);
    }
  }

  const grouped = slots.reduce<Record<string, Slot[]>>((acc, slot) => {
    const day = formatDate(slot.slot_start);
    if (!acc[day]) acc[day] = [];
    acc[day].push(slot);
    return acc;
  }, {});

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <Link href="/" className="text-sage-600 text-sm hover:underline">← Back to home</Link>
        <h1 className="text-3xl font-bold text-gray-900 mt-3 mb-1">Book a Session</h1>
        <p className="text-gray-500">Pick an available time slot, then fill in your details.</p>
      </div>

      <section className="mb-10">
        <h2 className="font-semibold text-gray-900 mb-4">Available Slots</h2>
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading slots…</div>
        ) : slots.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-500 mb-2">No available slots right now.</p>
            <p className="text-sm text-gray-400">Please check back soon.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(grouped).map(([day, daySlots]) => (
              <div key={day}>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{day}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {daySlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => setSelected(slot)}
                      className={`border-2 rounded-xl p-3 text-left transition-all duration-150 ${
                        selected?.id === slot.id
                          ? 'border-sage-600 bg-sage-50 shadow-sm'
                          : 'border-gray-200 bg-white hover:border-sage-300 hover:bg-sage-50'
                      }`}
                    >
                      <p className="font-semibold text-gray-900 text-sm">{formatTime(slot.slot_start)}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{slot.session_type}</p>
                      {selected?.id === slot.id && (
                        <span className="inline-block mt-1.5 text-xs bg-sage-600 text-white px-2 py-0.5 rounded-full">Selected ✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {selected && (
        <section>
          <div className="bg-sage-50 border border-sage-200 rounded-xl px-4 py-3 mb-6 flex items-center gap-3">
            <span className="text-sage-600 text-lg">📅</span>
            <div>
              <p className="text-sm font-semibold text-sage-800">{formatDate(selected.slot_start)}</p>
              <p className="text-xs text-sage-600">{formatTime(selected.slot_start)} — {formatTime(selected.slot_end)} · {selected.session_type}</p>
            </div>
            <button onClick={() => setSelected(null)} className="ml-auto text-xs text-gray-400 hover:text-gray-600">Change</button>
          </div>

          <form onSubmit={handleSubmit} className="card space-y-5">
            <h2 className="font-semibold text-gray-900 text-lg">Your Details</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
              <input className="input-field" placeholder="e.g. Sara Ahmed" required
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
              <input type="email" className="input-field" placeholder="sara@example.com" required
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
              <input type="tel" className="input-field" placeholder="+20 1XX XXX XXXX" required
                value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Brief note (optional)</label>
              <textarea className="input-field resize-none" rows={3}
                placeholder="What would you like to work on?"
                value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
            </div>
            {error && <p className="text-red-600 text-sm bg-red-50 px-4 py-3 rounded-xl">{error}</p>}
            <button type="submit" disabled={submitting} className="btn-primary w-full">
              {submitting ? 'Saving…' : 'Continue to Payment →'}
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
