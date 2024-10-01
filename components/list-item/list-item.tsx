import { FC, Fragment } from "react";
import { default as MaterialListItem } from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import styles from "./list-item.module.css";

interface Props {
  avatarUrl: string;
  username: string;
}

export const ListItem: FC<Props> = ({ avatarUrl, username }) => {
  return (
    <>
      <MaterialListItem className={styles.ListItem} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={username} src={avatarUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Fragment>
              <Typography
                component="span"
                variant="body2"
                sx={{ color: "text.primary", display: "inline" }}
              >
                {username}
              </Typography>
            </Fragment>
          }
        />
      </MaterialListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};
