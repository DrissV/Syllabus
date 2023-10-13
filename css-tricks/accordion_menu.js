let accordionTitles = document.querySelectorAll('.accordion-section-title');
let accordionContents = document.querySelectorAll('.accordion-section-content');

accordionTitles.forEach((accordionTitle) => {
  accordionTitle.addEventListener('focus', function() {
    let content = this.nextElementSibling;
    console.log(document.activeElement);
    console.log(content.querySelector(':focus'));
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