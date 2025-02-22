import BottomBar from "../components/BottomBar";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-start h-screen p-20 space-y-20 bg-background">
      <h1 className="text-6xl font-black italic">Hey!</h1>
      <p className="text-xl text-center">
        Hasta parece que tenemos algo,ahora falta hacerlo
      </p>
      <BottomBar />
    </main>
  );
}
