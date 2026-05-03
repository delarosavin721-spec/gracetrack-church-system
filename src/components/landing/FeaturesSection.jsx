import { motion } from 'framer-motion'

export default function FeaturesSection() {
  const features = [
    {
      icon: "📱",
      title: "Smart Envelope Scanning",
      description: "Scan QR/barcodes on envelopes using your smartphone. No more manual logbooks or tedious data entry.",
      gradient: "from-teal-400/20 to-teal-600/10"
    },
    {
      icon: "📧",
      title: "Automated Email Devotions",
      description: "Daily life verses and prayer reminders sent every morning to keep your congregation spiritually connected.",
      gradient: "from-purple-400/20 to-purple-600/10"
    },
    {
      icon: "📊",
      title: "Real-time Dashboard",
      description: "Monitor all tithes, offerings, and giving trends live with beautiful, easy-to-understand charts.",
      gradient: "from-blue-400/20 to-blue-600/10"
    },
    {
      icon: "👥",
      title: "Member Management",
      description: "Maintain complete member profiles including their giving history, attendance, and contact information.",
      gradient: "from-orange-400/20 to-orange-600/10"
    },
    {
      icon: "📅",
      title: "Attendance Tracking",
      description: "Mark and monitor attendance for every Sunday service to ensure no member falls through the cracks.",
      gradient: "from-green-400/20 to-green-600/10"
    },
    {
      icon: "📖",
      title: "Christian Education",
      description: "Automated Friday Bible study reminders and lesson materials sent directly to members' inboxes.",
      gradient: "from-rose-400/20 to-rose-600/10"
    }
  ]

  return (
    <section id="features" className="py-20 md:py-28 bg-white flex justify-center w-full">
      <div className="w-full max-w-6xl px-6 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center w-full max-w-2xl mb-16 flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-teal-600 font-outfit text-xs font-bold uppercase tracking-[0.2em] mb-3 bg-teal-50 px-4 py-1.5 rounded-full border border-teal-100"
          >
            What We Offer
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-3xl md:text-4xl lg:text-5xl text-gray-800 mb-5 leading-tight"
          >
            Built for the Modern Church
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-16 h-1 bg-teal-500 mx-auto rounded-full mb-5"
          />
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-base md:text-lg font-dmsans leading-relaxed"
          >
            Everything you need to manage your congregation efficiently, allowing you to focus on what truly matters — ministry.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="group bg-white rounded-xl border border-gray-100 p-7 md:p-8 shadow-sm hover:shadow-xl hover:shadow-teal-500/8 transition-all duration-400 hover:border-teal-200 hover:-translate-y-1 flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} border border-gray-100 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              
              {/* Title */}
              <h3 className="font-playfair text-xl md:text-2xl text-gray-800 mb-4 group-hover:text-teal-700 transition-colors leading-snug font-bold">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-500 text-sm font-dmsans leading-relaxed max-w-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
