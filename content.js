let ttsButton = null;

document.addEventListener('mousedown', function(event) {
    if (event.button === 1) { // Botão do meio do mouse
        event.preventDefault(); // Impede o comportamento padrão do botão do meio

        const selection = window.getSelection();
        const selectedText = selection.toString().trim();

        if (selectedText) {
            // Remove qualquer botão/menu existente
            removeTTSButton();

            // Cria o botão do TTS
            createTTSButton(event.clientX, event.clientY, selectedText);
        } else {
            removeTTSButton(); // Remove se não houver seleção
        }
    } else if (ttsButton && !event.target.closest('.tts-button')) {
        removeTTSButton(); // Remove se clicar fora do botão
    }
});

function createTTSButton(x, y, text) {
    ttsButton = document.createElement('button');
    ttsButton.textContent = 'Ler Texto';
    ttsButton.classList.add('tts-button');
    ttsButton.style.position = 'absolute';
    ttsButton.style.left = x + 'px';
    ttsButton.style.top = y + 'px';
    ttsButton.style.zIndex = 1000; // Garante que aparece sobre outros elementos
    document.body.appendChild(ttsButton);

    ttsButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({ text: text });
        removeTTSButton(); // Remove o botão após a leitura
    });
}

function removeTTSButton() {
    if (ttsButton) {
        ttsButton.remove();
        ttsButton = null;
    }
}