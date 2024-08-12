 function validateEmail(){
    const emailInput = document.querySelector('.mailidcntnr');
    const getOtpButton = document.querySelector('.btn-for-otp');

    emailInput.addEventListener('input', () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(emailInput.value)) {
            getOtpButton.style.display = 'block';
        } else {
            getOtpButton.style.display = 'none';
        }
    });
}


function validateEmail(th){

}