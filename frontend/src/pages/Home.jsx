import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Zap,
  Shield,
  Clock,
  Star,
  ArrowRight,
  CheckCircle,
  Users,
  Code,
  Briefcase,
  Wifi,
  WifiOff,
  AlertCircle,
} from "lucide-react";
import InquiryForm from "@/components/InquiryForm";
import { useToast } from "@/hooks/use-toast";
import {
  benefits,
  techStack,
  testimonials,
  pricingPlans,
  trainingPrograms,
  faqs,
} from "@/data";

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isCheckingConnection, setIsCheckingConnection] = useState(true);
  const [connectionMessage, setConnectionMessage] = useState("");
  const [hasShownInitialMessage, setHasShownInitialMessage] = useState(false);
  const [hasCheckedOnce, setHasCheckedOnce] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Reset connection message flag on component mount
  useEffect(() => {
    // resetConnectionMessage(); // This line is removed as per the edit hint
  }, []);

  // Check internet connection on page load - only once
  useEffect(() => {
    const checkInitialConnection = async () => {
      setIsCheckingConnection(true);
      try {
        // const isConnected = await checkConnectivity(); // This line is removed as per the edit hint
        // if (isConnected) { // This line is removed as per the edit hint
        //   setConnectionMessage("Connected to the internet"); // This line is removed as per the edit hint
        //   // Show success message only once // This line is removed as per the edit hint
        //   if (!hasShownInitialMessage) { // This line is removed as per the edit hint
        //     toast({ // This line is removed as per the edit hint
        //       title: "Connection Status", // This line is removed as per the edit hint
        //       description: "You're connected to the internet!", // This line is removed as per the edit hint
        //       duration: 3000, // This line is removed as per the edit hint
        //     }); // This line is removed as per the edit hint
        //     setHasShownInitialMessage(true); // This line is removed as per the edit hint
        //   } // This line is removed as per the edit hint
        // } else { // This line is removed as per the edit hint
        //   setConnectionMessage("No internet connection detected"); // This line is removed as per the edit hint
        //   // Show error message only once // This line is removed as per the edit hint
        //   if (!hasShownInitialMessage) { // This line is removed as per the edit hint
        //     toast({ // This line is removed as per the edit hint
        //       title: "Connection Error", // This line is removed as per the edit hint
        //       description: "Please check your internet connection to access all features.", // This line is removed as per the edit hint
        //       variant: "destructive", // This line is removed as per the edit hint
        //       duration: 5000, // This line is removed as per the edit hint
        //     }); // This line is removed as per the edit hint
        //     setHasShownInitialMessage(true); // This line is removed as per the edit hint
        //   } // This line is removed as per the edit hint
        // } // This line is removed as per the edit hint
        // } catch (error) { // This line is removed as per the edit hint
        //   setConnectionMessage("Unable to verify connection"); // This line is removed as per the edit hint
        //   // Show error message only once // This line is removed as per the edit hint
        //   if (!hasShownInitialMessage) { // This line is removed as per the edit hint
        //     toast({ // This line is removed as per the edit hint
        //       title: "Connection Error", // This line is removed as per the edit hint
        //       description: "Unable to verify your internet connection.", // This line is removed as per the edit hint
        //       variant: "destructive", // This line is removed as per the edit hint
        //       duration: 5000, // This line is removed as per the edit hint
        //     }); // This line is removed as per the edit hint
        //     setHasShownInitialMessage(true); // This line is removed as per the edit hint
        //   } // This line is removed as per the edit hint
        // } finally { // This line is removed as per the edit hint
        //   setIsCheckingConnection(false); // This line is removed as per the edit hint
        //   setHasCheckedOnce(true); // This line is removed as per the edit hint
        // } // This line is removed as per the edit hint
      } catch (error) {
        setConnectionMessage("Unable to verify connection");
        // Show error message only once
        if (!hasShownInitialMessage) {
          toast({
            title: "Connection Error",
            description: "Unable to verify your internet connection.",
            variant: "destructive",
            duration: 5000,
          });
          setHasShownInitialMessage(true);
        }
      } finally {
        setIsCheckingConnection(false);
        setHasCheckedOnce(true);
      }
    };

    // Check connection after a short delay to allow page to load
    const timer = setTimeout(checkInitialConnection, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Animated count up for stats
  const [placements, setPlacements] = useState(0);
  const [successRate, setSuccessRate] = useState(0);
  useEffect(() => {
    let placementsInterval = setInterval(() => {
      setPlacements((prev) => {
        if (prev < 500) return prev + 5;
        clearInterval(placementsInterval);
        return 500;
      });
    }, 10);
    let successInterval = setInterval(() => {
      setSuccessRate((prev) => {
        if (prev < 95) return prev + 1;
        clearInterval(successInterval);
        return 95;
      });
    }, 20);
    return () => {
      clearInterval(placementsInterval);
      clearInterval(successInterval);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("scroll") === "faq") {
      const faqSection = document.getElementById("faq");
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const iconMap = {
    zap: Zap,
    shield: Shield,
    clock: Clock,
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-100 to-blue-300 text-gray-900 py-20 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-black dark:text-white">
              Accelerate Your{" "}
              <span className="text-blue-700 dark:text-blue-300">
                Tech Career
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Expert job support, training programs, and mentorship to help you
              succeed in the competitive tech industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3"
                onClick={() => navigate("/register")}
              >
                Get Started Today
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white dark:bg-[#23272f] text-blue-700 border-blue-700 hover:bg-blue-50 dark:hover:bg-[#23272f] font-bold"
                onClick={() => navigate("/services")}
              >
                View Services
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-700 dark:text-blue-300">
                  {placements}+
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  Successful Placements
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-700 dark:text-blue-300">
                  24/7
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  Expert Support
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-700 dark:text-blue-300">
                  {successRate}%
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  Success Rate
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="py-16 bg-gray-50 dark:bg-[#23272f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InquiryForm />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
              Why Choose SkillTwin?
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              We provide comprehensive support to help you achieve your career
              goals with confidence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = iconMap[benefit.icon];
              return (
                <Card
                  key={index}
                  className="border-black dark:border-white text-center hover:shadow-2xl transition-shadow hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
                >
                  <CardHeader>
                    <div className="mx-auto bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <Icon className="h-8 w-8 text-blue-400 dark:text-blue-300" />
                    </div>
                    <CardTitle className="text-xl text-blue-700 dark:text-blue-300 font-semibold">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 bg-gray-50 dark:bg-[#23272f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
              Technologies We Support
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              Expert guidance across all major technologies and frameworks
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-4 py-2 text-sm text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-[#23272f] border border-blue-200 dark:border-gray-700"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
              What Our Clients Say
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="text-center dark:border-white">
              <CardContent className="pt-8">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-green-600 dark:text-green-400 fill-current"
                      />
                    )
                  )}
                </div>
                <blockquote className="text-xl text-gray-700 dark:text-gray-300 mb-6">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div>
                  <div className="font-semibold text-blue-700 dark:text-blue-300">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-700 dark:text-gray-300">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial
                      ? "bg-green-600"
                      : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-50 dark:bg-[#23272f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
              Flexible Pricing Plans
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Choose a plan that fits your needs and budget.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pricingPlans.map((plan, idx) => (
              <Card
                key={plan.name}
                className="hover:shadow-2xl transition-shadow hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer dark:border-white"
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-blue-700 dark:text-blue-300 font-semibold">
                    {plan.name}
                  </CardTitle>
                  <div className="text-4xl font-bold text-blue-700 dark:text-blue-300">
                    {plan.price}
                    <span className="text-lg text-gray-700 dark:text-gray-300">
                      /{plan.period}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-12">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-gray-700 dark:text-gray-300"
                      >
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full mt-12 bg-green-600 hover:bg-green-700 text-white font-bold"
                    size="lg"
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Training Programs Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
              Featured Training Programs
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              Comprehensive training programs designed by industry experts
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainingPrograms.map((program) => (
              <Card
                key={program.id}
                className=" text-center hover:shadow-2xl transition-shadow hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer dark:border-white"
              >
                <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full "
                    style={{ objectFit: "inherit" }}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-blue-700 dark:text-blue-300 font-semibold">
                    {program.title}
                  </CardTitle>
                  <CardDescription className="text-gray-700 dark:text-gray-300">
                    {program.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                      <span>Duration:</span>
                      <span className="font-semibold">{program.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                      <span>Level:</span>
                      <span className="font-semibold">{program.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700 dark:text-gray-300">
                        Price:
                      </span>
                      <span className="font-bold text-blue-700 dark:text-blue-300 text-lg">
                        {program.price}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {program.technologies.slice(0, 3).map((tech, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs text-blue-700 dark:text-blue-300 border-blue-200 dark:border-gray-700 bg-blue-50 dark:bg-gray-800"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    asChild
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
                  >
                    <Link to={`/trainings/${program.id}`}>
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white dark:bg-[#23272f] text-blue-700 border-blue-700 hover:bg-blue-50 dark:hover:bg-[#23272f] font-bold"
            >
              <Link to="/trainings">View All Programs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-gray-50 dark:bg-[#23272f]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              Get answers to common questions about our services
            </p>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white dark:bg-[#23272f] rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-blue-700 dark:text-blue-300">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 dark:text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-100 to-blue-300 text-gray-900 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
            Join thousands of successful professionals who have transformed
            their careers with SkillTwin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white font-bold"
              onClick={() => navigate("/services")}
            >
              Start Your Journey
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white dark:bg-[#23272f] text-blue-700 border-blue-700 hover:bg-blue-50 dark:hover:bg-[#23272f] font-bold"
            >
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
