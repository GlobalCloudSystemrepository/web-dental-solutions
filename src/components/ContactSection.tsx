import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    practice: "",
    message: "",
    preferredMeetingDate: null as Date | null,
    captchaAnswer: ""
  });
  
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: 0 });
  const [emailError, setEmailError] = useState("");

  // Generate new captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ num1, num2, answer: num1 + num2 });
  };

  // Initialize captcha on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    // Email validation on change
    if (id === "email") {
      if (value && !validateEmail(value)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      preferredMeetingDate: date || null
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields marked with *",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    if (!validateEmail(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    // Captcha validation
    const userAnswer = parseInt(formData.captchaAnswer);
    if (isNaN(userAnswer) || userAnswer !== captcha.answer) {
      toast({
        title: "Captcha Error",
        description: "Please solve the math problem correctly",
        variant: "destructive"
      });
      generateCaptcha(); // Generate new captcha
      setFormData(prev => ({ ...prev, captchaAnswer: "" }));
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          practice_name: formData.practice || null,
          project_description: formData.message,
          preferred_meeting_date: formData.preferredMeetingDate?.toISOString().split('T')[0] || null
        });

      if (error) {
        throw error;
      }

      // Success
      toast({
        title: "Thank You!",
        description: "Your consultation request has been submitted. We'll get back to you within 2 hours during business hours.",
      });

      // Reset form and generate new captcha
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        practice: "",
        message: "",
        preferredMeetingDate: null,
        captchaAnswer: ""
      });
      setEmailError("");
      generateCaptcha();

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-section" className="py-20 bg-gradient-to-br from-professional-blue to-trust-teal">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Get a free consultation and discover how our solutions can help your practice grow 
            while maintaining the highest standards of compliance and security.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-professional-blue">
                Get Your Free Consultation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-neutral-gray mb-2">
                      First Name *
                    </label>
                    <Input 
                      id="firstName" 
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      required
                      className="border-border focus:border-professional-blue focus:ring-professional-blue"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-neutral-gray mb-2">
                      Last Name *
                    </label>
                    <Input 
                      id="lastName" 
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Smith"
                      required
                      className="border-border focus:border-professional-blue focus:ring-professional-blue"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-gray mb-2">
                    Email Address *
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@dentalclinic.com"
                    required
                    className={cn(
                      "border-border focus:border-professional-blue focus:ring-professional-blue",
                      emailError && "border-red-500 focus:border-red-500"
                    )}
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-1">{emailError}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="practice" className="block text-sm font-medium text-neutral-gray mb-2">
                    Practice Name
                  </label>
                  <Input 
                    id="practice" 
                    value={formData.practice}
                    onChange={handleInputChange}
                    placeholder="Smith Family Dental"
                    className="border-border focus:border-professional-blue focus:ring-professional-blue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-gray mb-2">
                    Preferred Meeting Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-border focus:border-professional-blue",
                          !formData.preferredMeetingDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.preferredMeetingDate ? (
                          format(formData.preferredMeetingDate, "PPP")
                        ) : (
                          <span>Pick a date for your consultation</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.preferredMeetingDate || undefined}
                        onSelect={handleDateSelect}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return date < today;
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-gray mb-2">
                    Tell us about your project *
                  </label>
                  <Textarea 
                    id="message" 
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="I'm interested in improving my practice's online presence and need help with..."
                    rows={4}
                    required
                    className="border-border focus:border-professional-blue focus:ring-professional-blue"
                  />
                </div>
                
                <div>
                  <label htmlFor="captchaAnswer" className="block text-sm font-medium text-neutral-gray mb-2">
                    Security Check *
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 p-3 rounded-md border">
                      <span className="text-lg font-semibold text-professional-blue">
                        {captcha.num1} + {captcha.num2} = ?
                      </span>
                    </div>
                    <Input
                      id="captchaAnswer"
                      type="number"
                      value={formData.captchaAnswer}
                      onChange={handleInputChange}
                      placeholder="Answer"
                      required
                      className="w-24 border-border focus:border-professional-blue focus:ring-professional-blue"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={generateCaptcha}
                      className="text-xs"
                    >
                      New
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Please solve this simple math problem to verify you're human
                  </p>
                </div>
                
                <Button
                  type="submit" 
                  variant="professional" 
                  size="lg" 
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Submitting..." : "Schedule Free Consultation"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="border-0 shadow-card bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-professional-blue mb-4">Quick Response Guarantee</h3>
                <p className="text-neutral-gray mb-4">
                  We understand that healthcare practices need reliable support. That's why we guarantee:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-trust-teal rounded-full"></div>
                    <span className="text-neutral-gray">Response within 24 hours</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-trust-teal rounded-full"></div>
                    <span className="text-neutral-gray">24/7 emergency support for critical issues</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-trust-teal rounded-full"></div>
                    <span className="text-neutral-gray">Free initial consultation and project assessment</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-professional-blue mb-4">Compliance Certifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-professional-blue to-trust-teal rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-2">
                      H
                    </div>
                    <span className="text-sm font-medium text-neutral-gray">HIPAA Compliant</span>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-professional-blue to-trust-teal rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-2">
                      P
                    </div>
                    <span className="text-sm font-medium text-neutral-gray">PCI DSS Level 1</span>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-professional-blue to-trust-teal rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-2">
                      S
                    </div>
                    <span className="text-sm font-medium text-neutral-gray">SOC 2 Type II</span>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-professional-blue to-trust-teal rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-2">
                      G
                    </div>
                    <span className="text-sm font-medium text-neutral-gray">GDPR Ready</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;