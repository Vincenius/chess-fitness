export const parseResponse = (response = {}) => {
  const { introduction, chapter1, chapter2, generation_id } = response

  return {
    introduction: introduction && JSON.parse(introduction),
    chapter1: chapter1 && JSON.parse(chapter1),
    chapter2: chapter2 && JSON.parse(chapter2),
    generation_id,
  }
}