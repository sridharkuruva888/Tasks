const API_KEY = "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"; // Replace this yourself locally

const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

async function sendMessage() {

    const message = userInput.value.trim();

    if (!message) return;

    addMessage(message, "user");
    userInput.value = "";

    const loading = addMessage("Thinking...", "bot");

    try {

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {

            method: "POST",

            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                model: "openai/gpt-4o-mini",
                messages: [
                    {
                        role: "user",
                        content: message
                    }
                ]
            })

        });

        const data = await response.json();

        loading.remove();

        if (data.error) {
            addMessage("Error: " + data.error.message, "bot");
            return;
        }

        const reply = data.choices[0].message.content;

        addMessage(reply, "bot");

    } catch (err) {

        loading.remove();
        addMessage("Something went wrong.", "bot");
        console.log(err);

    }

}

function addMessage(text, type) {

    const div = document.createElement("div");

    div.className = "message " + type;

    div.textContent = text;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;

    return div;

}