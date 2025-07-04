"use client";
import { useState } from "react";
import {
  IconBook,
  IconDeviceDesktopAnalytics,
  IconLanguage,
  IconLogout,
} from "@tabler/icons-react";
import { Title, Tooltip, UnstyledButton } from "@mantine/core";
import classes from "./nav.module.css";
import Image from "next/image";
import { logout } from "@utils/auth/auth";
import { Routes } from "@app/utils/enums/routes";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAppSelector } from "@app/utils/store/store";

const mainLinksMockdata = [
  { icon: IconDeviceDesktopAnalytics, label: "Home", link: Routes.Home },
  { icon: IconLanguage, label: "Languages", link: Routes.Languages },
  { icon: IconBook, label: "Courses", link: Routes.Courses },
  // { icon: IconBook, label: "Course", link: Routes.Courses },
  // { icon: IconUser, label: "Account", link: Routes.Account },
  // { icon: IconSettings, label: "Settings", link: Routes.Settings },
  // { icon: IconCalendarStats, label: "Releases" },
  // { icon: IconFingerprint, label: "Security" },
];

export function AppNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("Security");
  const state = useAppSelector((state) => state.nav);

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

  const links = () => {
    const links = state.links[pathname];

    if (!links) return [];

    return links.map((link) => (
      <Link
        href={link.href}
        key={link.title}
        data-active={link.href === pathname.split("/")[2] || undefined}
        className={classes.link}
      >
        {link.title}
      </Link>
    ));
  };

  const activeTab = () => {
    const activeNav = pathname.split("/")[1];

    return mainLinksMockdata.filter(
      (link) => link.link.indexOf(activeNav) > -1
    )[0].label;
  };

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
        <div className={classes.main}>
          <Title order={4} className={classes.title}>
            {activeTab()}
          </Title>

          {links()}
        </div>
      </div>
    </nav>
  );
}
