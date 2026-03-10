import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Feliz Aniversário | Ser Levemente",
};

export default function BirthdayPage() {
  return (
    <div className="min-h-screen bg-[#fef9f4] flex flex-col overflow-hidden">
      {/* Decorative top bar */}
      <div className="h-1.5 bg-gradient-to-r from-coral via-pistachio to-golden" />

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10 relative">
        {/* Subtle decorative circles */}
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-pistachio/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-56 h-56 rounded-full bg-coral/10 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-golden/10 blur-3xl" />

        {/* Birthday message */}
        <div className="text-center mb-14 relative z-10">
          <p className="text-sm tracking-[0.5em] uppercase text-coral/80 mb-5 font-medium">
            Um presente pra voc&ecirc;
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light italic text-primary-dark mb-5 leading-tight">
            Feliz Anivers&aacute;rio
          </h1>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-coral/40" />
            <span className="text-pistachio-dark text-lg">&#10047;</span>
            <div className="w-12 h-px bg-coral/40" />
          </div>
          <p className="text-lg md:text-xl text-foreground/60 font-light max-w-md mx-auto leading-relaxed">
            Aqui est&aacute; o seu site, em 3 vers&otilde;es.
            <br />
            <span className="text-primary-dark font-medium">Escolha a que mais gostar!</span>
          </p>
        </div>

        {/* 3 Choices */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl w-full relative z-10">
          {/* Version 1 - Tropical */}
          <Link
            href="/v1"
            className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-coral/10"
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src="/photos/ser.levemente_1745349010_3616572083368822439_6683801803_1.jpg"
                alt="Versão Tropical"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
            </div>
            <div className="p-6 text-center">
              <span className="inline-block bg-coral-light text-coral-dark text-xs tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-3 font-medium">
                Vers&atilde;o 1
              </span>
              <h2 className="text-xl font-medium text-primary-dark mb-1">
                Tropical
              </h2>
              <p className="text-sm text-foreground/50">
                Quente e vibrante, com energia
              </p>
            </div>
          </Link>

          {/* Version 2 - Natureza */}
          <Link
            href="/v2"
            className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-sage/10"
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src="/photos/ser.levemente_1535555625_1856697615237570673_6683801803_4.jpg"
                alt="Versão Natureza"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
            </div>
            <div className="p-6 text-center">
              <span className="inline-block bg-sage-light text-sage text-xs tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-3 font-medium">
                Vers&atilde;o 2
              </span>
              <h2 className="text-xl font-medium text-primary-dark mb-1">
                Natureza
              </h2>
              <p className="text-sm text-foreground/50">
                Org&acirc;nica e fresca, espírito verde
              </p>
            </div>
          </Link>

          {/* Version 3 - Pistache */}
          <Link
            href="/v3"
            className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-pistachio/20"
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src="/photos/ser.levemente_1569699713_2143118985558736132_6683801803_7.jpg"
                alt="Versão Pistache"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
            </div>
            <div className="p-6 text-center">
              <span className="inline-block bg-pistachio-light text-pistachio-deep text-xs tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-3 font-medium">
                Vers&atilde;o 3
              </span>
              <h2 className="text-xl font-medium text-primary-dark mb-1">
                Pistache
              </h2>
              <p className="text-sm text-foreground/50">
                Original e jovem, vibe brasileira
              </p>
            </div>
          </Link>
        </div>

        {/* Signature */}
        <div className="mt-14 text-center relative z-10">
          <p className="text-2xl italic text-primary-dark/40 font-light">
            &ldquo;Seja leve me leve&rdquo;
          </p>
        </div>
      </div>

      {/* Decorative bottom bar */}
      <div className="h-1.5 bg-gradient-to-r from-pistachio via-coral to-golden" />
    </div>
  );
}
