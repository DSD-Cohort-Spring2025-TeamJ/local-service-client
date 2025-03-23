import { useState } from "react";
import Button from "./Button";
import { Calendar } from "lucide-react";

export default function GoogleOAuthSetup() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOAuthSetup = async () => {
    if (!email) {
      setError("Please enter an email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/calendar/oauth/login?userId=${encodeURIComponent(
          email
        )}`
      );

      if (!response.ok) throw new Error("Failed to get authorization URL.");

      const authUrl = await response.text();
      window.location.href = authUrl;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        text={
          <span className="flex items-center gap-2">
            <Calendar className="w-5 h-5" /> Connect Google Calendar
          </span>
        }
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white hover:cursor-pointer my-4 px-4 py-2 rounded-full shadow transition font-semibold"
      />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl hover:cursor-pointer"
            >
              ✕
            </button>
            <h1 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
              Connect Your Google Calendar
            </h1>
            <p className="text-gray-600 mb-6 text-center">
              Enter your email below to securely connect and sync with Google
              Calendar.
            </p>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-4 shadow focus:ring-2 focus:ring-blue-400 focus:outline-none mb-4 text-gray-700 placeholder-gray-400 transition"
            />
            {error && (
              <p className="text-red-500 mb-4 text-center font-medium">
                {error}
              </p>
            )}
            <Button
              text={loading ? "Redirecting..." : "Login to Google Calendar"}
              onClick={handleOAuthSetup}
              className="w-full bg-blue-500 hover:cursor-pointer hover:bg-blue-600 text-white py-3 rounded-full text-lg shadow-lg transition disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={loading}
            />
          </div>
        </div>
      )}
    </div>
  );
}
