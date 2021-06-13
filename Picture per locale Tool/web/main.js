var msgElement = document.getElementById("msg");

var loadingButtonUpload = document.getElementById("loading_upload");
var uploadBtn = document.getElementById("submit_upload_btn");

var merchant_id_error = document.getElementById("merchant_id_error");
var merchant_id = document.getElementById("merchant_id");

var folder_path_btn = document.getElementById("folder_path_btn");
var folder_path_val = document.getElementById("folder_path_val");
var folder_path_error = document.getElementById("folder_path_error");
var folder_path = "";

// to get the folder path of picture folder through python tkinter
folder_path_btn.addEventListener("click", async function () {
  folder_path = await eel.btn_picture_folder_path()();
  folder_path_val.innerText = folder_path;
  folder_path_error.innerHTML = "";
});

function getCurrStatus(status) {
  msgElement.innerText = status;
  msgElement.style.color = "green";
}
eel.expose(getCurrStatus, "get_curr_status");

// uploading code
uploadBtn.addEventListener("click", function generateData(e) {
  e.preventDefault();
  msgElement.innerText = "";
  let merchant_id_value = merchant_id.value;
  if (folder_path && merchant_id_value) {
    eel.start_driver_upload(folder_path, merchant_id_value)(viewMessage);
    loadingButtonUpload.style.display = "block";
    uploadBtn.style.display = "none";
    merchant_id_error.innerHTML = "";
  } else {
    folder_path_error.innerHTML = "Cannot be empty";
    merchant_id_error.innerHTML = "Cannot be empty";
  }
});

function viewMessage(msg) {
  folder_path_val.innerText = "";
  merchant_id.value = "";
  msgElement.innerText = msg;
  msgElement.style.color = "green";
  loadingButtonUpload.style.display = "none";
  uploadBtn.style.display = "block";
}
