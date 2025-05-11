import React from 'react';
import { Search, FileText, PieChart, Shield } from 'lucide-react';
import './HeroSection.css';

const HeroSection: React.FC = () => {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1>Simplifying Procurement <span className="highlight">Management</span></h1>
                <p>Access and track procurement offers with our streamlined platform</p>

                <div className="hero-cta">
                    <a href="#offers" className="primary-button">
                        View Offers
                    </a>
                </div>
            </div>

            <div className="hero-features">
                <div className="feature-card">
                    <Search className="feature-icon" />
                    <h3>Advanced Search & Filtering</h3>
                    <p>Powerful search capabilities with multiple filtering options to find exactly what you need. Filter by source, buyer, and more.</p>
                </div>
                <div className="feature-card">
                    <FileText className="feature-icon" />
                    <h3>Comprehensive Details</h3>
                    <p>Access complete offer information including specifications, deadlines, and awarded contracts with full result tracking.</p>
                </div>
                <div className="feature-card">
                    <PieChart className="feature-icon" />
                    <h3>Real-time Analytics</h3>
                    <p>Track procurement metrics, monitor trends, and gain valuable insights with detailed analytics and reporting tools.</p>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;