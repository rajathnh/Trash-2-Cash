// Edu.jsx
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
          "Electronic waste includes discarded electrical/electronic devices. Proper management is crucial for environmental protection.",
        stats: [
          "📱 53.6M tons generated globally (2024)",
          "📈 Growing 5x faster than recycling",
          "♻️ Only 22.3% formally recycled",
          "💸 $62B recoverable materials",
        ],
        source: "UN Global E-Waste Monitor 2024",
        infographic: "/images/ewaste-global.png",
      },
      {
        title: "Why Minimize E-Waste?",
        icon: "⚠️",
        stats: [
          "☣️ 500+ toxic substances identified",
          "🌡️ 2% of global CO2 emissions",
          "💧 1 phone pollutes 600L water",
          "🔄 7kg gold/ton of PCBs",
        ],
        subsections: [
          "👶 Neurodevelopmental damage",
          "🫀 Cardiovascular diseases",
          "🫁 Respiratory complications",
          "🧬 DNA damage from heavy metals",
        ],
      },
    ],
  },
  {
    category: "Global E-Waste Crisis",
    items: [
      {
        title: "2024 Key Findings",
        icon: "📊",
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
        steps: [
          {
            icon: "🔧",
            text: "Repair First",
            detail:
              "Extend device lifespan by 2-3 years through professional repairs",
          },
          {
            icon: "🔄",
            text: "Resell/Donate",
            detail: "40% of discarded devices still have resale value",
          },
          {
            icon: "🏭",
            text: "Certified Recycling",
            detail: "Use R2/e-Stewards certified recyclers only",
          },
          {
            icon: "🛒",
            text: "Buy Sustainable",
            detail: "Choose EPEAT/Energy Star rated electronics",
          },
          {
            icon: "📢",
            text: "Spread Awareness",
            detail: "Educate 5+ people about proper e-waste handling",
          },
        ],
      },
      {
        title: "Recycling Process",
        icon: "♻️",
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
        title: "Video Guides",
        icon: "🎥",
        resources: [
          {
            type: "Documentary",
            title: "The E-Waste Tragedy",
            link: "https://youtu.be/4GtWGHvX-rk",
          },
          {
            type: "Tutorial",
            title: "Proper Recycling Guide",
            link: "https://youtu.be/FmJFVmtWf-I",
          },
          {
            type: "Analysis",
            title: "Global Impact",
            link: "https://youtu.be/smdTnFkdG5Q",
          },
          {
            type: "Innovation",
            title: "Future Solutions",
            link: "https://youtu.be/1wS_q3o5iGk",
          },
        ],
      },
    ],
  },
  {
    category: "Hazardous E-Waste",
    items: [
      {
        title: "Hazard Analysis",
        icon: "⚠️",
        content:
          "Analyze the hazardous chemicals present in e-waste and understand their potential risks.",
        stats: [
          "🧪 Lead in CRTs",
          "☣️ Mercury in switches",
          "🔥 Lithium in batteries",
          "⚡ Cadmium in semiconductors",
        ],
        subsections: [
          "Risk of neurological damage",
          "Environmental contamination concerns",
        ],
        source: "EPA Guidelines on E-Waste",
        infographic: "/images/hazard-analysis.png",
      },
      {
        title: "Safe Disposal",
        icon: "🗑️",
        content:
          "Learn safe disposal practices for e-waste to prevent hazardous exposure and environmental damage.",
        subsections: [
          "Dispose batteries at certified centers",
          "Avoid regular trash for devices with mercury",
          "Follow manufacturer guidelines for disposal",
          "Use professional services for large items",
        ],
        source: "EPA Guidelines on E-Waste",
        infographic: "/images/safe-disposal.png",
      },
    ],
  },
];

const Edu = () => {
  // Use a single state for the currently expanded card (only one open at a time)
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
          {sections.map((section, sectionIndex) => {
            // For hazardous e-waste, add a custom grid class for two columns.
            const gridClass =
              section.category === "Hazardous E-Waste"
                ? "category-grid hazardous-grid"
                : "category-grid";
            return (
              <div key={`section-${sectionIndex}`} className="edu-category">
                <h2 className="category-title">{section.category}</h2>
                <div className={gridClass}>
                  {section.items.map((item, itemIndex) => {
                    const cardId = `card-${sectionIndex}-${itemIndex}`;
                    const isExpanded = expandedCard === cardId;
                    // Add extra header classes if within Hazardous E-Waste section.
                    const headerExtraClass =
                      section.category === "Hazardous E-Waste"
                        ? item.title === "Hazard Analysis"
                          ? "hazard-analysis-header"
                          : item.title === "Safe Disposal"
                          ? "safe-disposal-header"
                          : ""
                        : "";
                    return (
                      <div
                        key={cardId}
                        className={`edu-card ${isExpanded ? "active" : ""}`}
                      >
                        <button
                          className={`card-header gradient-header ${headerExtraClass}`}
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
                              <p className="content-lead">
                                {item.content}
                              </p>
                            )}

                            {item.stats && (
                              <>
                                <div className="stats-grid">
                                  {item.stats.map((stat, i) => (
                                    <div
                                      key={`stat-${i}`}
                                      className="stat-item"
                                    >
                                      <div className="stat-text">{stat}</div>
                                    </div>
                                  ))}
                                </div>
                                {item.source && (
                                  <div className="stat-source">
                                    Source: {item.source}
                                  </div>
                                )}
                              </>
                            )}

                            {item.subsections && (
                              <ul className="subsection-list">
                                {item.subsections.map((sub, i) => (
                                  <li
                                    key={`sub-${i}`}
                                    className="hazard-item"
                                  >
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

                            {item.infographic && (
                              <div className="infographic-section">
                                <img
                                  src={item.infographic}
                                  alt="Infographic"
                                  className="infographic-image"
                                  loading="lazy"
                                />
                                <a
                                  href="https://unitar.org/about/news-stories/press/global-e-waste-monitor-2024-electronic-waste-rising-five-times-faster-documented-e-waste-recycling"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="infographic-link"
                                >
                                  View Full Report ↗
                                </a>
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
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Edu;
