import styles from "./layout.module.scss";
import { checkSession } from "@app/utils/auth/auth";
import { Header } from "../../components/header/header";
import makeStore from "@app/utils/store/store";
import { setAdmin } from "@app/utils/store/auth.slice";
import { redirect } from "next/navigation";
import StoreProvider from "@app/utils/store/store_provider";
import { AppNavbar } from "@app/components/layouts/nav/nav";
import SideNav from "@app/components/layouts/sidenav/sidenav";
import RouteListener from "@app/components/route-listener";

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminSession = await checkSession();

  if (adminSession instanceof redirect) {
    return adminSession;
  }

  const store = makeStore();

  store.dispatch(setAdmin(adminSession));

  return (
    <StoreProvider initialReduxState={store.getState()}>
      <RouteListener>
        <div className={styles.rootCon}>
          <AppNavbar />
          <div className={styles.content}>
            <Header />
            <div className={styles.contentCon}>
              <SideNav />
              <main>{children}</main>
            </div>
          </div>
        </div>
      </RouteListener>
    </StoreProvider>
  );
}
