
const loginForm = document.getElementById("loginForm");
const loginSection = document.getElementById("loginSection");
const adminSection = document.getElementById("adminSection");
const loginError = document.getElementById("loginError");

const CORRECT_USERNAME = "admin";
const CORRECT_PASSWORD = "Scared134356032";

loginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
    loginSection.style.display = "none";
    adminSection.style.display = "block";
    renderTickets();
  } else {
    loginError.style.display = "block";
  }
});

const ticketList = document.getElementById("ticketList");
let tickets = JSON.parse(localStorage.getItem("tickets") || "[]");

function renderTickets() {
  ticketList.innerHTML = "";
  if (tickets.length === 0) {
    ticketList.innerHTML = "<p>Aucun ticket.</p>";
    return;
  }

  tickets.forEach(ticket => {
    const div = document.createElement("div");
    div.className = "ticket";

    div.innerHTML = `
      <p><strong>Utilisateur :</strong> ${ticket.username}</p>
      <p><strong>Email :</strong> ${ticket.email || "Non fourni"}</p>
      <p><strong>Message :</strong><br>${ticket.message}</p>
      <p><strong>Réponse :</strong><br>${ticket.response || "<i>Non répondu</i>"}</p>
      <textarea placeholder="Répondre..." id="resp-${ticket.id}">${ticket.response || ""}</textarea>
      <div class="ticket-buttons">
        <button onclick="replyTicket(${ticket.id})">Répondre</button>
        <button onclick="deleteTicket(${ticket.id})">Supprimer</button>
      </div>
    `;
    ticketList.appendChild(div);
  });
}

function replyTicket(id) {
  const response = document.getElementById(`resp-${id}`).value;
  tickets = tickets.map(t => t.id === id ? { ...t, response } : t);
  localStorage.setItem("tickets", JSON.stringify(tickets));
  renderTickets();
}

function deleteTicket(id) {
  tickets = tickets.filter(t => t.id !== id);
  localStorage.setItem("tickets", JSON.stringify(tickets));
  renderTickets();
}
