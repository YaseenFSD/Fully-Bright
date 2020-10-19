import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../Modal/Modal";
import SuperChat from "../../pages/superChat/SuperChat";

const useStyles = makeStyles((theme) => ({
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

// TODO Create nav bar component here
export function SignedInLinks() {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  return (
    <nav>
      <Link
        variant="button"
        color="primary"
        href="/games"
        className={classes.link}
      >
        GAMES
      </Link>
      <Link
        variant="button"
        color="primary"
        href="/leaderboard"
        className={classes.link}
      >
        LEADERBOARD
      </Link>
      <Button
        variant="text"
        color="primary"
        className={classes.link}
        onClick={() => {
          setOpenModal(true);
        }}
      >
        {" "}
        CHAT
      </Button>
      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <SuperChat />
      </Modal>
      <Link
        variant="button"
        color="primary"
        href="/messages"
        className={classes.link}
      >
        MESSAGES
      </Link>
      <Link
        variant="button"
        color="primary"
        href="/"
        className={classes.link}
      >
        Profile
      </Link>
    </nav>
  );
}
