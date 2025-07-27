import Navigation from "@/app/components/navigation";
import Playground from "./components/playground";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <Navigation />
      <Playground />
      <footer className="border-r border-l border-dotted border-[#e5e5e5] py-4 text-center">
        <span className="text-text-secondary">Created by</span>{" "}
        <a href="https://x.com/geekyChakri" target="_blank">
          @geekyChakri
        </a>
      </footer>
    </div>
  );
}
