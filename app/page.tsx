import Container from "@/components/Container/Container";
import css from "./Home.module.css";

export default function Home() {
  return (
    <section className={css.section}>
      <Container>
        <h1 className={css.title}>Campers of your dreams</h1>
        <p className={css.subtitle}>
          You can find everything you want in our catalog
        </p>
        {/* Button */}
      </Container>
    </section>
  );
}
