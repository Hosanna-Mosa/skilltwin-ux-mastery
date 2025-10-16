/*
  Seed script for Blog documents.
  Usage:
    NODE_ENV=development node scripts/seedBlogs.js
  or with npm script:
    npm run seed:blogs
*/

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Blog = require("../models/Blog");

const seedData = [
  {
    title: "Getting Started With Your Tech Career",
    slug: "getting-started-tech-career",
    excerpt:
      "Practical steps to break into tech: learning paths, projects, and interviews.",
    content:
      `Breaking into tech can feel overwhelming. Start with a focused learning path, build 2-3 small but complete projects, and practice explaining your work.\n\nKey steps:\n- Pick one stack and go deep for 6-8 weeks\n- Build portfolio projects that solve real problems\n- Learn to communicate your decisions in interviews` ,
    tags: ["Career", "Guide"],
    images: [
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
    ],
    author: "SkillTwin",
  },
  {
    title: "7 Practical Ways To Optimize React Performance",
    slug: "optimize-react-performance",
    excerpt:
      "From memoization to code-splitting, learn the techniques that matter.",
    content:
      `Focus on wins that matter: memoize expensive trees, split large routes, and avoid unnecessary re-renders.\n\nChecklist:\n- React.memo strategically\n- useMemo/useCallback for stable references\n- Code split routes/components\n- Virtualize long lists`,
    tags: ["React", "Performance"],
    images: [
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
    ],
    author: "SkillTwin",
  },
  {
    title: "Acing Technical Interviews: A Structured Approach",
    slug: "acing-technical-interviews",
    excerpt:
      "How to prepare effectively: patterns, practice, and mindset.",
    content:
      `Interviews reward clarity. Practice with a repeatable framework: clarify, plan, implement, test, and reflect.\n\nTips:\n- Think out loud\n- Write readable code\n- Handle edge cases early\n- Reflect on alternatives`,
    tags: ["Interviews", "Preparation"],
    images: [
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
    ],
    author: "SkillTwin",
  },
];

async function seed() {
  try {
    await connectDB();
    console.log("Connected. Seeding blogs...");

    // Upsert by slug to make the script idempotent
    let upserted = 0;
    for (const data of seedData) {
      const result = await Blog.findOneAndUpdate(
        { slug: data.slug },
        { $set: data, $setOnInsert: { publishedAt: new Date() } },
        { upsert: true, new: true }
      );
      if (result) upserted += 1;
    }

    const count = await Blog.countDocuments();
    console.log(`Seed complete. Upserted: ${upserted}. Total blogs: ${count}.`);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log("Connection closed");
  }
}

seed();


