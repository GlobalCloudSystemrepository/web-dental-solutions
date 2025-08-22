import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ContactSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-professional-blue to-trust-teal">
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
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-neutral-gray mb-2">
                      First Name *
                    </label>
                    <Input 
                      id="firstName" 
                      placeholder="John"
                      className="border-border focus:border-professional-blue focus:ring-professional-blue"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-neutral-gray mb-2">
                      Last Name *
                    </label>
                    <Input 
                      id="lastName" 
                      placeholder="Smith"
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
                    placeholder="john@dentalclinic.com"
                    className="border-border focus:border-professional-blue focus:ring-professional-blue"
                  />
                </div>
                
                <div>
                  <label htmlFor="practice" className="block text-sm font-medium text-neutral-gray mb-2">
                    Practice Name
                  </label>
                  <Input 
                    id="practice" 
                    placeholder="Smith Family Dental"
                    className="border-border focus:border-professional-blue focus:ring-professional-blue"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-gray mb-2">
                    Tell us about your project *
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="I'm interested in improving my practice's online presence and need help with..."
                    rows={4}
                    className="border-border focus:border-professional-blue focus:ring-professional-blue"
                  />
                </div>
                
                <Button variant="professional" size="lg" className="w-full">
                  Schedule Free Consultation
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
                    <span className="text-neutral-gray">Response within 2 hours during business hours</span>
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