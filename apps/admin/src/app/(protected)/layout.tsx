import { AppNavbar } from "./nav";
import styles from "./layout.module.scss";
import { checkSession } from "@app/utils/auth/auth";
import { Header } from "./header";

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkSession();

  return (
    <div className={styles.rootCon}>
      <AppNavbar />
      <div className={styles.content}>
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
