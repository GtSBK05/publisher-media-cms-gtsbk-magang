export interface RankedArticle {
  score: number;
}

export function scoreArticles(
  articles: any[],
  keyword: string
) {
  const normalizedKeyword =
    keyword
      .trim()
      .toLowerCase();

  return articles
    .map((article) => {
      let score = 0;

      const title =
        (
          article.title || ""
        ).toLowerCase();

      const summary =
        (
          article.summary || ""
        ).toLowerCase();

      const content =
        (
          article.content || ""
        ).toLowerCase();

      const category =
        (
          article.category
            ?.name || ""
        ).toLowerCase();

      if (
        title ===
        normalizedKeyword
      ) {
        score += 100;
      }

      else if (
        title.startsWith(
          normalizedKeyword
        )
      ) {
        score += 85;
      }

      else if (
        title.includes(
          normalizedKeyword
        )
      ) {
        score += 70;
      }

      if (
        summary.includes(
          normalizedKeyword
        )
      ) {
        score += 50;
      }

      if (
        category.includes(
          normalizedKeyword
        )
      ) {
        score += 35;
      }

      if (
        content.includes(
          normalizedKeyword
        )
      ) {
        score += 15;
      }

      return {
        ...article,
        score,
      };
    })
    .filter(
      (article) =>
        article.score > 0
    )
    .sort(
      (a, b) =>
        b.score -
        a.score
    );
}