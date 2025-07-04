import { IconBook, IconDeviceDesktopAnalytics, IconLanguage } from "@tabler/icons-react";
import { Routes } from "./routes";

export const mainLinksMockdata = [
  { icon: IconDeviceDesktopAnalytics, label: "Home", link: Routes.Home },
  { icon: IconLanguage, label: "Languages", link: Routes.Languages },
  { icon: IconBook, label: "Courses", link: Routes.Courses },
  // { icon: IconBook, label: "Course", link: Routes.Courses },
  // { icon: IconUser, label: "Account", link: Routes.Account },
  // { icon: IconSettings, label: "Settings", link: Routes.Settings },
  // { icon: IconCalendarStats, label: "Releases" },
  // { icon: IconFingerprint, label: "Security" },
];
