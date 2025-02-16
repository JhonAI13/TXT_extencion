chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.text) {
    chrome.tts.speak(message.text, {
        rate: 1.0, // Velocidade da fala (ajuste conforme necessário)
        lang: 'pt-BR', // Idioma (ajuste conforme necessário)
        onEnd: function() {
            console.log("Leitura finalizada")
        }
    });
  }
});