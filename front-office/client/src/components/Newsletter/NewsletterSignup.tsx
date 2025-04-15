import React from 'react';
import { Mail } from 'lucide-react';

export const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simuler un délai d'envoi
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setStatus('success');
    setEmail('');
  };

  return (
    <section className="bg-gray-900 rounded-2xl overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <Mail className="h-12 w-12 text-blue-400 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-white mb-4">
          Restez informé des dernières publications
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Recevez nos meilleurs articles directement dans votre boîte mail
        </p>
        
        {status === 'success' ? (
          <div className="text-green-400 font-medium">
            Merci pour votre inscription ! 🎉
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'Inscription...' : 'S\'inscrire'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};