import React from "react";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import "./photoCard.scss";

const AlbumList = ({ album, showDialogForm, onClick }) => {
  return (
    <div className="card-container" key={album.id}>
      <div className="sub-title">
        <h2 className="title">{album.title}</h2>
        <Fab
          color="primary"
          aria-label="Add"
          onClick={() => {
            showDialogForm(true);
            onClick("Add", album.id);
          }}
        >
          <AddIcon />
        </Fab>
      </div>
      <section className="cards">
        {album?.photos.map((photo) => (
          <article className="card" key={photo.id}>
            <picture className="thumbnail">
              <img
                src={photo.thumbnailUrl}
                alt="A banana that looks like a bird"
              />
            </picture>
            <div className="card-content">
              <h2 className="title">{photo.title}</h2>
              <p>TUX re-inventing the wheel, and move the needle.</p>
            </div>
            <IconButton
              aria-label="Edit title"
              onClick={() => {
                showDialogForm(true);
                onClick("Edit", photo.id);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="Delete photo"
              onClick={() => onClick("Delete", album.id)}
            >
              <DeleteIcon />
            </IconButton>
          </article>
        ))}
      </section>
    </div>
  );
};

export default AlbumList;
