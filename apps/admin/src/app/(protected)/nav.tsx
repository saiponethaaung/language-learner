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

const linksMockdata = [""];

export function AppNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("Security");

  const mainLinks = mainLinksMockdata.map((link) => (
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
        data-active={link.link === pathname || undefined}
      >
        <link.icon size={22} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  ));

  const links = linksMockdata.map((link) => (
    <a
      className={classes.link}
      data-active={activeLink === link || undefined}
      href="#"
      onClick={(event) => {
        event.preventDefault();
        setActiveLink(link);
      }}
      key={link}
    >
      {link}
    </a>
  ));

  const activeTab = () => {
    return mainLinksMockdata.filter(
      (link) => link.link.indexOf(pathname) > -1
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

          {links}
        </div>
      </div>
    </nav>
  );
}
