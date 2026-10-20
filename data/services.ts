import type { Service } from "./types";

export const services: Service[] = [
  {
    id: "custom",
    name: "Custom tattoos",
    eyebrow: "01 — Bespoke",
    summary:
      "A collaborative design process from first conversation to final line. We build original work around your story, not a flash sheet.",
    details: [
      "Private consultation and concept development",
      "Original drawing unique to you",
      "Placement, scale, and longevity considered together",
    ],
    image: "/images/studio-consultation.jpg",
    imageAlt: "Artist sketching a custom tattoo design at a studio desk",
    layout: "image-left",
  },
  {
    id: "fine-line",
    name: "Fine-line tattoos",
    eyebrow: "02 — Delicate",
    summary:
      "Quiet, precise mark-making. Botanical, script, and ornamental work that reads as jewelry on the skin.",
    details: [
      "Single-needle and fine grouping work",
      "Soft contrast and refined composition",
      "Ideal for collarbone, wrist, ankle, and rib placements",
    ],
    image: "/images/tattoo-fine-line.jpg",
    imageAlt: "Fine-line botanical tattoo wrapping around a forearm",
    layout: "image-right",
  },
  {
    id: "blackwork",
    name: "Blackwork & illustrative",
    eyebrow: "03 — Graphic",
    summary:
      "Dense blacks, negative space, and illustrative drawing. Snakes, moths, portraiture, and ornamental black compositions.",
    details: [
      "High-contrast illustrative pieces",
      "Ornamental and geometric blackwork",
      "Designed to age with presence",
    ],
    image: "/images/tattoo-blackwork.jpg",
    imageAlt: "Dense geometric blackwork tattoo covering a shoulder",
    layout: "image-left",
  },
  {
    id: "traditional",
    name: "Traditional & ornamental",
    eyebrow: "04 — Classic",
    summary:
      "Bold forms, floral armor, and ornamental bands. Work that sits with confidence across the arm, chest, or back.",
    details: [
      "American traditional and ornamental hybrids",
      "Strong outlines and enduring palettes",
      "Sleeves, chests, and statement placements",
    ],
    image: "/images/tattoo-traditional.jpg",
    imageAlt: "Traditional ornamental rose tattoo on an arm",
    layout: "image-right",
  },
  {
    id: "piercing",
    name: "Piercing",
    eyebrow: "05 — Adornment",
    summary:
      "Thoughtful piercing with implant-grade jewelry. Ear projects, facial work, and curated compositions — never rushed.",
    details: [
      "Anatomy-led placement",
      "Jewelry curated for healing and wear",
      "Aftercare guidance for every piercing",
    ],
    image: "/images/piercing-ear.jpg",
    imageAlt: "Helix ear piercing with a small gold hoop and studs",
    layout: "image-left",
  },
  {
    id: "consultation",
    name: "Consultations & design",
    eyebrow: "06 — Process",
    summary:
      "Sit with an artist before a needle ever touches skin. We discuss ideas, references, placement, and whether we are the right studio for the work.",
    details: [
      "Appointment-only conversations",
      "Reference review and design direction",
      "Clear next steps — no pressure to book on the day",
    ],
    image: "/images/studio-station.jpg",
    imageAlt: "Tattoo workstation prepared with ink, machine, and stencil materials",
    layout: "image-right",
  },
];
