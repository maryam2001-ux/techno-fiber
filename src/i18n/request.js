import { getRequestConfig } from 'next-intl/server';
import { defaultLocale } from '../i18n';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = requestLocale || defaultLocale;
  
  try {
    return {
      locale,
      messages: (await import(`../../messages/${locale}.json`)).default,
    };
  } catch (error) {
    return {
      locale: defaultLocale,
      messages: (await import(`../../messages/${defaultLocale}.json`)).default,
    };
  }
});