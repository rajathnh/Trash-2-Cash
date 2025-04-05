// src/pages/Edu.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./edu.css";

const sections = [
  {
    category: "Understanding E-Waste",
    items: [
      {
        title: "What is E-Waste?",
        icon: "🌍",
        content:
          "Imagine e-waste as the leftovers of our digital lives—old phones, laptops, and batteries that are no longer useful. They hide valuable metals like gold, yet also harmful toxins. Instead of tossing them carelessly, give them a proper send-off through recycling. It’s a smart way to recover treasures and protect our planet, ensuring a cleaner future for everyone.\n\nAdditional Info: E-waste recycling not only prevents toxic chemicals from polluting our environment but also supports a circular economy by reclaiming rare resources.",
        stats: [
          "📱 53.6M tons generated globally (2024)",
          "📈 Growing 5x faster than recycling",
          "♻️ Only 22.3% formally recycled",
          "💸 $62B recoverable materials",
        ],
        source: "UN Global E-Waste Monitor 2024",
        infographic: "/images/ewaste-global.png",
        video: "/videos/imprecy.mp4"
      },
      {
        title: "Why Minimize E-Waste?",
        icon: "⚠️",
        content:
          "Reducing e-waste is critical because the scale and impact of electronic waste affect every corner of our environment. Recycling can transform a growing crisis into an opportunity for resource recovery and energy savings.",
        stats: [
          "1. 50+ Million Tons Annually",
          "2. Only 20% Recycled",
          "3. Toxic Components",
          "4. Resource Recovery Potential",
          "5. Carbon Footprint Reduction",
        ],
        source: "Various Environmental Reports",
      },
    ],
  },
  {
    category: "Global E-Waste Crisis",
    items: [
      {
        title: "2024 Key Findings",
        icon: "📊",
        content:
          "Key statistics highlight the global burden of e-waste. From regional disparities to collection rates, the numbers paint a picture of a crisis in need of urgent attention.",
        stats: [
          "🌐 Asia: 24.9M tons (46% total)",
          "🌍 Europe: 54% collection rate",
          "📦 160M tons since 2010",
          "📱 5.3B phones discarded",
        ],
        source: "UN Global E-Waste Monitor",
      },
      {
        title: "Health Impacts",
        icon: "🏥",
        content:
          "E-waste doesn’t just affect the environment—it also has direct health impacts. Exposure to toxic substances can cause severe long-term health issues.",
        subsections: [
          "👶 Child developmental issues",
          "🫀 Increased cancer risks",
          "🫁 Lung damage from fumes",
          "🧬 Genetic mutations",
        ],
      },
    ],
  },
  {
    category: "Actionable Solutions",
    items: [
      {
        title: "5-Step Reduction Plan",
        icon: "✅",
        content:
          "Follow a step-by-step plan to reduce your e-waste footprint. Each step not only conserves resources but also contributes to a healthier environment.",
        steps: [
          {
            icon: "🔧",
            text: "Repair First",
            detail:
              "Extend device lifespan by 2-3 years through professional repairs.",
          },
          {
            icon: "🔄",
            text: "Resell/Donate",
            detail:
              "Up to 40% of discarded devices have resale value; donating them can benefit communities.",
          },
          {
            icon: "🏭",
            text: "Certified Recycling",
            detail:
              "Use R2/e-Stewards certified recyclers to ensure safe and efficient recycling.",
          },
          {
            icon: "🛒",
            text: "Buy Sustainable",
            detail:
              "Opt for electronics with EPEAT/Energy Star ratings to reduce environmental impact.",
          },
          {
            icon: "📢",
            text: "Spread Awareness",
            detail:
              "Educate others on proper e-waste handling and recycling best practices.",
          },
        ],
        video: "/videos/whattodo.mp4"
      },
      {
        title: "Recycling Process",
        icon: "♻️",
        content:
          "Understanding the recycling process helps demystify how e-waste is transformed into reusable materials. This process involves several stages—from collection to material recovery.",
        subsections: [
          "1. Collection & Transportation",
          "2. Manual Dismantling",
          "3. Mechanical Separation",
          "4. Material Recovery",
          "5. Hazard Treatment",
        ],
      },
    ],
  },
  {
    category: "Learning Resources",
    items: [
      {
        title: "Essential Reading",
        icon: "📚",
        content:
          "Expand your knowledge with curated reading materials from reputable sources. These resources provide in-depth insights into the challenges and solutions in e-waste management.",
        resources: [
          {
            type: "WHO Report",
            title: "Health Impacts of E-Waste",
            link: "https://www.who.int/news-room/fact-sheets/detail/electronic-waste-%28e-waste%29",
          },
          {
            type: "Analysis",
            title: "Metal Recovery Challenges",
            link: "https://www.wired.com/story/e-waste-recycling-cant-keep-up-precious-metals",
          },
          {
            type: "Case Study",
            title: "India's E-Waste Crisis",
            link: "https://www.iasgyan.in/daily-current-affairs/e-waste-in-india",
          },
          {
            type: "Guide",
            title: "Circular Economy Solutions",
            link: "https://www.unep.org/news-and-stories/story/how-disposable-tech-feeding-e-waste-crisis",
          },
        ],
      },
      {
        title: "Watch and Learn",
        icon: "🎥",
        content:
          "Watch EcoBuddy videos that explain e-waste challenges and recycling solutions in an engaging, easy-to-understand manner.",
        resources: [
          {
            type: "Documentary",
            title: "The E-Waste Tragedy",
            link: "https://youtu.be/4GtWGHvX-rk?si=DIivbUawjpNDBMc1",
          },
          {
            type: "Tutorial",
            title: "Proper Recycling Guide",
            link: "https://youtu.be/FmJFVmtWf-I?si=rwsTzI5CRhCyow_p",
          },
          {
            type: "Analysis",
            title: "Global Impact",
            link: "https://youtu.be/smdTnFkdG5Q?si=8YxFSULBPVHfF4ua",
          },
        ],
      },
    ],
  },
  {
    category: "Hazardous E-Waste",
    items: [
      {
        title: "Handling Hazardous E-Waste: Do It Right!",
        icon: "🗑️",
        content:
          "Proper handling of hazardous e-waste is critical to prevent environmental pollution and protect human health. Follow these guidelines to safely manage hazardous components:",
        subsections: [
          "**Why Hazardous E-Waste is a Big Deal**",
          "- Contains harmful substances like lead, mercury, and cadmium.",
          "- Improper disposal leads to soil, water, and air pollution.",
          "**Identifying Hazardous E-Waste**",
          "- Batteries, CRT monitors, fluorescent bulbs, PCBs, and more.",
          "**Safe Handling Guidelines**",
          "- Do not mix with regular trash.",
          "- Use designated collection centers.",
          "- Check manufacturer take-back programs.",
        ],
        source: "EPA Guidelines on E-Waste",
        infographic: "/images/hazard-analysis.png",
        video: "/videos/whydanger.mp4"
      },
      {
        title: "Watch and Learn: Handling Hazardous Materials",
        icon: "🎥",
        content:
          "Explore our dedicated video guide on safely handling hazardous e-waste. This section includes expert tips and innovative insights into best practices.",
        resources: [
          {
            type: "Tutorial",
            title: "Safe Disposal Techniques",
            link: "https://youtu.be/-uyIzKIw0xY?si=Dk_fcoVhNgh_Fqos",
          },
          {
            type: "AI Insight",
            title: "Hazardous E-Waste: An AI Perspective",
            link: "https://youtu.be/your-ai-video-link-3",
          },
        ],
      },
    ],
  },
  {
    category: "Want to Know More?",
    items: [
      {
        title: "Additional Resources",
        icon: "🔗",
        content:
          "For those who want to dive deeper, explore these comprehensive resources. Click the links below to read articles, reports, and more:",
        resources: [
          {
            type: "Article",
            title: "WHO – Electronic Waste Fact Sheet",
            link: "https://www.who.int/news-room/fact-sheets/detail/electronic-waste-%28e-waste%29",
          },
          {
            type: "Analysis",
            title: "Wired on Metal Recovery Challenges",
            link: "https://www.wired.com/story/e-waste-recycling-cant-keep-up-precious-metals",
          },
          {
            type: "Magazine",
            title: "VisionIAS on E-Waste in India",
            link: "https://visionias.in/current-affairs/monthly-magazine/2024-05-21/environment/e-waste",
          },
          {
            type: "Report",
            title: "EWCRA Global E-Waste Crisis",
            link: "https://ewcra.org/2024/05/29/the-global-e-waste-crisis-a-burden-on-developing-nations",
          },
          {
            type: "Guide",
            title: "UNEP – How Disposable Tech Feeds the Crisis",
            link: "https://www.unep.org/news-and-stories/story/how-disposable-tech-feeding-e-waste-crisis",
          },
          {
            type: "Case Study",
            title: "IAS Gyan on India's E-Waste",
            link: "https://www.iasgyan.in/daily-current-affairs/e-waste-in-india#:~:text=India%27s%20e-waste%20generation%20surged%20by%2073%25",
          },
          {
            type: "Blog",
            title: "Lohum on the E-Waste Crisis",
            link: "https://lohum.com/media/blog/e-waste-crisis-why-we-should-care-and-what-we-can-do",
          },
        ],
        video: "/videos/motivating.mp4"
      },
    ],
  },
];

