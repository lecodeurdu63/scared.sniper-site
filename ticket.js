
const form = document.getElementById("ticketForm");
const confirmation = document.getElementById("confirmation");
form.addEventListener("submit", function(e) {
  e.preventDefault();
  const ticket = {
    username: form.username.value,
    email: form.email.value,
    message: form.message.value,
    response: null,
    id: Date.now()
  };
  const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
  tickets.push(ticket);
  localStorage.setItem("tickets", JSON.stringify(tickets));
  form.reset();
  confirmation.style.display = "block";
});
