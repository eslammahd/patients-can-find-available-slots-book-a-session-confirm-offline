import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dr. Saad El Mahdy — Online Therapy',
  description: 'Book an online therapy session with Dr. Saad El Mahdy, MD.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-sage-100 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-sage-600 flex items-center justify-center text-white font-bold text-sm">
                S
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm leading-tight">Dr. Saad El Mahdy</p>
                <p className="text-xs text-sage-600">MD · Therapist</p>
              </div>
            </div>
            <a href="/book" className="btn-primary text-sm py-2 px-4">
              Book a Session
            </a>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-white border-t border-sage-100 mt-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 text-center">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Dr. Saad El Mahdy, MD. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
