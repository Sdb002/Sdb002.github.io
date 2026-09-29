import Nav from "./components/Nav.jsx";
import About from "./sections/About.jsx";
import Contact from "./sections/Contact.jsx";
import Hero from "./sections/Hero.jsx";
import Research from "./sections/Research.jsx";
import Stack from "./sections/Stack.jsx";
import Work from "./sections/Work.jsx";

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <main>
        <About />
        <Stack />
        <Work />
        <Research />
      </main>
      <Contact />
    </>
  );
}
