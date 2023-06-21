import { useEffect } from "react";
import { useRouter } from "next/router";
import { SSRProvider } from "@react-aria/ssr";
import "bootstrap/dist/css/bootstrap.min.css";

import useSession from "@api/session";
import Header from "@components/header/Header";
import "./_app.css";

export default function App({ Component, pageProps }) {
  const session = useSession();
  const router = useRouter();

  // const shouldRedirect =
  //   !session.user &&
  //   !["/auth/register", "/auth/login"].includes(router.pathname);

  // useEffect(() => {
  //   if (shouldRedirect) {
  //     router.push("/auth/login");
  //   }
  // }, [shouldRedirect, router]);

  const newPageProps = {
    ...pageProps,
    session,
  };

  return (
    <>
      <SSRProvider>
        <Header />
        <main className="page">
          <Component {...newPageProps} />
        </main>
      </SSRProvider>
    </>
  );
}
