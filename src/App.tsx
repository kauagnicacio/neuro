import { useState } from "react";
import {
  Zap,
  Shield,
  Truck,
  Star,
  ChevronDown,
  ChevronUp,
  Check,
  Battery,
  Bluetooth,
  Smartphone,
  Award,
  RefreshCw,
  HeadphonesIcon,
  Lock,
  Package,
  Brain,
  Activity,
  Moon,
  Sparkles,
  ArrowRight,
} from "lucide-react";

// Product images per color
const PRODUCT_IMAGES: Record<string, string> = {
  azul: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/a3e6a320-e448-494b-8d1e-d0475b945e35.png",
  branco: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/acb44ce2-1525-4cb5-941e-afd6e868c8c4.png",
  preto: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/df217ed4-549b-4199-b930-5c526c40066e.png",
};

const LIFESTYLE_IMAGE = "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/a340d429-628c-4524-8766-e0e87bc76b82.png";
const PACKAGE_IMAGE = "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/8d99c95f-aad6-4dfb-b741-ce1c9b3c78dd.png";

const COLOR_OPTIONS = [
  { id: "azul", label: "Azul", bg: "#1a6eff", ring: "#3b82f6" },
  { id: "branco", label: "Branco", bg: "#e8edf5", ring: "#94a3b8" },
  { id: "preto", label: "Preto", bg: "#1a1a2e", ring: "#475569" },
];

const BENEFITS = [
  { icon: Brain, title: "Relaxamento Profundo", desc: "Tecnologia que ajuda seu sistema nervoso a entrar em modo de descanso em minutos." },
  { icon: Activity, title: "Bem-estar Diário", desc: "Use na hora que precisar: em casa, no trabalho ou onde estiver." },
  { icon: Smartphone, title: "100% Portátil", desc: "Cabe no bolso, na bolsa ou na mochila. Sempre com você." },
  { icon: Battery, title: "Recarregável USB", desc: "Sem pilhas, sem complicação. Carrega rápido e dura o dia todo." },
  { icon: Bluetooth, title: "Fácil de Usar", desc: "3 botões. Liga, escolhe a intensidade e pronto. Sem app, sem cadastro." },
  { icon: Moon, title: "Sono de Qualidade", desc: "Ajuda a desacelerar antes de dormir para você ter noites mais tranquilas." },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Ligue o NeuroControl", desc: "Pressione o botão de energia. O visor digital acende em 2 segundos.", icon: Zap },
  { step: "02", title: "Escolha a intensidade", desc: "Use os botões + e – para encontrar o nível ideal para você. São 5 níveis diferentes.", icon: Activity },
  { step: "03", title: "Relaxe e sinta a diferença", desc: "Posicione conforme indicado e deixe a tecnologia trabalhar. Sinta a tensão diminuindo.", icon: Sparkles },
];

const REVIEWS = [
  { name: "Mariana S.", stars: 5, text: "Comprei com desconfiança mas me surpreendi. Uso toda noite antes de dormir e a diferença é real. Sono muito melhor!", location: "São Paulo, SP" },
  { name: "Carlos R.", stars: 5, text: "Trabalho com muita tensão e o NeuroControl virou parte da minha rotina. Fácil de usar e o resultado aparece rápido.", location: "Belo Horizonte, MG" },
  { name: "Ana Paula M.", stars: 5, text: "Design bonito, discreto e funcional. Já indiquei para 3 amigas. Qualidade que se vê na embalagem e no produto.", location: "Curitiba, PR" },
  { name: "Roberto L.", stars: 5, text: "Chegou rápido, embalagem impecável. Produto de qualidade que realmente entrega o que promete. Recomendo.", location: "Rio de Janeiro, RJ" },
  { name: "Fernanda K.", stars: 5, text: "Tenho muito estresse no dia a dia e esse dispositivo faz diferença. Uso na pausa do almoço e chego revigorada no segundo turno.", location: "Porto Alegre, RS" },
  { name: "Lucas T.", stars: 5, text: "Presente para minha mãe. Ela adorou, usa todo dia. Vale cada centavo, entrega muito mais do que eu esperava.", location: "Brasília, DF" },
];

