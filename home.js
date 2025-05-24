document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".navbar-link");
  const iframe = document.getElementById("dashboardlink");
  const dashboardUrl = localStorage.getItem("dashboardUrl");

  if (iframe && dashboardUrl) {
    iframe.src = dashboardUrl;
  }
  const sectionsMap = {
    Home: document.getElementById("Home"),
    About: document.getElementById("About"),
    Team: document.getElementById("Team"),
    Dashboard: document.getElementById("Dashboard"),
  };

  const hideAllSections = () => {
    Object.values(sectionsMap).forEach((section) => {
      if (section) section.style.display = "none";
    });
  };

  // Navigation click handler
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);

      hideAllSections();
      if (sectionsMap[targetId]) {
        sectionsMap[targetId].style.display = "flex";
        sectionsMap[targetId].scrollIntoView({ behavior: "smooth" });
      }

      // Update active class
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Display Home by default
  if (sectionsMap.Home) sectionsMap.Home.style.display = "flex";

  // Adjust video speed if present
  const video = document.getElementById("myVideo");
  if (video) video.playbackRate = 3.0;
  const logout = document.getElementById("out");
  logout.addEventListener("click", () => {
    window.location.href = "index.html";
    alert("logged out successfully");
  });
});

function showDetails(name, role, imgPath, skills, bio, contact, git) {
  const detailsDiv = document.getElementById("memberDetails");

  // Remove highlight from all
  const memberCards = document.querySelectorAll(
    ".ctmimg1 , .ctmimg2, .ctmimg3"
  );
  memberCards.forEach((card) => card.classList.remove("border-highlight"));

  // Add highlight to the clicked member card
  event.currentTarget.classList.add("border-highlight");

  detailsDiv.innerHTML = `
    <img src="${imgPath}" alt="${name}" class="w-32 h-auto mx-auto rounded-full border-4 border-white shadow-lg mb-4" />
    <div class="">
      <h2 class="text-4xl font-bold">${name}</h2>
      <h3 class="text-xl"><strong>Role   :</strong> ${role}</h3>
      <h3 class="text-xl"><strong>Skills :</strong> ${skills}</h3>
      <h3 class="text-xl"><strong>Bio    :</strong> ${bio}</h3>
      <h3 class="text-xl"><strong>Contact:</strong> ${contact}</h3>
      <h3 class="text-xl"><strong>Github :</strong> ${git}</h3>
    </div>
  `;
}
