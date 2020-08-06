import React, { useEffect, useState, Suspense, lazy } from "react";
import useFetch, { Provider } from "use-http";
import CircularProgress from "@material-ui/core/CircularProgress";

import Header from "./Header";
import FormDialog from "../FormDialog";
import AlertDialog from "../AlertDialog";
import { BASE_URL, PHOTOS, ALBUMS } from "../../helpers/URLs";
import "./albumList.scss";

const AlbumList = () => {
  const PhotoCard = lazy(() => import("./PhotoCard"));
  const [card, setCard] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [id, setId] = useState();
  const [selectedKeyword, setSelectedKeyword] = useState();
  const { get, post, del, put, response } = useFetch(BASE_URL, { suspense: true });

  const insertPhotosToAlbum = async () => {
    const albums = await get(ALBUMS);
    const photos = await get(PHOTOS);
    if (response.ok) {
      setCard(
        albums.slice(0, 10).map((album) => ({
          ...album,
          photos: photos.filter((photo) => photo.albumId === album.id),
        }))
      );
    }
  };

  const createPost = async (form) => {
    await post(PHOTOS, {...form, albumId: form.id});
  };

  const editPost = async (form) => {
    await put(PHOTOS, {...form, id: form.id});
  };

  const handleChanges = (action, form) => {
    switch (action) {
      case "Add":
        createPost(form);
        break;
      case "Edit":
        editPost(form);
        break;
      default:
        break;
    }
    // Refresh the cards once un update is made
    insertPhotosToAlbum();
  };

  const handleDelete = async () => {
    await del(`${PHOTOS}/${id}`);
    insertPhotosToAlbum();
  };

  const handleActions = (action, id) => {
    switch (action) {
      case "Delete":
        setOpenAlert(true);
        break;
      case "Add":
        setSelectedKeyword("Add");
        break;
      case "Edit":
        setSelectedKeyword("Edit");
        break;
      default:
        break;
    }
    setId(id);
  };

  useEffect(() => {
    insertPhotosToAlbum();
  }, []);

  return (
    <Provider options={{ suspense: true }}>
      <FormDialog
        open={open}
        setOpen={setOpen}
        onClick={handleChanges}
        id={id}
        variantKeyword={selectedKeyword}
      />
      <AlertDialog
        open={openAlert}
        setOpen={setOpenAlert}
        onClick={handleDelete}
        title={"Delete Photo"}
        contentText={"Do you want to delete a photo?"}
        primaryButton={"Delete"}
      />
      <Suspense fallback={<CircularProgress />}>
        <Header />
        <main className="main-area">
          {card.map((album) => (
            <PhotoCard
              key={album.id}
              album={album}
              showDialogForm={setOpen}
              onClick={handleActions}
            />
          ))}
        </main>
      </Suspense>
    </Provider>
  );
};

export default AlbumList;
