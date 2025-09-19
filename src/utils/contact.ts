import { BRAND_NAME, SUPPORT_EMAIL, SUPPORT_PHONE } from '@/content/brand';

const DEFAULT_CONTACT_EMAIL = SUPPORT_EMAIL;

export const openFounderCall = () => {
  if (typeof window === 'undefined') {
    return;
  }

  const schedulingUrl = import.meta.env.VITE_FOUNDER_CALL_URL as string | undefined;

  if (schedulingUrl && schedulingUrl.trim().length > 0) {
    window.open(schedulingUrl, '_blank', 'noopener');
    return;
  }

  const subject = encodeURIComponent(`📞 Schedule a Strategy Call - ${BRAND_NAME}`);
  const body = encodeURIComponent(
    `Hi ${BRAND_NAME} team! 👋\n\nI'd love to schedule a call to discuss my startup strategy. Here's what I'm looking for:` +
      `\n\n🎯 My Startup: [Brief description]` +
      `\n💡 My Goals: [What you want to achieve]` +
      `\n⏰ Preferred Time: [When you'd like to chat]` +
      `\n📱 Best Contact: [Your preferred contact method]` +
      `\n📞 Reach me at: [Your contact number]` +
      `\n\nIf there's a better channel, I'm happy to call ${SUPPORT_PHONE} directly.` +
      `\n\nExcited to learn how ${BRAND_NAME} can help me launch and grow!` +
      `\n\nBest,` +
      `\n[Your Name]`
  );

  const mailtoLink = `mailto:${DEFAULT_CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  window.open(mailtoLink, '_blank', 'noopener');
};
