import { getPaginatedImages } from "@/api/images";
import Loader from "@/components/ui/loader/Loaders";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { MasonryPhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import "react-photo-album/masonry.css";

const Gallery = () => {
  // lightbox photo
  const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState(-1);
  const { data, isPending, fetchNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["real-estates"],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => await getPaginatedImages(pageParam, 15),
    getNextPageParam: (response) => {
      const nextPage = response.pageable.pageNumber + 1;
      if (nextPage >= response.totalPages) return;
      return response.pageable.pageNumber + 1;
    },
  });
  const scrollableRef = useRef<HTMLDivElement>(null);
  console.log(
    scrollableRef.current?.scrollTop,
    scrollableRef.current?.clientHeight,
    scrollableRef.current?.scrollHeight
  );
  useEffect(() => {
    const handleScroll = () => {
      if (scrollableRef.current) {
        const { scrollTop, clientHeight, scrollHeight } = scrollableRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
          fetchNextPage();
        }
      }
    };

    scrollableRef.current?.addEventListener("scroll", handleScroll);
    return () => {
      scrollableRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, isLoading]);
  const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];
  const images = useMemo(
    () => data?.pages.flatMap((p) => p.content) ?? [],
    [data]
  );
  const photos = images.map((i, index) => {
    const height = i.height ?? 1;
    const width = i.width ?? 1;
    return {
      src: "data:image/jpeg;base64," + i.image,
      height: height,
      width: width,
      key: index.toString(),
      title: i.description,
      srcSet: breakpoints.map((breakpoint) => ({
        src: "data:image/jpeg;base64," + i.image,
        width: breakpoint,
        height: Math.round((height / width) * breakpoint),
      })),
    };
  });
  return !isPending ? (
    <>
      <MasonryPhotoAlbum
        ref={scrollableRef}
        componentsProps={{
          container: {
            className: "w-full p-8 overflow-auto scrollable",
          },
          image: {
            className: "object-contain",
          },
        }}
        padding={5}
        photos={photos}
        onClick={({ event, index }) => {
          // let a link open in a new tab / new window / download
          if (event.shiftKey || event.altKey || event.metaKey) return;

          // prevent the default link behavior
          event.preventDefault();

          // open photo in a lightbox
          setLightboxPhotoIndex(index);
        }}
      />
      <Lightbox
        open={lightboxPhotoIndex >= 0}
        close={() => setLightboxPhotoIndex(-1)}
        slides={photos}
        index={lightboxPhotoIndex}
        styles={{ root: { "--yarl__color_backdrop": "rgba(0, 0, 0, .8)" } }}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom, Captions]}
      />
    </>
  ) : (
    <div className="flex-auto flex w-full h-full items-center justify-center">
      <Loader />
    </div>
  );
};

export default Gallery;
