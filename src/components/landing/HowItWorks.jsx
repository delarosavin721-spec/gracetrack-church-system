import { motion } from 'framer-motion'

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Register Members",
      desc: "Add your church members to the system and generate personalized offering envelopes with unique barcodes.",
      icon: "👤"
    },
    {
      num: "02",
      title: "Scan & Enter",
      desc: "Ushers simply scan the envelope barcode using their phone camera and enter the amount given.",
      icon: "📱"
    },
    {
      num: "03",
      title: "Monitor Live",
      desc: "Admins view all transactions in real-time, track trends, and automate thank-you emails.",
      icon: "📊"
    }
  ]

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-gray-50 flex justify-center w-full">
      <div className="w-full max-w-6xl px-6 flex flex-col items-center">
        {/* Header */}
        <div className="text-center w-full max-w-2xl mb-16 flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-teal-600 font-outfit text-xs uppercase tracking-[0.2em] font-bold mb-3 bg-teal-50 px-4 py-1.5 rounded-full border border-teal-100"
          >
            Simple Process
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-3xl md:text-4xl lg:text-5xl text-gray-800 mb-5 leading-tight"
          >
            How It Works
          </motion.h2>
          <div className="w-16 h-1 bg-teal-500 mx-auto rounded-full" />
        </div>
        
        {/* Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="group relative"
            >
              {/* Glass Card */}
              <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center shadow-sm hover:shadow-xl hover:shadow-teal-500/8 transition-all duration-400 hover:border-teal-200 hover:-translate-y-2 relative overflow-hidden">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-teal-600" />
                
                {/* Step Circle with Icon */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-teal-200 flex items-center justify-center group-hover:border-teal-400 transition-colors duration-300">
                    <span className="text-3xl">{step.icon}</span>
                  </div>
                  {/* Step Number Badge */}
                  <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center shadow-lg shadow-teal-600/30 font-outfit">
                    {step.num}
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="font-playfair text-xl text-gray-800 mb-3 group-hover:text-teal-700 transition-colors">
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-500 font-dmsans text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Arrow connector (between cards, desktop only) */}
              {index < 2 && (
                <div className="hidden md:flex absolute top-1/2 -right-5 transform -translate-y-1/2 z-10 text-teal-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
