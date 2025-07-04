"use client";
import { useState } from "react";
import { IconChevronDown, IconLogout, IconSettings } from "@tabler/icons-react";
import {
  Avatar,
  Container,
  Group,
  Menu,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import classes from "./header.module.scss";
import { useAppSelector } from "@app/utils/store/store";
import { usePathname } from "next/navigation";
import { mainLinksMockdata } from "@app/utils/enums/navs";

const user = {
  image:
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png",
};

export function Header() {
  const pathname = usePathname();
  const authState = useAppSelector((state) => state.auth);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const activeTab = () => {
    const activeNav = pathname.split("/")[1];

    return mainLinksMockdata.filter(
      (link) => link.link.indexOf(activeNav) > -1
    )[0].label;
  };

  return (
    <div className={classes.header}>
      <div className={classes.main}>
        <Title order={4} className={classes.title}>
          {activeTab()}
        </Title>
      </div>
      <Container className={classes.mainSection} fluid={true}>
        <Group justify="flex-end">
          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={[
                  classes.user,
                  userMenuOpened ? classes.userActive : null,
                ].join(" ")}
              >
                <Group gap={7}>
                  <Avatar
                    src={user.image}
                    alt={authState.user.name}
                    radius="xl"
                    size={20}
                  />
                  <Text fw={500} size="sm" lh={1} mr={3}>
                    {authState.user.name}
                  </Text>
                  <IconChevronDown size={12} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Settings</Menu.Label>
              <Menu.Item leftSection={<IconSettings size={16} stroke={1.5} />}>
                Account settings
              </Menu.Item>

              <Menu.Item leftSection={<IconLogout size={16} stroke={1.5} />}>
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
    </div>
  );
}
