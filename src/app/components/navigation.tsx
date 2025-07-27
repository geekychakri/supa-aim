import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="flex px-4 py-4 justify-between border-b border-r border-l border-dotted border-[#e5e5e5]">
      <p className="text-xl font-semibold">
        <span className="text-[#34B27B]">supa</span>-aim
      </p>
      <Link href="/leaderboard">Leaderboard</Link>
    </nav>
  );
}
