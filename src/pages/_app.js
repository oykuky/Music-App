import AppWrapper from "@/components/AppWrapper";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { NextIntlProvider } from "next-intl";

// Import locales individually or ensure default export
import * as allLocales from "@/locales";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  const locale = router.locale || 'en'; // Provide a default locale
  
  // Ensure messages exist for the current locale
  const messages = allLocales[locale] || {};
  
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <NextIntlProvider locale={locale} messages={messages}>
          <AppWrapper>
            <Component {...pageProps} />
          </AppWrapper>
        </NextIntlProvider>
        <Toaster />
      </Provider>
    </SessionProvider>
  );
}