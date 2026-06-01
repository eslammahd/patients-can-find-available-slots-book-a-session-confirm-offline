'use client';

import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

function PaymentContent() {
  const params = useSearchParams();
  const bookingId = params.get('booking_id') ?? '';
  const slotStart = params.get('slot_start') ?? '';
  const patientName = params.get('patient_name') ?? '';

  const [method, setMethod] = useState<'instapay' | 'vodafone_cash'>('instapay');
  const [reference, setReference] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const sessionDate = slotStart
    ? new Date(slotStart).toLocaleString('en-US', {
        weekday: 'long', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit',
      })
    : '';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!reference.trim()) { setError('Please enter your payment reference number.'); return; }
    setSubmitting(true);
    setError('');
    try {
      const supabase = createClient();
      const { error: payError } = await supabase.from('payments').insert({
        booking_id: bookingId,
        payment_method: method,
        reference_number: reference.trim(),
        status: 'pending',
      });
      if (payError) throw payError;
      window.location.href = `/confirmation?booking_id=${bookingId}&patient_name=${encodeURIComponent(patientName)}&slot_start=${encodeURIComponent(slotStart)}`;
    } catch {
      setError('Could not save your payment details. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <Link href="/book" className="text-sage-600 text-sm hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold text-gray-900 mt-3 mb-1">Complete Payment</h1>
      <p className="text-gray-500 mb-8">Pay offline, then enter your reference number below.</p>

      {(patientName || sessionDate) && (
        <div className="bg-sage-50 border border-sage-200 rounded-xl px-5 py-4 mb-8">
          <p className="text-xs font-semibold text-sage-600 uppercase tracking-wide mb-2">Your Booking</p>
          {patientName && <p className="font-semibold text-gray-900">{patientName}</p>}
          {sessionDate && <p className="text-sm text-gray-600 mt-0.5">{sessionDate}</p>}
          <p className="text-sm text-gray-600">Individual Therapy Session</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 mb-8">
        {(['instapay', 'vodafone_cash'] as const).map((val) => (
          <button
            key={val}
            onClick={() => setMethod(val)}
            className={`border-2 rounded-xl p-4 text-left transition-all ${
              method === val ? 'border-sage-600 bg-sage-50' : 'border-gray-200 bg-white hover:border-sage-300'
            }`}
          >
            <span className="text-2xl block mb-1">{val === 'instapay' ? '💳' : '📱'}</span>
            <span className="font-semibold text-gray-900 text-sm">{val === 'instapay' ? 'Instapay' : 'Vodafone Cash'}</span>
            {method === val && <span className="block text-xs text-sage-600 mt-0.5">Selected ✓</span>}
          </button>
        ))}
      </div>

      <div className="card mb-8">
        {method === 'instapay' ? (
          <>
            <h2 className="font-semibold text-gray-900 mb-4">💳 Instapay Instructions</h2>
            <ol className="space-y-3 text-sm text-gray-700">
              <li className="flex gap-3"><span className="w-6 h-6 bg-sage-100 text-sage-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>Open your banking app and go to Instapay.</li>
              <li className="flex gap-3"><span className="w-6 h-6 bg-sage-100 text-sage-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>Send payment to: <strong className="text-gray-900">saad.elmahdy@instapay</strong></li>
              <li className="flex gap-3"><span className="w-6 h-6 bg-sage-100 text-sage-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>Copy the transaction reference number and paste it below.</li>
            </ol>
          </>
        ) : (
          <>
            <h2 className="font-semibold text-gray-900 mb-4">📱 Vodafone Cash Instructions</h2>
            <ol className="space-y-3 text-sm text-gray-700">
              <li className="flex gap-3"><span className="w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>Open Vodafone Cash or dial <strong>*9*9#</strong></li>
              <li className="flex gap-3"><span className="w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>Transfer to: <strong className="text-gray-900">010XXXXXXXX</strong></li>
              <li className="flex gap-3"><span className="w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>Copy the SMS confirmation code and paste it below.</li>
            </ol>
          </>
        )}
      </div>

      <form onSubmit={handleSubmit} className="card space-y-5">
        <h2 className="font-semibold text-gray-900">Enter Payment Reference</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {method === 'instapay' ? 'Instapay Transaction ID *' : 'Vodafone Cash SMS Code *'}
          </label>
          <input
            className="input-field font-mono"
            placeholder={method === 'instapay' ? 'e.g. TXN123456789' : 'e.g. 123456'}
            required
            value={reference}
            onChange={e => setReference(e.target.value)}
          />
        </div>
        {error && <p className="text-red-600 text-sm bg-red-50 px-4 py-3 rounded-xl">{error}</p>}
        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? 'Submitting…' : 'Submit Booking →'}
        </button>
        <p className="text-xs text-gray-400 text-center">
          Your booking will be confirmed once Dr. Saad verifies the payment.
        </p>
      </form>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-400">Loading…</div>}>
      <PaymentContent />
    </Suspense>
  );
}
