import { getPaginatedImages } from "@/api/images";
import Loader from "@/components/ui/loader/Loaders";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { MasonryPhotoAlbum, Photo } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "react-photo-album/masonry.css";

type SelectablePhoto = Photo & {
  selected?: boolean;
};

const Gallery = () => {
  // lightbox photo
  const [lightboxPhoto, setLightboxPhoto] = useState<SelectablePhoto>();
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
  console.log(scrollableRef.current?.scrollTop, scrollableRef.current?.clientHeight, scrollableRef.current?.scrollHeight);
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
        photos={images.map((i, index) => {
          const height = i.height ?? 1;
          const width = i.width ?? 1;
          return {
            src: "data:image/jpeg;base64," + i.image,
            height: height,
            width: width,
            key: index.toString(),
            srcSet: breakpoints.map((breakpoint) => ({
              src: "data:image/jpeg;base64," + i.image,
              width: breakpoint,
              height: Math.round((height / width) * breakpoint),
            })),
          };
        })}
        onClick={({ event, photo }) => {
          // let a link open in a new tab / new window / download
          if (event.shiftKey || event.altKey || event.metaKey) return;

          // prevent the default link behavior
          event.preventDefault();

          // open photo in a lightbox
          setLightboxPhoto(photo);
        }}
      />
      <Lightbox
        open={Boolean(lightboxPhoto)}
        close={() => setLightboxPhoto(undefined)}
        slides={lightboxPhoto ? [lightboxPhoto] : undefined}
        carousel={{ finite: true }}
        render={{ buttonPrev: () => null, buttonNext: () => null }}
        styles={{ root: { "--yarl__color_backdrop": "rgba(0, 0, 0, .8)" } }}
        controller={{
          closeOnBackdropClick: true,
          closeOnPullUp: true,
          closeOnPullDown: true,
        }}
      />
    </>
  ) : (
    <div className="flex-auto flex w-full h-full items-center justify-center">
      <Loader />
    </div>
  );
};

export default Gallery;
