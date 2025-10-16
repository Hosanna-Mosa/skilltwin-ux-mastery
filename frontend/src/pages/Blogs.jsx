import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiService } from "@/services/api";

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPage = async (nextPage = 1) => {
    setLoading(true);
    try {
      const res = await apiService.get(`/blogs?limit=${limit}&page=${nextPage}`);
      const newItems = res.data || [];
      setPosts((prev) => (nextPage === 1 ? newItems : [...prev, ...newItems]));
      setHasMore(Boolean(res.hasMore));
      setPage(nextPage);
    } catch (e) {
      console.error("Failed to fetch blogs", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMore = () => {
    if (loading || !hasMore) return;
    fetchPage(page + 1);
  };
  return (
    <div className="min-h-screen">
      <section className="py-16 bg-gray-50 dark:bg-[#23272f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-4">
              Insights & Blogs
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Learn from our experts. Curated guides, tips, and best practices to level up your career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post._id || post.slug}
                className="bg-white dark:bg-[#23272f] rounded-lg border border-gray-200 dark:border-gray-700 p-6 flex flex-col"
              >
                {/* Cover Image */}
                <div className="mb-4">
                  {post.images && post.images.length > 0 ? (
                    <img
                      src={post.images[0]}
                      alt={post.title}
                      className="w-full h-40 object-cover rounded-md"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          post.title || "Blog"
                        )}&background=1e293b&color=ffffff&size=256&bold=true`;
                      }}
                    />
                  ) : (
                    <div className="w-full h-40 rounded-md bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
                      {(post.title || "Blog")
                        .split(" ")
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</div>
                <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">{post.title}</h2>
                <p className="text-gray-700 dark:text-gray-300 flex-grow">{post.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags?.map((t) => (
                    <span key={t} className="px-2 py-1 rounded text-xs bg-blue-50 text-blue-700 dark:bg-gray-800 dark:text-blue-300 border border-blue-100 dark:border-gray-700">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6">
                  <Link
                    to={`/blogs/${post.slug || post._id}`}
                    state={{ post }}
                    className="text-green-600 hover:text-green-700 font-semibold"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
          {hasMore && (
            <div className="mt-10 text-center">
              <button
                onClick={loadMore}
                className="px-6 py-3 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold"
                disabled={loading}
              >
                {loading ? "Loading..." : "Load more"}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blogs;