const Edu = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (cardId) => {
    setExpandedCard((prev) => (prev === cardId ? null : cardId));
  };

  return (
    <>
      <Navbar hideGetStarted={true} disableSlide={true} />
      <div className="edu-container">
        <header className="edu-header">
          <h1>Join EcoBuddy: Learn & Act on E-Waste</h1>
          <p className="edu-subtitle">
            Your Complete Guide to Responsible Electronics Management
          </p>
        </header>

        <div className="edu-content-wrapper">
          {sections.map((section, sectionIndex) => (
            <div key={`section-${sectionIndex}`} className="edu-category">
              <h2 className="category-title">{section.category}</h2>
              <div className="category-grid">
                {section.items.map((item, itemIndex) => {
                  const cardId = `card-${sectionIndex}-${itemIndex}`;
                  const isExpanded = expandedCard === cardId;
                  return (
                    <div
                      key={cardId}
                      className={`edu-card ${isExpanded ? "active" : ""}`}
                    >
                      <button
                        className="card-header gradient-header"
                        onClick={() => toggleCard(cardId)}
                        aria-expanded={isExpanded}
                        aria-controls={`content-${cardId}`}
                      >
                        <span className="item-icon">{item.icon}</span>
                        <h3>{item.title}</h3>
                        <span
                          className={`toggle-indicator ${
                            isExpanded ? "expanded" : ""
                          }`}
                        >
                          ▶
                        </span>
                      </button>

                      {isExpanded && (
                        <div
                          id={`content-${cardId}`}
                          className="card-content"
                          aria-hidden={!isExpanded}
                        >
                          {item.content && (
                            <p className="content-lead">{item.content}</p>
                          )}

                          {item.stats && (
                            <div className="stats-grid">
                              {item.stats.map((stat, i) => (
                                <div key={`stat-${i}`} className="stat-item">
                                  <div className="stat-text">{stat}</div>
                                </div>
                              ))}
                              {item.source && (
                                <div className="stat-source">
                                  Source: {item.source}
                                </div>
                              )}
                            </div>
                          )}

                          {item.subsections && (
                            <ul className="subsection-list">
                              {item.subsections.map((sub, i) => (
                                <li key={`sub-${i}`} className="hazard-item">
                                  <span className="bullet">•</span>
                                  {sub}
                                </li>
                              ))}
                            </ul>
                          )}

                          {item.steps && (
                            <div className="steps-grid">
                              {item.steps.map((step, i) => (
                                <div key={`step-${i}`} className="step-item">
                                  <span className="step-icon">
                                    {step.icon}
                                  </span>
                                  <div className="step-text">
                                    <strong>{step.text}</strong>
                                    {step.detail && (
                                      <p className="step-detail">
                                        {step.detail}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {item.resources && (
                            <div className="resources-section">
                              <h4>Explore Resources:</h4>
                              {item.resources.map((res, i) => (
                                <a
                                  key={`resource-${i}`}
                                  href={res.link}
                                  className="resource-link"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <span
                                    className={`resource-type ${res.type
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}`}
                                  >
                                    {res.type}
                                  </span>
                                  <span className="resource-title">
                                    {res.title}
                                  </span>
                                  <span className="external-icon">↗</span>
                                </a>
                              ))}
                            </div>
                          )}

                          {/* Improved Video Section */}
                          {item.video && (
                            <div className="video-section">
                              <h4 className="video-title">Watch & Learn</h4>
                              <div className="video-container">
                                <video controls preload="metadata">
                                  <source src={item.video} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Edu;
