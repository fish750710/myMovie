import React, { memo } from "react";
import YouTube from "react-youtube";

import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// import style from './styled';

const youtubeOpts = {
  height: "315",
  width: "560",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

// 優化不重複渲染
const arePropsEqual = (prevProps, nextProps) => {
  // console.log(
  //   prevProps,
  //   prevProps.playShow === nextProps.playShow,
  //   "prevProps, nextProps"
  // );
  return prevProps.playShow === nextProps.playShow;
};
const index = memo(({ handleClose, playShow, movieData, trailer }) => {
  return (
    <BootstrapDialog onClose={handleClose} open={playShow}>
      {trailer?.length === 0 ? (
        <>
          <BootstrapDialogTitle onClose={handleClose}>
            {movieData?.title}
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>找不到相關資訊</Typography>
          </DialogContent>
        </>
      ) : (
        <>
          <BootstrapDialogTitle onClose={handleClose}>
            {trailer?.name}
          </BootstrapDialogTitle>

          {trailer?.slice(0, 1).map((item) => (
            <YouTube videoId={item.key} opts={youtubeOpts} key={item.id} />
            // <iframe
            //   width="420"
            //   height="315"
            //   src={`https://www.youtube.com/embed/${item.key}`}
            //   frameborder="0"
            //   key={item.id}
            //   allowfullscreen
            // ></iframe>
          ))}
        </>
      )}
    </BootstrapDialog>
  );
}, arePropsEqual);

export default index;
