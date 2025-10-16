import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star, ArrowRight, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trainingPrograms } from '@/data';
import { useState } from 'react';

const Trainings = () => {
  const [selectedLevel, setSelectedLevel] = useState('All');
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredPrograms = selectedLevel === 'All' 
    ? trainingPrograms 
    : trainingPrograms.filter(program => 
        program.level.toLowerCase().includes(selectedLevel.toLowerCase())
      );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-100 to-blue-300 text-gray-900 py-16 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 dark:text-white">Our Training Programs</h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto dark:text-gray-300">
              Explore our comprehensive training programs designed by industry experts.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50 dark:bg-[#23272f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700 font-medium dark:text-gray-300">Filter by level:</span>
            </div>
            <div className="flex space-x-2">
              {levels.map((level) => (
                <Button
                  key={level}
                  variant={selectedLevel === level ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLevel(level)}
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program) => (
              <Card key={program.id} className="hover:shadow-lg transition-shadow flex flex-col h-full hover:shadow-2xl transition-shadow hover:scale-105 transition-transform durtion-300 ease-in-out cursor-pointer dark:border-white bg-white dark:bg-[#23272f] text-gray-900 dark:text-gray-100">
                <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                  <img 
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-full object-cover"
                    style={{ objectFit: "inherit" }}
                  />
                </div>
                <CardHeader>
                  {/* <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {program.level}
                    </Badge>
                    <div className="text-right">
                      <span className="font-bold text-blue-700 text-lg">
                        {program.price}
                      </span>
                    </div>
                  </div> */}
                   <CardTitle className="text-xl text-blue-700 dark:text-blue-300 font-semibold">
                    {program.title}
                  </CardTitle>
                  <CardDescription className="text-gray-700 dark:text-gray-300">
                    {program.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  {/* s */}
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2">Technologies:</h4>
                    <div className="flex flex-wrap gap-1">
                      {program.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs text-blue-700 border-blue-200 bg-blue-50 dark:text-blue-300 dark:border-blue-300 dark:bg-[#23272f]">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white font-bold dark:bg-green-700 dark:hover:bg-green-800">
                    <Link to={`/trainings/${program.id}`}>
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-[#23272f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 dark:text-white">
              What Makes Our Training Special?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">Expert Instructors</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Learn from industry veterans with years of hands-on experience in leading tech companies.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">Hands-on Projects</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Build real-world projects that you can showcase in your portfolio and during interviews.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">Flexible Schedule</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Live sessions, recorded content, and flexible timing to fit your busy schedule.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 dark:text-white">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Hear from our graduates who transformed their careers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Software Engineer at Microsoft",
                program: "Java Full Stack",
                story: "The comprehensive curriculum and hands-on projects helped me land my dream job at Microsoft. The instructors were incredibly supportive throughout my journey."
              },
              {
                name: "Priya Patel",
                role: "AI Engineer at Tesla",
                program: "AI & Machine Learning",
                story: "From zero ML knowledge to working at Tesla in 6 months. The practical approach to teaching complex concepts made all the difference."
              },
              {
                name: "David Chen",
                role: "DevOps Lead at Amazon",
                program: "DevOps & Cloud",
                story: "The cloud-focused training gave me the skills I needed to transition from development to DevOps leadership. Couldn't be happier with the results."
              }
            ].map((story, index) => (
              <Card key={index} className="h-full hover:shadow-2xl transition-shadow hover:scale-90 transition-transform durtion-300 ease-in-out cursor-pointer border-black dark:border-white bg-white dark:bg-[#23272f] text-gray-900 dark:text-gray-100">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Users className="h-6 w-6 text-blue-300" />
                    </div>
                    <div>
                      <div className="font-semibold dark:text-white">{story.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{story.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 dark:text-gray-300">"{story.story}"</p>
                  <Badge variant="outline">{story.program}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white dark:bg-[#23272f] text-gray-900 dark:text-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl text-gray-700 mb-8 dark:text-gray-300">
            Join thousands of professionals who have transformed their careers with our training programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold dark:bg-green-700 dark:hover:bg-green-800">
              Enroll Now
            </Button>
            <Button size="lg" variant="outline" className="bg-white text-blue-700 border-blue-700 hover:bg-blue-50 font-bold dark:bg-[#23272f] dark:text-blue-300 dark:border-blue-300 dark:hover:bg-[#23272f]">
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Trainings;