const FAQS = [
  { q: "Como funciona o NeuroControl?", a: "O NeuroControl é um dispositivo portátil que utiliza tecnologia de estimulação suave para ajudar o corpo a reduzir a tensão e entrar em estado de relaxamento. É fácil de usar: ligue, escolha a intensidade e posicione conforme indicado." },
  { q: "Quanto tempo leva para sentir os resultados?", a: "A maioria dos usuários relata perceber diferença logo nas primeiras sessões. Para melhores resultados, recomendamos o uso regular como parte da sua rotina diária." },
  { q: "Quanto tempo dura a bateria?", a: "Com uso padrão, a bateria dura de 6 a 8 horas por carga. O carregamento via USB-C leva aproximadamente 1 hora." },
  { q: "Em quantos dias o pedido chega?", a: "Enviamos por SEDEX com rastreio. O prazo estimado é de 3 a 7 dias úteis para todo o Brasil." },
  { q: "Tem garantia?", a: "Sim! O NeuroControl tem garantia de 90 dias. Se você não ficar satisfeito, entre em contato com nosso suporte e cuidamos de tudo." },
  { q: "Posso usar todos os dias?", a: "Sim, o NeuroControl foi desenvolvido para uso diário. Recomendamos sessões de 15 a 30 minutos conforme sua preferência." },
  { q: "Como faço para rastrear meu pedido?", a: "Assim que seu pedido for enviado, você recebe um e-mail com o código de rastreio. Você pode acompanhar a entrega diretamente no site dos Correios." },
];

interface FAQItemProps {
  q: string;
  a: string;
}

function FAQItem({ q, a }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="nc-faq-item py-5">
      <button
        className="w-full flex items-center justify-between gap-4 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="text-foreground font-medium text-sm leading-relaxed">{q}</span>
        <span className="shrink-0 text-primary">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>
      {open && (
        <p className="mt-3 text-muted-foreground text-sm leading-relaxed pr-8">
          {a}
        </p>
      )}
    </div>
  );
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} className="fill-primary text-primary" />
      ))}
    </div>
  );
}

