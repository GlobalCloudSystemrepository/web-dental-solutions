import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import seoIcon from "@/assets/seo-icon.png";
import webappIcon from "@/assets/webapp-icon.png";
import complianceIcon from "@/assets/compliance-icon.png";

const ServicesSection = () => {
  const services = [
    {
      icon: seoIcon,
      title: "SEO Optimization",
      description: "Drive more patients to your practice with targeted SEO strategies that improve search rankings and local visibility.",
      features: ["Local SEO for healthcare", "Medical keyword optimization", "Google My Business management", "Healthcare content strategy"]
    },
    {
      icon: webappIcon,
      title: "Custom Web Applications",
      description: "Streamline your practice with custom booking systems, payment processing, and patient management solutions.",
      features: ["Appointment booking systems", "Payment collection portals", "Patient communication tools", "Practice management integrations"]
    },
    {
      icon: complianceIcon,
      title: "Compliance & Security",
      description: "Ensure your digital infrastructure meets all HIPAA, PCI, and industry regulations with our expert implementation.",
      features: ["HIPAA compliance auditing", "PCI DSS certification", "Data encryption & protection", "Regular security assessments"]
    }
  ];

  return (
    <section className="py-20 bg-neutral-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Comprehensive Technology Solutions
          </h2>
          <p className="text-xl text-neutral-gray max-w-3xl mx-auto">
            From SEO optimization to custom development, we provide end-to-end solutions 
            that help healthcare practices thrive in the digital landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-0 shadow-card hover:shadow-hover transition-all duration-300 bg-gradient-to-br from-card to-neutral-light">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-20 h-20 bg-gradient-to-br from-professional-blue to-trust-teal rounded-2xl flex items-center justify-center p-4">
                  <img 
                    src={service.icon} 
                    alt={`${service.title} icon`}
                    className="w-12 h-12 object-contain filter brightness-0 invert"
                  />
                </div>
                <CardTitle className="text-2xl font-bold text-professional-blue">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-neutral-gray mb-6 text-base leading-relaxed">
                  {service.description}
                </CardDescription>
                <ul className="space-y-2 text-left">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-trust-teal rounded-full flex-shrink-0"></div>
                      <span className="text-neutral-gray">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;