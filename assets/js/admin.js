/** @format */

function togglePasswordVisibility() {
  const passwordInput = document.getElementById("inp-password");
  const passwordToggleIcon = document.getElementById("password-toggle-icon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    passwordToggleIcon.className = "fa fa-eye";
  } else {
    passwordInput.type = "password";
    passwordToggleIcon.className = "fa fa-eye-slash";
  }
}

function togglePasswordVisibilityupdate() {
  const passwordInput = document.getElementById("upd-password");
  const passwordToggleIcon = document.getElementById("password-toggle-icon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    passwordToggleIcon.className = "fa fa-eye";
  } else {
    passwordInput.type = "password";
    passwordToggleIcon.className = "fa fa-eye-slash";
  }
}

async function register() {
  const name = $("#inp-name").val();
  const mobile = $("#inp-mobile").val();
  const email = $("#inp-email").val();
  const password = $("#inp-password").val();

  const url = "http://localhost:8080/saveUser";

  // Regular expression to validate the email address
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Check if the email matches the pattern
  if (!emailPattern.test(email)) {
    $("#reg-response").text("Please enter a valid email address");
    setTimeout(function () {
      $("#reg-response").text(""); // Clear the message after 10 seconds
    }, 10000);
    return; // Exit the function if the email is invalid
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("mobile", mobile);
  formData.append("email", email);
  formData.append("password", password);

  const res = await fetch(url, { method: "POST", body: formData })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Please enter all details`);
      }
      return response.text(); // Extract the response text
    })
    .then((data) => {
      console.log("Response:", data); // Print the response data in the browser console
      $("#reg-response").text(data);
      // Add a timeout to clear the message after 5 seconds (adjust as needed)
      setTimeout(function () {
        $("#reg-response").text(""); // Clear the message
      }, 10000); // 10000 milliseconds (10 seconds)
    })
    .catch((error) => {
      console.error("Error:", error); // Print the error in the browser console
      $("#reg-response").text("Error: " + error.message);
      // Add a timeout to clear the message after 5 seconds (adjust as needed)
      setTimeout(function () {
        $("#reg-response").text(""); // Clear the message
      }, 10000); // 10000 milliseconds (10 seconds)
    });
}

async function login() {
  const email = $("#inp-email").val();
  const password = $("#inp-password").val();

  // Validate the input (you can add more validation as needed)
  if (!email || !password) {
    $("#reg-response").text("Email and password are required.");
    setTimeout(function () {
      $("#reg-response").text(""); // Clear the message after 10 seconds
    }, 10000);
    return;
  }

  // Replace this URL with the actual URL of your new page
  const redirectUrl = "indexclient.html";

  try {
    const response = await fetch(
      "http://localhost:8080/login?email=" + email + "&password=" + password,
      {
        method: "POST", // Assuming you want to use POST for authentication
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (response.status === 200) {
      window.location.href = redirectUrl;
    } else if (response.status === 401) {
      $("#reg-response").text("Incorrect email or password.");
      setTimeout(function () {
        $("#reg-response").text(""); // Clear the message after 10 seconds
      }, 10000);
    } else {
      $("#reg-response").text("An error occurred while checking the email.");
      setTimeout(function () {
        $("#reg-response").text(""); // Clear the message after 10 seconds
      }, 10000);
    }
  } catch (error) {
    $("#reg-response").text("An error occurred:", error);
    setTimeout(function () {
      $("#reg-response").text(""); // Clear the message after 10 seconds
    }, 10000);
  }
}

function updateUserDetails() {
  const email = document.getElementById("inp-email").value;
  const responseElement = document.getElementById("reg-response");

  // Check if email is empty
  if (email.trim() === "") {
    responseElement.textContent = "Please enter an email address.";
    return; // Exit the function early if email is empty
  }

  // If email is not empty, proceed to the update page
  const url = `Update User.html?email=${encodeURIComponent(email)}`;
  window.location.href = url;
}

// function checkEmailInDatabase(email) {
//   // Make an HTTP GET request to your API
//   const apiUrl = `http://localhost:8080/getUserByEmail?email=${encodeURIComponent(
//     email
//   )}`;

//   return fetch(apiUrl)
//     .then((response) => response.json())
//     .then((data) => {
//       return data && data.length > 0; // Return true if email exists in the database, otherwise false
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       return false; // Return false in case of an error
//     });
// }

// function updateUserDetails() {
//   const email = document.getElementById("inp-email").value;
//   const responseElement = document.getElementById("reg-response");

//   // Check if email is empty
//   if (email.trim() === "") {
//     responseElement.textContent = "Email id is missing.";
//     return false; // Prevent the default behavior of the anchor tag
//   }

//   // Check if email is present in the database
//   checkEmailInDatabase(email)
//     .then((isEmailInDatabase) => {
//       if (!isEmailInDatabase) {
//         responseElement.textContent =
//           "Email id is not available in the database.";
//         return false; // Prevent the default behavior of the anchor tag
//       }

//       // If email is valid and exists in the database, proceed to the update page
//       const url = `UpdateUser.html?email=${encodeURIComponent(email)}`;
//       window.location.href = url;
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       responseElement.textContent =
//         "An error occurred while checking the email.";
//     });
// }

function deleteUser() {
  // Get the user ID from the input field
  const userId = document.getElementById("upd-id").value;

  // Confirm with the user before proceeding with deletion
  if (confirm(`Are you sure you want to delete user with ID ${userId}?`)) {
    $.ajax({
      url: "http://localhost:8080/deleteUser?id=" + userId,
      type: "DELETE",
      success: function (response) {
        if (response.success) {
          $("#reg-response").text("User has been deleted successfully.");
          setTimeout(function () {
            $("#reg-response").text(""); // Clear the message after 10 seconds
          }, 10000);
        } else {
          $("#reg-response").text("Failed to delete User.");
          setTimeout(function () {
            $("#reg-response").text(""); // Clear the message after 10 seconds
          }, 10000);
        }
      },
      error: function () {
        alert("An error occurred while deleting the user.");
      },
    });
  }
}

async function getAllUser() {
  const url = "http://localhost:8080/getAllUser";
  const result = await fetch(url, { method: "GET" });
  const globalData = await result.json();
  let num = 1;
  let data = "";
  globalData.forEach((element) => {
    data +=
      "<tr>" +
      "<td>" +
      num +
      "</td>" +
      "<td>" +
      element.id +
      "</td>" +
      "<td>" +
      element.name +
      "</td>" +
      "<td>" +
      element.mobile +
      "</td>" +
      "<td>" +
      element.email +
      "</td>" +
      "</tr>";
    num++;
  });
  $("#td-users").html(data);

  // Update the content of the <span> element with the last value (num)
  const clientCounterSpan = document.getElementById("client-counter");
  clientCounterSpan.textContent = (num - 1).toString();
}
getAllUser();

