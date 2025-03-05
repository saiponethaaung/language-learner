"use client";
import { useState } from "react";
import { IconChevronDown, IconLogout, IconSettings } from "@tabler/icons-react";
import {
  Avatar,
  Container,
  Group,
  Menu,
  Text,
  UnstyledButton,
} from "@mantine/core";
import classes from "./header.module.scss";
import { useAppSelector } from "@app/utils/store/store";

const user = {
  image:
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png",
};

export function Header() {
  const authState = useAppSelector((state) => state.auth);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <div className={classes.header}>
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
