import { ArrowRight, CheckCircle, Shield, Lock, Eye, Server, Globe, Award, AlertTriangle, Users, FileText, Zap } from 'lucide-react'
import Link from 'next/link'
import Navigation from '../../../components/shared/Navigation'
import Footer from '../../../components/shared/Footer'

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-sm font-semibold rounded-full mb-8">
            <Shield className="w-4 h-4 mr-2" />
            Enterprise-Grade Security
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Security & Privacy
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent block mt-2">
              Built for Enterprise Trust
            </span>
          </h1>
          
          <p className="text-xl text-gray-700 mb-12 leading-relaxed max-w-4xl mx-auto">
            PM33 is built with enterprise-grade security from day one. Your product data, customer insights, 
            and strategic intelligence are protected by the same security standards that Fortune 500 companies trust.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link 
              href="/trial"
              className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center justify-center transform hover:scale-105"
            >
              Start Secure Trial
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/contact"
              className="group border-2 border-blue-300 text-blue-700 px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 flex items-center justify-center"
            >
              <FileText className="mr-2 h-5 w-5" />
              Security Documentation
            </Link>
          </div>

          {/* Security Certifications */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Award, label: "SOC 2 Type II", status: "Certified" },
              { icon: Shield, label: "GDPR", status: "Compliant" },
              { icon: Lock, label: "HIPAA", status: "Ready" },
              { icon: Globe, label: "ISO 27001", status: "Aligned" }
            ].map((cert, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                <div className="flex flex-col items-center">
                  <cert.icon className="h-8 w-8 text-blue-600 mb-3" />
                  <div className="text-lg font-bold text-gray-900">{cert.label}</div>
                  <div className="text-emerald-600 font-medium text-sm">{cert.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Principles */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Security-First Architecture
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every component of PM33 is designed with security as the foundation, not an afterthought. 
              Your data is protected at rest, in transit, and in processing.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                title: "Data Protection & Privacy",
                icon: Lock,
                color: "from-blue-500 to-indigo-500",
                bgColor: "from-blue-50 to-indigo-50",
                principles: [
                  {
                    name: "End-to-End Encryption",
                    description: "AES-256 encryption for data at rest, TLS 1.3 for data in transit"
                  },
                  {
                    name: "Zero-Trust Architecture", 
                    description: "Every request is authenticated and authorized, no implicit trust"
                  },
                  {
                    name: "Data Minimization",
                    description: "We only collect and process data necessary for core functionality"
                  },
                  {
                    name: "Right to be Forgotten",
                    description: "Complete data deletion capabilities for GDPR compliance"
                  }
                ]
              },
              {
                title: "Access Control & Monitoring",
                icon: Eye,
                color: "from-emerald-500 to-teal-500",
                bgColor: "from-emerald-50 to-teal-50",
                principles: [
                  {
                    name: "Role-Based Access Control",
                    description: "Granular permissions aligned with your organizational structure"
                  },
                  {
                    name: "Single Sign-On (SSO)",
                    description: "SAML and OIDC integration with enterprise identity providers"
                  },
                  {
                    name: "Continuous Monitoring",
                    description: "Real-time security monitoring and automated threat detection"
                  },
                  {
                    name: "Audit Logging",
                    description: "Comprehensive audit trails for all user actions and data access"
                  }
                ]
              }
            ].map((section, index) => (
              <div key={index} className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${section.color} rounded-3xl transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'} opacity-5`}></div>
                <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-2xl flex items-center justify-center mr-4`}>
                      <section.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {section.principles.map((principle, idx) => (
                      <div key={idx} className={`bg-gradient-to-r ${section.bgColor} p-4 rounded-xl border border-gray-200`}>
                        <div className="font-semibold text-gray-900 mb-2">{principle.name}</div>
                        <div className="text-gray-600 text-sm">{principle.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Security */}
      <section className="px-6 py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Enterprise Infrastructure
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built on enterprise-grade cloud infrastructure with multiple deployment options 
              to meet your organization's security and compliance requirements.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Cloud Security",
                icon: Globe,
                features: [
                  "AWS/Azure/GCP certified infrastructure",
                  "Multi-region data replication",
                  "99.99% uptime SLA",
                  "Automated security patching",
                  "DDoS protection and WAF"
                ]
              },
              {
                title: "Private Cloud Options",
                icon: Server,
                features: [
                  "VPC and private subnet deployment",
                  "Dedicated tenant isolation",
                  "Custom security controls",
                  "On-premise deployment available",
                  "Air-gapped environment support"
                ]
              },
              {
                title: "Disaster Recovery",
                icon: Shield,
                features: [
                  "Automated daily backups",
                  "Point-in-time recovery",
                  "Multi-region failover",
                  "RTO < 4 hours, RPO < 1 hour",
                  "Business continuity planning"
                ]
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mr-4">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                </div>
                
                <div className="space-y-3">
                  {item.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Security Team */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Dedicated Security Team
              </h3>
              <p className="text-lg text-gray-600">
                Our security team includes former cybersecurity leaders from Fortune 500 companies, 
                ensuring enterprise-grade protection for your product data.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "24/7 Monitoring",
                  description: "Round-the-clock security operations center monitoring all systems"
                },
                {
                  title: "Threat Intelligence",
                  description: "Proactive threat hunting and intelligence-driven security measures"
                },
                {
                  title: "Incident Response",
                  description: "Dedicated incident response team with <2 hour response time"
                }
              ].map((item, index) => (
                <div key={index} className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & Certifications */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Compliance & Certifications
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              PM33 meets the highest industry standards for security, privacy, and compliance 
              to ensure we can serve enterprise customers in regulated industries.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-8 rounded-3xl border border-emerald-200">
                <div className="flex items-center mb-4">
                  <Award className="w-8 h-8 text-emerald-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">SOC 2 Type II Certified</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Independently audited for security, availability, processing integrity, 
                  confidentiality, and privacy controls.
                </p>
                <div className="text-emerald-600 font-medium">✓ Annual third-party audit</div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-200">
                <div className="flex items-center mb-4">
                  <Globe className="w-8 h-8 text-blue-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">GDPR Compliant</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Full compliance with European data protection regulations including 
                  data portability and right to deletion.
                </p>
                <div className="text-blue-600 font-medium">✓ EU representative appointed</div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-3xl border border-purple-200">
                <div className="flex items-center mb-4">
                  <Shield className="w-8 h-8 text-purple-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">HIPAA Ready</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Architecture and controls designed to support HIPAA compliance 
                  for healthcare product teams.
                </p>
                <div className="text-purple-600 font-medium">✓ Business Associate Agreement available</div>
              </div>

              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-8 rounded-3xl border border-cyan-200">
                <div className="flex items-center mb-4">
                  <Lock className="w-8 h-8 text-cyan-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">ISO 27001 Aligned</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Information security management system aligned with international 
                  best practices and standards.
                </p>
                <div className="text-cyan-600 font-medium">✓ Certification in progress</div>
              </div>
            </div>
          </div>

          {/* Additional Compliance */}
          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Additional Security Standards
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { standard: "CCPA", description: "California Consumer Privacy Act compliance" },
                { standard: "PCI DSS", description: "Payment card industry security standards" },
                { standard: "FedRAMP", description: "Federal risk management program alignment" },
                { standard: "NIST", description: "National Institute of Standards framework" }
              ].map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                  <div className="font-bold text-gray-900 mb-2">{item.standard}</div>
                  <div className="text-gray-600 text-sm">{item.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security Features for PMs */}
      <section className="px-6 py-24 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Security Features Product Managers Love
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Security doesn't have to be complex. PM33's security features are designed 
              to protect your data without slowing down your product work.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: "Secure by Default",
                icon: Shield,
                description: "Every PM33 workspace is automatically configured with enterprise-grade security",
                features: [
                  "Encryption enabled automatically",
                  "Secure defaults for all settings", 
                  "No security configuration required",
                  "Zero-trust architecture"
                ]
              },
              {
                title: "Team Permissions",
                icon: Users,
                description: "Granular control over who can access what product information",
                features: [
                  "Role-based access controls",
                  "Project-level permissions",
                  "Guest access management",
                  "Audit trail for all access"
                ]
              },
              {
                title: "Data Sovereignty",
                icon: Globe,
                description: "Choose where your product data is stored and processed",
                features: [
                  "Regional data residency options",
                  "Data processing location control",
                  "Cross-border transfer controls",
                  "Local compliance support"
                ]
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6">{feature.description}</p>
                
                <div className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Resources */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Security Resources & Documentation
            </h2>
            <p className="text-xl text-gray-600">
              Access detailed security documentation, compliance reports, and security best practices
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Security Whitepaper",
                description: "Detailed technical documentation of our security architecture and controls",
                type: "Technical Documentation",
                action: "Download PDF"
              },
              {
                title: "SOC 2 Report",
                description: "Independent audit report of our security, availability, and privacy controls",
                type: "Compliance Report",
                action: "Request Report"
              },
              {
                title: "Data Processing Agreement",
                description: "GDPR-compliant data processing terms and conditions",
                type: "Legal Document",
                action: "View Agreement"
              },
              {
                title: "Security Best Practices",
                description: "Guidelines for securely using PM33 in enterprise environments",
                type: "Implementation Guide", 
                action: "Read Guide"
              }
            ].map((resource, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="text-blue-600 text-xs font-semibold uppercase tracking-wide mb-2">
                      {resource.type}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 text-sm">{resource.description}</p>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:from-blue-600 hover:to-indigo-600 transition-all duration-200">
                  {resource.action}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Security Questions?
              </h3>
              <p className="text-gray-600 mb-6">
                Our security team is available to answer questions about our security posture, 
                compliance status, and implementation best practices.
              </p>
              <Link 
                href="/contact"
                className="inline-flex items-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Shield className="w-4 h-4 mr-2" />
                Contact Security Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}