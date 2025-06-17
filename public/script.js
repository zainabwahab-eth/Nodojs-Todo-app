const openModalBtn = document.getElementById("open-modal-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const closeLogoutBtn = document.getElementById("close-logout-btn");
const modal = document.getElementById("modal");
const logoutModal = document.getElementById("logout-modal");
const logoutOverlay = document.getElementById("logout-overlay");
const addFormOverlay = document.getElementById("add-todo-overlay");
const todoForm = document.getElementById("todo-form");
const openLogoutModalBtn = document.querySelector(".open-logout-modal-btn");
const todoCntns = document.querySelector(".todos-ctns");
const errorDiv = document.getElementById("todo-error-message");

const toggleModal = (el, overlay, show = true) => {
  el.classList.toggle("hidden", !show);
  overlay.classList.toggle("hidden", !show);
};

///Add Todo Form Overlay

openModalBtn.addEventListener("click", () => {
  toggleModal(modal, addFormOverlay, true);
});
closeModalBtn.addEventListener("click", () => {
  toggleModal(modal, addFormOverlay, false);
});
addFormOverlay.addEventListener("click", () => {
  toggleModal(modal, addFormOverlay, false);
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    toggleModal(modal, addFormOverlay, false);
  }
});

///Logout Overlay

openLogoutModalBtn.addEventListener("click", () => {
  toggleModal(logoutModal, logoutOverlay, true);
});
closeLogoutBtn.addEventListener("click", () => {
  toggleModal(logoutModal, logoutOverlay, false);
});
logoutOverlay.addEventListener("click", () => {
  toggleModal(logoutModal, logoutOverlay, false);
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !logoutModal.classList.contains("hidden")) {
    toggleModal(logoutModal, logoutOverlay, false);
  }
});

//Handle Error
function showError(message) {
  errorDiv.textContent = message;
  setTimeout(() => {
    errorDiv.textContent = "";
  }, 5000);
}

//Delete Todo
todoCntns.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    console.log("I'm clicked");
    const todoCtn = e.target.closest(".todo-ctn");
    const todoId = todoCtn.dataset.id;

    try {
      const res = await fetch(`/todo/delete/${todoId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        todoCtn.remove();
      } else {
        showError("There was an error in deleting this todo");
      }
    } catch (err) {
      console.error("There is an error:", err);
      showError("There was an error");
    }
  }
});

//Mark todo complete/uncomplete
todoCntns.addEventListener("change", async (e) => {
  if (e.target.classList.contains("check-btn")) {
    console.log("I'm clicked");
    const todoCtn = e.target.closest(".todo-ctn");
    const { id, status } = todoCtn.dataset;
    const newStatus = status === "pending" ? "completed" : "pending";

    try {
      const res = await fetch(`/todo/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });
      if (res.ok) {
        window.location.reload();
      } else {
        showError("There was an error in completing this todo");
      }
    } catch (err) {
      showError("An error occurred");
    }
  }
});

//Add new todo
todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(todoForm);
  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
  };

  try {
    const res = await fetch("/todo/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      window.location.reload();
    } else {
      showError("failed to add todo");
    }
  } catch (err) {
    console.error("Error adding todo:", err);
    showError("An error occured");
  }
});
