export default function Footer() {
  return (
    <footer className="py-6 px-8 mt-5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-gray-700 text-sm text-center md:text-left">
          <p>200 Agile Avenue</p>
          <p>Pflugerville, TX</p>
        </div>

        <p className="text-gray-500 text-sm text-center">
          &copy; 2025 The Pragmatic Plumber. All rights reserved.
        </p>

        <p className="text-blue-600 text-sm hover:underline">
          <a href="mailto:ThePragPlumb@Plumbing.com">
            ThePragPlumb@Plumbing.com
          </a>
        </p>
      </div>
    </footer>
  );
}
