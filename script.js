const translations = {
  en: {
    brandName: 'Global Trading and Services', eyebrow: 'GTS · GLOBAL TRADING AND SERVICES', heroTitle: 'Building Something <em>Exceptional.</em>', heroCopy: 'Our digital experience is under development. We look forward to welcoming you soon.', contactUs: 'Contact Us <span aria-hidden="true">→</span>', heroNote: 'In the meantime, our team is ready to hear from you.', divisionEyebrow: 'WHAT WE DO', divisionsTitle: 'Business Divisions', tradingTitle: 'Global Trading', tradingCopy: 'Reliable trading and sourcing solutions that connect businesses across borders.', itTitle: 'IT Services', itCopy: 'Practical technology, cloud consulting, and digital transformation for modern organizations.', interiorTitle: 'Interior Fit-Out Solutions', interiorCopy: 'Turnkey residential and commercial spaces, delivered with care and precision.', contactEyebrow: 'START A CONVERSATION', contactTitle: 'Let’s Connect', contactCopy: 'Have a project or inquiry? We’d be pleased to hear from you.', location: '📍 Sultanate of Oman', fullName: 'Full Name', company: 'Company Name <small>(Optional)</small>', email: 'Email Address', phone: 'Phone Number', businessDivision: 'Business Division', selectDivision: 'Select a division', generalInquiry: 'General Inquiry', message: 'Message', sendInquiry: 'Send Inquiry <span aria-hidden="true">→</span>', footerName: 'Global Trading and Services', emailPlaceholder: 'Email: info@gtsgroups.com', phonePlaceholder: 'Phone: +968 92838507', whatsappPlaceholder: 'WhatsApp: +968 92838507', rights: 'All rights reserved.', formSuccess: 'Thank you. Your inquiry is ready to be sent.'
  },
  ar: {
    brandName: 'جلوبال للتجارة والخدمات', eyebrow: 'GTS · جلوبال للتجارة والخدمات', heroTitle: 'نبني شيئًا <em>استثنائيًا.</em>', heroCopy: 'تجربتنا الرقمية قيد التطوير، ونتطلع إلى الترحيب بكم قريبًا.', contactUs: 'تواصل معنا <span aria-hidden="true">←</span>', heroNote: 'في هذه الأثناء، فريقنا على استعداد للاستماع إليكم.', divisionEyebrow: 'ماذا نقدم', divisionsTitle: 'قطاعات الأعمال', tradingTitle: 'التجارة العالمية', tradingCopy: 'حلول موثوقة للتجارة والتوريد تربط الشركات عبر الحدود.', itTitle: 'خدمات تقنية المعلومات', itCopy: 'تقنية عملية واستشارات سحابية وتحول رقمي للمؤسسات الحديثة.', interiorTitle: 'حلول التجهيزات الداخلية', interiorCopy: 'مساحات سكنية وتجارية متكاملة، تُنفذ بعناية ودقة.', contactEyebrow: 'ابدأ محادثة', contactTitle: 'لنتواصل', contactCopy: 'هل لديكم مشروع أو استفسار؟ يسعدنا أن نسمع منكم.', location: '📍 سلطنة عُمان', fullName: 'الاسم الكامل', company: 'اسم الشركة <small>(اختياري)</small>', email: 'البريد الإلكتروني', phone: 'رقم الهاتف', businessDivision: 'قطاع الأعمال', selectDivision: 'اختر قطاعًا', generalInquiry: 'استفسار عام', message: 'الرسالة', sendInquiry: 'إرسال الاستفسار <span aria-hidden="true">←</span>', footerName: 'جلوبال للتجارة والخدمات', emailPlaceholder: 'البريد: info@gtsgroups.com', phonePlaceholder: 'الهاتف: +968 92838507', whatsappPlaceholder: 'واتساب: +968 92838507', rights: 'جميع الحقوق محفوظة.', formSuccess: 'شكرًا لكم. أصبح استفساركم جاهزًا للإرسال.'
  }
};

const languageButton = document.querySelector('.language-switcher');
let language = 'en';

function setLanguage(nextLanguage) {
  language = nextLanguage;
  const isArabic = language === 'ar';
  const text = translations[language];
  document.documentElement.lang = isArabic ? 'ar' : 'en';
  document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  languageButton.setAttribute('aria-pressed', String(isArabic));
  document.title = isArabic ? 'GTS | نبني شيئًا استثنائيًا' : 'GTS | Building Something Exceptional';
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n;
    if (text[key]) node.innerHTML = text[key];
  });
}

languageButton.addEventListener('click', () => setLanguage(language === 'en' ? 'ar' : 'en'));

const form = document.querySelector('.contact-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const submitButton = form.querySelector('button[type="submit"]');
  const message = form.querySelector('.form-message');
  submitButton.disabled = true;
  message.textContent = language === 'ar' ? 'جارٍ إرسال الاستفسار…' : 'Sending your inquiry…';
  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) throw new Error('Form submission failed');
    form.reset();
    message.textContent = translations[language].formSuccess;
  } catch (error) {
    message.textContent = language === 'ar'
      ? 'تعذر إرسال الاستفسار. يرجى المحاولة مرة أخرى أو مراسلتنا عبر البريد الإلكتروني.'
      : 'We could not send your inquiry. Please try again or email us directly.';
  } finally {
    submitButton.disabled = false;
  }
});

document.getElementById('year').textContent = new Date().getFullYear();
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
