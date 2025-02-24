document.addEventListener('DOMContentLoaded', function() {
    const deletePortfolioButtons = document.querySelectorAll('.delete-portfolio-btn');

    deletePortfolioButtons.forEach(button => {
        button.addEventListener('click', function() {
            const portfolioItem = this.closest('.portfolio-item');
            portfolioItem.remove();
        });
    });
});