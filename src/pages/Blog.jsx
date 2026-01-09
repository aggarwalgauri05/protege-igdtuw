import { motion } from "framer-motion"
import "./blog.css"

const blogs = [
  {
    id: 1,
    title: "Edge Awakens: The Rise of Thinking Machines",
    category: "AI & FUTURE",
    date: "Sep-29-2025",
    image: "https://miro.medium.com/v2/resize:fill:800:600/1*-1DNA4S_4I7X4Gcvbo8kGQ.png",
    mediumLink: "https://medium.com/@protegeigdtuw/edge-awakens-the-rise-of-thinking-machines-by-2040-c01198c8f306",
  },
  {
    id: 2,
    title: "404 Not Found? More like Eternally Archived",
    category: "DIGITAL CULTURE",
    date: "Sep-28-2025",
    image: "https://miro.medium.com/v2/resize:fill:800:600/1*JTk79_ny6b47cDU4KLI_pQ.png",
    mediumLink: "https://medium.com/@protegeigdtuw/404-not-found-more-like-404-eternally-archived-402143f6df44",
  },
  {
    id: 3,
    title: "The Road to AGI: Humanity's Greatest Adventure",
    category: "PHILOSOPHY",
    date: "Sep-28-2025",
    image: "https://miro.medium.com/v2/resize:fill:800:600/1*HTT9dYebSVtcHF1GsMc7EA.png",
    mediumLink: "https://medium.com/@protegeigdtuw/the-road-to-artificial-general-intelligence-humanitys-greatest-adventure-b9169e9b6926",
  },
  {
    id: 4,
    title: "Vibe Coding: Part 1 - What is Vibe Coding?",
    category: "DEVELOPMENT",
    date: "June-14-2025",
    image: "/images/deep-learning.png",
    mediumLink: "https://medium.com/@protegeigdtuw/part-1-what-is-vibe-coding-e7da73c849ff",
  },
  {
    id: 5,
    title: "Real Stories and Measurable Impact of Accessible AI",
    category: "AI & SOCIETY",
    date: "April-26-2025",
    image: "/images/ai.png",
    mediumLink: "https://medium.com/@protegeigdtuw/part-3-real-stories-and-measurable-impact-of-accessible-ai-57e4e8650d2a",
  },
  {
    id: 6,
    title: "AI Applications for Different Disabilities: Part 2",
    category: "ACCESSIBILITY",
    date: "April-26-2025",
    image: "/images/abstract.png",
    mediumLink: "https://medium.com/@protegeigdtuw/part-2-ai-applications-for-different-disabilities-444ce3bddff2",
  },
  {
    id: 7,
    title: "Part 1: DeepSeek vs. GPT-4: How It Stacks Up",
    category: "TECH COMPARISON",
    date: "April-9-2025",
    image: "/images/neural.png",
    mediumLink: "https://medium.com/@protegeigdtuw/part-1-deepseek-vs-gpt-4-how-it-stacks-up-e3bf32e33599",
  },
  {
    id: 8,
    title: "Part 1: The Essentials of Resume Structuring",
    category: "CAREER",
    date: "Dec-7-2024",
    image: "/images/mini.png",
    mediumLink: "https://medium.com/@protegeigdtuw/part-1-the-essentials-of-resume-structuring-c552850ca004",
  },
]

const BlogCard = ({ blog }) => (
  <motion.article
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="blog-card"
  >
    <div className="blog-card-image-wrapper">
      <img src={blog.image} alt={blog.title} className="blog-card-image" />
    </div>

    <div className="blog-card-content">
      <div className="blog-card-meta">
        <span className="category-pill">{blog.category}</span>
        <span className="blog-date">{blog.date}</span>
      </div>

      <h2 className="blog-title">{blog.title}</h2>

      <a
        href={blog.mediumLink}
        target="_blank"
        rel="noopener noreferrer"
        className="read-more-link"
      >
        READ ARTICLE →
      </a>
    </div>
  </motion.article>
)

export default function Blogs() {
  return (
    <div className="blog-container">
      <motion.section
        className="blog-hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1>
          Decoded: <span className="highlight">Ideas & Impact</span>
        </h1>
      </motion.section>

      <header className="blog-header">
        <p className="subtitle">Blog page of Protégé</p>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-32">
        <div className="blog-grid">
          {blogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </main>

      {/* 🔥 NON-BORING BANNER */}
      <section className="explore-banner">
        <motion.div
          className="explore-inner"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="explore-eyebrow">EXPLORE MORE THOUGHTS</p>

          <a
            href="https://medium.com/@protegeigdtuw"
            target="_blank"
            rel="noopener noreferrer"
            className="explore-link"
          >
            Read us on Medium
          </a>
        </motion.div>
      </section>
    </div>
  )
}
