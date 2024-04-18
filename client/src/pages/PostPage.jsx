import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'flowbite-react';
import { useParams, Link } from 'react-router-dom';
import CommentSection from '../components/CommentSection';

export default function PostPage() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await response.json();

                if (response.ok && data.posts && data.posts.length > 0) {
                    setPost(data.posts[0]);
                } else {
                    setError(true);
                }
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postSlug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner size="xl" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-600">Unable to load the post. Please try again later.</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-600">Post not found.</p>
            </div>
        );
    }

    const formattedDate = new Date(post.createdAt).toLocaleDateString();
    const readTime = Math.round(post.content.length / 1000);

    return (
        <main className="container mx-auto px-4 py-6">
            <article className="post-article mx-auto lg:w-3/4">
                <header className="post-header mb-8">
                    <h1 className="text-4xl font-semibold mb-4 text-center text-indigo-900">{post.title}</h1>
                    <div className="flex justify-center mb-4 text-sky-500">
                        <Link to={`/search?category=${post.category}`}>
                            <Button color="gray" pill size="xs">{post.category}</Button>
                        </Link>
                    </div>
                </header>

                <section className="post-image mb-8">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-auto object-cover max-w-lg mx-auto"
                    />
                </section>

                <div className="post-meta mb-4 text-sm text-gray-600 flex justify-between">
                    <span>{formattedDate}</span>
                    <span className="italic">{`${readTime} min read`}</span>
                </div>

                <section
                    className="post-content max-w-lg mx-auto"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <CommentSection postId={post._id} />
            </article>
        </main>
    );
}
