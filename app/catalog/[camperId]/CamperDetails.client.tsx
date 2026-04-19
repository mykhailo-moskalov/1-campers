"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import {
  fetchCamperById,
  fetchCamperReviews,
  sendBookingRequest,
} from "@/lib/api/clientApi";
import css from "./CamperDetails.module.css";
import Container from "@/components/Container/Container";
import Loader from "@/components/Loader/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Thumbs } from "swiper/modules";
import "swiper/css/bundle";
import Lightbox from "yet-another-react-lightbox";
import { Zoom } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import clsx from "clsx";
import { IoMapOutline, IoStar } from "react-icons/io5";
import BadgesList from "@/components/BadgesList/BadgesList";
import { useBookingDraftStore } from "@/lib/store/bookingStore";
import { Booking, BookingResponse } from "@/types/booking";
import toast from "react-hot-toast";
import Btn from "@/components/Button/Button";
import StarRating from "@/components/StarRating/StarRating";

const CamperDetailsClient = () => {
  const { camperId } = useParams<{ camperId: string }>();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const { draft, setDraft, clearDraft } = useBookingDraftStore();

  const { mutate } = useMutation({
    mutationFn: (book: Booking) => sendBookingRequest(camperId, book),
    onSuccess: (data: BookingResponse) => {
      toast.success(data.message, {
        duration: 4000,
      });
      clearDraft();
    },
    onError: () =>
      toast.error("Failed to send booking.", {
        duration: 4000,
      }),
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (formData: FormData) => {
    const rawValues = Object.fromEntries(formData.entries());
    const values: Booking = {
      name: String(rawValues.name || ""),
      email: String(rawValues.email || ""),
    };
    mutate(values);
  };

  const {
    data: camper,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["camper", camperId],
    queryFn: () => fetchCamperById(camperId),
  });

  const { data: reviews } = useQuery({
    queryKey: ["reviews", camperId],
    queryFn: () => fetchCamperReviews(camperId),
  });

  const formatLabel = (value: string) =>
    value.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  if (isLoading) return <Loader />;

  if (error || !camper) return <p>Something went wrong.</p>;

  return (
    <>
      <Container>
        <div className={css.detailsLayout}>
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
              <p className={css.hint}>Click to view in full size</p>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={32}
                slidesPerView={4}
                watchSlidesProgress={true}
                modules={[Thumbs]}
                className={css.swiperThumbs}
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
              <div className={css.detailsBlock}>
                <h2 className={css.detailsBlockTitle}>Vehicle details</h2>
                <BadgesList
                  engine={camper.engine}
                  transmission={camper.transmission}
                  form={camper.form}
                  amenities={camper.amenities}
                  className={css.badges}
                />
                <p className={css.hint}>
                  Scroll to see more characteristics &rarr;
                </p>
                <hr className={css.divider} />
                <ul className={css.detailsList}>
                  <li className={css.detailsListItem}>
                    <p className={css.detailName}>Form</p>
                    <p className={css.detailValue}>
                      {formatLabel(camper.form)}
                    </p>
                  </li>
                  <li className={css.detailsListItem}>
                    <p className={css.detailName}>Length</p>
                    <p className={css.detailValue}>{camper.length}</p>
                  </li>
                  <li className={css.detailsListItem}>
                    <p className={css.detailName}>Width</p>
                    <p className={css.detailValue}>{camper.width}</p>
                  </li>
                  <li className={css.detailsListItem}>
                    <p className={css.detailName}>Height</p>
                    <p className={css.detailValue}>{camper.height}</p>
                  </li>
                  <li className={css.detailsListItem}>
                    <p className={css.detailName}>Tank</p>
                    <p className={css.detailValue}>{camper.tank}</p>
                  </li>
                  <li className={css.detailsListItem}>
                    <p className={css.detailName}>Consumption</p>
                    <p className={css.detailValue}>{camper.consumption}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className={css.bottomDiv}>
            <h2 className={css.reviewsTitle}>Reviews</h2>
            <div>
              <ul className={css.reviewsList}>
                {reviews?.map((r) => (
                  <li key={r.id} className={css.reviewItem}>
                    <div className={css.userDiv}>
                      <p className={clsx("h2", css.avatar)}>
                        {r.reviewer_name.slice(0, 1)}
                      </p>
                      <div className={css.nameDiv}>
                        <p className={css.reviewerName}>{r.reviewer_name}</p>
                        <StarRating rating={r.reviewer_rating} />
                      </div>
                    </div>
                    <p className={css.reviewComment}>{r.comment}</p>
                  </li>
                ))}
              </ul>
              <form action={handleSubmit} className={css.form}>
                <h3 className={css.formTitle}>Book your campervan now</h3>
                <p className={css.formSubtitle}>
                  Stay connected! We are always ready to help you.
                </p>
                <div className={css.inputsWrap}>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Name*"
                    className={css.input}
                    defaultValue={draft?.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    id="email"
                    type="text"
                    name="email"
                    placeholder="Email*"
                    className={css.input}
                    defaultValue={draft?.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Btn type="submit">Send</Btn>
              </form>
            </div>
          </div>
        </div>
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
