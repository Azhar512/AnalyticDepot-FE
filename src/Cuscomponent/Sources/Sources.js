import React, { useRef } from 'react';
import styles from './Sources.module.css';

function App() {
  const fileInputRef = useRef(null);

  return (
    <div className={`container ${styles['page-container']}`}>
      {/* Hero Section */}
      <div className={styles['hero']}>
        <div className={styles['hero-content']}>
          <h1 className={styles['hero-title']}>Documentation</h1>
        </div>
      </div>

   

      {/* Main Content */}
      <div className="main-content">
        <div className="main-header">
          <h2>Get Started</h2>
        </div>
        <p>
        Welcome to AnalyticsDepot, your one-stop solution for all things related to data analysis, visualization, and insight generation. Designed with versatility and scalability in mind, AnalyticsDepot is tailored to meet the needs of professionals, organizations, and data enthusiasts across diverse industries. By combining cutting-edge analytics capabilities with an intuitive user interface, AnalyticsDepot simplifies the process of turning raw data into actionable knowledge, enabling data-driven decisions at every level of an organization.
        </p>
        <h2>Overview of AnalyticsDepot
        </h2>

        <p>
        AnalyticsDepot is built to handle every stage of the data analysis lifecycle, from ingestion and preparation to in-depth exploration and advanced analytics. Its core functionalities are designed to empower users with the tools they need to uncover hidden trends, patterns, and relationships within their data. Whether you’re working with structured, semi-structured, or unstructured data, AnalyticsDepot provides robust support for all formats and types, ensuring flexibility and reliability.
        </p>
        <p>
        Our platform is ideal for a variety of use cases, including business intelligence, market research, customer analytics, operational efficiency analysis, and predictive modeling. Its modular design makes it adaptable, allowing users to customize the platform to suit their specific requirements.


        </p>
        <h2>Key Features

        </h2>
        <h3>Data Ingestion and Management:


        </h3>
        <p>
        AnalyticsDepot simplifies the process of importing data from multiple sources, including databases, APIs, cloud platforms, and flat files like CSV or Excel. With built-in data cleaning and transformation tools, users can ensure data integrity and consistency before diving into analysis.
        </p>
        <h3>Advanced Analytics and Statistical Tools:


        </h3>
        <p>
        Harness the power of statistical models, machine learning algorithms, and predictive analytics to gain deeper insights. Whether you're performing trend analysis, forecasting, clustering, or regression, AnalyticsDepot offers a wide range of tools to meet your analytical needs.


        </p>
        <p>
        Embark on your analytics journey today with AnalyticsDepot—where your data transforms into powerful insights!
        </p>
        
        
      </div>
    </div>
  );
}

export default App;