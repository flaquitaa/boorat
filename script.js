document.addEventListener('DOMContentLoaded', () => {
    const flame = document.getElementById('flame');

    // Function to start audio recording and detect blow
    async function detectBlow() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const microphone = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        microphone.connect(analyser);

        function checkSound() {
            analyser.getByteFrequencyData(dataArray);
            const maxVolume = Math.max(...dataArray);

            if (maxVolume > 128) { // Adjust this threshold based on testing
                flame.style.opacity = 0; // Extinguish the flame
            }

            requestAnimationFrame(checkSound);
        }

        checkSound();
    }

    detectBlow();
});
