import { artists } from "@/data/artists";
import { services } from "@/data/services";
import type { ArtistId, ServiceId } from "@/data/types";

export const NO_ARTIST_PREFERENCE = "none" as const;

export type ArtistChoice = ArtistId | typeof NO_ARTIST_PREFERENCE;

export interface BookingDraft {
  serviceId: ServiceId | "";
  artistId: ArtistChoice | "";
  description: string;
  files: File[];
  preferredDate: string;
  availabilityNote: string;
  name: string;
  email: string;
  phone: string;
  consent: boolean;
}

export const emptyBooking: BookingDraft = {
  serviceId: "",
  artistId: "",
  description: "",
  files: [],
  preferredDate: "",
  availabilityNote: "",
  name: "",
  email: "",
  phone: "",
  consent: false,
};

export type BookingField = keyof BookingDraft;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateStep(step: number, draft: BookingDraft): Partial<Record<BookingField, string>> {
  const errors: Partial<Record<BookingField, string>> = {};

  if (step === 1 && !draft.serviceId) {
    errors.serviceId = "Select a service to continue.";
  }

  if (step === 2 && !draft.artistId) {
    errors.artistId = "Choose an artist, or select no preference.";
  }

  if (step === 3 && draft.description.trim().length < 12) {
    errors.description = "Share a little more about the piece you have in mind.";
  }

  if (step === 4 && !draft.preferredDate && draft.availabilityNote.trim().length < 8) {
    errors.availabilityNote = "Add a preferred date or a short note about your availability.";
  }

  if (step === 5) {
    if (draft.name.trim().length < 2) {
      errors.name = "Please enter your name.";
    }
    if (!emailPattern.test(draft.email.trim())) {
      errors.email = "Enter a valid email address.";
    }
    if (draft.phone && draft.phone.replace(/\D/g, "").length < 7) {
      errors.phone = "Enter a fuller phone number, or leave this blank.";
    }
    if (!draft.consent) {
      errors.consent = "Please confirm you understand this is a request, not a confirmed appointment.";
    }
  }

  return errors;
}

export function serviceLabel(id: ServiceId | "") {
  return services.find((item) => item.id === id)?.name ?? "Not selected";
}

export function artistLabel(id: ArtistChoice | "") {
  if (id === NO_ARTIST_PREFERENCE) return "No preference";
  return artists.find((item) => item.id === id)?.name ?? "Not selected";
}

export interface BookingSubmission {
  serviceId: ServiceId;
  artistId: ArtistChoice;
  description: string;
  fileNames: string[];
  preferredDate: string;
  availabilityNote: string;
  name: string;
  email: string;
  phone: string;
}

export async function submitBookingRequest(draft: BookingDraft): Promise<BookingSubmission> {
  if (!draft.serviceId || !draft.artistId) {
    throw new Error("Incomplete request.");
  }

  const payload: BookingSubmission = {
    serviceId: draft.serviceId,
    artistId: draft.artistId,
    description: draft.description.trim(),
    fileNames: draft.files.map((file) => file.name),
    preferredDate: draft.preferredDate,
    availabilityNote: draft.availabilityNote.trim(),
    name: draft.name.trim(),
    email: draft.email.trim(),
    phone: draft.phone.trim(),
  };

  await new Promise((resolve) => setTimeout(resolve, 900));

  if (payload.email.toLowerCase() === "fail@nyxwoven.example") {
    throw new Error("The request could not be sent. Please try again.");
  }

  return payload;
}
