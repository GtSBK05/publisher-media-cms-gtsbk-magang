export function calculateHealthScore(
  article: {
    title: string;
    content: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
  }
) {
  let score = 0;

  if (article.title.length >= 20) {
    score += 20;
  }

  if (article.content.length >= 300) {
    score += 30;
  }

  if (article.seoTitle) {
    score += 15;
  }

  if (article.seoDescription) {
    score += 15;
  }

  if (article.seoKeywords) {
    score += 20;
  }

  return score;
}