import Container from "@/components/Container/Container";
import css from "./Home.module.css";
import { Metadata } from "next";
import ClientRedirect from "./NotFound.client";

export const metadata: Metadata = {
  title: "Non-existent page",
  description: "This page does not exist",
  openGraph: {
    title: "Non-existent page",
    description: "This page does not exist",
    url: `/not-found`, // !!!
    images: [
      {
        url: "/home.jpg", // !!!
        width: 1200,
        height: 630,
        alt: "Campers",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Non-existent page`,
    description: "This page does not exist",
    images: ["/home.jpg"], // !!!
  },
};

const NotFound = () => {
  return (
    <Container className={`${css.container} ${css.nFContainer}`}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.subtitle}>
        Sorry, the page you are looking for does not exist.
      </p>
      <p className={css.subtitle}>
        You will be redirected to the homepage in a while
      </p>

      <ClientRedirect />
    </Container>
  );
};

export default NotFound;
