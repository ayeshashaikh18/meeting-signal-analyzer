async function analyseTranscript() {
  const transcript = document.getElementById("transcript").value;
  const results = document.getElementById("results");

  if (!transcript.trim()) {
    alert("Please enter a transcript.");
    return;
  }

  results.innerHTML = `
    <div class="loading">
      Analyzing transcript...
    </div>
  `;

  try {
    const response = await fetch(
      "http://localhost:5000/analyse",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          transcript
        })
      }
    );

    const data = await response.json();

    results.innerHTML = "";

    if (!data.signals || data.signals.length === 0) {
      results.innerHTML = `
        <div class="card">
          No signals detected.
        </div>
      `;
      return;
    }

    data.signals.forEach(signal => {

      const title =
        signal.type
          .replaceAll("_", " ")
          .replace(/\b\w/g, c => c.toUpperCase());

      results.innerHTML += `
        <div class="card ${signal.type}">
          
          <div class="signal-header">
            ${title}
          </div>

          <div class="section">
            <span class="label">Quote</span>
            <p>${signal.quote}</p>
          </div>

          <div class="section">
            <span class="label">Coaching Tip</span>
            <p>${signal.tip}</p>
          </div>

        </div>
      `;
    });

  } catch (error) {
    console.error(error);

    results.innerHTML = `
      <div class="error">
        Failed to analyze transcript.
      </div>
    `;
  }
}