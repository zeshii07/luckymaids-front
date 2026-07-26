const DEFAULT_QUESTIONS = [
  "Which cleaning service is right for me?",
  "How can I request a price quote?",
  "Do you clean apartments and villas?",
  "Which areas in Dubai do you serve?",
];

export default function SuggestedQuestions({
  questions = DEFAULT_QUESTIONS,
  onSelect,
  disabled = false,
}) {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Suggested questions">
      {questions.map((question) => (
        <button
          key={question}
          type="button"
          onClick={() => onSelect(question)}
          disabled={disabled}
          className="rounded-full border border-crystal-200 bg-crystal-50 px-3.5 py-2 text-left text-xs font-semibold leading-5 text-crystal-800 transition hover:border-crystal-300 hover:bg-crystal-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {question}
        </button>
      ))}
    </div>
  );
}