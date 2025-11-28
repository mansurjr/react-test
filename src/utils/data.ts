import DashboardIcon from "@mui/icons-material/Dashboard";

interface IMenu {
  name: string;
  path: string;
  icon: React.ElementType;
}

export const menu: IMenu[] = [
  { name: "Dashboard", path: "/", icon: DashboardIcon },
];