import { motion } from "framer-motion"
import { useState } from "react"
import "./blog.css"


// IDs of new posts to apply special styling
const newPostIds = ["new1", "new2", "new3", "new4"]

// ALL BLOGS - Complete collection organized by category
const allBlogs = [
  // ============ NEW POSTS (marked with special IDs) ============
  {
    id: "new1",
    title: "The Fake You: Deepfakes and Voice Scams",
    category: "AI & Accessibility",
    date: "Jan-08-2026",
    image: "https://miro.medium.com/v2/resize:fit:1012/format:webp/1*fNDMz_RNu-LNd69GabZfFA.png",
    mediumLink: "https://medium.com/@protegeigdtuw/the-fake-you-deepfakes-and-voice-scams-2e15a37978bc",
  },
  {
    id: "new2",
    title: "Part 2: Why Passwords Are Dying and What's Next",
    category: "AI & Accessibility",
    date: "Jan-08-2026",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*E4xiSyT0p7nCLwWQGb8eGw.png",
    mediumLink: "https://medium.com/@protegeigdtuw/part-2-why-passwords-are-dying-and-whats-next-127dcdb9f8ad",
  },
  {
    id: "new3",
    title: "Oversharing: Feeding the AI Beast",
    category: "AI & Accessibility",
    date: "Jan-07-2026",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*DKaiuov3rvH16aj55yjYWA.png",
    mediumLink: "https://medium.com/@protegeigdtuw/oversharing-feeding-the-ai-beast-7a9fdbb3dde7",
  },
  {
    id: "new4",
    title: "Part 4: Simple Shields - How to Protect Yourself",
    category: "AI & Accessibility",
    date: "Jan-07-2026",
    image: "https://miro.medium.com/v2/resize:fit:692/format:webp/1*gEHMLjcQ0e2s6xZevs37Dw.png",
    mediumLink: "https://medium.com/@protegeigdtuw/part-4-simple-shields-how-to-protect-yourself-a86607407185",
  },

  // ============ AI & Accessibility ============
  {
    id: 1,
    title: "Part 1: How AI is Transforming Accessibility for All",
    category: "AI & Accessibility",
    date: "Apr-26-2025",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*qGn_9fhOQpqTAof9",
    mediumLink: "https://medium.com/@protegeigdtuw/part-1-how-ai-is-transforming-accessibility-for-all-6ebcd050f8f0",
  },
  {
    id: 2,
    title: "Part 2: AI Applications for Different Disabilities",
    category: "AI & Accessibility",
    date: "Apr-26-2025",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*IhKvvAK7HJHk4DSx",
    mediumLink: "https://medium.com/@protegeigdtuw/part-2-ai-applications-for-different-disabilities-444ce3bddff2",
  },
  {
    id: 3,
    title: "Part 3: Real Stories and Measurable Impact of Accessible AI",
    category: "AI & Accessibility",
    date: "Apr-26-2025",
    image: "https://miro.medium.com/v2/resize:fit:952/format:webp/0*dXhELFDBg3i0hPju",
    mediumLink: "https://medium.com/@protegeigdtuw/part-3-real-stories-and-measurable-impact-of-accessible-ai-57e4e8650d2a",
  },
  {
    id: 4,
    title: "Part 4: Gaps, Ethics, and the Future of AI in Accessibility",
    category: "AI & Accessibility",
    date: "Apr-27-2025",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*8HbGJ_p4lUZ-zNQT",
    mediumLink: "https://medium.com/@protegeigdtuw/part-4-gaps-ethics-and-the-future-of-ai-in-accessibility-bbfbccfd0c28",
  },

  // ============ DeepSeek AI ============
  {
    id: 5,
    title: "Part 1: DeepSeek vs. GPT-4: How It Stacks Up",
    category: "DeepSeek AI",
    date: "Apr-08-2025",
    image: "/images/neural.png",
    mediumLink: "https://medium.com/@protegeigdtuw/part-1-deepseek-vs-gpt-4-how-it-stacks-up-e3bf32e33599",
  },
  {
    id: 6,
    title: "Part 2: Breaking Down DeepSeek’s Model Architecture",
    category: "DeepSeek AI",
    date: "Apr-08-2025",
    image: "https://miro.medium.com/v2/resize:fit:1042/format:webp/0*HlPe-ARGVFYd15UY",
    mediumLink: "https://medium.com/@protegeigdtuw/part-2-breaking-down-deepseeks-model-architecture-ab101c76d388",
  },
  {
    id: 7,
    title: "Part 3: Real-World Applications: Where DeepSeek Shines",
    category: "DeepSeek AI",
    date: "Apr-08-2025",
    image: "https://static01.nyt.com/images/2025/01/27/multimedia/27DEEPSEEK-EXPLAINER-1-01-hpmc/27DEEPSEEK-EXPLAINER-1-01-hpmc-videoSixteenByNineJumbo1600.jpg",
    mediumLink: "https://medium.com/@protegeigdtuw/part-3-real-world-applications-where-deepseek-shines-1870ec512181",
  },
  {
    id: 8,
    title: "Part 4: Challenges and What’s Next for DeepSeek",
    category: "DeepSeek AI",
    date: "Apr-10-2025",
    image: "https://fortune.com/img-assets/wp-content/uploads/2025/01/GettyImages-2194622697-e1737994605367.jpg?w=1440&q=75",
    mediumLink: "https://medium.com/@protegeigdtuw/part-4-challenges-and-whats-next-for-deepseek-099ba9f1abb2",
  },
  // ============ Deep Learning ============
  {
    id: 9,
    title: "Part 1: Intro to Neural Networks: AI Basics",
    category: "Deep Learning",
    date: "Feb-09-2025",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*QPzy0NzcFjNhjNaf",
    mediumLink: "https://medium.com/@protegeigdtuw/part-1-intro-to-neural-networks-ai-basics-38919986f7cf",
  },
  {
    id: 10,
    title: "Part 2: Shallow to Deep Networks: A Journey of Innovation",
    category: "Deep Learning",
    date: "Feb-09-2025",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*Yw6wxMfOOydqmLP3",
    mediumLink: "https://medium.com/@protegeigdtuw/part-2-shallow-to-deep-networks-a-journey-of-innovation-98197759f22f",
  },
  {
    id: 11,
    title: "Part 3: Deep Learning Architectures: CNNs, RNNs, & More",
    category: "Deep Learning",
    date: "Feb-09-2025",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*1yH0Rxz2X7xBNYVr",
    mediumLink: "https://medium.com/@protegeigdtuw/part-3-deep-learning-architectures-cnns-rnns-more-e4de97699fa3",
  },
  {
    id: 12,
    title: "Part 4: Deep Learning Applications: Revolutionizing the World",
    category: "Deep Learning",
    date: "Feb-10-2025",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*zbGihx3isEVCc9Or",
    mediumLink: "https://medium.com/@protegeigdtuw/part-4-deep-learning-applications-revolutionizing-the-world-6e707896673a",
  },

  // ============ TensorFlow Series ============
  {
    id: 13,
    title: "TensorFlow 101: A Brief Introduction to AI’s Core Engine",
    category: "TensorFlow Series",
    date: "Jan-14-2024",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*OJCbf-IjyRnFShX4.png",
    mediumLink: "https://medium.com/@protegeigdtuw/tensorflow-101-a-brief-introduction-to-ais-core-engine-29c2290630c2",
  },
  {
    id: 14,
    title: "TensorFlow 102: Exploring TensorFlow Extensions",
    category: "TensorFlow Series",
    date: "Jan-14-2025",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*OJCbf-IjyRnFShX4.png",
    mediumLink: "https://medium.com/@protegeigdtuw/tensorflow-102-exploring-tensorflow-extensions-18e27bac5342",
  },
  {
    id: 15,
    title: "TensorFlow 103: Key Features Unleashed",
    category: "TensorFlow Series",
    date: "Jan-14-2025",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*OJCbf-IjyRnFShX4.png",
    mediumLink: "https://medium.com/@protegeigdtuw/tensorflow-103-key-features-unleashed-268461a8e40f",
  },
  {
    id: 16,
    title: "TensorFlow 104: The Timeline of TensorFlow Development",
    category: "TensorFlow Series",
    date: "Jan-14-2025",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*OJCbf-IjyRnFShX4.png",
    mediumLink: "https://medium.com/@protegeigdtuw/tensorflow-102-exploring-tensorflow-extensions-18e27bac5342",
  },
  {
    id: 17,
    title: "TensorFlow 105: Keras, PyTorch, TensorFlow — A Framework Faceoff and TensorFlow’s Limitations",
    category: "TensorFlow Series",
    date: "Jan-14-2025",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*kJhiYQYKW4108aXu",
    mediumLink: "https://medium.com/@protegeigdtuw/tensorflow-105-keras-pytorch-tensorflow-a-framework-faceoff-and-tensorflows-limitations-111dc48ecdd32",
  },

  // ============ LLM OS ============
  {
    id: 18,
    title: "Part 1 : Introduction to LLM OS",
    category: "LLM OS",
    date: "Mar-31-2024",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*H6gWOCGhdUd5OgvN",
    mediumLink: "https://medium.com/@protegeigdtuw/part-1-introduction-to-llm-os-1cfec39689f7",
  },
  {
    id: 19,
    title: "Part 2 : Challenges and Solutions to LLM OS",
    category: "LLM OS",
    date: "Mar-31-2024",
    image: "/images/ai.png",
    mediumLink: "https://medium.com/@protegeigdtuw/part-2-challenges-and-solutions-to-llm-os-1cc0fec2ac57",
  },
  {
    id: 20,
    title: "Part 3 : Implementation and technology of LLM OS",
    category: "LLM OS",
    date: "Mar-31-2024",
    image: "https://miro.medium.com/v2/resize:fit:4800/format:webp/0*HByvw0ZYj4B9P-Jm",
    mediumLink: "https://medium.com/@protegeigdtuw/part3-implementation-and-technology-of-llm-os-a3d296a2ab73",
  },
  {
    id: 21,
    title: "Part 4 : Use cases and User experiences -LLM OS",
    category: "LLM OS",
    date: "Mar-31-2024",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*93cE8wpH-NwU8fOn",
    mediumLink: "https://medium.com/@protegeigdtuw/part-4-use-cases-and-user-experiences-llm-os-71f6d0763773",
  },
  {
    id: 22,
    title: "Part 5: Conclusion and Future Trends",
    category: "LLM OS",
    date: "Mar-31-2024",
    image: "/images/ai.png",
    mediumLink: "https://medium.com/@protegeigdtuw/part-5-conclusion-and-future-trends-d1e954f44833",
  },

  // ============ AI Chatbots & Bots ============
  {
    id: 23,
    title: "Part 1: Bots Unveiled - Navigating the Evolution",
    category: "AI Chatbots & Bots",
    date: "Jan-28-2024",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*cFz8XE8MEpr84NFY",
    mediumLink: "https://medium.com/@protegeigdtuw/part-1-bots-unveiled-navigating-the-evolution-29d104f0ccfa",
  },
  {
    id: 24,
    title: "Part 2: A Deep Dive into WhatsApp and Telegram Bots",
    category: "AI Chatbots & Bots",
    date: "Jan-28-2024",
    image: "/images/ai.png",
    mediumLink: "https://medium.com/@protegeigdtuw/part-2-a-deep-dive-into-whatsapp-and-telegram-bots-4e7c59f9282c",
  },
  {
    id: 25,
    title: "Part 3: Exploring the Landscape of AI Chatbots",
    category: "AI Chatbots & Bots",
    date: "Jan-28-2024",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*3btIHKGwe5A7rpte",
    mediumLink: "https://medium.com/@protegeigdtuw/part-3-exploring-the-landscape-of-ai-chatbots-b4d9cc67cb57",
  },
  {
    id: 26,
    title: "Part 4: Bot Evolution - Charting the Course for Future Upgrades",
    category: "AI Chatbots & Bots",
    date: "Jan-28-2024",
    image: "/images/ai.png",
    mediumLink: "https://medium.com/@protegeigdtuw/part-4-bot-evolution-charting-the-course-for-future-upgrades-c4d4a8861058",
  },

  // ============ Gemini AI Series ============
  {
    id: 27,
    title: "Part 1: Exploring the Depths of Gemini AI: A Comprehensive Journey from Introduction to Architecture",
    category: "Gemini AI Series",
    date: "Dec-27-2023",
    image: "https://miro.medium.com/v2/resize:fit:600/format:webp/0*uOC8a2sihdiOz7Lg",
    mediumLink: "https://medium.com/@protegeigdtuw/exploring-the-depths-of-gemini-ai-a-comprehensive-journey-from-introduction-to-architecture-3467797bd597",
  },
  {
    id: 28,
    title: "Part 2: Unveiling Gemini AI: Features and Limitations in the AI Frontier",
    category: "Gemini AI Series",
    date: "Dec-27-2023",
    image: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/IO24_WhatsInAName_SocialShare_S96SOzG.width-1300.png",
    mediumLink: "https://medium.com/@protegeigdtuw/gemini-vs-gpt4-ai-showdown",
  },
  {
    id: 29,
    title: "Part 3: Navigating Conversational AI: A Comparative Analysis of ChatGPT and Gemini AI",
    category: "Gemini AI Series",
    date: "Dec-27-2023",
    image: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/IO24_WhatsInAName_SocialShare_S96SOzG.width-1300.png",
    mediumLink: "https://medium.com/@protegeigdtuw/navigating-conversational-ai-a-comparative-analysis-of-chatgpt-and-gemini-ai-part-3-3d1d87594220",
  },
  {
    id: 30,
    title: "Part 4: Unleashing Gemini AI’s Uses, API Integration, and Future Trajectory",
    category: "Gemini AI Series",
    date: "Dec-27-2023",
    image: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/IO24_WhatsInAName_SocialShare_S96SOzG.width-1300.png",
    mediumLink: "https://medium.com/@protegeigdtuw/unleashing-gemini-ais-uses-api-integration-and-future-trajectory-part-4-0e83715b8bb3",
  },

  // ============ Vibe Coding ============
  {
    id: 31,
    title: "Part 1: What is Vibe Coding?",
    category: "Vibe Coding",
    date: "Jun-14-2025",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNa4zuQw_APlD_vabrv--KNrepqKVQ8JEAtg&s",
    mediumLink: "https://medium.com/@protegeigdtuw/part-1-what-is-vibe-coding-e7da73c849ff",
  },
  {
    id: 32,
    title: "Part 2: Implementing Vibe Coding in Design",
    category: "Vibe Coding",
    date: "Jun-14-2025",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNa4zuQw_APlD_vabrv--KNrepqKVQ8JEAtg&s",
    mediumLink: "https://medium.com/@protegeigdtuw/part-2-implementing-vibe-coding-in-design-daa1ed245f00",
  },
  {
    id: 33,
    title: "Part 3: How to Integrate Vibe Coding into the Design Process?",
    category: "Vibe Coding",
    date: "Jun-14-2025",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNa4zuQw_APlD_vabrv--KNrepqKVQ8JEAtg&s",
    mediumLink: "https://medium.com/@protegeigdtuw/part-3-how-to-integrate-vibe-coding-into-the-design-process-2b8f6bb1f1a2",
  },
  {
    id: 34,
    title: "Part 4: Best Practices and Common Pitfalls",
    category: "Vibe Coding",
    date: "Jun-15-2025",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNa4zuQw_APlD_vabrv--KNrepqKVQ8JEAtg&s",
    mediumLink: "https://medium.com/@protegeigdtuw/part-4-best-practices-and-common-pitfalls-1c330b41f782",
  },

  // ============ Edge Computing ============
  {
    id: 35,
    title: "Part 1: What is Edge Computing and how does it work ?",
    category: "Edge Computing",
    date: "Jun-17-2024",
    image: "https://www.i-scoop.eu/wp-content/uploads/2019/12/Edge-computing.jpg",
    mediumLink: "https://medium.com/@protegeigdtuw/part-1-what-is-edge-computing-and-how-does-it-work-4cf9c66f99fc",
  },
  {
    id: 36,
    title: "Part 2: Edge Computing VS Cloud Computing",
    category: "Edge Computing",
    date: "Jun-17-2024",
    image: "https://www.i-scoop.eu/wp-content/uploads/2019/12/Edge-computing.jpg",
    mediumLink: "https://medium.com/@protegeigdtuw/part-2-edge-computing-vs-cloud-computing-096e056260ed",
  },
  {
    id: 37,
    title: "Part 3: Benefits & Challenges of Edge Computing",
    category: "Edge Computing",
    date: "Jun-17-2024",
    image: "https://www.i-scoop.eu/wp-content/uploads/2019/12/Edge-computing.jpg",
    mediumLink: "https://medium.com/@protegeigdtuw/part-3-benefits-challenges-of-edge-computing-96f96ca5735f",
  },

  // ============ Blockchain & Web3 ============
  {
    id: 38,
    title: "Part 1 : Exploring the Foundations: Introduction to Blockchain and Web3",
    category: "Blockchain & Web3",
    date: "Feb-11-2024",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*wZ_5opxn2VV-Y-rz",
    mediumLink: "https://medium.com/@protegeigdtuw/part-1-exploring-the-foundations-introduction-to-blockchain-and-web3-d5c4a8566f72",
  },
  {
    id: 39,
    title: "Part 2 : Exploring Components and Navigation of the Ecosystem",
    category: "Blockchain & Web3",
    date: "Feb-11-2024",
    image: "/images/abstract.png",
    mediumLink: "https://medium.com/@protegeigdtuw/part-2-exploring-components-and-navigation-of-the-ecosystem-e312085d07bd",
  },
  {
    id: 40,
    title: "Part 3 : Pioneering the Future: Challenges, Trends, and Societal Impact of Blockchain and Web3",
    category: "Blockchain & Web3",
    ate: "Feb-11-2024",
    image: "/images/deep-learning.png",
    mediumLink: "https://medium.com/@protegeigdtuw/part-3-pioneering-the-future-challenges-trends-and-societal-impact-of-blockchain-and-web3-f9f2a7ebd490",
  },

  // ============ Data Structures & Algorithms ============
  {
    id: 41,
    title: "Part 1: The Role of Data Structures in Search Engines, Algorithms to Applications",
    category: "Data Structures & Algorithms",
    date: "Jan-20-2025",
    image: "https://miro.medium.com/v2/resize:fit:1176/format:webp/0*BNbGiJ1xo45DuMdZ",
    mediumLink: "https://medium.com/@protegeigdtuw/part-1-the-role-of-data-structures-in-search-engines-algorithms-to-applications-6061b8360c6e",
  },
  {
    id: 42,
    title: "Part 2: How Data Structures Power Blockchain and Cryptography, Algorithms to Applications",
    category: "Data Structures & Algorithms",
    date: "Jan-20-2025",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*goek1Smgbdrplqtd",
    mediumLink: "https://medium.com/@protegeigdtuw/part-2-how-data-structures-power-blockchain-and-cryptography-algorithms-to-applications-e62f8382a0cd",
  },
  {
    id: 43,
    title: "Part 3: Evolution of Data Structures in Cloud Computing, Algorithms to Applications",
    category: "Data Structures & Algorithms",
    date: "Jan-20-2025",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*goek1Smgbdrplqtd",
    mediumLink: "https://medium.com/@protegeigdtuw/part-3-evolution-of-data-structures-in-cloud-computing-algorithms-to-applications-26fb34e68d86",
  },
  {
    id: 44,
    title: "Part 4: Data Structures in Natural Language Processing (NLP), Algorithms to Applications",
    category: "Data Structures & Algorithms",
    date: "Jan-21-2025",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*V87WXK6LF7qZd2uQ",
    mediumLink: "https://medium.com/@protegeigdtuw/part-4-data-structures-in-natural-language-processing-nlp-algorithms-to-applications-621b3f0b2780",
  },

  // ============ Resume & Career ============
  {
    id: 45,
    title: "Introducing Resume Revamp!",
    category: "Resume & Career",
    date: "Dec-07-2024",
    image: "/images/mini.png",
    mediumLink: "https://medium.com/@protegeigdtuw/introducing-resume-revamp-2c72bd100a20",
  },
  {
    id: 46,
    title: "Part 1: The Essentials of Resume Structuring",
    category: "Resume & Career",
    date: "Dec-07-2024",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ckz4L9A3YQg5xz2AjbPbVA.png",
    mediumLink: "https://medium.com/@protegeigdtuw/part-1-the-essentials-of-resume-structuring-c552850ca004",
  },
  {
    id: 47,
    title: "Part 2: Leveraging Overleaf for Professional Resume Design",
    category: "Resume & Career",
    date: "Dec-07-2024",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*e6lMLAJ1qGFSPBbT",
    mediumLink: "https://medium.com/@protegeigdtuw/part-2-leveraging-overleaf-for-professional-resume-design-100e3fa4efe3",
  },
  {
    id: 48,
    title: "Part 3: How to Slay the ATS Game: A Brief Guide to Optimize Your Resume",
    category: "Resume & Career",
    date: "Dec-07-2024",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ckz4L9A3YQg5xz2AjbPbVA.png",
    mediumLink: "https://medium.com/@protegeigdtuw/part-3-how-to-slay-the-ats-game-a-brief-guide-to-optimize-your-resume-469609a8e7ad",
  },
  {
    id: 49,
    title: "Part 4: Highlighting Tech Expertise in your Resume",
    category: "Resume & Career",
    date: "Dec-07-2024",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ckz4L9A3YQg5xz2AjbPbVA.png",
    mediumLink: "https://medium.com/@protegeigdtuw/part-4-highlighting-tech-expertise-in-your-resume-5a64d5648db0",
  },
  {
    id: 50,
    title: "Part 5: Tailoring Your Resume for different roles",
    category: "Resume & Career",
    date: "Dec-07-2024",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ckz4L9A3YQg5xz2AjbPbVA.png",
    mediumLink: "https://medium.com/@protegeigdtuw/part-5-tailoring-your-resume-for-different-roles-a83b9ba6d28e",
  },

  // ============ NVIDIA & AI Industry ============
  {
    id: 51,
    title: "Part 1: Introduction to NVIDIA and its Role in AI",
    category: "NVIDIA & AI Industry",
    date: "Apr-24-2024",
    image: "https://static.vecteezy.com/system/resources/previews/020/190/500/non_2x/nvidia-logo-nvidia-icon-free-free-vector.jpg",
    mediumLink: "https://medium.com/@protegeigdtuw/part-1-introduction-to-nvidia-and-its-role-in-ai-906522da9b65",
  },
  {
    id: 52,
    title: "Part 2: NVIDIA’s Technology and Future Trends",
    category: "NVIDIA & AI Industry",
    date: "Apr-24-2024",
    image: "https://static.vecteezy.com/system/resources/previews/020/190/500/non_2x/nvidia-logo-nvidia-icon-free-free-vector.jpg",
    mediumLink: "https://medium.com/@protegeigdtuw/part-2-nvidias-technology-and-future-trends-0d5cf4579f23",
  },
  {
    id: 53,
    title: "Part 3: Impact of Nvidia on industries and its fields of influence",
    category: "NVIDIA & AI Industry",
    date: "Apr-24-2024",
    image: "https://static.vecteezy.com/system/resources/previews/020/190/500/non_2x/nvidia-logo-nvidia-icon-free-free-vector.jpg",
    mediumLink: "https://medium.com/@protegeigdtuw/part-3-impact-of-nvidia-on-industries-and-its-fields-of-influence-b963c2d444ff",
  },

  // ============ Pen It Protégé ============
  {
    id: 54,
    title: "404 Not Found? More Like 404 Eternally Archived",
    category: "Pen It Protégé",
    date: "Sep-28-2025",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*JTk79_ny6b47cDU4KLI_pQ.png",
    mediumLink: "https://medium.com/@protegeigdtuw/404-not-found-more-like-404-eternally-archived-402143f6df44",
  },
  {
    id: 55,
    title: "Edge Awakens: The Rise of Thinking Machines by 2040!",
    category: "Pen It Protégé",
    date: "Sep-29-2025",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*-1DNA4S_4I7X4Gcvbo8kGQ.png",
    mediumLink: "https://medium.com/@protegeigdtuw/edge-awakens-the-rise-of-thinking-machines-by-2040-c01198c8f306",
  },
  {
    id: 56,
    title: "The Road to Artificial General Intelligence: Humanity’s Greatest Adventure",
    category: "Pen It Protégé",
    date: "Sep-28-2025",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*HTT9dYebSVtcHF1GsMc7EA.png",
    mediumLink: "https://medium.com/@protegeigdtuw/the-road-to-artificial-general-intelligence-humanitys-greatest-adventure-b9169e9b6926",
  },
]

