"use client";

import { ListItem } from "@/components/list-item";
import { TextField } from "@/components/text-field";
import { Title } from "@/components/title";
import { CircularProgress, List } from "@mui/material";
import { default as MaterialListItem } from "@mui/material/ListItem";
import { Snackbar } from "@/components/snackbar";
import { useSearchUsers } from "./hooks/useSearchUsers";

export const SearchUsers = () => {
  const {
    onChangeSearch,
    isLoading,
    users,
    error,
    sentryRef,
    hasNextPage,
    isErrorOpen,
  } = useSearchUsers();

  return (
    <>
      <Title label="Search Github Users" />
      <TextField onChange={onChangeSearch} variant="outlined" />

      <div>
        {isLoading && <CircularProgress size={80} />}
        {!!users.length && !error && (
          <List
            sx={{
              display: "flex",
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              padding: "2rem",
              marginTop: 5,
            }}
          >
            {users.map((user, index) => (
              <ListItem key={`${user.username}_${index}`} {...user} />
            ))}
            {(isLoading || hasNextPage) && (
              <MaterialListItem
                ref={sentryRef}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <CircularProgress size={80} />
              </MaterialListItem>
            )}
          </List>
        )}
        <Snackbar
          alertStatus="error"
          message={error?.message}
          open={isErrorOpen}
        />
      </div>
    </>
  );
};
