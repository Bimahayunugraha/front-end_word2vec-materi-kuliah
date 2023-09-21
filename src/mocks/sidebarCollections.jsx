export const mainSidebarCollections = [
  {
    name: "Dashboard",
    path: "/dashboard",
    iconInactive: (
      <i className="fa-light fa-grid-2 ml-2 flex h-4 w-4 items-center justify-center"></i>
    ),
    iconActive: (
      <i className="fa-solid fa-grid-2 ml-2 flex h-4 w-4 items-center justify-center"></i>
    ),
  },
  {
    name: "Mengelola Role",
    path: "/manage-role",
    iconInactive: (
      <i className="fa-light fa-user-gear ml-2 flex h-4 w-4 items-center justify-center"></i>
    ),
    iconActive: (
      <i className="fa-solid fa-user-gear ml-2 flex h-4 w-4 items-center justify-center"></i>
    ),
  },
  {
    name: "Mengelola Dosen",
    path: "/manage-dosen",
    iconInactive: (
      <i className="fa-light fa-users ml-2 flex h-4 w-4 items-center justify-center"></i>
    ),
    iconActive: <i className="fa-solid fa-users ml-2 flex h-4 w-4 items-center justify-center"></i>,
  },
];
