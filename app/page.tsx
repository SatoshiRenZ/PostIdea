"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";

type Post = {
    id: number;
    title: string;
    content: string;
    date: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

    const loadPosts = () => {
        const saved = localStorage.getItem("posts");
        if (saved) {
            setPosts(JSON.parse(saved));
        } else {
            setPosts([]);
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);
  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ul className="list-group">
            {posts.map((post) => (
              <li key={post.id} className="list-group-item">
                 <Link href={`/posts/${post.id}`} className="fw-bold text-decoration-none">
                    {post.title}
                 </Link>
                <div className="text-muted small">{post.date}</div>
              </li>
            ))}
        </ul>

        <div className={styles.intro}>
          <h1>Rendy Denny 535240180</h1>
          <p>
            Post your ideas
          </p>
          <h1>What Do You Thinking About?</h1>

        <div className={styles.ctas}>
          <a
            className="btn btn-primary"
            href="/create"
          >
            Post Idea Now
          </a>
          <a
            className="btn btn-secondary"
            href="/generate-image"
          >
            Generate Image With Your Idea
          </a>
        </div>
          
        </div>
      </main>

    </div>
  );
}
