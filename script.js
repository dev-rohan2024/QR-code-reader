// select the necessary Qr Code reader web app element
let wrapper = document.querySelector(".wrapper");
let form = document.querySelector("form");
let textInfo = form.querySelector("p");
let fileInput = document.querySelector(".file-input");
let textArea = document.querySelector("textarea");
let closeBtn = document.querySelector(".close-btn");
let copyBtn = document.querySelector(".copy-btn");
// data fatching function
let fetchRequest = (file, formData) => {
  textInfo.innerText = "Scanning QR Code...";
  // the QR code has requsted to read api to read
  fetch("http://api.qrserver.com/v1/read-qr-code/", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      let result = data[0].symbol[0].data;
      // chacked here if there is data in the result,
      // then upload QR code to read to
      // if it won't happed if it will be could not scan Qr code
      textInfo.innerText = result
        ? "Upload QR Code to Read"
        : "Couldn't scan QR Code";
      if (!result) return;
      // the data that was found by scaning the
      // QR code was set in the textArea textcontent
      textArea.innerText = result;
      wrapper.classList.add("active"); // wrapper add classlist - (active)
      // QR code img src link
      form.querySelector("img").src = URL.createObjectURL(file);
    });
};
// file input click eventlistener
fileInput.addEventListener("change", (e) => {
  // target files[0]
  let file = e.target.files[0];
  let formData = new FormData();
  formData.append("file", file);
  fetchRequest(file, formData); // data fatching function called
});
// qr code image box click eventlistener
form.addEventListener("click", () => fileInput.click());
// close button click eventlistener
closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));
// copy button click eventlistener
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(textArea.value).then(() => {
    copyBtn.innerText = "Copied";
    setTimeout(() => {
      copyBtn.innerText = "copy text";
    }, 1000);
  });
});
