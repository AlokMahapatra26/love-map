'use client';

import { motion } from 'framer-motion';
import { FileText, ArrowRight, Brain, Activity, ClipboardCheck, Scale, Shield } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F9F9F7] text-stone-900 font-sans">
      {/* Clinical Header */}
      <header className="border-b border-rose-100 bg-white py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-rose-600 flex items-center justify-center text-white rounded-full">
            <Brain size={16} />
          </div>
          <span className="font-serif font-bold text-lg tracking-tight text-rose-900">LoveMap</span>
        </div>
      </header>

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="px-6 py-20 md:py-32 max-w-5xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-8 leading-tight text-rose-950"
        >
          Is Your Relationship <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">
            Built to Last?
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-stone-600 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Love isn't just a feeling, it's a skill. <span className="font-semibold text-rose-700">90% of breakups are preventable</span>, but most couples wait until it's too late. Discover your hidden compatibility patterns and future-proof your love story before life gets in the way.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col md:flex-row gap-4 justify-center items-center mb-16"
        >
          <Link href="/questionnaire" className="btn-clinical text-lg px-8 py-4 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all bg-rose-600 border-rose-600 text-white hover:bg-rose-700">
            Analyze My Relationship Now
            <ArrowRight className="w-5 h-5" />
          </Link>
          <div className="text-sm text-stone-500 font-medium">
            <span className="text-rose-500">●</span> Free for a limited time
          </div>
        </motion.div>
      </section>

      {/* Video Section */}
      <section className="px-6 pb-20 max-w-4xl mx-auto">
        <div className="report-card overflow-hidden p-0 border-rose-200 shadow-xl">
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/FAzsArI7QJo"
              title="Learn more about attachment theory"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <div className="p-8 text-center bg-white">
            <h3 className="text-2xl font-serif font-bold mb-2 text-rose-900">Learn more about attachment theory</h3>
            <p className="text-stone-600">Understand the science behind your connection and how it shapes your relationships.</p>
          </div>
        </div>
      </section>

      {/* Protocol Overview */}
      <section className="border-y border-stone-200 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-200">
          {[
            {
              step: '01',
              title: 'Take the Quiz',
              desc: 'Answer 20 questions about how you feel and react in relationships.',
              icon: ClipboardCheck
            },
            {
              step: '02',
              title: 'Get Analyzed',
              desc: 'We calculate your unique attachment style based on your answers.',
              icon: Scale
            },
            {
              step: '03',
              title: 'See Your Map',
              desc: 'Get a personalized guide to understanding yourself and your partner.',
              icon: FileText
            }
          ].map((item, i) => (
            <div key={i} className="p-8 md:p-12 hover:bg-stone-50 transition-colors">
              <div className="flex justify-between items-start mb-6">
                <span className="font-mono text-2xl font-bold text-stone-300">{item.step}</span>
                <item.icon className="w-6 h-6 text-stone-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-stone-900">{item.title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Clinical Basis */}
      <section className="px-6 py-24 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-bold mb-4">Methodology & Clinical Basis</h2>
          <div className="w-16 h-1 bg-stone-900 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="report-card">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Evidence-Based
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Our assessment is grounded in the pioneering work of John Bowlby and Mary Ainsworth, utilizing the dimensional model of attachment anxiety and avoidance.
            </p>
          </div>
          <div className="report-card">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Psychometric Validity
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Questions are adapted from the Experiences in Close Relationships-Revised (ECR-R) questionnaire, the gold standard in attachment research.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 text-xs font-mono">
          <div>
            <div className="text-white font-bold mb-4">LOVEMAP</div>
            <p className="max-w-xs">
              Automated diagnostic tool for relationship compatibility and attachment style analysis.
            </p>
          </div>
          <div className="md:text-right">
            <p className="mb-2">© 2026 LOVEMAP</p>
            <p className="text-stone-600">
              DISCLAIMER: This tool is for educational and informational purposes only. It does not constitute a medical diagnosis or replace professional therapy.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
