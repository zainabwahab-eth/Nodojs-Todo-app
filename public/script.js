const openModalBtn = document.getElementById("open-modal-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const closeLogoutBtn = document.getElementById("close-logout-btn");
const modal = document.getElementById("modal");
const logoutModal = document.getElementById("logout-modal");
const logoutOverlay = document.getElementById("logout-overlay");
const addFormOverlay = document.getElementById("add-todo-overlay");
const todoForm = document.getElementById("todo-form");
const openLogoutModalBtn = document.querySelector(".open-logout-modal-btn");
const allTabs = document.querySelectorAll(".tab");
const deleteBtn = document.querySelectorAll(".delete-btn");
const checkBtn = document.querySelectorAll(".check-btn");

const openFormModal = function () {
  modal.classList.remove("hidden");
  addFormOverlay.classList.remove("hidden");
};

const closeFormModal = function () {
  modal.classList.add("hidden");
  addFormOverlay.classList.add("hidden");
};

const openLogoutModal = function () {
  logoutModal.classList.remove("hidden");
  logoutOverlay.classList.remove("hidden");
};

const closeLogoutModal = function () {
  logoutModal.classList.add("hidden");
  logoutOverlay.classList.add("hidden");
};

///Add Todo Form Overlay

openModalBtn.addEventListener("click", openFormModal);

closeModalBtn.addEventListener("click", closeFormModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeFormModal();
  }
});

addFormOverlay.addEventListener("click", closeFormModal);

///Logout Overlay

openLogoutModalBtn.addEventListener("click", openLogoutModal);
logoutOverlay.addEventListener("click", closeLogoutModal);
closeLogoutBtn.addEventListener("click", closeLogoutModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !logoutModal.classList.contains("hidden")) {
    closeLogoutModal();
  }
});

deleteBtn.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    const todoId = e.target.dataset.id;

    try {
      const res = await fetch(`/todo/delete/${todoId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        btn.closest(".todo-ctn").remove();
      } else {
        alert("There was an error in deleting this todo");
      }
    } catch (err) {
      console.error("There is an error:", err);
      alert("There was an error");
    }
  });
});

checkBtn.forEach((btn) => {
  btn.addEventListener("change", async (e) => {
    const button = e.currentTarget;
    const todoId = button.dataset.id;
    const todoStatus = button.dataset.status;
    const currentStatus = todoStatus === "pending" ? "completed" : "pending";

    try {
      const res = await fetch(`/todo/${todoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: currentStatus,
        }),
      });
      if (res.ok) {
        window.location.reload();
      } else {
        alert("There was an error");
      }
    } catch (err) {
      alert("An error occurred");
    }
  });
});

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
      alert("failed to add todo");
    }
  } catch (err) {
    console.error("Error adding todo:", err);
    alert("An error occured");
  }
});
