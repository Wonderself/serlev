import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Feliz Aniversário | Ser Levemente",
};

export default function BirthdayPage() {
  return (
    <div className="min-h-[100svh] bg-[#fef9f4] flex flex-col overflow-hidden">
      {/* Decorative top bar */}
      <div className="h-1 bg-gradient-to-r from-coral via-pistachio to-golden" />

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-8 sm:py-10 relative">
        {/* Subtle decorative blurs */}
        <div className="absolute top-10 left-5 w-32 sm:w-40 h-32 sm:h-40 rounded-full bg-pistachio/8 blur-3xl" />
        <div className="absolute bottom-16 right-5 w-40 sm:w-56 h-40 sm:h-56 rounded-full bg-coral/8 blur-3xl" />

        {/* Birthday message */}
        <div className="text-center mb-10 sm:mb-14 relative z-10">
          <p className="text-[10px] sm:text-sm tracking-[0.4em] sm:tracking-[0.5em] uppercase text-coral/80 mb-4 font-semibold">
            Um presente pra voc&ecirc;
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light italic text-primary-dark mb-4 leading-tight">
            Feliz Anivers&aacute;rio
          </h1>
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 sm:w-12 h-px bg-coral/40" />
            <span className="text-pistachio-dark text-base sm:text-lg">&#10047;</span>
            <div className="w-8 sm:w-12 h-px bg-coral/40" />
          </div>
          <p className="text-base sm:text-lg md:text-xl text-foreground/55 font-light max-w-sm sm:max-w-md mx-auto leading-relaxed">
            Aqui est&aacute; o seu site, em 3 vers&otilde;es.
            <br />
            <span className="text-primary-dark font-medium">Escolha a que mais gostar!</span>
          </p>
        </div>

        {/* 3 Choices */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 md:gap-8 max-w-5xl w-full relative z-10">
          {/* Version 1 - Tropical */}
          <Link
            href="/v1"
            className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-coral/8"
          >
            <div className="relative h-52 sm:h-56 md:h-64 overflow-hidden">
              <Image
                src="/photos/ser.levemente_1745349010_3616572083368822439_6683801803_1.jpg"
                alt="Versão Tropical"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
            </div>
            <div className="p-5 sm:p-6 text-center">
              <span className="inline-block bg-coral-light text-coral-dark text-[10px] sm:text-xs tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-2 font-semibold">
                Vers&atilde;o 1
              </span>
              <h2 className="text-lg sm:text-xl font-medium text-primary-dark mb-1">
                Tropical
              </h2>
              <p className="text-xs sm:text-sm text-foreground/45">
                Quente e vibrante, com energia
              </p>
            </div>
          </Link>

          {/* Version 2 - Natureza */}
          <Link
            href="/v2"
            className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-sage/8"
          >
            <div className="relative h-52 sm:h-56 md:h-64 overflow-hidden">
              <Image
                src="/photos/ser.levemente_1535555625_1856697615237570673_6683801803_4.jpg"
                alt="Versão Natureza"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
            </div>
            <div className="p-5 sm:p-6 text-center">
              <span className="inline-block bg-sage-light text-sage text-[10px] sm:text-xs tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-2 font-semibold">
                Vers&atilde;o 2
              </span>
              <h2 className="text-lg sm:text-xl font-medium text-primary-dark mb-1">
                Natureza
              </h2>
              <p className="text-xs sm:text-sm text-foreground/45">
                Org&acirc;nica e fresca, verde
              </p>
            </div>
          </Link>

          {/* Version 3 - Pistache */}
          <Link
            href="/v3"
            className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-pistachio/15"
          >
            <div className="relative h-52 sm:h-56 md:h-64 overflow-hidden">
              <Image
                src="/photos/ser.levemente_1569699713_2143118985558736132_6683801803_7.jpg"
                alt="Versão Pistache"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
            </div>
            <div className="p-5 sm:p-6 text-center">
              <span className="inline-block bg-pistachio-light text-pistachio-deep text-[10px] sm:text-xs tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-2 font-semibold">
                Vers&atilde;o 3
              </span>
              <h2 className="text-lg sm:text-xl font-medium text-primary-dark mb-1">
                Pistache
              </h2>
              <p className="text-xs sm:text-sm text-foreground/45">
                Original e jovem, vibe brasileira
              </p>
            </div>
          </Link>
        </div>

        {/* Signature */}
        <div className="mt-10 sm:mt-14 text-center relative z-10">
          <p className="font-logo text-3xl sm:text-4xl text-primary-dark/30">
            &ldquo;Seja leve me leve&rdquo;
          </p>
        </div>
      </div>

      {/* Decorative bottom bar */}
      <div className="h-1 bg-gradient-to-r from-pistachio via-coral to-golden" />
    </div>
  );
}
