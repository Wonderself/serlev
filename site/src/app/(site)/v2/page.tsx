import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";

const categories = [
  {
    title: "Doces Saudáveis",
    description: "Brownies, cookies, brigadeiros e muito mais",
    image: "/photos/ser.levemente_1745349010_3616572083368822439_6683801803_1.jpg",
    href: "/cardapio#doces",
  },
  {
    title: "Salgados",
    description: "Quibes, pães, quiches e tortas",
    image: "/photos/ser.levemente_1569699713_2143118985558736132_6683801803_7.jpg",
    href: "/cardapio#salgados",
  },
  {
    title: "Pratos Principais",
    description: "Refeições completas e nutritivas",
    image: "/photos/ser.levemente_1561128497_2071218418955904581_6683801803_1.jpg",
    href: "/cardapio#pratos",
  },
  {
    title: "Bolos & Tortas",
    description: "Para ocasiões especiais",
    image: "/photos/ser.levemente_1535555625_1856697615237570673_6683801803_4.jpg",
    href: "/cardapio#bolos",
  },
];

export default function HomeV2() {
  return (
    <>
      {/* Hero - Full screen, photo natural with text overlay using shadows */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/photos/ser.levemente_1535555625_1856697615237570673_6683801803_4.jpg"
            alt="Ser Levemente"
            fill
            className="object-cover"
            priority
          />
          {/* Only a subtle bottom gradient for readability, no full overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4 py-20">
          <div className="inline-block mb-8">
            <span className="text-xs tracking-[0.6em] uppercase text-white/90 block mb-4 drop-shadow-lg font-medium">
              Cozinha Consciente
            </span>
            <h1 className="text-6xl md:text-8xl font-light text-white mb-2 drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
              Ser
            </h1>
            <h1 className="text-5xl md:text-7xl font-light italic text-white/95 drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
              Levemente
            </h1>
          </div>
          <p className="text-white/90 text-lg md:text-xl font-light max-w-lg mx-auto mb-10 leading-relaxed drop-shadow-lg">
            Comida saudável com afeto desde 2017.<br />
            Simplificar, trazer comida boa, saudável, descomplicada.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/cardapio"
              className="bg-white text-sage px-10 py-4 rounded-full text-sm tracking-widest uppercase hover:bg-sage-light transition-colors shadow-xl font-medium"
            >
              Cardápio
            </Link>
            <Link
              href="/contato"
              className="border-2 border-white text-white px-10 py-4 rounded-full text-sm tracking-widest uppercase hover:bg-white hover:text-sage transition-colors shadow-xl"
            >
              Encomenda
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🌿", title: "Natural", text: "Ingredientes da natureza" },
              { icon: "🌾", title: "Low Carb", text: "Sem culpa, com sabor" },
              { icon: "🌱", title: "Vegano", text: "Plant-based com amor" },
              { icon: "🍃", title: "Funcional", text: "Cada ingrediente importa" },
            ].map((p) => (
              <div
                key={p.title}
                className="bg-sage-light/20 rounded-3xl p-8 text-center hover:bg-sage-light/40 transition-colors border border-sage/10"
              >
                <span className="text-4xl block mb-4">{p.icon}</span>
                <h3 className="text-sage font-semibold tracking-wide mb-1">{p.title}</h3>
                <p className="text-sm text-foreground/60">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories - Alternating layout, no overlays on photos */}
      <section className="py-20 bg-sage-light/10">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle
            title="Nosso Cardápio"
            subtitle="Ingredientes naturais, sabor verdadeiro"
          />
          <div className="space-y-6">
            {categories.map((cat, i) => (
              <Link
                key={cat.title}
                href={cat.href}
                className={`group flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all`}
              >
                <div className="relative h-64 md:h-auto md:w-1/2 overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex items-center justify-center p-10 md:w-1/2">
                  <div className="text-center">
                    <h3 className="text-2xl font-medium text-primary-dark mb-2">{cat.title}</h3>
                    <p className="text-foreground/60">{cat.description}</p>
                    <span className="inline-block mt-4 bg-sage-light text-sage px-5 py-2 rounded-full text-sm font-medium tracking-wide group-hover:bg-sage group-hover:text-white transition-colors">
                      Ver mais &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-16 h-0.5 bg-sage mx-auto mb-8" />
          <h2 className="text-3xl md:text-4xl font-light text-primary-dark mb-8">
            O que nutre sua mente?
          </h2>
          <p className="text-foreground/60 leading-relaxed text-lg mb-6">
            Somos não só o que comemos, e sim o que somos, o que
            consumimos, o que vestimos, a música que ouvimos, o conteúdo que consumimos
            no dia-a-dia.
          </p>
          <p className="text-3xl italic text-sage font-light mt-8">
            &quot;Seja leve me leve&quot;
          </p>
        </div>
      </section>

      {/* Instagram Gallery */}
      <section className="py-20 bg-sage-light/10">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle title="@ser.levemente" subtitle="Nos acompanhe no Instagram" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "ser.levemente_1745349010_3616572083368822439_6683801803_1.jpg",
              "ser.levemente_1745346648_3616552271900707356_6683801803_10.jpg",
              "ser.levemente_1535555625_1856697615237570673_6683801803_4.jpg",
              "ser.levemente_1569699713_2143118985558736132_6683801803_7.jpg",
              "ser.levemente_1565651578_2109160769053505539_6683801803_10.jpg",
              "ser.levemente_1561128497_2071218418955904581_6683801803_1.jpg",
              "ser.levemente_1548196844_1962739844117326612_6683801803_6.jpg",
              "ser.levemente_1543222645_1921013244313337774_6683801803_5.jpg",
            ].map((file, i) => (
              <div key={i} className="aspect-square relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
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
      <section className="py-20 bg-sage text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-4">Faça sua encomenda</h2>
          <p className="text-white/80 mb-10 text-lg">
            Entre em contato pelo WhatsApp ou formulário
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/3300000000?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20uma%20encomenda%20com%20a%20Ser%20Levemente!"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-sage px-10 py-4 rounded-full text-sm tracking-wide hover:bg-sage-light transition-colors shadow-lg font-medium"
            >
              WhatsApp
            </a>
            <Link
              href="/contato"
              className="border-2 border-white text-white px-10 py-4 rounded-full text-sm tracking-wide hover:bg-white hover:text-sage transition-colors"
            >
              Contato
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
