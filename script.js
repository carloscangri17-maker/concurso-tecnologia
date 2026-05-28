const header = document.querySelector(".topbar");
const navLinks = document.querySelectorAll(".nav a");
const form = document.querySelector(".form-card");
const submitButton = document.querySelector(".form-card button");
const advisorSelect = document.querySelector("#has-advisor");
const advisorField = document.querySelector(".advisor-field");
const advisorInput = document.querySelector("#advisor-info");

function setActiveLink() {
  const scrollPosition = window.scrollY + 130;

  navLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (!section) return;

    const starts = section.offsetTop;
    const ends = starts + section.offsetHeight;
    link.classList.toggle("active", scrollPosition >= starts && scrollPosition < ends);
  });
}

function setHeaderShadow() {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
}

function showMessage(text, type) {
  const oldMessage = document.querySelector(".form-message");
  if (oldMessage) oldMessage.remove();

  const message = document.createElement("p");
  message.className = `form-message ${type}`;
  message.textContent = text;
  form.appendChild(message);
}

function updateAdvisorField() {
  const needsAdvisorInfo = advisorSelect.value === "si";

  advisorField.classList.toggle("is-hidden", !needsAdvisorInfo);
  advisorInput.required = needsAdvisorInfo;

  if (!needsAdvisorInfo) {
    advisorInput.value = "";
  }
}

submitButton.addEventListener("click", () => {
  const name = form.querySelector("input[type='text']").value.trim();
  const email = form.querySelector("input[type='email']").value.trim();
  const hasAdvisor = advisorSelect.value;
  const advisorInfo = advisorInput.value.trim();

  if (!name || !email) {
    showMessage("Completa el nombre del proyecto y el correo del equipo.", "error");
    return;
  }

  if (!hasAdvisor) {
    showMessage("Indica si el equipo tiene docente o acompañante.", "error");
    return;
  }

  if (hasAdvisor === "si" && !advisorInfo) {
    showMessage("Especifica la información del docente o acompañante.", "error");
    return;
  }

  showMessage("Registro listo para enviar. Revisa los datos antes de entregarlo.", "success");
});

advisorSelect.addEventListener("change", updateAdvisorField);

document.querySelectorAll(".download-row a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    alert("Esta plantilla se puede agregar cuando tengas el documento final.");
  });
});

window.addEventListener("scroll", () => {
  setHeaderShadow();
  setActiveLink();
});

setHeaderShadow();
setActiveLink();
updateAdvisorField();
