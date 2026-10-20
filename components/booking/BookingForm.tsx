"use client";

import { artists } from "@/data/artists";
import { services } from "@/data/services";
import type { ArtistId, ServiceId } from "@/data/types";
import {
  artistLabel,
  emptyBooking,
  NO_ARTIST_PREFERENCE,
  serviceLabel,
  submitBookingRequest,
  validateStep,
  type BookingDraft,
} from "@/lib/booking";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useEffect, useMemo, useState } from "react";

const steps = [
  "Service",
  "Artist",
  "Concept",
  "Timing",
  "Details",
  "Review",
] as const;

export function BookingForm({
  prefill,
  onClose,
}: {
  prefill: { artistId?: ArtistId; serviceId?: ServiceId };
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<BookingDraft>({
    ...emptyBooking,
    artistId: prefill.artistId ?? "",
    serviceId: prefill.serviceId ?? "",
  });
  const [errors, setErrors] = useState<ReturnType<typeof validateStep>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setDraft((current) => ({
      ...current,
      artistId: prefill.artistId ?? current.artistId,
      serviceId: prefill.serviceId ?? current.serviceId,
    }));
  }, [prefill.artistId, prefill.serviceId]);

  const progress = useMemo(() => `${step} / ${steps.length}`, [step]);

  function update<K extends keyof BookingDraft>(key: K, value: BookingDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function next() {
    const nextErrors = validateStep(step, draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setStep((current) => Math.min(current + 1, steps.length));
  }

  function back() {
    setStep((current) => Math.max(current - 1, 1));
  }

  async function submit() {
    const lastErrors = validateStep(5, draft);
    if (Object.keys(lastErrors).length) {
      setErrors(lastErrors);
      setStep(5);
      return;
    }
    setStatus("submitting");
    setErrorMessage("");
    try {
      await submitBookingRequest(draft);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full flex-col justify-center">
        <p className="text-[11px] tracking-[0.28em] text-muted uppercase">Request received</p>
        <h3 className="mt-3 font-display text-4xl italic">We’ll read this by hand.</h3>
        <p className="mt-5 text-sm leading-7 text-muted">
          Thank you, {draft.name}. This is a booking request, not a confirmed appointment. The studio will reply to {draft.email} with availability and next steps.
        </p>
        <Button type="button" className="mt-8 self-start" onClick={onClose}>
          Close
        </Button>
      </div>
    );
  }

  return (
    <form
      className="flex h-full min-h-0 flex-col"
      onSubmit={(event) => {
        event.preventDefault();
        if (step < steps.length) next();
        else void submit();
      }}
    >
      <p className="text-[11px] tracking-[0.28em] text-muted uppercase">
        Step {progress} — {steps[step - 1]}
      </p>
      <div className="mt-4 h-px bg-line">
        <div className="h-px bg-ink transition-all" style={{ width: `${(step / steps.length) * 100}%` }} />
      </div>

      <div className="mt-8 min-h-0 flex-1 overflow-y-auto pr-1">
        {step === 1 ? (
          <fieldset>
            <legend className="w-full font-display text-3xl leading-[1.05] whitespace-normal italic">What are you coming in for?</legend>
            <div className="mt-6 grid gap-2">
              {services.map((service) => (
                <label
                  key={service.id}
                  className={cn(
                    "flex cursor-pointer items-center justify-between border px-4 py-4 text-sm",
                    draft.serviceId === service.id ? "border-ink bg-paper-2" : "border-line hover:border-ink",
                  )}
                >
                  <span>
                    <span className="block font-medium">{service.name}</span>
                    <span className="mt-1 block text-xs text-muted">{service.eyebrow}</span>
                  </span>
                  <input
                    type="radio"
                    name="service"
                    className="accent-ink"
                    checked={draft.serviceId === service.id}
                    onChange={() => update("serviceId", service.id)}
                  />
                </label>
              ))}
            </div>
            {errors.serviceId ? <p className="mt-3 text-sm text-red-800">{errors.serviceId}</p> : null}
          </fieldset>
        ) : null}

        {step === 2 ? (
          <fieldset>
            <legend className="font-display text-3xl leading-[1.05] italic">Who should hold the needle?</legend>
            <div className="mt-6 grid gap-2">
              {artists.map((artist) => (
                <label
                  key={artist.id}
                  className={cn(
                    "flex cursor-pointer items-center justify-between border px-4 py-4 text-sm",
                    draft.artistId === artist.id ? "border-ink bg-paper-2" : "border-line hover:border-ink",
                  )}
                >
                  <span>
                    <span className="block font-medium">{artist.name}</span>
                    <span className="mt-1 block text-xs text-muted">{artist.specialization}</span>
                  </span>
                  <input
                    type="radio"
                    name="artist"
                    className="accent-ink"
                    checked={draft.artistId === artist.id}
                    onChange={() => update("artistId", artist.id)}
                  />
                </label>
              ))}
              <label
                className={cn(
                  "flex cursor-pointer items-center justify-between border px-4 py-4 text-sm",
                  draft.artistId === NO_ARTIST_PREFERENCE ? "border-ink bg-paper-2" : "border-line hover:border-ink",
                )}
              >
                <span>
                  <span className="block font-medium">No preference</span>
                  <span className="mt-1 block text-xs text-muted">We’ll suggest a fit from your concept.</span>
                </span>
                <input
                  type="radio"
                  name="artist"
                  className="accent-ink"
                  checked={draft.artistId === NO_ARTIST_PREFERENCE}
                  onChange={() => update("artistId", NO_ARTIST_PREFERENCE)}
                />
              </label>
            </div>
            {errors.artistId ? <p className="mt-3 text-sm text-red-800">{errors.artistId}</p> : null}
          </fieldset>
        ) : null}

        {step === 3 ? (
          <div>
            <h3 className="font-display text-3xl italic">Tell us the piece.</h3>
            <label className="mt-6 block text-[11px] tracking-[0.2em] text-muted uppercase" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              rows={6}
              className="mt-2 w-full border border-line bg-cream px-3 py-3 text-sm leading-6 outline-none focus:border-ink"
              value={draft.description}
              onChange={(event) => update("description", event.target.value)}
              placeholder="Placement, size, style, and anything you already know you want."
            />
            {errors.description ? <p className="mt-2 text-sm text-red-800">{errors.description}</p> : null}
            <label className="mt-6 block text-[11px] tracking-[0.2em] text-muted uppercase" htmlFor="references">
              Reference images (optional)
            </label>
            <input
              id="references"
              type="file"
              accept="image/*"
              multiple
              className="mt-2 block w-full text-sm file:mr-3 file:border file:border-line file:bg-paper file:px-3 file:py-2"
              onChange={(event) => update("files", Array.from(event.target.files ?? []))}
            />
            {draft.files.length ? (
              <ul className="mt-3 space-y-1 text-xs text-muted">
                {draft.files.map((file) => (
                  <li key={file.name}>{file.name}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}

        {step === 4 ? (
          <div>
            <h3 className="font-display text-3xl italic">When could you sit?</h3>
            <label className="mt-6 block text-[11px] tracking-[0.2em] text-muted uppercase" htmlFor="date">
              Preferred date
            </label>
            <input
              id="date"
              type="date"
              className="mt-2 w-full border border-line bg-cream px-3 py-3 text-sm outline-none focus:border-ink"
              value={draft.preferredDate}
              onChange={(event) => update("preferredDate", event.target.value)}
            />
            <label className="mt-6 block text-[11px] tracking-[0.2em] text-muted uppercase" htmlFor="availability">
              Availability notes
            </label>
            <textarea
              id="availability"
              rows={4}
              className="mt-2 w-full border border-line bg-cream px-3 py-3 text-sm leading-6 outline-none focus:border-ink"
              value={draft.availabilityNote}
              onChange={(event) => update("availabilityNote", event.target.value)}
              placeholder="Weekends, evenings, a month that works, travel constraints…"
            />
            {errors.availabilityNote ? <p className="mt-2 text-sm text-red-800">{errors.availabilityNote}</p> : null}
          </div>
        ) : null}

        {step === 5 ? (
          <div>
            <h3 className="font-display text-3xl italic">How do we reach you?</h3>
            <label className="mt-6 block text-[11px] tracking-[0.2em] text-muted uppercase" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="mt-2 w-full border border-line bg-cream px-3 py-3 text-sm outline-none focus:border-ink"
              value={draft.name}
              onChange={(event) => update("name", event.target.value)}
              autoComplete="name"
            />
            {errors.name ? <p className="mt-2 text-sm text-red-800">{errors.name}</p> : null}
            <label className="mt-6 block text-[11px] tracking-[0.2em] text-muted uppercase" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-2 w-full border border-line bg-cream px-3 py-3 text-sm outline-none focus:border-ink"
              value={draft.email}
              onChange={(event) => update("email", event.target.value)}
              autoComplete="email"
            />
            {errors.email ? <p className="mt-2 text-sm text-red-800">{errors.email}</p> : null}
            <label className="mt-6 block text-[11px] tracking-[0.2em] text-muted uppercase" htmlFor="phone">
              Phone (optional)
            </label>
            <input
              id="phone"
              type="tel"
              className="mt-2 w-full border border-line bg-cream px-3 py-3 text-sm outline-none focus:border-ink"
              value={draft.phone}
              onChange={(event) => update("phone", event.target.value)}
              autoComplete="tel"
            />
            {errors.phone ? <p className="mt-2 text-sm text-red-800">{errors.phone}</p> : null}
            <label className="mt-6 flex items-start gap-3 text-sm leading-6">
              <input
                type="checkbox"
                className="mt-1 accent-ink"
                checked={draft.consent}
                onChange={(event) => update("consent", event.target.checked)}
              />
              I understand this is a request for a sitting, not a confirmed appointment.
            </label>
            {errors.consent ? <p className="mt-2 text-sm text-red-800">{errors.consent}</p> : null}
          </div>
        ) : null}

        {step === 6 ? (
          <div>
            <h3 className="font-display text-3xl italic">Review the request.</h3>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="text-[11px] tracking-[0.2em] text-muted uppercase">Service</dt>
                <dd className="mt-1">{serviceLabel(draft.serviceId)}</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.2em] text-muted uppercase">Artist</dt>
                <dd className="mt-1">{artistLabel(draft.artistId)}</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.2em] text-muted uppercase">Concept</dt>
                <dd className="mt-1 leading-6">{draft.description}</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.2em] text-muted uppercase">References</dt>
                <dd className="mt-1">{draft.files.length ? draft.files.map((file) => file.name).join(", ") : "None attached"}</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.2em] text-muted uppercase">Timing</dt>
                <dd className="mt-1 leading-6">
                  {draft.preferredDate || "No specific date"} {draft.availabilityNote ? `· ${draft.availabilityNote}` : ""}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.2em] text-muted uppercase">Contact</dt>
                <dd className="mt-1">
                  {draft.name} · {draft.email}
                  {draft.phone ? ` · ${draft.phone}` : ""}
                </dd>
              </div>
            </dl>
            {status === "error" ? <p className="mt-4 text-sm text-red-800">{errorMessage}</p> : null}
          </div>
        ) : null}
      </div>

      <div className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-5">
        <Button type="button" variant="ghost" onClick={step === 1 ? onClose : back}>
          {step === 1 ? "Close" : "Back"}
        </Button>
        <Button type="submit" disabled={status === "submitting"}>
          {step < steps.length ? "Continue" : status === "submitting" ? "Sending…" : "Send request"}
        </Button>
      </div>
    </form>
  );
}
