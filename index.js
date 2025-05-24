function onLogin(e) {
  e.preventDefault();

  const userEmail = document.getElementById("username").value;
  const userPassword = document.getElementById("password").value;

  const iframe = document.querySelector("#dashboardlink"); // just one iframe

  const dashboardUrls = {
    1: "https://us1.ca.analytics.ibm.com/bi/?perspective=dashboard&amp;pathRef=.my_folders%2FAdmin%2BDashboard&amp;closeWindowOnLastView=true&amp;ui_appbar=false&amp;ui_navbar=false&amp;shareMode=embedded&amp;action=view&amp;mode=dashboard&amp;subView=model00000196c4cf4281_00000000",
    2: "https://us1.ca.analytics.ibm.com/bi/?perspective=dashboard&pathRef=.my_folders%2FTeacher&closeWindowOnLastView=true&ui_appbar=false&ui_navbar=false&shareMode=embedded&action=view&mode=dashboard&subView=model00000196c4e62891_00000004",
    3: "https://us1.ca.analytics.ibm.com/bi/?perspective=dashboard&amp;pathRef=.my_folders%2FStudent&amp;closeWindowOnLastView=true&amp;ui_appbar=false&amp;ui_navbar=false&amp;shareMode=embedded&amp;action=view&amp;mode=dashboard&amp;subView=model00000196c53edf35_00000000",
  };

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const loggedInUser = users.find(
    (u) => u.email === userEmail && u.password === userPassword
  );

  if (loggedInUser) {
    // Store current user for session if needed
    localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
    window.location.href = "home.html"; // Go to home page

    if (iframe && dashboardUrls[loggedInUser.role]) {
      iframe.src = dashboardUrls[loggedInUser.role];
    }
  } else {
    alert("Login failed: Invalid credentials");
  }
}

function onRegister(e) {
  e.preventDefault();

  const roleElements = document.getElementsByName("roles");
  let selectedRole = null;
  for (let role of roleElements) {
    if (role.checked) {
      selectedRole = role.value;
      break;
    }
  }

  if (!selectedRole) {
    alert("Please select a role");
    return;
  }

  const newUser = {
    email: document.getElementById("regusername").value,
    password: document.getElementById("regpassword").value,
    role: selectedRole,
  };

  // Get existing users or initialize an empty array
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check for duplicates
  const userExists = users.some((user) => user.email === newUser.email);
  if (userExists) {
    alert("This email is already registered.");
    return;
  }

  // Add new user and update localStorage
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful! You can now log in.");
  console.log("User registered:", newUser);

  // Switch to login view
  document.getElementById("login").style.display = "block";
  document.getElementById("register").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  const login = document.getElementById("logbtn");
  const register = document.getElementById("regbtn");

  login.addEventListener("click", () => {
    document.getElementById("login").style.display = "block";
    document.getElementById("register").style.display = "none";
  });

  register.addEventListener("click", () => {
    document.getElementById("register").style.display = "block";
    document.getElementById("login").style.display = "none";
  });
});
