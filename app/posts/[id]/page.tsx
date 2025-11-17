"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  content: string;
  date: string;
};

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
          setEditTitle(data.title);
          setEditContent(data.content);
        } else {
          console.error('Failed to fetch post');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push("/");
      } else {
        alert('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (post) {
      setEditTitle(post.title);
      setEditContent(post.content);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTitle.trim() || !editContent.trim()) {
      alert("All fields are required!");
      return;
    }

    setUpdating(true);

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editTitle,
          content: editContent,
        }),
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setPost(updatedPost);
        setIsEditing(false);
      } else {
        alert('Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="container py-4">Loading...</div>;
  }

  if (!post) {
    return <div className="container py-4">Post not found.</div>;
  }

  return (
    <div className="container py-4">
      {isEditing ? (
        <form onSubmit={handleUpdate} className="mt-3">
          <h1>Edit Post</h1>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              className="form-control"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              disabled={updating}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Content</label>
            <textarea
              className="form-control"
              rows={10}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              disabled={updating}
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="btn btn-success me-2"
            disabled={updating}
          >
            {updating ? 'Updating...' : 'Update'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={handleCancelEdit}
            disabled={updating}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h1>{post.title}</h1>
          <p className="text-muted">{post.date}</p>
          <p style={{ whiteSpace: "pre-wrap" }}>{post.content}</p>
          <div className="mt-4">
            <button className="btn btn-danger me-2" onClick={handleDelete}>
              Delete
            </button>
            <button className="btn btn-warning me-2" onClick={handleEdit}>
              Edit
            </button>
            <Link href="/" className="btn btn-secondary">
              Back to Home
            </Link>
          </div>
        </>
      )}
    </div>
  );
}