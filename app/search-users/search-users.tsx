"use client";

import { ChangeEvent, useCallback, useState, useEffect } from "react";
import { ListItem } from "@/components/list-item";
import { TextField } from "@/components/text-field";
import { Title } from "@/components/title";
import { useUsersServices } from "@/services/useUsersService";
import { CircularProgress, List } from "@mui/material";
import { Snackbar } from "@/components/snackbar";

export const SearchUsers = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);
  const { data, isLoading, refetch, error } = useUsersServices(searchValue);

  useEffect(() => {
    if (error) {
      setIsErrorOpen(true);
    }
  }, [error]);

  const onChangeSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.currentTarget.value);
      if (searchValue) refetch();
    },
    [searchValue, refetch],
  );
  return (
    <>
      <Title label="Search Github Users" />
      <TextField onChange={onChangeSearch} variant="outlined" />

      <div>
        {isLoading && <CircularProgress size={80} />}
        {!isLoading && !!data?.length && !error && (
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
            {data.map((user) => (
              <ListItem key={user.username} {...user} />
            ))}
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
