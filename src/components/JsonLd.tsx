type JsonLdProps = {
  data: unknown;
};

/** Server-rendered JSON-LD. Data is a trusted, code-owned constant. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
