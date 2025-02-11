export function slugify(text: string) {
  return text
    .toString() // Garante que o valor é uma string
    .normalize("NFD") // Normaliza para decompor os acentos (ex.: "é" -> "e")
    .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
    .toLowerCase() // Converte para minúsculas
    .trim() // Remove espaços extras no início e no fim
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .replace(/[^\w\-]+/g, "") // Remove caracteres especiais
    .replace(/\-\-+/g, "-"); // Substitui múltiplos hífens por um único hífen
}
