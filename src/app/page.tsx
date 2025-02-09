import CaruselItems from "@/components/carusel/CaruselItems";
import HomeCarusel from "@/components/carusel/HomeCarusel";
import HomeTitle from "@/components/carusel/HomeTitle";

export default function Home() {
  return (
    <main>
      <HomeTitle/>
      <HomeCarusel>
        <CaruselItems />
      </HomeCarusel>
    </main>
  );
}
