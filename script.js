// Assemble the address in the browser so it never appears in the page source as plain text.
const ADDRESS = atob("YWdhdGEuZGFsYWNoQHR1bS5kZQ==");

document.querySelectorAll("[data-mail-link]").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "mailto:" + ADDRESS;
  });
});

document.querySelectorAll("[data-mail-text]").forEach((el) => {
  el.textContent = ADDRESS;
});
