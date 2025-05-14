 // Intersection Observer for section animations
 const sections = document.querySelectorAll('.section');
        
 const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             entry.target.classList.add('visible');
         }
     });
 }, { threshold: 0.1 });
 
 sections.forEach(section => {
     observer.observe(section);
 });
 
 // Countdown timer
 function updateCountdown() {
     const deadlineDate = new Date('September 30, 2024 23:59:59').getTime();
     const now = new Date().getTime();
     const timeLeft = deadlineDate - now;
     
     if (timeLeft <= 0) {
         document.getElementById('countdown').innerHTML = 'Deadline has passed';
         return;
     }
     
     const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
     const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
     const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
     const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
     
     document.getElementById('countdown').innerHTML = 
         `Time remaining: ${days}d ${hours}h ${minutes}m ${seconds}s`;
 }
 
 updateCountdown();
 setInterval(updateCountdown, 1000);
 
 // Copy email to clipboard
 document.getElementById('copyEmail').addEventListener('click', function() {
     const email = this.textContent;
     navigator.clipboard.writeText(email)
         .then(() => {
             const originalText = this.textContent;
             this.textContent = 'Email copied!';
             
             setTimeout(() => {
                 this.textContent = originalText;
             }, 2000);
         })
         .catch(err => {
             console.error('Failed to copy email: ', err);
         });
 });
 
 // Back to top button
 const backToTopButton = document.getElementById('backToTop');
 
 window.addEventListener('scroll', () => {
     if (window.pageYOffset > 300) {
         backToTopButton.classList.add('visible');
     } else {
         backToTopButton.classList.remove('visible');
     }
 });
 
 backToTopButton.addEventListener('click', () => {
     window.scrollTo({
         top: 0,
         behavior: 'smooth'
     });
 });