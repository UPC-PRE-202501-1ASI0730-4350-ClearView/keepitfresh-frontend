import en from '/src/locales/en.json';
import es from '/src/locales/es.json';

import {createI18n} from "vue-i18n";

const i18n = createI18n({
    locale: 'en', // set locale
    fallbackLocale: 'en', // set fallback locale
    globalInjection: true,
    messages: { en, es }
});

export default i18n;