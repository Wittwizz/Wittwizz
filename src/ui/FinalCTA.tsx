import React from 'react';
import { motion } from 'framer-motion';

const FinalCTA: React.FC = () => {
  const handleStartProject = () => {
    const subject = encodeURIComponent("🚀 Ready to Launch My Startup with Wittwiz!");
    const body = encodeURIComponent(`Hi WittWizz Team! 👋

I'm excited to start my startup journey with you! Here's what I'm looking for:

🎯 **My Startup Vision:**
[Tell us about your amazing idea]

💡 **What I Need:**
- Brand identity & positioning
- Website development
- Growth strategy
- [Any other specific requirements]

💰 **Budget Range:** [Your budget range]
⏰ **Timeline:** [When you want to launch]

I'm ready to transform my startup from idea to reality! Let's make something incredible together.

Best regards,
[Your Name]
[Your Contact Number]`);

    const mailtoLink = `mailto:wittwizdigitals@gmail.com?subject=${subject}&body=${body}`;
    window.open(mailtoLink, '_blank');
  };

  const handleScheduleCall = () => {
    const subject = encodeURIComponent("📞 Schedule a Strategy Call - WittWizz");
    const body = encodeURIComponent(`Hi WittWizz Team! 👋

I'd love to schedule a call to discuss my startup strategy. Here's what I'm looking for:

🎯 **My Startup:** [Brief description]
💡 **My Goals:** [What you want to achieve]
⏰ **Preferred Time:** [When you'd like to chat]
📱 **Best Contact:** [Your preferred contact method]

I'm excited to learn how Wittwiz can help me launch and grow my startup!

Best regards,
[Your Name]
[Your Contact Number]`);

    const mailtoLink = `mailto:wittwizdigitals@gmail.com?subject=${subject}&body=${body}`;
    window.open(mailtoLink, '_blank');
  };

  return (
    <div className="relative py-20">
      {/* Removed hard background - will blend with SmoothBackground */}
      
      <div className="container mx-auto px-4 relative z-20 text-center">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-text-primary mb-8">
            Ready to <span className="text-accent-primary">Launch</span> Your Startup?
          </h2>
          <p className="text-xl text-text-secondary mb-12 leading-relaxed">
            Join 40+ Indian founders who've already transformed their digital presence with Wittwiz. 
            Your futuristic growth journey starts here.
          </p>
          
          {/* Final CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.button 
              onClick={handleStartProject}
              className="bg-gradient-to-r from-accent-primary to-accent-secondary text-bg-primary font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-0 flex items-center gap-3 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">🚀</span>
              Start Your Project
              <span className="text-lg">✨</span>
            </motion.button>
            
            <motion.button 
              onClick={handleScheduleCall}
              className="bg-bg-tertiary/80 backdrop-blur-md text-accent-primary border-2 border-accent-primary font-semibold px-8 py-4 rounded-lg hover:bg-accent-primary hover:text-bg-primary transition-all duration-300 flex items-center gap-3 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">💬</span>
              Schedule a Call
            </motion.button>
          </div>
          
          {/* Trust indicators */}
          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-center group">
              <div className="relative">
                {/* Modern Card Design */}
                <div className="bg-gradient-to-br from-accent-primary/20 to-accent-primary/5 backdrop-blur-md border border-accent-primary/30 rounded-xl p-6 transform group-hover:scale-105 group-hover:border-accent-primary/60 transition-all duration-500">
                  <div className="text-4xl font-black text-accent-primary mb-2">30</div>
                  <div className="text-text-secondary text-sm font-medium">Days guaranteed launch</div>
                </div>
                {/* Subtle Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500 -z-10"></div>
              </div>
            </div>

            <div className="text-center group">
              <div className="relative">
                {/* Modern Card Design */}
                <div className="bg-gradient-to-br from-accent-secondary/20 to-accent-secondary/5 backdrop-blur-md border border-accent-secondary/30 rounded-xl p-6 transform group-hover:scale-105 group-hover:border-accent-secondary/60 transition-all duration-500">
                  <div className="text-4xl font-black text-accent-secondary mb-2">100%</div>
                  <div className="text-text-secondary text-sm font-medium">Founder satisfaction</div>
                </div>
                {/* Subtle Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-secondary/10 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500 -z-10"></div>
              </div>
            </div>

            <div className="text-center group">
              <div className="relative">
                {/* Modern Card Design */}
                <div className="bg-gradient-to-br from-accent-tertiary/20 to-accent-tertiary/5 backdrop-blur-md border border-accent-tertiary/30 rounded-xl p-6 transform group-hover:scale-105 group-hover:border-accent-tertiary/60 transition-all duration-500">
                  <div className="text-4xl font-black text-accent-tertiary mb-2">24/7</div>
                  <div className="text-text-secondary text-sm font-medium">Support available</div>
                </div>
                {/* Subtle Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-tertiary/10 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500 -z-10"></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default FinalCTA;
