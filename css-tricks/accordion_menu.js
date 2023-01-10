let accordionTitles = document.querySelectorAll('.accordion-section-title');

accordionTitles.forEach((accordionTitle) => {
  accordionTitle.addEventListener('focus', function() {
    let content = this.nextElementSibling;
    console.log(content);
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  });
  accordionTitle.addEventListener('mouseover', function() {
    let content = this.nextElementSibling;
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  });
});