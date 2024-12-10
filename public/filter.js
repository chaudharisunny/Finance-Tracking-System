
  function filterCategories(selectedType) {
    // Get all category options
    const categoryOptions = document.querySelectorAll('.category-option');
    
    // Loop through each option and toggle visibility
    categoryOptions.forEach(option => {
      if (option.classList.contains(selectedType)) {
        option.style.display = 'block'; // Show matching options
      } else {
        option.style.display = 'none'; // Hide non-matching options
      }
    });

    // Reset the dropdown selection
    document.getElementById('categoryDropdown').value = '';
  }

