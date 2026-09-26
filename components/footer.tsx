import Image from "next/image";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#070807]">
      <div className="container flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-2 font-black">
          <Image src="/assets/logo.png" width={30} height={30} alt="FitLog" />
          <span>FITLOG</span>
        </Link>
        <p className="text-sm text-zinc-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
