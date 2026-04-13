import { useState, useEffect, useRef } from "react";
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
  Brain,
  Activity,
  Moon,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react";

// Product images per color
const PRODUCT_IMAGES: Record<string, string> = {
  azul: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/0f1b5206-9311-4930-b734-1967a14168e7.png",
  branco: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/d2003d0c-c063-444c-9559-df37abdd721e.png",
  preto: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/8a2a852c-046b-4253-b8e6-8b6959f8c6ed.png",
};

const COLOR_OPTIONS = [
  { id: "azul", label: "Azul", bg: "#1a6eff", ring: "#3b82f6", checkoutUrl: "https://checkout.neurocontroll.com.br/VCCL1O8SCXCR" },
  { id: "branco", label: "Branco", bg: "#e8edf5", ring: "#94a3b8", checkoutUrl: "https://checkout.neurocontroll.com.br/VCCL1O8SCX9Q" },
  { id: "preto", label: "Preto", bg: "#1a1a2e", ring: "#475569", checkoutUrl: "https://checkout.neurocontroll.com.br/VCCL1O8SCXCQ" },
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
  { step: "02", title: "Escolha a intensidade", desc: "Use os botões + e – para encontrar o nível ideal para você. São 15 níveis diferentes.", icon: Activity },
  { step: "03", title: "Relaxe e sinta a diferença", desc: "Posicione conforme indicado e deixe a tecnologia trabalhar. Sinta a tensão diminuindo.", icon: Sparkles },
];

const REVIEWS = [
  {
    image: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/8adf34f5-0bb6-440a-8958-7694aefbbebe.png",
    text: "Recebi hoje e já estou amando! A qualidade é incrível.",
  },
  {
    image: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/e988b2fd-a8d8-4c48-b106-901f9263e7ca.png",
    text: "Produto chegou super rápido e bem embalado. Recomendo!",
  },
  {
    image: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/de29435a-51e9-474b-b23b-5d5b4c0c1191.png",
    text: "Valeu cada centavo. Já sinto a diferença no relaxamento!",
  },
  {
    image: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/34124e32-693d-4e6e-ba0c-9ff67e3c50fa.png",
    text: "Melhor compra que fiz esse ano. Uso todo dia antes de dormir.",
  },
  {
    image: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/73e91796-1ccc-416d-b8c1-9f45ecbcd7cb.png",
    text: "Surpreendeu muito! Qualidade excelente e entrega rápida.",
  },
  {
    image: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/ac97cdc6-4a8c-4643-bf2c-5e57939259c9.png",
    text: "Chegou antes do prazo e funcionou na primeira tentativa. Adorei!",
  },
  {
    image: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/5d283dc6-517d-450b-9246-3642ff38be1c.png",
    text: "Produto incrível, já recomendei para toda a família.",
  },
  {
    image: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/a307f6ac-12cd-4d27-b27b-735d0907f870.png",
    text: "Faz exatamente o que promete. Sensação de relaxamento real.",
  },
  {
    image: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/5fb11e78-6f7d-4dcb-9f96-d4604d8fe6f0.png",
    text: "Compra perfeita! Embalagem caprichada e produto de altíssima qualidade.",
  },
  {
    image: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/f362e645-d384-4cfc-8977-0f692ee46f48.png",
    text: "Uso toda manhã e a diferença no meu dia é enorme. Vale muito!",
  },
];

const FAQS = [
  { q: "Como funciona o NeuroControl?", a: "O NeuroControl é um dispositivo portátil que utiliza tecnologia de estimulação suave para ajudar o corpo a reduzir a tensão e entrar em estado de relaxamento. É fácil de usar: ligue, escolha a intensidade e posicione conforme indicado." },
  { q: "Quanto tempo leva para sentir os resultados?", a: "A maioria dos usuários relata perceber diferença logo nas primeiras sessões. Para melhores resultados, recomendamos o uso regular como parte da sua rotina diária." },
  { q: "Quanto tempo dura a bateria?", a: "Com uso padrão, a bateria dura de 6 a 8 horas por carga. O carregamento via USB-C leva aproximadamente 1 hora." },
  { q: "Em quantos dias o pedido chega?", a: "Enviamos com rastreio. O prazo estimado é de 7 a 10 dias úteis para todo o Brasil. O frete é grátis!" },
  { q: "Tem garantia?", a: "Sim! O NeuroControl tem garantia de 30 dias. Se você não ficar satisfeito, entre em contato com nosso suporte e cuidamos de tudo." },
  { q: "Posso usar todos os dias?", a: "Sim, o NeuroControl foi desenvolvido para uso diário. Recomendamos sessões de 15 a 30 minutos conforme sua preferência." },
  { q: "Como faço para rastrear meu pedido?", a: "Assim que seu pedido for enviado, você recebe um e-mail com o código de rastreio. Você pode acompanhar a entrega diretamente no site dos Correios." },
];

function ReviewCarousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = REVIEWS.length;

  const goTo = (idx: number) => {
    setCurrent((idx + total) % total);
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 4500);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handlePrev = () => { goTo(current - 1); resetTimer(); };
  const handleNext = () => { goTo(current + 1); resetTimer(); };

  const review = REVIEWS[current];

  return (
    <div className="relative flex flex-col items-center gap-6">
      {/* Card principal */}
      <div
        key={current}
        className="nc-card rounded-2xl overflow-hidden w-full max-w-lg mx-auto"
        style={{ animation: "fadeInUp 0.35s ease" }}
      >
        {/* Imagem do print */}
        <div className="w-full bg-muted flex items-center justify-center overflow-hidden" style={{ maxHeight: "420px" }}>
          <img
            src={review.image}
            alt="Avaliação real de cliente"
            className="w-full object-contain"
            style={{ maxHeight: "420px" }}
          />
        </div>

        {/* Depoimento */}
        <div className="p-5 flex flex-col gap-3">
          <StarRating count={5} />
          <p className="text-sm text-foreground leading-relaxed font-medium">"{review.text}"</p>
          <div className="flex items-center justify-between">
            <span
              className="text-[11px] font-semibold px-3 py-1 rounded-full"
              style={{ background: "oklch(0.62 0.20 225 / 0.15)", color: "oklch(0.62 0.20 225)" }}
            >
              ✓ Compra verificada
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={handlePrev}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: "oklch(0.62 0.20 225 / 0.15)", color: "oklch(0.62 0.20 225)" }}
          aria-label="Anterior"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex gap-1.5">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => { goTo(i); resetTimer(); }}
              className="rounded-full transition-all duration-300"
              style={{
                width: current === i ? "20px" : "8px",
                height: "8px",
                background: current === i ? "oklch(0.62 0.20 225)" : "oklch(0.62 0.20 225 / 0.3)",
              }}
              aria-label={`Ir para avaliação ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: "oklch(0.62 0.20 225 / 0.15)", color: "oklch(0.62 0.20 225)" }}
          aria-label="Próximo"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

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
  const checkoutUrl = COLOR_OPTIONS.find((c) => c.id === selectedColor)?.checkoutUrl ?? "https://pay.unicopag.com.br/u3ihbm2ro7";

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
              <p className="text-muted-foreground text-sm line-through">De R$ 119,90</p>
              <p className="text-4xl font-extrabold text-foreground">
                por apenas R$ <span className="text-primary nc-text-glow">67,90</span>
              </p>
            </div>

            <button
              className="nc-glow-btn nc-pulse w-full max-w-xs bg-primary text-primary-foreground font-bold text-base py-4 px-8 rounded-2xl flex items-center justify-center gap-2"
              onClick={() => document.getElementById("comprar")?.scrollIntoView({ behavior: "smooth" })}
            >
              Quero o meu agora
              <ArrowRight size={18} />
            </button>

            {/* trust icons below CTA */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
              <span className="flex items-center gap-1"><Lock size={12} /> Compra segura</span>
              <span className="flex items-center gap-1"><Truck size={12} /> Frete grátis</span>
              <span className="flex items-center gap-1"><Shield size={12} /> Garantia 30 dias</span>
            </div>
          </div>
        </div>
      </section>

      <div className="nc-divider" />

      {/* ───── SOCIAL PROOF BAR ───── */}
      <section className="px-4 py-6 nc-section-alt">
        <div className="max-w-sm mx-auto md:max-w-3xl flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center">
          <div>
            <p className="text-2xl font-extrabold text-foreground">+2.400</p>
            <p className="text-xs text-muted-foreground">unidades vendidas</p>
          </div>
          <div className="hidden md:block w-px h-10 bg-border" />
          <div>
            <div className="flex justify-center mb-1"><StarRating count={5} /></div>
            <p className="text-xs text-muted-foreground">4.9 / 5 — +1.200 avaliações</p>
          </div>
          <div className="hidden md:block w-px h-10 bg-border" />
          <div>
            <p className="text-2xl font-extrabold text-foreground">7–10 dias</p>
            <p className="text-xs text-muted-foreground">prazo de entrega</p>
          </div>
          <div className="hidden md:block w-px h-10 bg-border" />
          <div>
            <p className="text-2xl font-extrabold text-foreground">30 dias</p>
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
              { icon: Zap, title: "15 níveis de intensidade", desc: "Encontre o nível ideal para cada momento — do relaxamento suave ao profundo." },
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
            +1.200 avaliações verificadas
          </p>

          <ReviewCarousel />
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
                  <span className="text-muted-foreground line-through">R$ 119,90</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Desconto especial</span>
                  <span className="text-primary font-medium">–R$ 52,00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="text-primary font-medium">Grátis</span>
                </div>
                <div className="nc-divider my-1" />
                <div className="flex justify-between items-end">
                  <span className="font-semibold text-foreground">Total</span>
                  <div className="text-right">
                    <p className="text-2xl font-extrabold text-foreground">R$ 67,90</p>
                  </div>
                </div>
                <div className="flex justify-between text-xs mt-1 pt-1 border-t border-border">
                  <span className="text-muted-foreground">5% desconto no Pix</span>
                  <span className="text-primary font-semibold">R$ 64,50</span>
                </div>
              </div>

              {/* includes */}
              <div className="flex flex-col gap-2">
                {[
                  "1x Dispositivo NeuroControl",
                  "1x Cabo de carregamento USB-C",
                  "1x Manual de uso em português",
                  "Embalagem premium de presente",
                  "Frete grátis — entrega em 7 a 10 dias úteis",
                  "Garantia de 30 dias",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Check size={13} className="text-primary shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              {/* CTA button */}
              <a
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="nc-glow-btn w-full bg-primary text-primary-foreground font-bold text-base py-4 rounded-2xl flex items-center justify-center gap-2 text-center"
              >
                Comprar agora — R$ 67,90
                <ArrowRight size={18} />
              </a>
              <p className="text-center text-xs text-muted-foreground">
                Compra 100% segura · 5% de desconto no Pix
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
              { icon: Shield, title: "Garantia 30 Dias", desc: "Sem burocracia. Resolvemos para você." },
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

      {/* ───── WHATSAPP FLOATING BUTTON ───── */}
      <a
        href="https://wa.me/5511949058502?text=Ol%C3%A1!%20Preciso%20de%20ajuda%20com%20meu%20pedido%20do%20NeuroControl,%20pode%20me%20ajudar%3F"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform hover:scale-110"
        style={{ background: "#25D366" }}
      >
        <MessageCircle size={28} className="text-white fill-white" />
      </a>

      {/* ───── FOOTER ───── */}
      <footer
        className="px-4 py-8 text-center"
        style={{ background: "oklch(0.07 0.02 240)", borderTop: "1px solid oklch(0.22 0.04 240)" }}
      >
        <p className="text-xs text-muted-foreground mb-1">
          © 2026 NeuroControl · Todos os direitos reservados
        </p>
        <p className="text-xs text-muted-foreground mb-2">
          Atendimento: <a href="mailto:atendimento@neurocontrol.com.br" className="text-primary hover:underline">atendimento@neurocontrol.com.br</a>
        </p>
        <p className="text-[11px] text-muted-foreground/60">
          Este produto não é um dispositivo médico e não se destina a diagnosticar, tratar ou prevenir doenças.
        </p>
      </footer>
    </div>
  );
}

export default App;
