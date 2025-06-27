const entries = [];

function submitInput() {
  const input = document.getElementById("userInput").value.trim();
  if (input) {
    entries.push(input);
    updateDisplay();
    saveToDynamoDB(input);
    document.getElementById("userInput").value = "";
  }
}

function updateDisplay() {
  const display = document.getElementById("display");
  display.innerHTML = "<strong>You submitted:</strong><ul>" +
    entries.map(item => `<li>${item}</li>`).join("") +
    "</ul>";
}

function saveToDynamoDB(input) {
  fetch("https://5crw9zyyf3.execute-api.us-east-1.amazonaws.com/dev/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ client_name: input })
  })
  .then(res => res.json())
  .then(data => console.log("Saved to DynamoDB:", data))
  .catch(err => console.error("Error saving:", err));
}
