export const getModelInitials = (modelName: string) => {
  const words = modelName.trim().split(/\s+/).filter(Boolean);

  if (words.length > 1) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }

  return modelName.replace(/[^a-z0-9]/gi, '').slice(0, 2).toUpperCase();
};
