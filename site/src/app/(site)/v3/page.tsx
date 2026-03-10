import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Doces",
    description: "Brownies, cookies, brigadeiros",
    image: "/photos/ser.levemente_1745349010_3616572083368822439_6683801803_1.jpg",
    href: "/cardapio#doces",
  },
  {
    title: "Salgados",
    description: "Quibes, pães, quiches",
    image: "/photos/ser.levemente_1569699713_2143118985558736132_6683801803_7.jpg",
    href: "/cardapio#salgados",
  },
  {
    title: "Pratos",
    description: "Refeições nutritivas",
    image: "/photos/ser.levemente_1561128497_2071218418955904581_6683801803_1.jpg",
    href: "/cardapio#pratos",
  },
  {
    title: "Bolos",
    description: "Ocasiões especiais",
    image: "/photos/ser.levemente_1535555625_1856697615237570673_6683801803_4.jpg",
    href: "/cardapio#bolos",
  },
];

export default function HomeV3() {
  return (
    <>
      {/* Hero - Pistachio background, asymmetric layout, photo natural */}
      <section className="relative min-h-screen bg-pistachio-light overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-20 min-h-screen flex items-center">
          <div className="grid md:grid-cols-5 gap-8 items-center w-full">
            {/* Text - takes 2 cols */}
            <div className="md:col-span-2 relative z-10">
              <span className="inline-block bg-pistachio-deep text-white text-xs tracking-[0.4em] uppercase px-4 py-2 rounded-full mb-6 font-medium">
                Cozinha Consciente
              </span>
              <h1 className="text-6xl md:text-7xl font-light text-pistachio-deep leading-none mb-2">
                Ser
              </h1>
              <h1 className="text-5xl md:text-6xl font-light italic text-primary-dark/80 leading-none mb-8">
                Levemente
              </h1>
              <p className="text-foreground/60 text-lg max-w-sm mb-10 leading-relaxed">
                Comida saudável com afeto. Simplificar, trazer comida boa,
                saudável, descomplicada na versão gostosa.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/cardapio"
                  className="bg-pistachio-deep text-white px-8 py-4 rounded-full text-sm tracking-widest uppercase hover:bg-pistachio-dark transition-colors shadow-lg shadow-pistachio-deep/30"
                >
                  Cardápio
                </Link>
                <Link
                  href="/contato"
                  className="border-2 border-pistachio-deep text-pistachio-deep px-8 py-4 rounded-full text-sm tracking-widest uppercase hover:bg-pistachio-deep hover:text-white transition-colors"
                >
                  Encomenda
                </Link>
              </div>
            </div>
            {/* Photos - takes 3 cols, collage style */}
            <div className="md:col-span-3 relative">
              <div className="grid grid-cols-2 gap-3">
                <div className="relative h-[280px] md:h-[350px] rounded-3xl overflow-hidden shadow-xl mt-8">
                  <Image
                    src="/photos/ser.levemente_1745349010_3616572083368822439_6683801803_1.jpg"
                    alt="Ser Levemente"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="relative h-[280px] md:h-[350px] rounded-3xl overflow-hidden shadow-xl -mt-4">
                  <Image
                    src="/photos/ser.levemente_1535555625_1856697615237570673_6683801803_4.jpg"
                    alt="Ser Levemente"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              {/* Decorative blob */}
              <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-pistachio/40 blur-2xl -z-10" />
              <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-golden/20 blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Values - Pill badges on pistachio */}
      <section className="py-6 bg-pistachio/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {["Saudável", "Low Carb", "Vegano", "Funcional", "Sem Glúten", "Natural"].map((v) => (
              <span key={v} className="text-xs tracking-[0.2em] uppercase text-pistachio-deep bg-white/60 px-5 py-2.5 rounded-full font-medium">
                {v}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Categories - Rounded cards, no dark overlays */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-16">
            <span className="inline-block bg-pistachio-light text-pistachio-deep text-xs tracking-[0.3em] uppercase px-4 py-1.5 rounded-full mb-4 font-medium">
              Explore
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-primary-dark">
              Nosso Cardápio
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="group bg-pistachio-light/30 rounded-3xl overflow-hidden hover:bg-pistachio-light/50 transition-all"
              >
                <div className="relative h-64 overflow-hidden rounded-t-3xl">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl text-primary-dark font-medium">{cat.title}</h3>
                    <p className="text-foreground/50 text-sm mt-0.5">{cat.description}</p>
                  </div>
                  <span className="bg-pistachio-deep text-white w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                    &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quote section - Clean pistachio */}
      <section className="py-28 bg-pistachio-light relative overflow-hidden">
        <div className="absolute top-0 left-8 text-[15rem] leading-none text-pistachio/30 font-serif select-none">
          &ldquo;
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <p className="text-foreground/60 leading-relaxed text-xl md:text-2xl mb-10 font-light">
            Somos não só o que comemos, e sim o que somos, o que
            consumimos, o que vestimos, a música que ouvimos, o conteúdo que consumimos
            no dia-a-dia.
          </p>
          <p className="text-3xl md:text-4xl italic text-pistachio-deep font-light">
            &quot;Seja leve me leve&quot;
          </p>
        </div>
      </section>

      {/* Gallery - Clean grid */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-16">
            <span className="inline-block bg-pistachio-light text-pistachio-deep text-xs tracking-[0.3em] uppercase px-4 py-1.5 rounded-full mb-4 font-medium">
              Instagram
            </span>
            <h2 className="text-4xl font-light text-primary-dark">@ser.levemente</h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {[
              "ser.levemente_1745349010_3616572083368822439_6683801803_1.jpg",
              "ser.levemente_1745346648_3616552271900707356_6683801803_10.jpg",
              "ser.levemente_1535555625_1856697615237570673_6683801803_4.jpg",
              "ser.levemente_1569699713_2143118985558736132_6683801803_7.jpg",
              "ser.levemente_1565651578_2109160769053505539_6683801803_10.jpg",
              "ser.levemente_1561128497_2071218418955904581_6683801803_1.jpg",
              "ser.levemente_1548196844_1962739844117326612_6683801803_6.jpg",
              "ser.levemente_1543222645_1921013244313337774_6683801803_5.jpg",
              "ser.levemente_1542112822_1911703368185536361_6683801803_8.jpg",
              "ser.levemente_1535734059_1858194432412569885_6683801803_2.jpg",
              "ser.levemente_1533559526_1839953124690740115_6683801803_8.jpg",
              "ser.levemente_1531318387_1821153085914835252_6683801803_8.jpg",
            ].map((file, i) => (
              <div key={i} className="aspect-square relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5">
                <Image
                  src={`/photos/${file}`}
                  alt="Ser Levemente"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-pistachio-deep">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">Faça sua encomenda</h2>
          <p className="text-white/70 mb-12 text-lg">
            WhatsApp ou formulário de contato
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/3300000000?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20uma%20encomenda%20com%20a%20Ser%20Levemente!"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-pistachio-deep px-10 py-4 rounded-full text-sm tracking-widest uppercase hover:bg-pistachio-light transition-colors shadow-lg font-medium"
            >
              WhatsApp
            </a>
            <Link
              href="/contato"
              className="border-2 border-white/40 text-white px-10 py-4 rounded-full text-sm tracking-widest uppercase hover:bg-white hover:text-pistachio-deep transition-colors"
            >
              Contato
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
