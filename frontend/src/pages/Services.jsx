import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Users,
  UserCheck,
  Code,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "@/data";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { apiService } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const iconMap = {
    briefcase: Briefcase,
    users: Users,
    "user-check": UserCheck,
    code: Code,
  };

  const processSteps = [
    {
      step: "1",
      title: "Initial Consultation",
      description:
        "We discuss your goals, challenges, and specific requirements to create a personalized plan.",
    },
    {
      step: "2",
      title: "Expert Matching",
      description:
        "We match you with the right expert based on your technology stack and career objectives.",
    },
    {
      step: "3",
      title: "Ongoing Support",
      description:
        "Receive continuous guidance and support throughout your journey to success.",
    },
    {
      step: "4",
      title: "Success Tracking",
      description:
        "We monitor your progress and adjust our approach to ensure you achieve your goals.",
    },
  ];

  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [formStates, setFormStates] = useState({});
  const [submittingId, setSubmittingId] = useState(null);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleChange = (serviceId, e) => {
    setFormStates((prev) => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleSubmit = async (service, e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setSelectedServiceId(null);
      navigate('/register', { state: { fromServiceInquiry: true } });
      return;
    }
    setSubmittingId(service.id);
    try {
      await apiService.submitServiceInquiry({
        ...formStates[service.id],
        serviceId: service.id,
        serviceTitle: service.title,
        servicePricing: service.pricing,
      });
      setSubmittingId(null);
      setSelectedServiceId(null);
      setFormStates((prev) => ({ ...prev, [service.id]: { name: '', email: '', phone: '' } }));
      alert('Inquiry submitted!');
    } catch (error) {
      setSubmittingId(null);
      alert('Failed to submit inquiry. Please try again.');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-100 to-blue-300 text-gray-900 py-16 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 dark:text-white">
              Our Services
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto dark:text-gray-300">
              Explore our range of services designed to help you succeed in your
              tech career.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service) => {
              const Icon = iconMap[service.icon];
              const form = formStates[service.id] || { name: '', email: '', phone: '' };
              return (
                <Dialog key={service.id} open={selectedServiceId === service.id} onOpenChange={(open) => setSelectedServiceId(open ? service.id : null)}>
                  <Card
                    className="hover:shadow-lg transition-shadow h-full hover:shadow-2xl transition-shadow hover:scale-105 transition-transform durtion-300 ease-in-out cursor-pointer flex flex-col bg-white dark:bg-[#23272f] text-gray-900 dark:text-gray-100"
                  >
                    <CardHeader className="flex-shrink-0">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <Icon className="h-6 w-6 text-blue-400" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-blue-700 font-semibold dark:text-blue-300">
                            {service.title}
                          </CardTitle>
                          <Badge variant="outline" className="mt-1">
                            {service.pricing}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription className="text-base dark:text-gray-300">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div className="space-y-3 mb-6 flex-1">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <DialogTrigger asChild>
                        <Button className="w-full mt-auto">
                          Get Started <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                    </CardContent>
                  </Card>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Service Inquiry</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={(e) => handleSubmit(service, e)} className="space-y-4">
                      <div>
                        <div className="font-semibold text-blue-700 dark:text-blue-300">{service.title}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{service.pricing}</div>
                      </div>
                      <Input name="name" placeholder="Your Name" value={form.name} onChange={(e) => handleChange(service.id, e)} required />
                      <Input name="email" type="email" placeholder="Your Email" value={form.email} onChange={(e) => handleChange(service.id, e)} required />
                      <Input name="phone" placeholder="Your Phone" value={form.phone} onChange={(e) => handleChange(service.id, e)} required />
                      <DialogFooter>
                        <Button type="submit" disabled={submittingId === service.id} className="w-full">
                          {submittingId === service.id ? 'Submitting...' : 'Submit Inquiry'}
                        </Button>
                        <DialogClose asChild>
                          <Button type="button" variant="outline" className="w-full">Cancel</Button>
                        </DialogClose>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50 dark:bg-[#23272f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 dark:text-white">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              A systematic approach to ensure your success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-300 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold mb-3 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Service Sections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Job Support Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 dark:text-white">
                Professional Job Support
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Our job support service provides you with expert assistance
                  for your daily work tasks. Whether you're facing complex
                  technical challenges or need guidance on best practices, our
                  experienced professionals are here to help.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    Real-time problem solving
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    Code reviews and optimization
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    Architecture guidance
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    Technology-specific expertise
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-[#23272f] rounded-lg p-8">
              <img
                src="/mobile-services-imgs/support.jpeg"
                alt="Job Support"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Proxy Interview Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 bg-gray-100 dark:bg-[#23272f] rounded-lg p-8">
              <img
                src="/mobile-services-imgs/interview.jpeg"
                alt="Interview Support"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 dark:text-white">
                Interview Support & Preparation
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Excel in your technical interviews with our comprehensive
                  support program. We provide personalized coaching, mock
                  interviews, and strategic guidance to help you land your dream
                  job.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    Mock interview sessions
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    Technical question practice
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    Communication coaching
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    Industry-specific preparation
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mentorship Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 dark:text-white">
                Personalized 1:1 Mentorship
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Accelerate your career growth with personalized mentorship
                  from industry veterans. Our mentors provide strategic
                  guidance, skill development plans, and ongoing support to help
                  you reach your professional goals.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    Career roadmap planning
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    Skill gap analysis
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    Goal setting and tracking
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    Industry networking guidance
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-[#23272f] rounded-lg p-8">
              <img
                src="/mobile-services-imgs/oneOnOne.jpeg"
                alt="Mentorship"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white dark:bg-[#23272f] text-gray-900 dark:text-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-700 mb-8 dark:text-gray-300">
            Contact us today to learn more about how we can help you achieve
            your career goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white font-bold dark:bg-green-700 dark:hover:bg-green-800"
              asChild
            >
              <Link to="/contact">Get Started Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-blue-700 border-blue-700 hover:bg-blue-50 font-bold dark:bg-[#23272f] dark:text-blue-300 dark:border-blue-300 dark:hover:bg-[#23272f]"
              asChild
            >
              <Link to="/trainings">View Training Programs</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
