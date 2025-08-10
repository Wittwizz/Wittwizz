import React from 'react'
import { Button } from './ui/Button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './ui/Dialog'
import { ArrowRight, CheckCircle, Star } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">Wittwizz Digital</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">Services</a>
              <a href="#packages" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">Packages</a>
              <a href="#contact" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-blue-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              AI-Powered Brand & Growth Partner
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              For India's ambitious startups. Founder-friendly, efficient delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="ghost" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
                View Packages
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Services
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive solutions for modern startups
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'Branding', description: 'Strategic brand development and visual identity' },
                { title: 'Web & CRO', description: 'High-converting websites and optimization' },
                { title: 'Social & Content', description: 'Engaging content and social media presence' },
                { title: 'Growth & GTM', description: 'Go-to-market strategy and execution' }
              ].map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-card hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h4>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Scale Your Startup?
            </h3>
                               <p className="text-xl mb-8 text-blue-50">
                     Let's discuss how we can help you achieve your growth goals.
                   </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  Schedule a Call
                  <CheckCircle className="ml-2 h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogTitle>Schedule a Call</DialogTitle>
                <DialogDescription>
                  Book a 30-minute consultation to discuss your startup's needs and how we can help.
                </DialogDescription>
                <div className="mt-4">
                  <Button className="w-full">
                    Book Now
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h4 className="text-2xl font-bold mb-4">Wittwizz Digital</h4>
            <p className="text-gray-400 mb-6">
              AI-powered brand, web, and growth partner for India's startups.
            </p>
                             <div className="text-sm text-gray-400">
                   © 2025 Wittwizz Digital. All rights reserved.
                 </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
