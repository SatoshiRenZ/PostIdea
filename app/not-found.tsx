import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container mt-5 text-center">
      <h1>404 - Page Not Found</h1>
      <p>Maaf, Halaman yang kamu cari salah atau tidak ada.</p>
      <Link href="/" className="btn btn-primary mt-3">
        Kembali Ke Beranda
      </Link>
    </main>
  );
}