const openModalBtn = document.getElementById("open-modal-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const modal = document.getElementById("modal");
// const todoCtn = document.getElementById("todo-ctn");
const todoForm = document.getElementById("todo-form");
const deleteBtn = document.querySelectorAll(".delete-btn");
const checkBtn = document.querySelectorAll(".check-btn");

openModalBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

deleteBtn.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    const todoId = e.target.dataset.id;

    try {
      const res = await fetch(`/todo/${todoId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        window.location.reload();
      } else {
        alert("There was an errror in deleting this todo");
      }
    } catch (err) {
      console.error("There is an error:", err);
      alert("There was an error");
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
  // console.log(data);

  try {
    const res = await fetch("/todo", {
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
      alert("An error occured");
    }
  });
});
