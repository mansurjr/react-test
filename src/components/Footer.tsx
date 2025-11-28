import { memo } from "react";
import { Typography } from "@mui/material";

function Footer() {
  return (
    <footer className="w-full bg-white border-t py-3 px-6 flex items-center justify-between">
      <Typography variant="body2" className="text-gray-600">
        © {new Date().getFullYear()} RandomCorp — All rights reserved.
      </Typography>

      <Typography variant="body2" className="text-gray-500">
        Built with ❤️ using React & MUI
      </Typography>
    </footer>
  );
}
export default memo(Footer);
