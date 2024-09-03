const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);

// Disable the submit button by default when the user loads the website.
submitButton.disabled = true;

// This function will be called when the user enters something in the text area
function verifyTextLength(e) {

  // The e.target property gives us the HTML element that triggered the event, which in this case is the textarea.
  const textarea = e.target;

  // Check if the text in the text area is the right length
  if (textarea.value.length > 200 && textarea.value.length < 100000) {
    submitButton.disabled = false;
  } else {
    // If it is not, we disable the submit button.
    submitButton.disabled = true;
  }
}

function submitData(e) {
  e.preventDefault(); // Prevent default form submission behavior

  // Start the loading state
  submitButton.classList.add("submit-button--loading");
  
  const text_to_summarize = textArea.value;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer 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");
  
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
  }) // Response will be summarized text
  .then(summary => {

    // Update the output text area with new summary
    summarizedTextArea.value = summary;

    // Stop the loading state
    submitButton.classList.remove("submit-button--loading");
  })
  .catch(error => {
    console.error("There was an error with the request:", error.message);
    // Stop the loading state in case of error
    submitButton.classList.remove("submit-button--loading");
  });
}

// Carousel functionality
$(document).ready(function(){
// Initialize Owl Carousel
$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: false,  // disable the navigation buttons provided by Owl Carousel
    dots: true,
    center: true, // This option centers the active item
    items: 3, // Number of items visible at once
    autoplay: true,  // Enable autoplay
    autoplayTimeout: 2000,  // 2 seconds between slides
    autoplayHoverPause: true,  // Pause on hover
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

