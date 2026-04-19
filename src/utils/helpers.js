export const getInitials = (name) => {
  if (!name) return "";
  const parts = name.split(" ");
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const formatWhatsAppLink = (number) => {
  const cleanNumber = number.replace(/\D/g, "");
  return `https://wa.me/${cleanNumber}`;
};

export const generateId = () => {
  return Math.floor(Math.random() * 1000000) + Date.now();
};
