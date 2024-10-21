// MENU
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

// Scroller
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-list li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor click behavior

            const targetId = this.getAttribute('href'); // Get the target section ID
            const targetSection = document.querySelector(targetId); // Select the target section

            // Smooth scroll to the target section
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start' // Scroll to the top of the section
            });
        });
    });
});

// Scroller End




// Card
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    const options = {
        root: null, // Use the viewport as the container
        threshold: 0.1 // Trigger when 10% of the card is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Stop observing after it becomes visible
                }, 300); // 3000 milliseconds delay (3 seconds)
            }
        });
    }, options);

    cards.forEach(card => {
        observer.observe(card);
    });
});


// Testimonial

let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.testimonial');
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.testimonial');
    currentSlide += direction;

    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    } else if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);
}

// Initialize the first slide
showSlide(currentSlide);



// Blog

let currentIndex = 0;

const blogBoxes = document.querySelectorAll('.blog-box');
const totalBlogs = blogBoxes.length;

function updateSlider() {
    blogBoxes.forEach((box, index) => {
        box.style.display = (index === currentIndex) ? 'flex' : 'none';
    });
}

document.getElementById('prevButton').addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? totalBlogs - 1 : currentIndex - 1;
    updateSlider();
});

document.getElementById('nextButton').addEventListener('click', () => {
    currentIndex = (currentIndex === totalBlogs - 1) ? 0 : currentIndex + 1;
    updateSlider();
});

// Initialize the slider
updateSlider();




// Quiz
document.getElementById("nav-button").addEventListener("click", startQuiz);

document.querySelector(".close-button").addEventListener("click", function() {
    document.getElementById("quiz-modal").style.display = "none";
});

window.addEventListener("click", function(event) {
    const modal = document.getElementById("quiz-modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hypertext Markup Language", "Hightext Machine Language", "Hyperloop Machine Language", "Hypertext Markup Level"],
        answer: "Hypertext Markup Language"
    },
    {
        question: "Which of the following is a JavaScript framework?",
        options: ["React", "Django", "Ruby on Rails", "Laravel"],
        answer: "React"
    },
    {
        question: "What is the correct syntax to output 'Hello World' in JavaScript?",
        options: ["print('Hello World');", "console.log('Hello World');", "echo 'Hello World';", "write('Hello World');"],
        answer: "console.log('Hello World');"
    },
    {
        question: "Which HTML element is used to define an internal style sheet?",
        options: ["<style>", "<css>", "<script>", "<styles>"],
        answer: "<style>"
    },
    {
        question: "What is the main purpose of CSS?",
        options: ["To structure the content", "To style the content", "To make the website interactive", "To store data"],
        answer: "To style the content"
    },
    {
        question: "Which programming language is primarily used for web development?",
        options: ["C++", "Java", "Python", "JavaScript"],
        answer: "JavaScript"
    },
    {
        question: "What does SQL stand for?",
        options: ["Structured Query Language", "Sequential Query Language", "Structured Question Language", "Simple Query Language"],
        answer: "Structured Query Language"
    },
    {
        question: "Which tag is used to create a hyperlink in HTML?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: "<a>"
    },
    {
        question: "Which of the following is NOT a programming language?",
        options: ["Python", "HTML", "Java", "C#"],
        answer: "HTML"
    },
    {
        question: "What is the purpose of the <div> tag in HTML?",
        options: ["To define a section", "To create a link", "To insert an image", "To format text"],
        answer: "To define a section"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const modal = document.getElementById("quiz-modal");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-button");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-button");

function startQuiz() {
    modal.style.display = "block";
    score = 0;
    currentQuestionIndex = 0;
    nextButton.style.display = "none";
    loadIntro(); // Load the introduction first
}

function loadIntro() {
    questionElement.innerText = "Get Ready!";
    optionsContainer.innerHTML = "";

    const startButton = document.createElement("button");
    startButton.innerText = "Let's Start";
    startButton.classList.add("option-button");
    startButton.onclick = () => {
        loadQuestion(); // Load the first question
    };
    
    optionsContainer.appendChild(startButton);
}

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-button");
        button.onclick = () => selectOption(option);
        optionsContainer.appendChild(button);
    });
}

function selectOption(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
        score++;
    }
    nextButton.style.display = "block";
}

nextButton.onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        nextButton.style.display = "none";
    } else {
        showScore();
    }
};

function showScore() {
    questionElement.innerText = "";
    optionsContainer.innerHTML = "";
    nextButton.style.display = "none";
    scoreContainer.style.display = "block";
    scoreElement.innerText = score;
}

restartButton.onclick = () => {
    scoreContainer.style.display = "none";
    startQuiz();
};

document.querySelector(".close-button").onclick = () => {
    modal.style.display = "none";
};