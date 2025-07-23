import { Routes, Route } from "react-router-dom";
import {
  Categories,
  Episode,
  Genre,
  Home,
  Library,
  Marketplace,
  Preview,
  Profile,
  Synopsis,
} from "./pages/main";
import { Login, Register, Type, Verify } from "./pages/auth";
import ReelFlow from "./pages/main/ReelFlow";
import Ecomics from "./pages/main/Ecomics";
import { Toaster } from "sonner";
import { useAuth } from "./hooks";
import { useEffect } from "react";
import { Create, Dashboard, Playlist, UploadType, Collections, Subscription, CreatorProfile, PreviewComic, ComicSynopsis } from "./pages/main/Creator";
import CreatorMiddleware from "./pages/main/Creator/CreatorMiddleware";
import { ScrollToTop } from "./components/ui";

const App = () => {
  const { getUser } = useAuth();

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <>
    <ScrollToTop />
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="type" element={<Type />} />
          <Route path="register" element={<Register />} />
          <Route path="verify" element={<Verify />} />
        </Route>
        <Route path="/categories" element={<Categories />} />
        <Route path="/genre" element={<Genre />} />
        <Route path="/library" element={<Library />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/ecomics" element={<Ecomics />} />
        <Route path="/reel" element={<ReelFlow />} />
        <Route path="/profile" element={<Profile />} />
      
        <Route path="/preview/:id" element={<Preview />} />
        <Route path="/synopsis/:id" element={<Synopsis />} />
        <Route path="/episode" element={<Episode/>} />

        <Route element={<CreatorMiddleware />}>
        <Route path="/creator">
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="upload/type" element={<UploadType />} />
          <Route path="upload" element={<Create />} />
          <Route path="preview/:id" element={<PreviewComic />} />
          <Route path="collections" element={<Collections />} />
          <Route path="subscriptions" element={<Subscription />} />
          <Route path="profile" element={<CreatorProfile />} />
          <Route path="create/playlist" element={<Playlist />} />
          <Route path="synopsis/:id" element={<ComicSynopsis />} />
        </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
