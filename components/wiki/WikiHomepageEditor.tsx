"use client";

import { useState } from "react";

import WikiBlockInlineEditor from "./WikiBlockInlineEditor";

interface Props {
  hero: any;
  featured: any;
  card1: any;
  card2: any;
  card3: any;
}

export default function WikiHomepageEditor({
  hero,
  featured,
  card1,
  card2,
  card3,
}: Props) {
  const [
    editingKey,
    setEditingKey,
  ] = useState<
    string | null
  >(null);

  const cards = [
    card1,
    card2,
    card3,
  ];

  return (
    <div className="space-y-10">

      <section
        className="
          grid
          lg:grid-cols-[2fr_1fr]
          gap-6
        "
      >
        <WikiBlockInlineEditor
          block={hero}
          editingKey={
            editingKey
          }
          setEditingKey={
            setEditingKey
          }
          large
        />

        <div className="space-y-4">
          {cards.map(
            (card) => (
              <WikiBlockInlineEditor
                key={
                  card.id
                }
                block={card}
                editingKey={
                  editingKey
                }
                setEditingKey={
                  setEditingKey
                }
              />
            )
          )}
        </div>
      </section>

      <WikiBlockInlineEditor
        block={featured}
        editingKey={
          editingKey
        }
        setEditingKey={
          setEditingKey
        }
      />
    </div>
  );
}