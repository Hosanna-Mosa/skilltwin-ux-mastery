import { useLocation, useParams, Link } from "react-router-dom";
import { blogPosts } from "@/data/blogs";

const BlogDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  // Preferred: data via Link state
  const statePost = location.state && location.state.post;
  // Fallback: find in data set by id
  const fallbackPost = blogPosts.find((p) => p.id === id);
  const post = statePost || fallbackPost;

  if (!post) {
    return (
      <div className="min-h-screen">
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-4">
              Blog not found
            </h1>
            <Link to="/blogs" className="text-green-600 hover:text-green-700 font-semibold">
              Back to Blogs
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="py-16 bg-gray-50 dark:bg-[#23272f]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="text-sm text-gray-500 dark:text-gray-400">{new Date(post.date).toLocaleDateString()}</div>
            <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white mt-2">{post.title}</h1>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags?.map((t) => (
                <span key={t} className="px-2 py-1 rounded text-xs bg-blue-50 text-blue-700 dark:bg-gray-800 dark:text-blue-300 border border-blue-100 dark:border-gray-700">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <article className="prose prose-lg dark:prose-invert max-w-none">
            {post.content?.split("\n\n").map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </article>

          <div className="mt-10">
            <Link to="/blogs" className="text-green-600 hover:text-green-700 font-semibold">
              ← Back to Blogs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;


