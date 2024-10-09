import { Droplet, ShieldCheck, Award, PenTool } from "lucide-react";

const concepts = [
  {
    icon: <Droplet className="h-12 w-12 text-blue-600" />,
    title: "Yüksek Verimli Su Pompaları",
    description: "Enerji tasarruflu ve yüksek verimli su pompaları ile su ihtiyacınızı en verimli şekilde karşılayın.",
  },
  {
    icon: <PenTool className="h-12 w-12 text-blue-600" />,
    title: "Uzun Ömürlü Dayanıklılık",
    description: "Paslanmaz çelik ve sağlam malzemelerle üretilmiş pompalar, uzun yıllar güvenle kullanabileceğiniz çözümler sunar.",
  },
  {
    icon: <ShieldCheck className="h-12 w-12 text-blue-600" />,
    title: "Güvenli ve Sertifikalı Ürünler",
    description: "Tüm pompalarımız güvenlik testlerinden geçmiştir ve uluslararası sertifikalara sahiptir.",
  },
  {
    icon: <Award className="h-12 w-12 text-blue-600" />,
    title: "Memnuniyet Garantisi",
    description: "Müşteri memnuniyeti odaklı hizmetimizle, tüm ürünlerimizde kalite ve güveni garanti ediyoruz.",
  },
];

export default function ConceptsSection() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">Bizi Tercih Etme Nedenleriniz</h2>
          <p className="mt-2 text-lg text-gray-600">
            Su pompalarımız ile hem kaliteli hem de güvenilir çözümler sunuyoruz.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {concepts.map((concept, index) => (
            <div
              key={index}
              className="group text-center p-6 bg-white shadow-md rounded-lg transition-shadow duration-400 ease-in-out hover:shadow-xl"
            >
              <div className="flex justify-center items-center mb-4">
                {concept.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{concept.title}</h3>
              <p className="mt-2 text-gray-600">{concept.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
