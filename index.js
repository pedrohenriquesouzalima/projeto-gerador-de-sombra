document.addEventListener('DOMContentLoaded', function() {
    const preview = document.getElementById("preview");
    const styles = document.getElementById("styles");
    const ranges = document.querySelectorAll(".settings input");
    const copyButton = document.getElementById("copy-styles");
  
    // Adicionar "event listener" para cada "range input"
    ranges.forEach((slider) => {
      slider.addEventListener("input", generateStyles);
    });
  
    // Função para gerar e atualizar estilos
    function generateStyles() {
      const xShadow = document.getElementById("x-shadow").value;
      const yShadow = document.getElementById("y-shadow").value;
      const blurRadius = document.getElementById("blur-r").value;
      const spreadRadius = document.getElementById("spread-r").value;
      const shadowColor = document.getElementById("shadow-color").value;
      const shadowOpacity = document.getElementById("shadow-opacity").value;
      const shadowInset = document.getElementById("inset-shadow").checked;
      const borderRadius = document.getElementById("border-r").value;
  
      // Valor da propriedade box shadow CSS
      const boxShadow = `${shadowInset ? "inset " : ""}${xShadow}px ${yShadow}px ${blurRadius}px ${spreadRadius}px ${hexToRgba(shadowColor, shadowOpacity)}`;
  
      // Atualizar o estilo do elemento de visualização
      preview.style.boxShadow = boxShadow;
      preview.style.borderRadius = `${borderRadius}px`;
  
      // Atualizar o textarea com um estilo gerado
      styles.textContent = `box-shadow: ${boxShadow};\nborder-radius: ${borderRadius}px;`;
    }
  
    // Função para converter hex e opacity para o formato rgba
    function hexToRgba(shadowColor, shadowOpacity) {
      const r = parseInt(shadowColor.substr(1, 2), 16);
      const g = parseInt(shadowColor.substr(3, 2), 16);
      const b = parseInt(shadowColor.substr(5, 2), 16);
  
      return `rgba(${r}, ${g}, ${b}, ${shadowOpacity})`;
    }
  
    // Função para copiar os estilos gerados
    function copyStyles() {
      styles.select();
      document.execCommand("copy");
      copyButton.innerText = "Copiado!";
      setTimeout(() => {
        copyButton.innerText = "Copiar Estilo";
      }, 500);
    }
    copyButton.addEventListener("click", copyStyles);
  
    generateStyles();
  });
  