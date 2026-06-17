import Link from "next/link";

import WikiBlockEditor from "./WikiBlockEditor";

import PinnedArticles from "./PinnedArticles";

interface Props {
  hero: any;
  featured: any;
  card1: any;
  card2: any;
  card3: any;

  latestArticles?: any[];

  featuredArticles?: any[];
  
  editMode?: boolean;
}

export default function WikiHomepage({
  hero,
  featured,
  card1,
  card2,
  card3,
  latestArticles = [],
  featuredArticles = [],
  editMode = false,
}: Props) {
  return (
    <div className="space-y-10">
      <section
        className="
          grid
          lg:grid-cols-[2fr_1fr]
          gap-6
        "
      >
        <div
          className="
            relative

            rounded-[32px]

            border
            border-violet-500/20

            bg-gradient-to-br
            from-violet-500/15
            via-white/5
            to-orange-400/15

            backdrop-blur-xl

            p-8
            lg:p-12
          "
        >
            {editMode && hero && (
            <div
                className="
                absolute
                top-4
                right-4
                "
            >
                <WikiBlockEditor
                block={hero}
                />
            </div>
            )}

          <p
            className="
              text-xs
              uppercase
              tracking-[0.35em]

              bg-gradient-to-r
              from-violet-400
              to-orange-400

              bg-clip-text
              text-transparent

              mb-4
            "
          >
            Content Archive Publisher
          </p>

          <h1
            className="
              text-4xl
              md:text-5xl
              xl:text-6xl

              font-light

              leading-tight

              mb-6
            "
          >
            {hero?.title}
          </h1>

          <div
            className="
              leading-8

              [&_img]:block
              [&_img]:mx-auto

              [&_img]:max-w-full
              md:[&_img]:max-w-[300px]

              [&_img]:max-h-[300px]

              [&_img]:w-auto
              [&_img]:h-auto

              [&_a]:text-sky-400
              [&_a]:underline
            "
            dangerouslySetInnerHTML={{
              __html:
                hero?.content || "",
            }}
          />
        </div>

        <div className="space-y-4">
          {[card1, card2, card3].map(
            (card, index) => (
              <div
                key={index}
                className="
                  relative

                  rounded-3xl

                  border
                  border-violet-500/10

                  bg-gradient-to-br
                  from-violet-500/5
                  to-orange-400/5

                  backdrop-blur-xl

                  p-5
                "
              >
                {editMode && card && (
                <div
                    className="
                    absolute
                    top-3
                    right-3
                    "
                >
                    <WikiBlockEditor
                    block={card}
                    />
                </div>
                )}

                <h3
                  className={`
                    mb-3

                    ${
                      index === 1
                        ? "text-violet-400"
                        : "text-orange-400"
                    }
                  `}
                >
                  {card?.title}
                </h3>

                <div
                  className="
                    leading-8
                    text-sm

                    [&_img]:block
                    [&_img]:mx-auto

                    [&_img]:max-w-full
                    md:[&_img]:max-w-[300px]

                    [&_img]:max-h-[300px]

                    [&_img]:w-auto
                    [&_img]:h-auto

                    [&_a]:text-sky-400
                    [&_a]:underline
                  "
                  dangerouslySetInnerHTML={{
                    __html:
                      card?.content || "",
                  }}
                />
              </div>
            )
          )}
        </div>
      </section>

      <section
        className="
          relative

          rounded-[32px]

          border
          border-violet-500/10

          bg-gradient-to-br
          from-violet-500/5
          to-orange-400/5

          backdrop-blur-xl

          p-8
        "
      >
        {editMode && featured && (
        <div
            className="
            absolute
            top-4
            right-4
            "
        >
            <WikiBlockEditor
            block={featured}
            />
        </div>
        )}

        <h2
          className="
            text-3xl
            mb-5
          "
        >
          {featured?.title}
        </h2>

        <div
          className="
            leading-8

            [&_img]:block
            [&_img]:mx-auto

            [&_img]:max-w-full
            md:[&_img]:max-w-[300px]

            [&_img]:max-h-[300px]

            [&_img]:w-auto
            [&_img]:h-auto

            [&_a]:text-sky-400
            [&_a]:underline
          "
          dangerouslySetInnerHTML={{
            __html:
              featured?.content || "",
          }}
        />
        
        {!editMode && (
          <PinnedArticles
            articles={
              featuredArticles
            }
          />
        )}        
      </section>

      {!editMode && (
        <section>
          <h2
            className="
              text-2xl
              mb-5
            "
          >
            Recently Updated
          </h2>

          <div
            className="
              grid
              md:grid-cols-2
              xl:grid-cols-5

              gap-4
            "
          >
            {latestArticles.map(
              (article) => (
                <Link
                  key={article.id}
                  href={`/wiki/${article.slug}`}
                  className="
                    block

                    rounded-2xl

                    border
                    border-white/10

                    bg-gradient-to-br
                    from-violet-500/5
                    to-orange-400/5

                    backdrop-blur-xl

                    p-4

                    hover:border-violet-500/30
                    hover:-translate-y-1

                    transition
                  "
                >
                  <p
                    className="
                      text-base
                      line-clamp-2

                      mb-2
                    "
                  >
                    {article.title}
                  </p>

                  <p
                    className="
                      text-xs
                      opacity-60
                    "
                  >
                    {article.category?.name ||
                      "Uncategorized"}
                  </p>
                </Link>
              )
            )}
          </div>
        </section>
      )}
    </div>
  );
}