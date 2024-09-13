import AppWrapper from "@/components/AppWrapper";
import { store } from "@/redux/app/store";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <AppWrapper store={store}>
      <Component {...pageProps} />
    </AppWrapper>
  );
}
