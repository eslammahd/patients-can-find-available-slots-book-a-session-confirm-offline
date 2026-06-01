'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';

function ConfirmationContent() {
  const params = useSearchParams();
  const bookingId = params.get('booking_id') ?? '';
  const patientName = params.get('patient_name') ?? 'Patient';
  const slotStart = params.get('slot_start') ?? '';

  const sessionDate = slotStart
    ? new Date(slotStart).toLocaleString('en-US', {
        weekday: 'long', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit',
      })
    : '';

  const shortId = bookingId ? bookingId.slice(0, 8).toUpperCase() : '—';

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-10 text-center">
      <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Submitted!</h1>
      <p className="text-gray-500 mb-8">
        Thank you, {patientName}. Your booking is pending payment review.
      </p>

      <div className="card text-left mb-8 space-y-4">
        <h2 className="font-semibold text-gray-900">Booking Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Reference</span>
            <span className="font-mono font-semibold text-gray-900">{shortId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Patient</span>
            <span className="font-medium text-gray-900">{patientName}</span>
          </div>
          {sessionDate && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Session</span>
              <span className="font-medium text-gray-900 text-right max-w-xs">{sessionDate}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Status</span>
            <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-medium px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
              Pending Payment Review
            </span>
          </div>
        </div>
      </div>

      <div className="card text-left mb-8">
        <h2 className="font-semibold text-gray-900 mb-4">What Happens Next?</h2>
        <ol className="space-y-3">
          {[
            'Dr. Saad reviews your payment reference (usually within a few hours).',
            'Once confirmed, your booking status changes to Confirmed.',
            'You will receive a Zoom or Google Meet link by email before your session.',
          ].map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-gray-600">
              <span className="w-6 h-6 bg-sage-100 text-sage-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/" className="btn-secondary">Back to Home</Link>
        <Link href="/book" className="btn-primary">Book Another Session</Link>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-400">Loading…</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
