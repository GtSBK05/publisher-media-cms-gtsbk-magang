export function transformImageHtml(
  html: string
) {
  const transformedImages =
    html.replace(
      /<img([^>]*?)containerstyle="([^"]*)"([^>]*?)>/g,
      (
        match,
        before,
        containerStyle,
        after
      ) => {
        const widthMatch =
          containerStyle.match(
            /width:\s*([^;]+)/
          );

        const marginMatch =
          containerStyle.match(
            /margin:\s*([^;]+)/
          );

        const width =
          widthMatch?.[1] || "auto";

        const margin =
          marginMatch?.[1] || "0";

        return `
          <div
            class="wiki-image-wrapper"
            style="
              width:${width};
              max-width:100%;
              margin:${margin};
            "
          >
            <img
              ${before}
              ${after}
              style="
                width:100%;
                height:auto;
                max-width:100%;
              "
            />
          </div>
        `;
      }
    );

  return transformedImages.replace(
    /<table([\s\S]*?)<\/table>/g,
    (table) => `
      <div class="table-responsive">
        ${table}
      </div>
    `
  );
}