export const useNavigateBack = (navigate) => {
  const navigateBack = () => {
    navigate(-1);
  };

  return navigateBack;
};
