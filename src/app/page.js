'use client'
import { useState } from 'react';

export default function Home() {
  const [result, setResult] = useState(null);
  const [ready, setReady] = useState(null);
  const [res, setRes] = useState(null);

  const classify = async (text) => {
    if (!text) return;
    if (ready === null) setReady(false);

    // Make a request to the /classify route on the server.
    const response = await fetch(`/classify?text=${encodeURIComponent(text)}`);

    // If this is the first time we've made a request, set the ready flag.
    if (!ready) setReady(true);

    const json = await response.json();
    setResult(json);

    // Update the 'res' state based on the classification result.
    if (json && json.length > 0) {
      setRes(json[0].label === 'NEGATIVE' ? 'Hate' : 'Hope');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12">
      <h1 className="text-5xl font-bold mb-2 text-center">Hate Speech Recognizer</h1>
      <h2 className="text-2xl mb-4 text-center">A NLP based Web App by</h2>
      <h3 className="text-1xl mb-4 text-center">Aleena Patani - Harikrishnan K C - Amigashabnam F</h3>
      <input
        type="text"
        className="w-full max-w-xs p-2 border border-gray-300 rounded mb-4"
        placeholder="Enter text here"
        onInput={(e) => {
          classify(e.target.value);
        }}
      />

      {ready !== null && (
        <pre className="bg-gray-100 p-2 rounded">
          {!ready || !result
            ? 'Loading...'
            : result[0].label === 'NEGATIVE'
            ? 'THIS IS A HATE SPEECH'
            : 'THIS IS A HOPE SPEECH'}
          {result ? (
            <div className="progress-container">
            <div className="progress" style={{ width: `${result[0].score * 100}%`, backgroundColor: `${res === "Hate" ? "#af4c4c" : "#4caf50"}`, }}>
  {res} Score is: {(result[0].score * 100).toFixed(2)}
</div>

            </div>
          ) : null}
        </pre>
      )}
    </main>
  );
}
