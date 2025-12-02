import LikeButton from "./LikeButton";
import CommentPreview from "./CommentPreview";

export default function PostCard({ post }: any) {
  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      <div className="font-semibold">{post.author.name}</div>
      <div className="text-gray-700 mt-2">{post.text}</div>

      {post.image && (
        <img src={post.image} alt="" className="w-full rounded mt-3" />
      )}

      <div className="mt-3">
        <LikeButton postId={post._id} likes={post.likes} />
        <CommentPreview postId={post._id} commentCount={post.commentCount} />
      </div>
    </div>
  );
}
