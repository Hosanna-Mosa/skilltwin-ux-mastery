import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MapPin, MessageCircle, Send, Clock } from 'lucide-react';
import { useForm } from '@/hooks/useForm';
import { useToast } from '@/hooks/use-toast';
import { apiService } from '@/services/api';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Contact = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const { values, errors, isSubmitting, handleChange, handleSubmit, reset } = useForm(
    {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    },
    {
      name: { required: true, minLength: 2 },
      email: { required: true, email: true },
      phone: { required: true, phone: true },
      subject: { required: true },
      message: { required: true, minLength: 10 }
    }
  );

  const subjects = [
    'General Inquiry',
    'Job Support',
    'Training Programs',
    'Interview Support',
    'Partnership',
    'Technical Issue',
    'Other'
  ];

  const onSubmit = async (formData) => {
    if (!isAuthenticated) {
      navigate('/register', { state: { fromContact: true } });
      return;
    }
    try {
      await apiService.submitContact(formData);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      reset();
    } catch (error) {
      toast({
        title: "Failed to Send",
        description: "Please try again or contact us directly via WhatsApp.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-100 to-blue-300 text-gray-900 py-16 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 dark:text-white">Contact Us</h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto dark:text-gray-300">
              We're here to help you succeed in your tech career. Reach out to us for support, training, or guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="py-16 bg-gray-50 dark:bg-[#23272f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4 dark:text-white">Get Instant Support</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              Choose your preferred way to reach us
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow hover:shadow-2xl transition-shadow hover:scale-105 transition-transform durtion-300 ease-in-out cursor-pointer border-black dark:border-white bg-white dark:bg-[#23272f] text-gray-900 dark:text-gray-100">
              <CardHeader>
                <div className="mx-auto bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <MessageCircle className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl dark:text-white">WhatsApp Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6 dark:text-gray-300">
                  Get instant responses to your queries. Available 24/7 for urgent support.
                </p>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold dark:bg-green-700 dark:hover:bg-green-800"
                  asChild
                >
                  <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow hover:shadow-2xl transition-shadow hover:scale-105 transition-transform durtion-300 ease-in-out cursor-pointer border-black dark:border-white bg-white dark:bg-[#23272f] text-gray-900 dark:text-gray-100">
              <CardHeader>
                <div className="mx-auto bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Send className="h-8 w-8 text-blue-300" />
                </div>
                <CardTitle className="text-xl dark:text-white">Telegram Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6 dark:text-gray-300">
                  Join our Telegram channel for updates and quick support from our team.
                </p>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold dark:bg-blue-700 dark:hover:bg-blue-800"
                  asChild
                >
                  <a href="https://t.me/skilltwin" target="_blank" rel="noopener noreferrer">
                    <Send className="h-4 w-4 mr-2" />
                    Join Telegram
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="bg-white dark:bg-[#23272f] text-gray-900 dark:text-gray-100">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-700 font-semibold dark:text-blue-300">Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(onSubmit);
                  }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="dark:text-gray-300">Full Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          value={values.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          className={errors.name ? 'border-red-500' : 'placeholder-gray-400 dark:placeholder-white'}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="dark:text-gray-300">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={values.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className={errors.email ? 'border-red-500' : 'placeholder-gray-400 dark:placeholder-white'}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="dark:text-gray-300">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={values.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className={errors.phone ? 'border-red-500' : 'placeholder-gray-400 dark:placeholder-white'}
                      />
                      {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label className="dark:text-gray-300">Subject *</Label>
                      <Select value={values.subject} onValueChange={(value) => handleChange('subject', value)}>
                        <SelectTrigger className={errors.subject ? 'border-red-500' : 'placeholder-gray-400 dark:placeholder-white'}>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map((subject) => (
                            <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="dark:text-gray-300">Message *</Label>
                      <textarea
                        id="message"
                        rows={6}
                        value={values.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 ${errors.message ? 'border-red-500' : 'placeholder-gray-400 dark:placeholder-white border-gray-300 dark:border-white'} bg-white dark:bg-[#181b20] text-gray-900 dark:text-white`}
                        placeholder="Tell us how we can help you..."
                      />
                      {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold dark:bg-green-700 dark:hover:bg-green-800" 
                      disabled={isSubmitting}
                      size="lg"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-black mb-6 dark:text-white">Get in Touch</h2>
                <p className="text-gray-700 text-lg leading-relaxed dark:text-gray-300">
                  We're here to help you succeed in your tech career. Whether you need job support, 
                  training, or guidance, our expert team is ready to assist you every step of the way.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 text-blue-700 dark:text-blue-300">Email Support</h3>
                    <p className="text-gray-700 dark:text-gray-300">contact@skilltwin.com</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 text-blue-700 dark:text-blue-300">Phone Support</h3>
                    <p className="text-gray-700 dark:text-gray-300">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Mon-Fri: 9 AM - 6 PM EST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 text-blue-700 dark:text-blue-300">Business Hours</h3>
                    <p className="text-gray-700 dark:text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-700 dark:text-gray-300">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-gray-700 dark:text-gray-300">Sunday: Closed</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 text-blue-700 dark:text-blue-300">Service Area</h3>
                    <p className="text-gray-700 dark:text-gray-300">Remote Support Available Worldwide</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Supporting professionals globally</p>
                  </div>
                </div>
              </div>

              {/* FAQ Link */}
              <Card className="hover:shadow-2xl transition-shadow hover:scale-90 transition-transform durtion-300 ease-in-out cursor-pointer border-black dark:border-white bg-white dark:bg-[#23272f] text-gray-900 dark:text-gray-100">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-3 dark:text-white">Have Questions?</h3>
                  <p className="text-gray-600 mb-4 dark:text-gray-300">
                    Check out our frequently asked questions for quick answers to common inquiries.
                  </p>
                  <Button variant="outline" className="w-full bg-white text-blue-700 border-blue-700 hover:bg-blue-50 font-bold dark:bg-[#23272f] dark:text-blue-300 dark:border-blue-300 dark:hover:bg-[#23272f]" asChild>
                    <Link to="/?scroll=faq">View FAQ</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-12 bg-blue-100 dark:bg-[#23272f]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-700 dark:text-blue-300">We're Here to Help!</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Our average response time is under 2 hours during business hours. For urgent matters, reach out via WhatsApp for immediate assistance.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
