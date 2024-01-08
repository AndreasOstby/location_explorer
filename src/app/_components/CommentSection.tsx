"use client";
import { api } from "~/trpc/react";
import { CommentField } from "./CommentField";
import { AvatarImage } from "./AvatarImage";
import { useState } from "react";
import { comments, users } from "~/server/db/schema";
import Tag from "./Tag";
import { Line } from "./Line";

type Props = {
  location_id: string;
};
type commentWithUser = Omit<typeof comments.$inferSelect, "createdBy"> & {
  createdBy: {
    name: string | null;
    image: string | null;
    isVerified: boolean | null;
  };
};

export function CommentSection({ location_id }: Props) {
  const comments = api.comment.getLatest.useQuery(
    {
      location_id: Number(location_id),
    },
    {
      staleTime: 1000 * 60 * 60 * 24,
    },
  );

  // const [newComments, setNewComment] = useState<comment[]>([]);

  // console.log(newComments);

  return (
    <div className="flex flex-col gap-20">
      <CommentField
        location_id={location_id}
        onSuccess={() => {
          // setNewComment([...newComments, comment]);
          comments.refetch();
        }}
      />
      {/* {newComments.map((comment) => (
        <>{comment && <Comment comment={comment} key={comment.id} />}</>
      ))} */}
      {comments.isSuccess &&
        comments.data.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      {comments.isFetching && <div>Loading...</div>}
    </div>
  );
}

export function Comment({ comment }: { comment: commentWithUser }) {
  return (
    <div className="comment max-w-[600px]">
      {/* <div className="comment"> */}
      <div className="h-full">
        <AvatarImage square image={comment.createdBy.image} />
      </div>
      {/* </div> */}
      <div className="flex flex-col">
        <div className=" flex items-center gap-2">
          {comment.createdBy.isVerified && (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12.4995"
                r="9"
                stroke="#3FC5FF"
                strokeWidth="2"
              />
              <path
                d="M8 12.4995L11 15.4995L16 9.49951"
                stroke="#3FC5FF"
                strokeWidth="2"
              />
            </svg>
          )}
          <span className="text-sm font-semibold text-secondaryBlack">
            {comment.createdBy.name}
          </span>
          <span className="text-xs text-secondaryBlack">
            {comment.createdAt.toLocaleDateString()}
          </span>
        </div>
        <p className="m-2 text-sm text-secondaryBlack">{comment.text}</p>
      </div>
      <div className="flex items-center justify-center">
        <Tag
          text={"Summer"}
          icon={
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="8.49996"
                cy="8.50008"
                r="1.83333"
                stroke="#33363F"
                strokeWidth="2"
              />
              <path
                d="M8.5 3.54167V2.125"
                stroke="#33363F"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M8.5 14.8749V13.4583"
                stroke="#33363F"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12.0061 4.99392L13.0078 3.99219"
                stroke="#33363F"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M3.99216 13.0078L4.9939 12.0061"
                stroke="#33363F"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M13.4583 8.5L14.875 8.5"
                stroke="#33363F"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M2.12496 8.5L3.54163 8.5"
                stroke="#33363F"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12.0061 12.0061L13.0078 13.0078"
                stroke="#33363F"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M3.99216 3.99216L4.9939 4.9939"
                stroke="#33363F"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          }
          borderless
        />
      </div>

      <div className="flex items-center gap-2">
        <Line />
        <div className=" text-nowrap text-xs text-secondaryBlack">
          <span>2 comments</span>
        </div>
        <Line />
      </div>
    </div>
  );
}
