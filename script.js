const form = document.querySelector("#clientForm");

function fieldValue(formData, key) {
  return String(formData.get(key) || "").trim();
}

function buildEmailBody(formData) {
  const lines = [
    "New private acquisition request from the Soul & Domus website",
    "",
    `Name: ${fieldValue(formData, "name")}`,
    `Email: ${fieldValue(formData, "email")}`,
    `Country: ${fieldValue(formData, "country")}`,
    `Phone / WhatsApp: ${fieldValue(formData, "phone")}`,
    "",
    `Need: ${fieldValue(formData, "need")}`,
    `Budget: ${fieldValue(formData, "budget")}`,
    `Family size: ${fieldValue(formData, "family")}`,
    `Preferred region: ${fieldValue(formData, "region")}`,
    `Decision timing: ${fieldValue(formData, "timing")}`,
    `Preferred size: ${fieldValue(formData, "size")}`,
    "",
    "Property link / expectations / notes:",
    fieldValue(formData, "message"),
    "",
    "Privacy consent: yes"
  ];

  return lines.join("\n");
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    if (fieldValue(formData, "company")) {
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const subject = encodeURIComponent("Soul & Domus - Private Acquisition Review");
    const body = encodeURIComponent(buildEmailBody(formData));
    window.location.href = `mailto:hello@soulanddomus.com?subject=${subject}&body=${body}`;
  });
}
