/*
The javascript here is only for demonstration purpose in order to switch 
between 'pulse' and 'wave' animation effect, it is not actually required.
*/

document.addEventListener('DOMContentLoaded', function () {
    const pulseButton = document.getElementById('pulse');
    const waveButton = document.getElementById('wave');
    const stopButton = document.getElementById('stop');
    const placeholder = document.querySelectorAll('.placeholder');

    pulseButton.addEventListener('click', function () {
        for (const element of placeholder) {
            element.classList.remove('wave');
            element.classList.add('pulse');
        }
    });

    waveButton.addEventListener('click', function () {
        for (const element of placeholder) {
            element.classList.remove('pulse');
            element.classList.add('wave');
        }
    });

    stopButton.addEventListener('click', function () {
        for (const element of placeholder) {
            element.classList.remove('pulse', 'wave');
        }
    });
});
