import { http } from "./http";
import { ui } from "./ui";

// Get Posts on DOM load
document.addEventListener("DOMContentLoaded", getPosts);

// Listen for add post
document.querySelector(".post-submit").addEventListener("click", submitPost);

// Listen for delete
document.querySelector("#posts").addEventListener("click", deletePost);

// Listen for edit
document.querySelector("#posts").addEventListener("click", editPost);

// Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit)

// Get posts
function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

// Submit post
function submitPost() {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;
  const id = document.querySelector("#id").value;

  if (title === "" || body === "") {
    ui.showAlert("Please fill in all fields", "alert alert-danger");
  } else {
    const data = {
      title,
      body
    };
    if (id === '') {
      http
      .post("http://localhost:3000/posts", data)
      .then(data => {
        ui.showAlert("Post added", "alert alert-success");
        ui.clearFields();
        getPosts();
      })
      .catch(err => console.log(err));
    } else {
      http.put(`http://localhost:3000/posts/${id}`, data)
      .then(data => {
        ui.showAlert("Post edited", "alert alert-success");
        ui.changeFormState('add');
        getPosts();
      })
      .catch (err => console.log(err));
    }
  }
}

// Delete Post
function deletePost(e) {
  if (e.target.parentElement.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id;
    const post = `http://localhost:3000/posts/${id}`;
    if (confirm("Are you sure?")) {
      http
        .delete(post)
        .then(data => {
          ui.showAlert("Post removed", "alert alert-danger");
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
  e.preventDefault();
}

// Edit post
function editPost(e) {
  if (e.target.parentElement.classList.contains("edit")) {
    const id = e.target.parentElement.dataset.id;
    const postUrl = `http://localhost:3000/posts/${id}`;
    const title =
      e.target.parentElement.parentElement.nextElementSibling.textContent;
    const body =
      e.target.parentElement.parentElement.nextElementSibling.nextElementSibling
        .textContent;
    const data = {
      title,
      body,
      id
    };
    ui.fillForm(data);
  }
  e.preventDefault();
}

// Cancel edit
function cancelEdit (e) {
  if (e.target.classList.contains('cancel')){
    ui.changeFormState('add')
  } 
  e.preventDefault()
}
