import "bootstrap/dist/css/bootstrap.min.css";
import "../public/main.css";
import 'rc-pagination/assets/index.css';
import { CookiesProvider } from "react-cookie";

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  );
}

export default MyApp;
