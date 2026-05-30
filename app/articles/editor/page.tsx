import { Suspense } from "react";

import ArticleEditorClient from "./ArticleEditorClient";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ArticleEditorClient />
    </Suspense>
  );
}