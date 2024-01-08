"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { comments } from "~/server/db/schema";

import { api } from "~/trpc/react";
type comment = typeof comments.$inferSelect;

type Props = {
  location_id: string;
  onSuccess: (comment: comment) => void;
};

export function CommentField({ location_id, onSuccess }: Props) {
  const router = useRouter();
  const [text, setText] = useState("");

  const createComment = api.comment.create.useMutation({
    onSuccess: (data) => {
      onSuccess(data as unknown as comment);
      setText("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createComment.mutate({ text, location_id: Number(location_id) });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Title"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full rounded-sm px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createComment.isLoading}
      >
        {createComment.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
