export const getInitials = (name: string) => {
  const words = name.replace(/[^a-z0-9\s]/gi, '').trim().split(/\s+/).filter(Boolean);

  if (words.length > 1) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }

  return (words[0] ?? '').slice(0, 2).toUpperCase();
};
