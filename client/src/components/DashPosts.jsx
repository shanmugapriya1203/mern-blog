import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { Card, Modal, Button } from 'flowbite-react';

const DashPosts = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [posts, setPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
                const data = await res.json();
                if (res.ok) {
                    setPosts(data.posts);
                    if (data.posts.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        if (currentUser.isAdmin) {
            fetchPosts();
        }
    }, [currentUser._id]);

    const handleShowMore = async () => {
        const startIndex = posts.length;
        try {
            const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
            const data = await res.json();
            if (res.ok) {
                setPosts((prev) => [...prev, ...data.posts]);
                if (data.posts.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDeletePost = async () => {
        setShowModal(false);

        try {
            const res = await fetch(`/api/post/deletepost/${postIdToDelete}?userId=${currentUser._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    postId: postIdToDelete,
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                setPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="container mx-auto p-3">
         
            <h2 className="text-3xl m-5">
                Your Posts
            </h2>

            {currentUser.isAdmin && posts.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <Card key={post._id} className="shadow-md">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h5 className="text-xl font-bold text-indigo-900">
                                        <Link to={`/post/${post.slug}`}>{post.title}</Link>
                                    </h5>
                                    <p className="text-sky-500">{post.category}</p>

                                    <div className="flex flex-col space-x-2 mt-2">
                                        <div className='flex items-center space-x-2'>
                                            <img
                                                src={post.profilePicture}
                                                alt={post.username}
                                                className="w-8 h-8 rounded-full"
                                            />
                                            <span className='text-indigo-900 font-medium'>
                                                {post.username}
                                            </span>
                                        </div>
                                        <p className='text-gray-400'>
                                            {new Date(post.updatedAt).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </p>
                                    </div>

                                    <div className="flex justify-between mt-4">
                                        <Link
                                            to={`/update-post/${post._id}`}
                                            className='text-teal-500 hover:underline'
                                        >
                                            <FaPencilAlt className='inline-block mr-1' />
                                        </Link>
                                        <span
                                            className='text-red-500 hover:underline cursor-pointer'
                                            onClick={() => {
                                                setShowModal(true);
                                                setPostIdToDelete(post._id);
                                            }}
                                        >
                                            <FaTrash className='inline-block mr-1' />
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                    {showMore && (
                        <Button
                            className='w-full text-teal-500 py-3 mt-5'
                            onClick={handleShowMore}
                        >
                            Show more
                        </Button>
                    )}
                </>
            ) : (
                <p>You have no posts to show.</p>
            )}
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size='md'
            >
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle
                            className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'
                        />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                            Are you sure you want to delete this post?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={handleDeletePost}>
                                Yes, I'm sure
                            </Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default DashPosts;
