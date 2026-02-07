'use client'

import { useState } from 'react'

type FormData = {
  name: string
  age: string
  email: string
  contact: string
  visitDate: string
  location: string
}

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error'

const INITIAL_FORM: FormData = {
  name: '',
  age: '',
  email: '',
  contact: '',
  visitDate: '',
  location: '',
}

const LOCATIONS = [
  'Caloocan', 'Las Piñas', 'Makati', 'Malabon', 'Mandaluyong', 'Manila',
  'Marikina', 'Muntinlupa', 'Navotas', 'Parañaque', 'Pasay', 'Pasig',
  'Quezon City', 'San Juan', 'Taguig', 'Valenzuela', 'Baguio', 'Batangas',
]

export default function InquirePage() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM)
  const [status, setStatus] = useState<SubmissionStatus>('idle')
  const [showModal, setShowModal] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const isSubmitting = status === 'loading'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Name validation
    if (!formData.name) newErrors.name = 'Full Name is required'
    else if (formData.name.length > 50) newErrors.name = 'Full Name must be 50 characters or less'

    // Age validation
    const age = Number(formData.age)
    if (!formData.age) newErrors.age = 'Age is required'
    else if (isNaN(age) || age < 18 || age > 60) newErrors.age = 'Age must be between 18 and 60'

    // Email validation
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email address'

    // Contact validation
    if (!formData.contact) newErrors.contact = 'Contact Number is required'
    else if (!/^\d{11}$/.test(formData.contact)) newErrors.contact = 'Contact Number must be 11 digits'

    // Location validation
    if (!formData.location) newErrors.location = 'Preferred Location is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return
    if (!validateForm()) return

    setStatus('loading')

    try {
      const response = await fetch('/api/sendInquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const result = await response.json()
      if (response.ok && result?.success) {
        setShowModal(true)
        setStatus('success')
        setFormData(INITIAL_FORM)
        setErrors({})
      } else throw new Error()
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/Images/mulberry1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative w-full max-w-2xl z-10">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden">

            {/* Header */}
            <div className="px-8 py-6 text-center border-b border-white/20 bg-gradient-to-r from-blue-900/40 to-blue-800/30">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">DMCI Homes Inquiry</h1>
              <p className="text-white/90 text-sm md:text-lg font-light">
                Project details • Sample computation • Free consultation • Project viewing
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 mx-auto mt-4 rounded-full" />
            </div>

            {/* Error Message */}
            {status === 'error' && (
              <div className="mx-8 mt-6 p-4 rounded-xl bg-red-500/15 border border-red-500/30">
                <p className="text-red-100 text-sm font-medium text-center">
                  Something went wrong. Please try again.
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <StaticInput label="Full Name *" name="name" value={formData.name} onChange={handleChange} error={errors.name} required />
                <StaticInput label="Age *" name="age" type="number" value={formData.age} onChange={handleChange} error={errors.age} required />
              </div>
              <StaticInput label="Email Address *" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} required />
              <StaticInput label="Contact Number *" name="contact" placeholder="09XXXXXXXXX" value={formData.contact} onChange={handleChange} error={errors.contact} required />

              <StaticSelect label="Preferred Location *" name="location" value={formData.location} onChange={handleChange} options={LOCATIONS} error={errors.location} required />
              <StaticInput label="Preferred Date to Visit Showroom / Model Unit (Optional)" name="visitDate" type="date" value={formData.visitDate} onChange={handleChange} />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Submit Inquiry'}
              </button>
            </form>

            {/* Footer */}
            <div className="px-8 py-4 bg-white/80 border-t border-white/20 text-sm text-gray-700 space-y-1">
              <p>📞 Direct Contact: <span className="text-blue-600 font-semibold">0953-365-7327</span> — Bryan Javelosa</p>
              <p>
                Project details and sample computation will be emailed within <strong>24 hours</strong>. A confirmation call will follow the next business day.
              </p>
            </div>
          </div>

          {/* Trust Badge */}
          <p className="mt-4 text-center text-white/70 text-sm">
            <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full">
              🔒 Your information is secure and confidential
            </span>
          </p>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />

          <div className="relative bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl text-center">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                <svg className="w-10 h-10 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Inquiry Sent Successfully!</h2>
            <p className="text-gray-700 mb-4">Thank you for your interest in <strong>DMCI Homes</strong>! 🏡</p>

            <div className="space-y-3 text-left">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <p className="text-gray-700 text-sm">
                  <strong>Project details & computation</strong> will be emailed to you within <span className="font-semibold text-blue-600">24 hours</span>.
                </p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                <p className="text-gray-700 text-sm">
                  A <strong>follow-up call</strong> will be made the next business day to schedule your preferred viewing.
                </p>
              </div>
            </div>

            <button
              onClick={() => { setShowModal(false); setStatus('idle') }}
              className="mt-6 w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg"
            >
              Got it, thank you! 👍
            </button>

            <p className="text-gray-500 text-xs mt-4">
              Need immediate assistance? Call <span className="text-blue-600 font-semibold">0953-365-7327</span>
            </p>
          </div>
        </div>
      )}
    </>
  )
}

/* Static Input (Label on Top) */
function StaticInput({ label, type = 'text', error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string, error?: string }) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-white font-medium">{label}</label>
      <input
        type={type}
        {...props}
        className={`w-full bg-white/90 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${error ? 'border border-red-500' : ''}`}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  )
}

/* Static Select (Label on Top) */
function StaticSelect({ label, options, error, ...props }: { label: string, options: string[], error?: string } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-white font-medium">{label}</label>
      <select
        {...props}
        className={`w-full bg-white/90 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${error ? 'border border-red-500' : ''}`}
      >
        <option value="" hidden></option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  )
}

