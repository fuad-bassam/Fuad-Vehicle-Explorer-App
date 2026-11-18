'use client';

import { Avatar } from '@mantine/core';

export interface BaseAvatarProps {
  name: string;
  text?: string;
  size?: 'md' | 'lg' | 'xl';
}

const avatarColors = ['blue', 'cyan', 'teal', 'green', 'indigo', 'violet', 'grape', 'pink', 'orange'];

export function BaseAvatar({ name, text, size = 'lg' }: BaseAvatarProps) {
  return (
    <Avatar name={name} color="initials" allowedInitialsColors={avatarColors} size={size} radius="md" variant="light">
      {text}
    </Avatar>
  );
}
