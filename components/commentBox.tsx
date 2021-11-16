import { Comment } from '@prisma/client';
import Image from 'next/image';

interface CommentCardProps {
  Comment: Comment;
}

export default function CommentCard(props: CommentCardProps) {
  return (
    <div className="border rounded-lg p-4 flex">
      <div className="my-auto">
         <p className="text-xl text-gray-700">
          {props.Comment.uId} {props.Comment.uId}
        </p>
      </div>
      <div className="ml-4">
        <p className="text-xl text-gray-700">
          {props.Comment.datePosted}
        </p>
        <p className="text-gray-500">{props.Comment.body}</p>
 		<p className="text-gray-500">{props.Comment.like} {props.Comment.like}</p>
      </div>
    </div>
  );
}