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

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fall back for browsers that deny the async clipboard API.
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand("copy");
    field.remove();
    return ok;
  }
}

document.querySelectorAll("[data-copy]").forEach((btn) => {
  const icon = btn.querySelector(".icon");
  const copyIcon = icon.style.getPropertyValue("--icon");
  btn.addEventListener("click", async () => {
    if (!(await copyText(btn.dataset.copy))) return;
    icon.style.setProperty("--icon", "url(assets/check.svg)");
    btn.title = "Copied";
    setTimeout(() => {
      icon.style.setProperty("--icon", copyIcon);
      btn.title = "Copy ORCID iD";
    }, 1500);
  });
});
