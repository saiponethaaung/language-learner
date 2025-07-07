"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./sidenav.module.scss";
import { PropsWithChildren } from "react";

export interface NavLink {
  title: string;
  href: string;
}

export interface IProps extends PropsWithChildren {
  links: NavLink[];
}

export default function SideNav({ links, children }: IProps) {
  const pathname = usePathname();

  if (links.length === 0) return <></>;

  return (
    <div className={classes.sideNavCon}>
      <div className={classes.linkCon}>
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.title}
            data-active={link.href === pathname.split("/")[2] || undefined}
            className={classes.link}
          >
            {link.title}
          </Link>
        ))}
      </div>
      <div className={classes.contentCon}>{children}</div>
    </div>
  );
}
