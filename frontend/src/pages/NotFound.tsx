
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';

export function NotFound() {
  return (
    <div className="min-h-screen">
      <Section className="bg-white py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Page not found</p>
          <Button href="/" variant="primary">
            Return Home
          </Button>
        </div>
      </Section>
    </div>
  );
}

export default NotFound;
