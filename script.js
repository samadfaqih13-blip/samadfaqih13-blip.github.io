document.addEventListener("DOMContentLoaded", () => {
    setActiveNavigation();
    animateSkillBars();
    setupContactForm();
});

function setActiveNavigation() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-menu a").forEach((link) => {
        const isCurrentPage = link.getAttribute("href") === currentPage;
        link.classList.toggle("active", isCurrentPage);
        if (isCurrentPage) link.setAttribute("aria-current", "page");
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-bar div[data-level]");
    if (!skillBars.length) return;

    const showSkillLevels = () => skillBars.forEach((bar) => {
        bar.style.width = `${bar.dataset.level}%`;
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        showSkillLevels();
        return;
    }

    const observer = new IntersectionObserver((entries, skillObserver) => {
        if (entries.some((entry) => entry.isIntersecting)) {
            showSkillLevels();
            skillObserver.disconnect();
        }
    }, { threshold: 0.25 });

    observer.observe(document.querySelector(".skills"));
}

function setupContactForm() {
    const form = document.querySelector(".contact-form");
    if (!form) return;

    const status = form.querySelector(".form-status");
    const fields = [...form.querySelectorAll("input, textarea")];

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        fields.forEach((field) => field.classList.remove("input-error"));

        const invalidField = fields.find((field) => !field.checkValidity());
        if (invalidField) {
            invalidField.classList.add("input-error");
            invalidField.focus();
            showFormStatus(status, "Mohon lengkapi form dengan data yang valid.", "error");
            return;
        }

        const name = document.querySelector("#name").value.trim();
        showFormStatus(status, `Terima kasih, ${name}! Pesan Anda berhasil disiapkan.`, "success");
        form.reset();
    });
}

function showFormStatus(status, message, type) {
    status.textContent = message;
    status.className = `form-status ${type}`;
}