const categories = [
  "All",
  "New Releases",
  "AI & Accessibility",
  "DeepSeek AI",
  "Deep Learning",
  "TensorFlow Series",
  "LLM OS",
  "AI Chatbots & Bots",
  "Gemini AI Series",
  "Vibe Coding",
  "Edge Computing",
  "Blockchain & Web3",
  "Data Structures & Algorithms",
  "Resume & Career",
  "NVIDIA & AI Industry",
  "Pen It Protégé",
]

const BlogCard = ({ blog }) => {
  const isNew = newPostIds.includes(blog.id)
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`blog-card ${isNew ? 'new-post' : ''}`}
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
}

export default function Blogs() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredBlogs = selectedCategory === "All"
    ? allBlogs
    : selectedCategory === "New Releases"
    ? allBlogs.filter(blog => newPostIds.includes(blog.id))
    : allBlogs.filter(blog => blog.category === selectedCategory)

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

      {/* CATEGORY FILTER - Now at the top, visible on first page */}
      <motion.section 
        className="category-filter-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <p className="filter-label">Explore by Category</p>
        <div className="category-buttons">
          {categories.map(category => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`category-btn ${selectedCategory === category ? 'active' : ''} ${category === 'New Releases' ? 'new-releases-btn' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* ALL BLOGS GRID - New posts get glowing effect automatically */}
      <main>
        <div className="blog-grid">
          {filteredBlogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </main>

      {/* EXPLORE BANNER */}
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