import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { parseCookies } from "nookies";

// If you're using TypeScript, define the props types
interface MyDocumentProps {
  theme: string;
}

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  var theme = localStorage.getItem('theme') || 'light';
                  var colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  theme = theme === 'system' ? colorScheme : theme;

                  document.documentElement.classList.add(theme);
                  document.documentElement.style.backgroundColor = theme === 'dark' ? '#333' : '#FFF';
                  document.documentElement.style.color = theme === 'dark' ? '#FFF' : '#333';
                })();
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
