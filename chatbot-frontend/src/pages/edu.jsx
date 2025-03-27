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
        content: "Electronic waste includes discarded electrical/electronic devices. Proper management is crucial for environmental protection.",
        icon: "📱",
        stats: [
          "🌍 53.6M tons generated globally (2019)",
          "📈 Growing 3-4% annually",
          "♻️ Only 17.4% formally recycled"
        ]
      },
      {
        title: "Environmental Impact",
        content: "Improper disposal leads to:",
        icon: "⚠️",
        subsections: [
          "Soil & water contamination",
          "Air pollution from burning",
          "Health hazards from toxins",
          "Resource depletion"
        ]
      }
    ]
  },
  {
    category: "Actionable Solutions",
    items: [
      {
        title: "Reduction Strategies",
        icon: "🌱",
        steps: [
          { icon: "🔧", text: "Repair instead of replace" },
          { icon: "🔄", text: "Donate functional devices" },
          { icon: "💡", text: "Choose energy-efficient products" },
          { icon: "📦", text: "Minimize packaging waste" }
        ]
      },
      {
        title: "Proper Recycling",
        icon: "♻️",
        content: "Follow these recycling steps:",
        subsections: [
          "1. Find certified recyclers",
          "2. Wipe personal data",
          "3. Separate components",
          "4. Track recycling process"
        ]
      }
    ]
  },
  {
    category: "Resources",
    items: [
      {
        title: "Learning Materials",
        icon: "📚",
        resources: [
          { type: "📹 Video", title: "E-Waste Journey", link: "#" },
          { type: "📄 Report", title: "Global E-Waste Monitor", link: "#" },
          { type: "📑 Guide", title: "DIY Repair Handbook", link: "#" }
        ]
      },
      {
        title: "Quick Actions",
        icon: "⚡",
        tips: [
          "Locate nearest drop-off center",
          "Join community clean-up",
          "Educate friends & family",
          "Support eco-friendly brands"
        ]
      }
    ]
  }
];

const Edu = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleSection = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <Navbar hideGetStarted={true} disableSlide={true} />
      <div className="edu-container">
        <header className="edu-header">
          <h1>E-Waste Education Center</h1>
          <p className="edu-subtitle">Your Comprehensive Guide to Responsible Electronics Management</p>
        </header>

        <div className="edu-content-wrapper">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="edu-category">
              <h2 className="category-title">{section.category}</h2>
              <div className="category-flex">
                {section.items.map((item, itemIndex) => {
                  const index = `${sectionIndex}-${itemIndex}`;
                  return (
                    <div 
                      key={index}
                      className={`edu-card ${activeIndex === index ? 'active' : ''}`}
                    >
                      <button 
                        className="card-header"
                        onClick={() => toggleSection(index)}
                      >
                        <span className="item-icon">{item.icon}</span>
                        <h3>{item.title}</h3>
                        <span className="toggle-indicator">
                          {activeIndex === index ? '▼' : '▶'}
                        </span>
                      </button>
                      
                      {activeIndex === index && (
                        <div className="card-content">
                          {item.content && <p className="content-lead">{item.content}</p>}
                          
                          {item.stats && (
                            <div className="stats-grid">
                              {item.stats.map((stat, i) => (
                                <div key={i} className="stat-item">
                                  <div className="stat-text">{stat}</div>
                                </div>
                              ))}
                            </div>
                          )}

                          {item.subsections && (
                            <ul className="subsection-list">
                              {item.subsections.map((sub, i) => (
                                <li key={i}>
                                  <span className="bullet">•</span>
                                  {sub}
                                </li>
                              ))}
                            </ul>
                          )}

                          {item.steps && (
                            <div className="steps-grid">
                              {item.steps.map((step, i) => (
                                <div key={i} className="step-item">
                                  <span className="step-icon">{step.icon}</span>
                                  <p>{step.text}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {item.resources && (
                            <div className="resources-section">
                              <h4>Educational Resources:</h4>
                              {item.resources.map((res, i) => (
                                <a key={i} href={res.link} className="resource-link">
                                  <span className="resource-type">{res.type}</span>
                                  <span className="resource-title">{res.title}</span>
                                  <span className="external-icon">↗</span>
                                </a>
                              ))}
                            </div>
                          )}

                          {item.tips && (
                            <div className="tips-grid">
                              {item.tips.map((tip, i) => (
                                <div key={i} className="tip-item">
                                  <span className="tip-number">{i + 1}.</span>
                                  {tip}
                                </div>
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
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Edu;