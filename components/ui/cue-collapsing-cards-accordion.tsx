"use client";

/**
 * Adapted from the owner's supplied Cue Foundations / cue115 component.
 * Reference: https://21st.dev/@aloksivastava1025/components/cue-collapsing-cards-accordion
 * The horizontal image accordion becomes vertical on phones.
 * Native details/summary preserves keyboard and no-JavaScript access.
 */
import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { ABOUT_CARDS, type AboutCard } from "@/lib/about-cards";
import { cn } from "@/lib/utils";

type Props = {
  cards?: AboutCard[];
  initialIndex?: number;
  id?: string;
  className?: string;
};

export default function CollapsingCards({
  cards = ABOUT_CARDS, initialIndex = 0, id = "about-accordion", className
}: Props) {
  const [activeIdx, setActiveIdx] = useState(initialIndex);
  const triggers = useRef<(HTMLElement | null)[]>([]);
  const keyboardMode = useRef(false);

  function navigate(event: KeyboardEvent<HTMLElement>, index: number) {
    keyboardMode.current = true;
    let next: number;
    if (event.key === "Home") next = 0;
    else if (event.key === "End") next = cards.length - 1;
    else if (["ArrowRight", "ArrowDown"].includes(event.key)) next = (index + 1) % cards.length;
    else if (["ArrowLeft", "ArrowUp"].includes(event.key)) next = (index - 1 + cards.length) % cards.length;
    else return;
    event.preventDefault();
    setActiveIdx(next);
    triggers.current[next]?.focus({ preventScroll: true });
  }

  return (
    <div
      className={cn("cc-cards tw:flex tw:h-full tw:w-full tw:min-w-0", className)}
      onPointerDown={() => { keyboardMode.current = false; }}
      onPointerMove={event => {
        if (event.pointerType !== "mouse" || (!event.movementX && !event.movementY) || !keyboardMode.current) return;
        keyboardMode.current = false;
        const target = (event.target as Element).closest<HTMLElement>(".cc-card");
        const focused = document.activeElement;
        if (focused?.closest(".cc-content") && !target?.contains(focused)) return;
        const next = cards.findIndex(card => card.id === target?.dataset.card);
        if (next >= 0) setActiveIdx(next);
      }}
    >
      {cards.map((card, index) => (
        <details
          key={card.id}
          name={id}
          className="cc-card tw:relative tw:min-w-0 tw:overflow-hidden"
          data-card={card.id}
          open={activeIdx === index}
          onPointerEnter={event => {
            if (event.pointerType !== "mouse" || keyboardMode.current) return;
            const focused = document.activeElement;
            const focusedContent = focused?.closest(".cc-content");
            if (focusedContent && !event.currentTarget.contains(focused)) return;
            setActiveIdx(index);
          }}
          onFocusCapture={event => {
            if ((event.target as HTMLElement).matches(":focus-visible")) keyboardMode.current = true;
            setActiveIdx(index);
          }}
          onToggle={event => {
            if (event.currentTarget.open) setActiveIdx(index);
          }}
          style={{ "--cc-position": card.position || "center" } as CSSProperties}
        >
          <summary
            className="cc-trigger"
            aria-label={card.wordmark}
            aria-controls={id + "-" + card.id + "-content"}
            ref={node => { triggers.current[index] = node; }}
            onClick={event => { event.preventDefault(); setActiveIdx(index); }}
            onKeyDown={event => navigate(event, index)}
          >
            <img className="cc-img" src={card.image} alt="" width="1200" height="900" loading="lazy" decoding="async" />
            <span className="cc-shade" aria-hidden="true" />
            <span className="cc-topbar" aria-hidden="true">
              <span className="cc-idx">{String(index + 1).padStart(2, "0")} / {String(cards.length).padStart(2, "0")}</span>
              <ArrowUpRight className="cc-arrow" size={18} strokeWidth={1.5} />
            </span>
            <span className="cc-v-title" aria-hidden="true">{card.wordmark}</span>
          </summary>
          <div className="cc-content" id={id + "-" + card.id + "-content"}>
            <p className="cc-group">{card.group} / {card.wordmark}</p>
            <h3 className="cc-title tw:text-xl tw:font-medium tw:tracking-tight">{card.title}</h3>
            {card.paragraphs.map(paragraph => <p className="cc-description" key={paragraph}>{paragraph}</p>)}
            {card.link && <a className="cc-cta" href={card.link.href}>{card.link.label}<ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" /></a>}
          </div>
        </details>
      ))}
    </div>
  );
}
