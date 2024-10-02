import AppWrapper from "@/components/AppWrapper";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </Provider>
    </SessionProvider>
  );
}
