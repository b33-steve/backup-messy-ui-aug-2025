// Root page - PM33 Marketing Homepage (direct access without route group)
import PM33MarketingHomePage from './(marketing)/page';
import Navigation from '../components/marketing/Navigation';
import Footer from '../components/marketing/Footer';

export const metadata = {
  title: "PM33 - AI Product Management Tool",
  description: "Don't replace your PM tools - make them 10x smarter. PM33 is the AI brain that supercharges your existing PM stack without migration headaches.",
};

export default function RootPage() {
  return (
    <div 
      className="marketing-context"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--marketing-bg-primary)',
        color: 'var(--marketing-text-primary)',
        transition: 'all 0.3s ease'
      }}
    >
      <Navigation />
      <main className="pt-16">
        <PM33MarketingHomePage />
      </main>
      <Footer />
    </div>
  );
}