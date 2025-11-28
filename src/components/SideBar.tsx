import { Button, Divider, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";
import Typography from "@mui/joy/Typography";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import { menu } from "../utils/data";
import MenuIcon from "@mui/icons-material/Menu";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white shadow-md flex flex-col justify-between p-4 transition-all duration-300 ${
        isOpen ? "w-60" : "w-20"
      }`}
    >
      <div>
        <div className="flex items-center gap-2 mb-6">
          <IconButton color="primary" size="small" onClick={toggleSidebar}>
            {isOpen ? <BadgeRoundedIcon /> : <MenuIcon />}
          </IconButton>
          {isOpen && <Typography level="title-lg">Company logo</Typography>}
        </div>

        <nav className="flex flex-col gap-2 text-white">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                }`
              }
            >
              {isOpen ? (
                <Typography textColor={"common.white"} level="title-sm">
                  {item.name}
                </Typography>
              ) : (
                <item.icon />
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div>
        <Divider className="my-4" />
        <Button
          fullWidth
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
        >
          {isOpen && "Logout"}
        </Button>
      </div>
    </aside>
  );
}
