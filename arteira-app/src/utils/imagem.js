// Lê um arquivo de imagem escolhido pelo usuário e devolve uma dataURL
// já redimensionada, para não estourar o limite do localStorage.
export function arquivoParaDataURL(arquivo, larguraMax = 800) {
  return new Promise((resolve, reject) => {
    if (!arquivo.type.startsWith('image/')) {
      reject(new Error('O arquivo selecionado não é uma imagem.'))
      return
    }

    const leitor = new FileReader()
    leitor.onerror = () => reject(new Error('Não foi possível ler o arquivo.'))
    leitor.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('Imagem inválida.'))
      img.onload = () => {
        const escala = Math.min(1, larguraMax / img.width)
        const largura = Math.round(img.width * escala)
        const altura = Math.round(img.height * escala)

        const canvas = document.createElement('canvas')
        canvas.width = largura
        canvas.height = altura
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, largura, altura)

        resolve(canvas.toDataURL('image/jpeg', 0.8))
      }
      img.src = leitor.result
    }
    leitor.readAsDataURL(arquivo)
  })
}
