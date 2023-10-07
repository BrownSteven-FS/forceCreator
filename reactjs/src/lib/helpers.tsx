export const API_BASE = `/api_v1`;

export const formatDate = (date: string) => {
  const updatedDate = new Date(date);
  return updatedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
