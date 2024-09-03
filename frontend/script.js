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

    // This is used to add animation to the submit button
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
    .then(response => response.text()) // Response will be summarized text
    .then(summary => {

      // Update the output text area with new summary
      summarizedTextArea.value = summary;

      // Stop the spinning loading animation
      submitButton.classList.remove("submit-button--loading");
    })
    .catch(error => {
      console.log(error.message);
    });
}

 // Carousel functionality
 $(document).ready(function(){
  // Initialize Owl Carousel
  $('.owl-carousel').owlCarousel({
      loop: true,
      margin: 10,
      nav: true,  // Enable the navigation buttons provided by Owl Carousel
      center: true, // This option centers the active item
      items: 3, // Number of items visible at once
      autoplay: true,  // Enable autoplay
      autoplayTimeout: 3000,  // 3 seconds between slides
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

  // Change cursor to closed hand when clicking an image
  $('.owl-carousel .item').on('mousedown', function() {
      $(this).css('cursor', 'url("images/closehand.png"), auto');
  });

  // Revert to open hand cursor when releasing the mouse
  $('.owl-carousel .item').on('mouseup', function() {
      $(this).css('cursor', 'url("images/handpointer.svg"), auto');
  });

  // Set the cursor to open hand by default when hovering
  $('.owl-carousel .item').hover(function() {
      $(this).css('cursor', 'url("images/handpointer.svg"), auto');
  });
});
