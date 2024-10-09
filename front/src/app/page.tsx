import Image from "next/image";
import {Button} from '@/components/ui/button';
import {Container, Title } from "@/components/shared";
import HeroSection from "@/components/shared/hero-section";
import ContactForm from "@/components/shared/contact-form";
import ContactInfo from "@/components/shared/contact-info";
import Catalog from "@/components/shared/catalog";
import ConceptsSection from "@/components/shared/concepts-section";
import FeatureSection from "@/components/shared/feature-section";
import { ArrowUpRight } from "lucide-react";
import Link from 'next/link';



export default function Home() {
return <>

<HeroSection/>

<Container className="min-h-screen flex flex-col items-center justify-center mt-20">
<Title text="ÜRÜNLERİMİZ" className="text-5xl lg:text-6xl font-extrabold mb-20" />
<div className="flex-1">
         <Catalog />
</div>
<Link href="/products" passHref>
            <Button className="bg-primary text-white px-8 py-3 mb-20 rounded-md shadow-lg hover:bg-opacity-90" id="about-section">
              Kataloğa Git <ArrowUpRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
</Container>

<Container className="min-h-screen flex flex-col items-center justify-center mt-20">
<FeatureSection/>
</Container>

<ConceptsSection/>

    {/* Contact Section */}
    <Container className="mt-16 py-16 bg-[#093558]">
      <Title text="Su pompalarında güvenilir bir çözüm ortağı arıyorsanız, TESGART olarak her zaman yanınızdayız. İhtiyaçlarınıza en uygun çözümleri sunmak için bizimle iletişime geçin." size="lg" className="text-center font-bold mb-10 text-secondary" />
      
      <div className="flex gap-10 flex-col lg:flex-row justify-between">
        {/* Contact Form */}
        <div className="flex-1">
          <ContactForm />
        </div>
        
        {/* Contact Info */}
        <div className="flex-1">
          <ContactInfo />
        </div>
      </div>
    </Container>
</>
}
//1-11-43
//layout eto obyortka na glavanoe prilojeniye 
//div will rendering left side fitreleme and right side products cards and gap is 60 px (otstup)