const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);

submitButton.disabled = true;

function verifyTextLength(e) {
  const textarea = e.target;
  if (textarea.value.length > 200 && textarea.value.length < 100000) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

function submitData(e) {
  e.preventDefault();
  submitButton.classList.add("submit-button--loading");
  
  const text_to_summarize = textArea.value;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const raw = JSON.stringify({
    "text": text_to_summarize
  });
  
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  fetch('/summarize', requestOptions)
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
  })
  .then(summary => {
    summarizedTextArea.value = summary;
    submitButton.classList.remove("submit-button--loading");
  })
  .catch(error => {
    console.error("There was an error with the request:", error.message);
    submitButton.classList.remove("submit-button--loading");
  });
}

// Carousel functionality
$(document).ready(function(){
$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    center: true, 
    items: 3, 
    autoplay: true,  
    autoplayTimeout: 2000,
    autoplayHoverPause: true,  
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 3
        },
        1000: {
            items: 5
        }
    }
});
}); 