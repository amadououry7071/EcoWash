import { Leaf, Droplets, Shield, Sparkles } from 'lucide-react';

const Product = () => {
  const specifications = [
    { label: 'Nom du produit', value: 'LimoFresh Eco Car Cleaner' },
    { label: 'Type', value: 'Spray nettoyant automobile écologique' },
    { label: 'Usage', value: 'Carrosserie, vitres, jantes, plastiques' },
    { label: 'Parfum', value: 'Agrumes naturels' },
    { label: 'pH', value: '6 – 7 (neutre)' },
    { label: 'Biodégradabilité', value: '100 %' },
    { label: 'Conditionnement', value: '500 mL / 1 L' }
  ];

  const composition = [
    { ingredient: 'Eau purifiée', quantity: '700 ml' },
    { ingredient: 'Limonène', quantity: '100 ml' },
    { ingredient: 'Colza saponifié', quantity: '80 ml' },
    { ingredient: 'Vinaigre', quantity: '50 ml' },
    { ingredient: 'Éthanol', quantity: '50 ml' },
    { ingredient: 'Acide citrique', quantity: '15 g' },
    { ingredient: 'Gomme xanthane (optionnel)', quantity: '5 g' }
  ];

  const steps = [
    'Agiter légèrement avant chaque utilisation.',
    'Vaporiser sur la carrosserie, les jantes, les plastiques ou vitres.',
    'Laisser agir 10 à 20 secondes.',
    'Essuyer avec une microfibre propre.',
    'Pour les taches tenaces, laisser agir plus longtemps ou refaire une application.'
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-secondary font-semibold text-lg">Notre produit vedette</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
            Spray LimoFresh
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Nettoyage Auto Naturel – 100% écologique et biodégradable
          </p>
        </div>
      </section>

      {/* Product Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/Images/photoDuProduit.png"
                alt="Spray LimoFresh"
                className="w-full max-w-lg mx-auto"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">
                Description marketing professionnelle
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Nettoyez votre véhicule rapidement et sans rinçage grâce au spray LimoFresh, 
                formulé à base de <strong>limonène d'agrumes</strong> et de <strong>colza saponifié</strong>.
              </p>
              <p className="text-gray-600 text-lg mb-6">
                <strong>100% biodégradable</strong>, il dégraisse efficacement, ravive la brillance 
                et laisse une fraîche odeur d'agrumes — sans abîmer la carrosserie ni l'environnement.
              </p>
              <div className="bg-secondary/10 p-4 rounded-lg">
                <p className="text-primary font-semibold">
                  Idéal pour : carrosserie, jantes, plastiques et vitres.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-primary mb-2">100% Naturel</h3>
              <p className="text-gray-600 text-sm">Ingrédients d'origine naturelle</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-primary mb-2">Sans rinçage</h3>
              <p className="text-gray-600 text-sm">Économisez l'eau précieuse</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-primary mb-2">pH Neutre</h3>
              <p className="text-gray-600 text-sm">Respecte toutes les surfaces</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-primary mb-2">Brillance</h3>
              <p className="text-gray-600 text-sm">Résultat professionnel garanti</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            Fiche technique
          </h2>
          <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
            <table className="w-full">
              <tbody>
                {specifications.map((spec, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 font-semibold text-primary">{spec.label}</td>
                    <td className="px-6 py-4 text-gray-600">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Composition */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Composition (pour 1 Litre)
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {composition.map((item, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex justify-between items-center"
              >
                <span className="font-medium">{item.ingredient}</span>
                <span className="text-secondary font-semibold">{item.quantity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage Instructions */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            Mode d'utilisation
          </h2>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="flex items-start space-x-4 bg-gray-50 p-6 rounded-xl"
              >
                <div className="w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-700 text-lg pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;
