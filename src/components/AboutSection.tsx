import { Button } from "@/components/ui/button";

const AboutSection = () => {
  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              15+ Years of Healthcare Technology Expertise
            </h2>
            <p className="text-lg text-neutral-gray mb-6 leading-relaxed">
              As a seasoned web developer with over 15 years of experience, I specialize in creating 
              technology solutions specifically for healthcare practices. My deep understanding of 
              compliance requirements and industry challenges ensures your practice gets solutions 
              that work seamlessly and securely.
            </p>
            <p className="text-lg text-neutral-gray mb-8 leading-relaxed">
              From small dental practices to large healthcare organizations, I've helped hundreds 
              of clients improve their digital presence, streamline operations, and maintain strict 
              compliance standards while growing their business.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-neutral-light p-6 rounded-lg">
                <div className="text-3xl font-bold text-professional-blue mb-2">100+</div>
                <div className="text-neutral-gray">Projects Completed</div>
              </div>
              <div className="bg-neutral-light p-6 rounded-lg">
                <div className="text-3xl font-bold text-professional-blue mb-2">100%</div>
                <div className="text-neutral-gray">Compliance Rate</div>
              </div>
              <div className="bg-neutral-light p-6 rounded-lg">
                <div className="text-3xl font-bold text-professional-blue mb-2">10+</div>
                <div className="text-neutral-gray">Years Experience</div>
              </div>
              <div className="bg-neutral-light p-6 rounded-lg">
                <div className="text-3xl font-bold text-professional-blue mb-2">24/7</div>
                <div className="text-neutral-gray">Support Available</div>
              </div>
            </div>
            
            <Button onClick={scrollToContact} variant="professional" size="lg">
              Schedule a Consultation
            </Button>
          </div>
          
          <div className="bg-gradient-to-br from-professional-blue to-trust-teal p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-6">Why Choose Our Solutions?</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <strong>Healthcare-Focused:</strong> Deep understanding of medical practice workflows and patient interaction requirements.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <strong>Compliance First:</strong> Every solution is built with HIPAA, PCI, PHIPA, PIPEDA, and SOC 2 compliance as a foundation.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <strong>Proven Results:</strong> Track record of improving patient acquisition and practice efficiency.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <strong>Ongoing Support:</strong> Continuous monitoring, updates, and support to ensure optimal performance.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;