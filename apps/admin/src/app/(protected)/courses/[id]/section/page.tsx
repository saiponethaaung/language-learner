import Link from "next/link";

export default function ChapterList() {
  return (
    <>
      Section list
      <Link
        href={{
          pathname: `chapter`,
        }}
      >
        Chapter
      </Link>
    </>
  );
}
