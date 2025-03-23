
export default function Footer() {
  return (
<footer className="py-6 px-8 mt-5 bg-gray-100"> 
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">

        <div className="flex items-center mb-4 md:mb-0"> 
      <img src="./phone-icon.png" alt="Phone Icon" className="w-[20px] mr-2" />
        <p className="text-gray-700 text-sm">(555) 555-5555</p>
        </div>


       <div className="flex flex-col items-center mb-4 md:mb-0">
          <p className="text-gray-500 text-sm text-center">
          &copy; 2025 The Pragmatic Plumber. All rights reserved.
          </p>
        </div>


        <div className="flex items-center">
        <img src="./mail-icon.png" alt="Email Icon" className="w-[20px] mr-2" /> 
          <a href="mailto:ThePragPlumb@Plumbing.com" className="text-blue-600 text-sm hover:underline">
          ThePragPlumb@Plumbing.com
          </a>
        </div>
      </div>
    </footer>
  );
}