import { Lightbulb, Target, Heart, Users } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-secondary" />,
      title: 'Respect de l\'environnement',
      description: 'Chaque lavage avec EcoWash économise 150-200 litres d\'eau et utilise uniquement des produits biodégradables.'
    },
    {
      icon: <Target className="w-8 h-8 text-secondary" />,
      title: 'Qualité professionnelle',
      description: 'Nous offrons un résultat impeccable sans compromis sur la qualité du service.'
    },
    {
      icon: <Users className="w-8 h-8 text-secondary" />,
      title: 'Service client',
      description: 'Votre satisfaction est notre priorité. Nous nous adaptons à vos besoins et votre emploi du temps.'
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-secondary" />,
      title: 'Innovation',
      description: 'Nous développons continuellement nos techniques et produits pour un lavage toujours plus écologique.'
    }
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            À propos d'EcoWash
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Découvrez notre histoire et notre engagement pour un lavage automobile responsable.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">Qui sommes-nous ?</h2>
            <p className="text-gray-600 text-lg">
              EcoWash est une société spécialisée dans le lavage de véhicules respectueux de l'environnement. 
              Nous utilisons des sprays écologiques à base de <strong>limonène</strong> et d'<strong>huile de colza</strong>.
            </p>
          </div>

          <div className="bg-secondary/10 p-8 rounded-2xl mb-12">
            <h3 className="text-2xl font-bold text-primary mb-4 text-center">Notre Mission</h3>
            <p className="text-xl text-center text-gray-700">
              <strong className="text-secondary">Protéger l'environnement tout en offrant un service de qualité.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Inspiration */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-secondary font-semibold">Notre histoire</span>
              <h2 className="text-3xl font-bold text-primary mb-6 mt-2">
                Inspiration personnelle
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                L'idée d'EcoWash est née de l'observation du <strong>manque de temps</strong> des 
                gens pour laver leurs véhicules, combinée à une <strong>sensibilisation croissante 
                à la protection de l'environnement</strong>.
              </p>
              <p className="text-gray-600 text-lg">
                Nous avons voulu créer une solution qui répond à ces deux problématiques : 
                un service pratique qui vient à vous, tout en préservant notre planète.
              </p>
            </div>
            <div className="bg-primary p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-6">Pertinence et justification</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2"></span>
                  <span>Les lavages traditionnels consomment <strong>150-200 L d'eau</strong> par véhicule</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2"></span>
                  <span>Peu de services écologiques sont disponibles actuellement</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2"></span>
                  <span>Croissance du marché du lavage mobile</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Market Study */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            Étude de marché
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">Clientèle cible</h3>
              <p className="text-gray-600">
                Urbains, travailleurs occupés, entreprises avec flottes de véhicules.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">Concurrence</h3>
              <p className="text-gray-600">
                Stations classiques, quelques services mobiles – mais peu d'options écologiques.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">Contexte</h3>
              <p className="text-gray-600">
                Forte demande pour des services verts et pratiques dans les grandes villes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Nos valeurs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">Venez nous voir</h2>
          <p className="text-gray-600 text-lg mb-8">
            Notre station de lavage est située au cœur de Montréal.
          </p>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <img
              src="/Images/photoDuGarage.png"
              alt="Station EcoWash"
              className="w-full max-w-2xl mx-auto rounded-lg mb-6"
            />
            <p className="text-xl font-semibold text-primary">
              3030 Rue Hochelaga, Montreal, Qc H1W 1G2
            </p>
            <p className="text-secondary font-medium mt-2">
              Téléphone : 438-674-3689
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
