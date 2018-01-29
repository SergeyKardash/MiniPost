class UI {
  constructor() {
    this.post = document.querySelector("#posts");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.postSubmit = document.querySelector(".post-submit");
    this.endForm = document.querySelector(".form-end");
    this.forState = "add";
  }

  showPosts(posts) {
    let output = "";

    posts.forEach(post => {
      output += `
        <div class="card mb-3">
          <div class="card-body clearfix">
            <div class="float-right">
              <a href="#" class="edit card-link" data-id="${post.id}">
                <i class="fa fa-pencil"></i>
              </a>

              <a href="#" class="delete card-link" data-id="${post.id}">
                <i class="fa fa-remove"></i>
              </a>
            </div>  
            <h4 class="card-title"> ${post.title} </h4>
            <p class="card-text"> ${post.body} </p>
          </div>
        </div>
      `;
    });

    this.post.innerHTML = output;
  }

  clearFields() {
    this.titleInput.value = "";
    this.bodyInput.value = "";
  }

  clearIDInput() {
    this.idInput.nodeValue = "";
  }

  showAlert(message, className) {
    this.clearAlert();
    const div = document.createElement("div");
    div.className = className;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".postsContainer");
    const posts = document.querySelector("#posts");
    container.insertBefore(div, posts);

    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    const currentAlert = document.querySelector(".alert");
    if (currentAlert) {
      currentAlert.remove();
    }
  }

  fillForm(post) {
    this.titleInput.value = post.title;
    this.bodyInput.value = post.body;
    this.idInput.value = post.id;

    this.changeFormState("edit");
  }

  changeFormState(type) {
    if (type === "edit") {
      this.postSubmit.textContent = "Update post";
      this.postSubmit.className = "post-submit btn btn-warning btn-block";

      const cancelButton = document.createElement("button");
      cancelButton.className = "btn btn block cancel btn-secondary mt-2";
      cancelButton.appendChild(document.createTextNode("Cancel Edit"));
      const parentDiv = document.querySelector(".card-form");
      parentDiv.insertBefore(cancelButton, this.endForm);
    } else {
      this.postSubmit.textContent = "Post It";
      this.postSubmit.className = "post-submit btn btn-dark btn-block";
      if (document.querySelector(".cancel")) {
        document.querySelector(".cancel").remove();
      }
      this.clearIDInput();
      this.clearFields();
    }
  }
}

export const ui = new UI();
