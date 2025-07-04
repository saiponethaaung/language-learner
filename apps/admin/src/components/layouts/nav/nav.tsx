"use client";
import { IconLogout } from "@tabler/icons-react";
import { Tooltip, UnstyledButton } from "@mantine/core";
import classes from "./nav.module.css";
import Image from "next/image";
import { logout } from "@utils/auth/auth";
import { usePathname, useRouter } from "next/navigation";
import { mainLinksMockdata } from "@app/utils/enums/navs";

export function AppNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const mainLinks = mainLinksMockdata.map((link) => {
    const path = pathname.split("/")[1];
    const linkPath = link.link.split("/")[1];

    return (
      <Tooltip
        label={link.label}
        position="right"
        withArrow
        transitionProps={{ duration: 0 }}
        key={link.label}
      >
        <UnstyledButton
          onClick={() => {
            router.push(link.link);
          }}
          className={classes.mainLink}
          data-active={path === linkPath || undefined}
        >
          <link.icon size={22} stroke={1.5} />
        </UnstyledButton>
      </Tooltip>
    );
  });

  return (
    <nav className={classes.navbar}>
      <div className={classes.wrapper}>
        <div className={classes.aside}>
          <div className={classes.logo}>
            <Image src="/next.svg" alt="" width={30} height={30} />
          </div>
          <div className={classes.mainLinksCon}>
            <div className={classes.topLink}>{mainLinks}</div>
            <div className={classes.bottomLink}>
              <Tooltip
                label={"Logout"}
                position="right"
                withArrow
                transitionProps={{ duration: 0 }}
                key={"logout"}
              >
                <UnstyledButton
                  onClick={() => {
                    if (confirm("Are you sure you want to logged out?")) {
                      logout();
                    }
                  }}
                  className={classes.mainLink}
                >
                  <IconLogout size={22} stroke={1.5} />
                </UnstyledButton>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
