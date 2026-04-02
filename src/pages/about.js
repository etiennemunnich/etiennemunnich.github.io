import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"

const AboutPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query AboutQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <div className="about-page">
        <h1>About</h1>
        <p>
          I'm a technologist passionate about many topics. At present I work as a Senior
          Edge Specialist Solutions Architect at Amazon Web Services (AWS), based in
          Sydney, Australia. With a focus on Edge Services and cloud architecture, I help
          organisations design and implement secure, high-performance web applications
          that scale globally.
        </p>
        <p className="about-disclaimer">
          Views and opinions expressed here are my own and do not represent those of AWS.
        </p>

        <h2>Expertise</h2>
        <ul>
          <li>AWS Edge Services — CloudFront, Shield Advanced, WAF</li>
          <li>Serverless — Lambda, Lambda@Edge, API Gateway, CloudFront Functions</li>
          <li>Infrastructure as Code — AWS CDK, CloudFormation</li>
          <li>Development — Python, Go, Node.js</li>
          <li>Security-first architecture at global scale</li>
        </ul>

        <h2>Interests</h2>
        <ul>
          <li>Web application security &amp; open source WAF (OWASP CRS, ModSecurity, Coraza)</li>
          <li>Distributed systems &amp; content delivery</li>
          <li>AI tooling &amp; coding assistants</li>
          <li>Serverless architectures</li>
        </ul>

        <h2>Speaking</h2>
        <ul>
          <li>AWS re:Invent 2025 — State of the Edge: Delivery of the web with CloudFront, WAF, &amp; Shield (NET211)</li>
          <li>AWS re:Invent 2024 — Protecting against DDoS events (CDN306)</li>
          <li>AWS re:Inforce 2024 — How Catch Group uses AWS WAF Bot Control (NIS306)</li>
          <li>AWS re:Invent 2023 — Designing a secure perimeter with cost in mind</li>
        </ul>

        <h2>Contact</h2>
        <p>
          <a href="https://linkedin.com/in/etiennemunnich" target="_blank" rel="noreferrer">LinkedIn</a>
          {" · "}
          <a href="https://github.com/EtienneMunnich" target="_blank" rel="noreferrer">GitHub</a>
          {" · "}
          <a href="https://topmate.io/etienne_munnich" target="_blank" rel="noreferrer">Topmate</a>
        </p>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="About" />

export default AboutPage
