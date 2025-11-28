import React from "react";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  previousPage: boolean | null;
  nextPage: boolean | null;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
  previousPage,
  nextPage,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 2,
      }}
    >
      <IconButton
        aria-label="previous page"
        variant="outlined"
        color="neutral"
        size="sm"
        disabled={!previousPage}
        onClick={() => onPageChange(page - 1)}
      >
        <KeyboardArrowLeftIcon />
      </IconButton>

      <Typography level="body-sm" sx={{ mx: 2 }}>
        Page {page} / {totalPages}
      </Typography>

      <IconButton
        aria-label="next page"
        variant="outlined"
        color="neutral"
        size="sm"
        disabled={!nextPage}
        onClick={() => onPageChange(page + 1)}
      >
        <KeyboardArrowRightIcon />
      </IconButton>
    </Box>
  );
};

export default Pagination;
