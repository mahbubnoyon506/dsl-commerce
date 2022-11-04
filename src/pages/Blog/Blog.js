import BlogArea from "../../components/Blog/BlogArea";
import PageTitle from "../../components/Common/PageTitle";

function Blog() {
  return (
    <div className="blog-wrapper">
      <PageTitle title="Blog" />
      <BlogArea />
    </div>
  );
}

export default Blog;
