const form = document.querySelector(".quiz-form");
const questions =  document.querySelectorAll(".question");
const result = document.querySelector(".result");
const correctAnswers = ['D','B','C','B','D'];

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    let score = 0;
    answers=[
        form.q1.value,
        form.q2.value,
        form.q3.value,
        form.q4.value,
        form.q5.value
    ];
    

    answers.forEach((ans, index) => {

        if(ans === correctAnswers[index]){
            questions[index].classList.add('correct-answer');
            score++;
        }
        else {
            questions[index].classList.add('wrong-answer');
        
        }
    });
    
    
result.classList.remove('hide');

result.firstChild.textContent = `Your Score is ${score}`;
if(score===5) {
    
    result.firstChild.textContent = `CONGRADULATIONS`;
    
    

}


});