"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { fetchCamperById } from "@/lib/api/clientApi";
import css from "./CamperDetails.module.css";
import Container from "@/components/Container/Container";
import Loader from "@/components/Loader/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode, Thumbs } from "swiper/modules";
import "swiper/css/bundle";
import Lightbox from "yet-another-react-lightbox";
import { Zoom } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import clsx from "clsx";
import { IoMapOutline, IoStar } from "react-icons/io5";

const CamperDetailsClient = () => {
  const { camperId } = useParams<{ camperId: string }>();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const {
    data: camper,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["camper", camperId],
    queryFn: () => fetchCamperById(camperId),
  });

  if (isLoading) return <Loader />;

  if (error || !camper) return <p>Something went wrong.</p>;

  return (
    <>
      <Container>
        <div className={css.topDiv}>
          <div className={css.gallery}>
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              loop={true}
              spaceBetween={16}
              grabCursor={true}
              modules={[Thumbs]}
              thumbs={{ swiper: thumbsSwiper }}
              className={css.swiper}
            >
              {camper.gallery?.map((img, index) => (
                <SwiperSlide
                  key={img.id}
                  className={css.swiperSlide}
                  onClick={() => {
                    setLightboxIndex(index);
                    setLightboxOpen(true);
                  }}
                >
                  <Image
                    width={638}
                    height={505}
                    alt={camper.name}
                    src={img.original || "/placeholder.png"}
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <p>Click to view in full size</p>
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Thumbs]}
              className={css.swiperBottom}
            >
              {camper.gallery?.map((img) => (
                <SwiperSlide key={img.id} className={css.swiperSlide}>
                  <Image
                    width={136}
                    height={144}
                    alt={camper.name}
                    src={img.thumb || "/placeholder.png"}
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className={css.info}>
            <div className={css.descrBlock}>
              <h2 className={css.name}>{camper.name}</h2>
            </div>
            <div className={css.stats}>
              <p className={css.stat}>
                <IoStar className={clsx(css.icon, css.star)} />
                {camper.rating}({camper.totalReviews}
                {camper.totalReviews === 1 ? " Review" : " Reviews"})
              </p>
              <p className={css.stat}>
                <IoMapOutline className={clsx(css.icon, css.map)} />
                {camper.location}
              </p>
            </div>
            <p className={`${css.price} h2`}>&euro;{camper.price}</p>
            <p className={css.descr}>{camper.description?.slice(0)}</p>
          </div>
          <div className={css.detailsBlock}></div>
        </div>

        <div className={css.bottomDiv}></div>
      </Container>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={camper.gallery?.map((img) => ({ src: img.original })) ?? []}
        index={lightboxIndex}
        plugins={[Zoom]}
        on={{
          view: ({ index }) => swiperRef.current?.slideToLoop(index),
        }}
      />
    </>
  );
};
export default CamperDetailsClient;
