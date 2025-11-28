import { useUsers } from "../api/users/useUsers";
import { useState, useMemo, useCallback } from "react";
import {
  CheckRounded,
  Block,
  AutorenewRounded,
} from "@mui/icons-material";
import RowMenu from "./RowMenu";
import Pagination from "./Pagination";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Table from "@mui/joy/Table";
import Avatar from "@mui/joy/Avatar";
import Chip from "@mui/joy/Chip";
import Skeleton from "@mui/joy/Skeleton";
import type { User } from "../types";

const UsersDashboard = () => {
  const [page, setPage] = useState(1);
  const { useAllUsers } = useUsers();
  const { data, isLoading, isError } = useAllUsers(page);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const users = data?.data?.data || [];

  const userStatusMap = useMemo(() => {
    const statuses = ["Active", "Pending", "Inactive"];
    const map = new Map<number, string>();
    users.forEach((user: User) => {
      const seed = user.id;
      map.set(user.id, statuses[seed % statuses.length]);
    });
    return map;
  }, [users]);

  const getStatus = useCallback((userId: number) => {
    return userStatusMap.get(userId) || "Active";
  }, [userStatusMap]);

  const handleMenuOpen = useCallback((userId: number) => {
    setOpenMenuId(userId);
  }, []);

  const handleMenuClose = useCallback(() => {
    setOpenMenuId(null);
  }, []);

  if (isError)
    return (
      <Typography color="danger" level="title-lg">
        Error loading users
      </Typography>
    );

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Box
          component="main"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: "calc(12px + var(--Header-height))",
              sm: "calc(12px + var(--Header-height))",
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            gap: 2,
          }}>
          <Box>
            <Typography level="h2" component="h1">
              Users
            </Typography>
          </Box>

          <Sheet
            variant="outlined"
            sx={{
              borderRadius: "sm",
              overflow: "auto",
              boxShadow: "sm",
              width: "100%",
              maxWidth: "2000px",
            }}>
            <Table
              aria-label="users table"
              stickyHeader
              sx={{
                "--TableCell-headBackground": "var(--joy-palette-background-level1)",
                "--Table-headerUnderlineThickness": "1px",
                "--TableRow-hoverBackground": "var(--joy-palette-background-level1)",
                "& thead th": {
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                },
                "& tbody tr:hover": {
                  backgroundColor: "var(--joy-palette-background-level1)",
                },
              }}>
              <thead>
                <tr>
                  <th style={{ width: "8%", padding: "12px 16px" }}>ID</th>
                  <th style={{ width: "20%", padding: "12px 16px" }}>Name</th>
                  <th style={{ width: "20%", padding: "12px 16px" }}>Email</th>
                  <th style={{ width: "12%", padding: "12px 16px" }}>Phone</th>
                  <th style={{ width: "15%", padding: "12px 16px" }}>Location</th>
                  <th style={{ width: "12%", padding: "12px 16px" }}>DOB</th>
                  <th style={{ width: "10%", padding: "12px 16px" }}>Status</th>
                  <th style={{ width: "8%", padding: "12px 16px", textAlign: "center" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading
                  ? Array.from({ length: 5 }).map((_, idx) => (
                      <tr key={idx}>
                        <td style={{ padding: "16px" }}>
                          <Skeleton variant="text" level="body-sm" sx={{ width: 60 }} />
                        </td>
                        <td style={{ padding: "16px" }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Skeleton variant="circular" width={40} height={40} />
                            <Skeleton variant="text" level="body-sm" sx={{ width: 150 }} />
                          </Box>
                        </td>
                        <td style={{ padding: "16px" }}>
                          <Skeleton variant="text" level="body-sm" sx={{ width: 200 }} />
                        </td>
                        <td style={{ padding: "16px" }}>
                          <Skeleton variant="text" level="body-sm" sx={{ width: 120 }} />
                        </td>
                        <td style={{ padding: "16px" }}>
                          <Skeleton variant="text" level="body-sm" sx={{ width: 100 }} />
                        </td>
                        <td style={{ padding: "16px" }}>
                          <Skeleton variant="text" level="body-sm" sx={{ width: 100 }} />
                        </td>
                        <td style={{ padding: "16px" }}>
                          <Skeleton variant="rectangular" width={80} height={24} />
                        </td>
                        <td style={{ padding: "16px", textAlign: "center" }}>
                          <Skeleton variant="circular" width={32} height={32} />
                        </td>
                      </tr>
                    ))
                  : users.map((user) => {
                      const fullName = `${user.name.first} ${user.name.last}`;
                      const status = getStatus(user.id);
                      return (
                        <tr key={user.id}>
                          <td style={{ padding: "16px" }}>
                            <Typography level="body-sm" sx={{ fontFamily: "monospace" }}>
                              {user.id}
                            </Typography>
                          </td>
                          <td style={{ padding: "16px" }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                              <Avatar
                                src={user.picture.thumbnail}
                                alt={fullName}
                                size="sm"
                                sx={{ borderRadius: "50%" }}
                              />
                              <Typography level="body-sm" sx={{ fontWeight: 500 }}>
                                {fullName}
                              </Typography>
                            </Box>
                          </td>
                          <td style={{ padding: "16px" }}>
                            <Typography level="body-sm" sx={{ color: "text.secondary" }}>
                              {user.email}
                            </Typography>
                          </td>
                          <td style={{ padding: "16px" }}>
                            <Typography level="body-sm" sx={{ fontFamily: "monospace" }}>
                              {user.phone}
                            </Typography>
                          </td>
                          <td style={{ padding: "16px" }}>
                            <Typography level="body-sm">
                              {user.location.city}, {user.location.country}
                            </Typography>
                          </td>
                          <td style={{ padding: "16px" }}>
                            <Typography level="body-sm">
                              {new Date(user.dob.date).toLocaleDateString()}
                            </Typography>
                          </td>
                          <td style={{ padding: "16px" }}>
                            <Chip
                              size="sm"
                              variant="soft"
                              color={
                                status === "Active"
                                  ? "success"
                                  : status === "Pending"
                                  ? "warning"
                                  : "danger"
                              }
                              startDecorator={
                                status === "Active" ? (
                                  <CheckRounded />
                                ) : status === "Pending" ? (
                                  <AutorenewRounded />
                                ) : (
                                  <Block />
                                )
                              }>
                              {status}
                            </Chip>
                          </td>
                          <td style={{ padding: "16px", textAlign: "center" }}>
                            <RowMenu
                              userId={user.id}
                              isOpen={openMenuId === user.id}
                              onOpen={() => handleMenuOpen(user.id)}
                              onClose={handleMenuClose}
                            />
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </Table>
          </Sheet>

          {!isLoading && data?.data && (
            <Pagination
              page={data.data.page}
              totalPages={data.data.totalPages}
              previousPage={data.data.previousPage}
              nextPage={data.data.nextPage}
              onPageChange={setPage}
            />
          )}
        </Box>
      </Box>
    </CssVarsProvider>
  );
};

export default UsersDashboard;
