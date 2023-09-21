export const expiratedFile = (createdAt) => {
  let now = new Date();
  const oneDay = 60 * 60 * 24 * 1000;
  const created_at = new Date(createdAt);
  return now - created_at > oneDay;
};