export function App() {
  const [selectedColor, setSelectedColor] = useState("azul");

  const currentImage = PRODUCT_IMAGES[selectedColor];
  const colorLabel = COLOR_OPTIONS.find((c) => c.id === selectedColor)?.label ?? "Azul";

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">

      {/* ───── HERO ───── */}
      <section className="relative overflow-hidden px-4 pt-10 pb-14 md:pt-16 md:pb-20">
        {/* bg glow spots */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% -10%, oklch(0.62 0.20 225 / 0.18) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 80% 80%, oklch(0.62 0.20 225 / 0.08) 0%, transparent 60%)",
          }}
        />

        <div className="relative max-w-sm mx-auto md:max-w-4xl">
          {/* badge */}
          <div className="flex justify-center mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-primary nc-glow-border">
              <Sparkles size={12} />
              Tecnologia de Bem-estar Portátil
            </span>
          </div>

          {/* headline */}
          <h1 className="text-center text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-3">
            Relaxe em <span className="text-primary nc-text-glow">minutos</span>,{" "}
            <br className="hidden md:block" />
            em qualquer lugar.
          </h1>

          <p className="text-center text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-md mx-auto">
            O <strong className="text-foreground">NeuroControl</strong> é o dispositivo
            portátil que transforma sua rotina com tecnologia avançada de relaxamento
            e bem-estar — discreto, recarregável e fácil de usar.
          </p>

          {/* Product Image */}
          <div className="relative flex justify-center mb-8">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                boxShadow: "0 0 60px oklch(0.62 0.20 225 / 0.25), 0 0 120px oklch(0.62 0.20 225 / 0.1)",
              }}
            >
              <img
                key={selectedColor}
                src={currentImage}
                alt={`NeuroControl ${colorLabel}`}
                className="w-72 h-72 md:w-96 md:h-96 object-contain nc-float"
                style={{ background: "oklch(0.10 0.025 240)" }}
              />
            </div>
          </div>

          {/* Color selector */}
          <div className="flex flex-col items-center gap-3 mb-7">
            <p className="text-sm text-muted-foreground">
              Cor selecionada: <span className="text-foreground font-semibold">{colorLabel}</span>
            </p>
            <div className="flex gap-4">
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedColor(c.id)}
                  title={c.label}
                  className="relative w-10 h-10 rounded-full transition-all duration-200 hover:scale-110"
                  style={{
                    backgroundColor: c.bg,
                    border: `2px solid ${c.ring}`,
                    ...(selectedColor === c.id
                      ? {
                          boxShadow: `0 0 0 2px oklch(0.06 0.02 240), 0 0 0 4px oklch(0.62 0.20 225), 0 0 14px oklch(0.62 0.20 225 / 0.5)`,
                        }
                      : {}),
                  }}
                >
                  {selectedColor === c.id && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <Check size={14} className="text-primary" />
                    </span>
                  )}
                  <span className="sr-only">{c.label}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Disponível em Azul, Branco e Preto</p>
          </div>

          {/* Price + CTA */}
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <p className="text-muted-foreground text-sm line-through">De R$ 249,90</p>
              <p className="text-4xl font-extrabold text-foreground">
                R$ <span className="text-primary nc-text-glow">179,90</span>
              </p>
              <p className="text-sm text-primary font-medium mt-0.5">5% OFF no Pix — R$ 170,91</p>
            </div>

            <button
              className="nc-glow-btn nc-pulse w-full max-w-xs bg-primary text-primary-foreground font-bold text-base py-4 px-8 rounded-2xl flex items-center justify-center gap-2"
              onClick={() => alert("Integrar link de compra aqui")}
            >
              Quero o meu agora
              <ArrowRight size={18} />
            </button>

            {/* trust icons below CTA */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
              <span className="flex items-center gap-1"><Lock size={12} /> Compra segura</span>
              <span className="flex items-center gap-1"><Truck size={12} /> Frete grátis</span>
              <span className="flex items-center gap-1"><Shield size={12} /> Garantia 90 dias</span>
            </div>
          </div>
        </div>
      </section>

      <div className="nc-divider" />

      {/* ───── SOCIAL PROOF BAR ───── */}
      <section className="px-4 py-6 nc-section-alt">
        <div className="max-w-sm mx-auto md:max-w-3xl flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center">
          <div>
            <p className="text-2xl font-extrabold text-foreground">+8.400</p>
            <p className="text-xs text-muted-foreground">unidades vendidas</p>
          </div>
          <div className="hidden md:block w-px h-10 bg-border" />
          <div>
            <div className="flex justify-center mb-1"><StarRating count={5} /></div>
            <p className="text-xs text-muted-foreground">4.9 / 5 — +1.200 avaliações</p>
          </div>
          <div className="hidden md:block w-px h-10 bg-border" />
          <div>
            <p className="text-2xl font-extrabold text-foreground">3–7 dias</p>
            <p className="text-xs text-muted-foreground">prazo de entrega</p>
          </div>
          <div className="hidden md:block w-px h-10 bg-border" />
          <div>
            <p className="text-2xl font-extrabold text-foreground">90 dias</p>
            <p className="text-xs text-muted-foreground">de garantia</p>
          </div>
        </div>
      </section>

      <div className="nc-divider" />

      {/* ───── BENEFITS ───── */}
      <section className="px-4 py-14">
        <div className="max-w-sm mx-auto md:max-w-4xl">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary mb-2">Benefícios</p>
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-10">
            Tudo o que você precisa para <br className="hidden md:block" />
            uma <span className="text-primary">rotina mais leve</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {BENEFITS.map((b, i) => (
              <div key={i} className="nc-card rounded-2xl p-5 flex flex-col gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "oklch(0.62 0.20 225 / 0.15)" }}
                >
                  <b.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold text-sm text-foreground">{b.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="nc-divider" />

      {/* ───── HOW IT WORKS ───── */}
      <section className="px-4 py-14 nc-section-alt">
        <div className="max-w-sm mx-auto md:max-w-4xl">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary mb-2">Como Usar</p>
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-4">
            Simples como 1, 2, 3
          </h2>
          <p className="text-center text-muted-foreground text-sm mb-10 max-w-xs mx-auto">
            Sem app, sem cadastro, sem complicação. Em segundos, você já está no modo relaxamento.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center gap-4">
                {/* step connector line (desktop) */}
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[58%] w-[84%] h-px bg-border" />
                )}
                <div
                  className="relative w-16 h-16 rounded-2xl flex items-center justify-center nc-glow-border"
                  style={{ background: "oklch(0.13 0.035 240)" }}
                >
                  <step.icon size={26} className="text-primary" />
                  <span
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center"
                    style={{ background: "oklch(0.62 0.20 225)", color: "oklch(0.06 0.02 240)" }}
                  >
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-foreground">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Lifestyle image */}
          <div className="flex justify-center">
            <div className="rounded-2xl overflow-hidden nc-glow-border max-w-sm w-full">
              <img
                src={LIFESTYLE_IMAGE}
                alt="NeuroControl em uso"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="nc-divider" />

      {/* ───── DIFFERENTIALS ───── */}
      <section className="px-4 py-14">
        <div className="max-w-sm mx-auto md:max-w-4xl">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary mb-2">Diferenciais</p>
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-10">
            Por que o <span className="text-primary">NeuroControl</span> é diferente?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Smartphone, title: "Design ultra compacto", desc: "Cabe na palma da mão. Discreto, elegante e moderno. Três cores exclusivas." },
              { icon: Zap, title: "5 níveis de intensidade", desc: "Encontre o nível ideal para cada momento — do relaxamento suave ao profundo." },
              { icon: Battery, title: "Bateria que dura o dia", desc: "Carregamento USB-C de 1 hora e autonomia de até 8 horas de uso contínuo." },
              { icon: Award, title: "Qualidade premium", desc: "Materiais de alta qualidade, acabamento impecável e embalagem que impressiona." },
              { icon: RefreshCw, title: "Recarregável e sustentável", desc: "Sem pilhas descartáveis. Carregue na tomada, computador ou power bank." },
              { icon: HeadphonesIcon, title: "Suporte dedicado", desc: "Nossa equipe está disponível para tirar todas as suas dúvidas antes e depois da compra." },
            ].map((d, i) => (
              <div key={i} className="nc-card rounded-2xl p-5 flex gap-4 items-start">
                <div
                  className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center"
                  style={{ background: "oklch(0.62 0.20 225 / 0.15)" }}
                >
                  <d.icon size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground mb-1">{d.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="nc-divider" />

      {/* ───── REVIEWS ───── */}
      <section className="px-4 py-14 nc-section-alt">
        <div className="max-w-sm mx-auto md:max-w-4xl">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary mb-2">Avaliações Reais</p>
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-2">
            Quem usa, aprova.
          </h2>
          <p className="text-center text-muted-foreground text-sm mb-10">
            +1.200 avaliações · Nota média 4.9 de 5
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {REVIEWS.map((r, i) => (
              <div key={i} className="nc-card rounded-2xl p-5 flex flex-col gap-3">
                <StarRating count={r.stars} />
                <p className="text-sm text-foreground leading-relaxed">"{r.text}"</p>
                <div className="flex items-center gap-2 mt-auto">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: "oklch(0.62 0.20 225 / 0.2)", color: "oklch(0.62 0.20 225)" }}
                  >
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.location}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-[10px] text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full">
                      Compra verificada
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Rating summary */}
          <div className="nc-card rounded-2xl p-5 flex flex-col md:flex-row items-center gap-6 justify-center">
            <div className="text-center">
              <p className="text-5xl font-extrabold text-primary nc-text-glow">4.9</p>
              <StarRating count={5} />
              <p className="text-xs text-muted-foreground mt-1">de 5 estrelas</p>
            </div>
            <div className="hidden md:block w-px h-16 bg-border" />
            <div className="flex flex-col gap-2 w-full max-w-xs">
              {[
                { label: "5 estrelas", pct: 91 },
                { label: "4 estrelas", pct: 7 },
                { label: "3 estrelas", pct: 2 },
              ].map((r, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground w-16 shrink-0">{r.label}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${r.pct}%` }}
                    />
                  </div>
                  <span className="text-muted-foreground w-8 text-right">{r.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="nc-divider" />

      {/* ───── OFFER ───── */}
      <section className="px-4 py-14" id="comprar">
        <div className="max-w-sm mx-auto md:max-w-xl">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary mb-2">Oferta Especial</p>
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-3">
            Garanta o seu <span className="text-primary">NeuroControl</span>
          </h2>
          <p className="text-center text-muted-foreground text-sm mb-8">
            Estoque limitado. Aproveite o desconto exclusivo de lançamento.
          </p>

          <div className="nc-glow-border rounded-3xl overflow-hidden" style={{ background: "oklch(0.10 0.025 240)" }}>
            {/* product preview */}
            <div
              className="relative flex justify-center items-center py-8"
              style={{ background: "oklch(0.13 0.035 240)" }}
            >
              <img
                key={`offer-${selectedColor}`}
                src={currentImage}
                alt={`NeuroControl ${colorLabel}`}
                className="w-48 h-48 object-contain"
              />
            </div>

            <div className="p-6 flex flex-col gap-5">
              {/* color picker */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Escolha a cor:
                </p>
                <div className="flex gap-3">
                  {COLOR_OPTIONS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedColor(c.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200"
                      style={{
                        background: selectedColor === c.id ? "oklch(0.62 0.20 225 / 0.15)" : "oklch(0.14 0.03 240)",
                        border: `1px solid ${selectedColor === c.id ? "oklch(0.62 0.20 225)" : "oklch(0.22 0.04 240)"}`,
                        color: selectedColor === c.id ? "oklch(0.62 0.20 225)" : "oklch(0.65 0.05 230)",
                      }}
                    >
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ background: c.bg, border: `1px solid ${c.ring}` }}
                      />
                      {c.label}
                      {selectedColor === c.id && <Check size={11} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* price breakdown */}
              <div className="nc-card rounded-xl p-4 flex flex-col gap-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Preço original</span>
                  <span className="text-muted-foreground line-through">R$ 249,90</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Desconto de lançamento</span>
                  <span className="text-primary font-medium">–R$ 70,00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="text-primary font-medium">Grátis</span>
                </div>
                <div className="nc-divider my-1" />
                <div className="flex justify-between items-end">
                  <span className="font-semibold text-foreground">Total</span>
                  <div className="text-right">
                    <p className="text-2xl font-extrabold text-foreground">R$ 179,90</p>
                    <p className="text-xs text-primary">ou R$ 170,91 no Pix (5% OFF)</p>
                  </div>
                </div>
              </div>

              {/* includes */}
              <div className="flex flex-col gap-2">
                {[
                  "1x Dispositivo NeuroControl",
                  "1x Cabo de carregamento USB-C",
                  "1x Manual de uso em português",
                  "Embalagem premium de presente",
                  "Frete grátis para todo o Brasil",
                  "Garantia de 90 dias",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Check size={13} className="text-primary shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              {/* CTA button */}
              <button
                className="nc-glow-btn w-full bg-primary text-primary-foreground font-bold text-base py-4 rounded-2xl flex items-center justify-center gap-2"
                onClick={() => alert("Integrar link de compra aqui")}
              >
                Comprar agora — R$ 179,90
                <ArrowRight size={18} />
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Compra 100% segura · Parcelamento disponível
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="nc-divider" />

      {/* ───── PACKAGE / TRUST ───── */}
      <section className="px-4 py-14 nc-section-alt">
        <div className="max-w-sm mx-auto md:max-w-4xl">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary mb-2">Segurança</p>
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-10">
            Compre com total <span className="text-primary">confiança</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: Lock, title: "Pagamento 100% Seguro", desc: "Criptografia SSL e checkout protegido." },
              { icon: Truck, title: "Entrega Rastreada", desc: "Código de rastreio enviado por e-mail." },
              { icon: Shield, title: "Garantia 90 Dias", desc: "Sem burocracia. Resolvemos para você." },
              { icon: HeadphonesIcon, title: "Suporte Humanizado", desc: "Atendimento rápido e prestativo." },
            ].map((t, i) => (
              <div key={i} className="nc-card rounded-2xl p-4 flex flex-col items-center text-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "oklch(0.62 0.20 225 / 0.15)" }}
                >
                  <t.icon size={22} className="text-primary" />
                </div>
                <h3 className="text-xs font-semibold text-foreground leading-tight">{t.title}</h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>

          {/* Package image */}
          <div className="flex justify-center">
            <div className="rounded-2xl overflow-hidden nc-glow-border max-w-sm w-full">
              <img
                src={PACKAGE_IMAGE}
                alt="Embalagem NeuroControl"
                className="w-full object-cover"
              />
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            Embalagem premium — cuidado do unboxing até a sua mão.
          </p>
        </div>
      </section>

      <div className="nc-divider" />

      {/* ───── FAQ ───── */}
      <section className="px-4 py-14">
        <div className="max-w-sm mx-auto md:max-w-2xl">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary mb-2">Dúvidas</p>
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-10">
            Perguntas frequentes
          </h2>

          <div className="nc-card rounded-2xl px-5 divide-y-0">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      <div className="nc-divider" />

      {/* ───── FINAL CTA ───── */}
      <section className="px-4 py-16 relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.62 0.20 225 / 0.12) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-sm mx-auto md:max-w-xl text-center flex flex-col items-center gap-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center nc-glow-border"
            style={{ background: "oklch(0.13 0.035 240)" }}
          >
            <Brain size={30} className="text-primary" />
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold leading-tight">
            Sua rotina merece <br />
            <span className="text-primary nc-text-glow">mais leveza.</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
            Junte-se a mais de 8.400 pessoas que já transformaram sua rotina com o NeuroControl.
          </p>

          <button
            className="nc-glow-btn nc-pulse bg-primary text-primary-foreground font-bold text-base py-4 px-10 rounded-2xl flex items-center gap-2"
            onClick={() => alert("Integrar link de compra aqui")}
          >
            <Package size={18} />
            Garantir meu NeuroControl
          </button>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Lock size={11} /> Seguro</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Truck size={11} /> Frete grátis</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Shield size={11} /> Garantia 90 dias</span>
          </div>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer
        className="px-4 py-8 text-center"
        style={{ background: "oklch(0.07 0.02 240)", borderTop: "1px solid oklch(0.22 0.04 240)" }}
      >
        <p className="text-xs text-muted-foreground mb-1">
          © 2026 NeuroControl · Todos os direitos reservados
        </p>
        <p className="text-[11px] text-muted-foreground/60">
          Este produto não é um dispositivo médico e não se destina a diagnosticar, tratar ou prevenir doenças.
        </p>
      </footer>
    </div>
  );
}

export default App;
