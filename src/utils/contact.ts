const DEFAULT_CONTACT_EMAIL = 'wittwizdigitals@gmail.com';

export const openFounderCall = () => {
  if (typeof window === 'undefined') {
    return;
  }

  const schedulingUrl = import.meta.env.VITE_FOUNDER_CALL_URL as string | undefined;

  if (schedulingUrl && schedulingUrl.trim().length > 0) {
    window.open(schedulingUrl, '_blank', 'noopener');
    return;
  }

  const subject = encodeURIComponent('📞 Schedule a Strategy Call - Wittwiz Digital');
  const body = encodeURIComponent(`Hi Wittwiz Team! 👋\n\nI'd love to schedule a call to discuss my startup strategy. Here's what I'm looking for:\n\n🎯 My Startup: [Brief description]\n💡 My Goals: [What you want to achieve]\n⏰ Preferred Time: [When you'd like to chat]\n📱 Best Contact: [Your preferred contact method]\n\nExcited to learn how Wittwiz can help me launch and grow!\n\nBest,\n[Your Name]\n[Your Contact Number]`);

  const mailtoLink = `mailto:${DEFAULT_CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  window.open(mailtoLink, '_blank', 'noopener');
};
