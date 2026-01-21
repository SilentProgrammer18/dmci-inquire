'use client'

import { useState } from 'react'

export default function InquirePage() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    contact: '',
    visitDate: '',
    location: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/sendInquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const result = await response.json()
      if (result.success) {
        alert('Inquiry submitted successfully! You will receive project details soon.')
        setFormData({
          name: '',
          age: '',
          email: '',
          contact: '',
          visitDate: '',
          location: '',
        })
      } else {
        alert('Failed to submit inquiry. Please try again.')
      }
    } catch (error) {
      console.error(error)
      alert('Error submitting form.')
    }
  }

  const locations = [
    'Caloocan', 'Las Piñas', 'Makati', 'Malabon', 'Mandaluyong', 'Manila',
    'Marikina', 'Muntinlupa', 'Navotas', 'Parañaque', 'Pasay', 'Pasig',
    'Quezon City', 'San Juan', 'Taguig', 'Valenzuela', 'Baguio', 'Batangas'
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-8 sm:py-12">
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 py-6 text-center px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">DMCI Homes Inquiry</h1>
          <p className="text-sm sm:text-base text-white mt-1">Submit your details to receive project info</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-4 sm:px-6 py-6 sm:py-8 flex flex-col">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Contact Number</label>
            <input type="tel" name="contact" value={formData.contact} placeholder="09XXXXXXXXX" onChange={handleChange} required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Preferred Location</label>
            <select name="location" value={formData.location} onChange={handleChange} required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select a location</option>
              {locations.map(loc => (<option key={loc} value={loc}>{loc}</option>))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Preferred Date for Showroom / Condo Viewing</label>
            <input type="date" name="visitDate" value={formData.visitDate} onChange={handleChange} required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <button type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200">
            Submit Inquiry
          </button>
        </form>

        {/* Disclaimer */}
        <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200 text-sm sm:text-base text-gray-700 space-y-2">
          <p>
            After submitting this form, you will receive the project details in your Email, including the sample computation, within 24 hours. On the second day, we will call you to confirm that you have received and reviewed the details, and to confirm your DMCI Homes showroom or condo viewing. Please save this number: <strong>0953‑365‑7327</strong> Bryan Javelosa.
          </p>
          <p>
            After submitting this form, you will receive the project details in your Email, including the sample computation, within 24 hours. On the second day, we will call you to confirm that you have received and reviewed the details, and to confirm your DMCI Homes showroom or condo viewing. Please save this number: <strong>0953‑365‑7327</strong> Bryan Javelosa.
          </p>
        </div>
      </div>
    </div>
  )
}

