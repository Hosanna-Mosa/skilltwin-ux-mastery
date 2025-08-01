import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-blue-100 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/logo.png" 
                alt="SkillTwin Logo" 
                className="h-8 w-auto"
              />
              <span className="font-bold text-xl text-black">SkillTwin</span>
            </div>
            <p className="text-gray-700 text-sm">
              Empowering careers through expert job support, training programs, and personalized mentorship.
            </p>
            <div className="flex space-x-4">
              <Button 
                variant="solid" 
                size="sm" 
                className="bg-[#25D366] hover:bg-[#1DA851] text-black font-bold"
                asChild
              >
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 mr-2 text-black" />
                  WhatsApp
                </a>
              </Button>
              <Button 
                variant="solid" 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
                asChild
              >
                <a href="https://t.me/skilltwin" target="_blank" rel="noopener noreferrer">
                  <Send className="h-4 w-4 mr-2" />
                  Telegram
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-black">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Trainings', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-gray-700 hover:text-blue-700 text-sm transition-colors font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-black">Services</h3>
            <ul className="space-y-2">
              {[
                'Job Support',
                'Proxy Interviews',
                '1:1 Mentorship',
                'Project Help',
                'Training Programs'
              ].map((service) => (
                <li key={service}>
                  <span className="text-gray-700 text-sm font-medium">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-black">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-600" />
                <span className="text-gray-700 text-sm">contact@skilltwin.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-600" />
                <span className="text-gray-700 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span className="text-gray-700 text-sm">Remote Support Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-100 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 SkillTwin. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
