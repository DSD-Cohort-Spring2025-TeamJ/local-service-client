import { useState } from "react";
import PropTypes from "prop-types";
import { Sparkles } from "lucide-react";

const IssueDescriptionForm = ({ onClassify }) => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleClassifyClick = async () => {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(
        "https://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/classifyServiceDescription",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ issueDescription: description }),
        }
      );
      const data = await res.json();
      setResult(data);
      onClassify({ ...data, userPrompt: description });
    } catch (err) {
      setError(`Failed to classify the issue. ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 p-6 bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-100">
      <div className="flex items-center gap-2 text-green-700 mb-2">
        <Sparkles className="w-6 h-6 animate-pulse" />
        <h2 className="text-2xl font-bold">AI Issue Classification</h2>
      </div>
      <p className="text-gray-600 mb-2">
        Describe your plumbing issue below, and let our AI suggest the best
        service category and estimated time.
      </p>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        placeholder="Describe your plumbing issue..."
        className="border border-gray-300 p-4 rounded-xl shadow-sm focus:ring-2 focus:ring-green-300 transition resize-none"
      />
      {error && <p className="text-red-500 font-medium">{error}</p>}

      <button
        type="button"
        disabled={loading || !description}
        onClick={handleClassifyClick}
        className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white px-5 py-3 rounded-full text-lg transition shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? "🔎 Analyzing..." : "✨ Classify with AI"}
      </button>

      {result && (
        <div className="bg-green-100 border border-green-300 rounded-xl p-4 mt-6 shadow-inner animate-fade-in">
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            AI Prediction:
          </h3>
          <p className="text-gray-700 mb-1">
            <strong>🔧 Service Category:</strong> {result.category}
          </p>
          <p className="text-gray-700">
            <strong>⏳ Estimated Time:</strong> {result.estimatedTime} hour(s)
          </p>
        </div>
      )}
    </div>
  );
};

IssueDescriptionForm.propTypes = {
  onClassify: PropTypes.func.isRequired,
};

export default IssueDescriptionForm;
