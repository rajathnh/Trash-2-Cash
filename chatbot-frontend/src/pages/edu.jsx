

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
          "Electronic waste includes discarded electrical/electronic devices. Proper management is crucial for environmental protection.",
        stats: [
          "📱 53.6M tons generated globally (2024)",
          "📈 Growing 5x faster than recycling",
          "♻️ Only 22.3% formally recycled",
          "💸 $62B recoverable materials",
        ],
        source: "UN Global E-Waste Monitor 2024",
        infographic: "/images/ewaste-global.png",
        video: "/videos/motivating.mp4"
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
        visualization: {
          type: "comparisonChart",
          data: [
            { label: "Generated", value: 80, color: "var(--danger-color)" },
            { label: "Recycled", value: 20, color: "var(--primary-color)" },
          ]
        }
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
    category: "Moving forward..",
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
        video: "/videos/imprecy.mp4"
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
          "Here are some of the videos that might help you more: ",
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
// Update the Hazardous E-Waste section in the sections array
{
  category: "Hazardous E-Waste",
  items: [
    {
      title: "Handling Hazardous E-Waste: Do It Right!",
      icon: "⚠️",
      cards: [
        {
          title: "Why Hazardous E-Waste is a Big Deal",
          icon: "🌍",
          content: [
            "Many electronic devices contain harmful substances like lead, mercury, cadmium",
            "Improper disposal leads to soil, water, and air pollution",
            "Direct health risks: Neurotoxicity, cancer, organ damage"
          ]
        },
        {
          title: "Identifying Hazardous E-Waste",
          icon: "🔍",
          content: [
            "- Batteries (lithium-ion, lead-acid)",
            "- CRT Monitors & TVs (lead/phosphorus content)",
            "- Fluorescent Bulbs (mercury vapor)",
            "- Printed Circuit Boards (heavy metals)",
            "- Refrigerators/ACs (ozone-depleting refrigerants)"
          ]
        },
        {
          title: "Safe Handling Guidelines",
          icon: "🧤",
          content: [
            "🚫 Never mix with regular trash",
            "📦 Use certified collection centers",
            "🏭 Check manufacturer take-back programs",
            "👶 Store safely away from children/pets",
            "📅 Dispose within 90 days of collection"
          ]
        }
      ],
      source: "EPA & WHO Guidelines 2024"
    }
  ]
},
  {
    category: "Global Regulations",
    items: [
      {
        title: "Country-Specific Rules",
        icon: "🌐",
        countries: [
          {
            name: "🇺🇸 USA",
            regulation: "RCRA mandates proper CRT monitor recycling",
            link: "https://www.epa.gov/recycle/electronics-donation-and-recycling"
          },
          {
            name: "🇪🇺 EU",
            regulation: "WEEE Directive holds producers responsible",
            link: "https://ec.europa.eu/environment/topics/waste-and-recycling/rohs-directive_en"
          },
          {
            name: "🇮🇳 India",
            regulation: "EWM Rules 2022 require manufacturer take-back",
            link: "https://cpcb.nic.in/e-waste-management/"
          },
        ]
      }
    ]
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
      <Navbar hideGetStarted={true} disableSlide={true} hideAwarenessHub={true} showChatButton={true}/>
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

{item.cards && (
  <div className="hazard-cards-grid">
    {item.cards.map((card, cardIndex) => (
      <div key={`hazard-card-${cardIndex}`} className="hazard-card">
        <div className="hazard-card-header">
          <span className="hazard-card-icon">{card.icon}</span>
          <h4>{card.title}</h4>
        </div>
        <ul className="hazard-content-list">
          {card.content.map((point, pointIndex) => (
            <li key={`point-${pointIndex}`} className="hazard-point">
              {point}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
)}

{item.source && (
  <div className="hazard-source">
    Source: {item.source}
  </div>
)}
                       
                         {item.subsections &&
                           typeof item.subsections[0] === "string" && (
                             <ul className="subsection-list">
                               {item.subsections.map((sub, i) => (
                                 <li key={i} className="hazard-item">
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
                           {item.countries && (
                             <div className="country-grid">
                               {item.countries.map((country, i) => (
                                 <a
                                   key={`country-${i}`}
                                   href={country.link}
                                   className="country-card"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                 >
                                   <span className="country-flag">{country.name.split(" ")[0]}</span>
                                   <div>
                                     <h4>{country.name.split(" ")[1]}</h4>
                                     <p>{country.regulation}</p>
                                   </div>
                                 </a>
                               ))}
                             </div>
                           )}
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