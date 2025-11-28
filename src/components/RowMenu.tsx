import { Menu, MenuItem, IconButton } from "@mui/joy";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { useState, useEffect, memo } from "react";

interface RowMenuProps {
  userId: number;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onEdit?: () => void;
  onRename?: () => void;
  onMove?: () => void;
  onDelete?: () => void;
}

const RowMenu = memo(function RowMenu({
  isOpen: controlledOpen,
  onOpen,
  onClose,
  onEdit,
  onRename,
  onMove,
  onDelete,
}: RowMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [internalOpen, setInternalOpen] = useState(false);

  const open = controlledOpen !== undefined ? controlledOpen && Boolean(anchorEl) : internalOpen;

  useEffect(() => {
    if (controlledOpen === false) {
      setAnchorEl(null);
    }
  }, [controlledOpen]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    if (onOpen) {
      onOpen();
    } else {
      setInternalOpen(true);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (onClose) {
      onClose();
    } else {
      setInternalOpen(false);
    }
  };

  const handleMenuItemClick = (callback?: () => void) => {
    callback?.();
    handleClose();
  };

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="row-menu"
        aria-haspopup="true"
        onClick={handleClick}
        size="sm"
        variant="plain"
        color="neutral"
      >
        <MoreHorizRoundedIcon />
      </IconButton>
      <Menu
        id="row-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        placement="bottom-end"
        size="sm"
      >
        <MenuItem onClick={() => handleMenuItemClick(onEdit)}>Edit</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick(onRename)}>Rename</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick(onMove)}>Move</MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick(onDelete)}
          color="danger"
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
});

export default RowMenu;
