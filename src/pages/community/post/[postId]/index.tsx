import CommentInput from "../components/CommentInput";
import ViewPost from "../components/ViewPost";
import CommentList from "../components/CommentList";
import PostList from "../../components/PostList";
import postItem from "@/mocks/postItem";

export default function Post() {
  return (
    <div className="flex flex-col px-[260px]">
      <ViewPost
        isBest={postItem.isBest}
        subject={postItem.subject}
        title={postItem.title}
        writer={postItem.writer}
        date={postItem.date}
        content={postItem.content}
        likes={postItem.likes}
        comments={postItem.comments}
        scraps={postItem.scraps}
      />
      <CommentInput /> <CommentList />
      <div className="flex flex-col mt-[60px] mb-[170px]">
        <p className="text-display2-b text-gray-600 mb-3">같은 주제 게시글</p>
        <PostList />
      </div>
    </div>
  );
}
