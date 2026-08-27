"use client";

import { FormEvent, useEffect, useState } from "react";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";

import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import {
  useGetAdminSettingsQuery,
  useUploadLandingHeroMutation,
} from "@/redux/features/api/admin/settingsApi";

export default function LandingHeroSettingsForm() {
  const { data } = useGetAdminSettingsQuery();
  const [uploadHero, { isLoading }] = useUploadLandingHeroMutation();
  const [hero, setHero] = useState<File | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const previewUrl = localPreview ?? data?.landingHeroImageUrl ?? null;

  useEffect(() => {
    if (!hero) {
      setLocalPreview(null);
      return;
    }
    const url = URL.createObjectURL(hero);
    setLocalPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [hero]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!hero) {
      toast.error("Choose an image to upload");
      return;
    }
    try {
      await uploadHero(hero).unwrap();
      setHero(null);
      toast.success("Landing hero image updated");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not upload hero image"));
    }
  };

  return (
    <form className="set-card" onSubmit={handleSubmit}>
      <h2 className="set-card__title">Landing page</h2>
      <p className="set-hero-hint">
        Image shown in the home-page hero. Square or landscape photos work
        best. Changes appear on the storefront after upload.
      </p>
      <div className="set-hero-section">
        <label className="set-field-label" htmlFor="set-hero-upload-input">
          Hero image
        </label>
        <div className="set-hero-row">
          <div className="set-hero-preview" aria-hidden="true">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={previewUrl} alt="" className="set-hero-preview__image" />
            ) : (
              <span className="set-logo-preview__text">Hero</span>
            )}
          </div>
          <label htmlFor="set-hero-upload-input" className="set-upload-btn">
            <Upload size={16} className="set-upload-btn__icon" />
            <span>{hero ? hero.name : "Choose image"}</span>
            <input
              type="file"
              id="set-hero-upload-input"
              className="set-hidden-file-input"
              accept="image/*"
              onChange={(event) => setHero(event.target.files?.[0] ?? null)}
            />
          </label>
        </div>
      </div>
      <div className="set-form-actions">
        <button
          type="submit"
          className="set-save-btn"
          aria-label="Upload landing hero image"
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Upload hero image"}
        </button>
      </div>
    </form>
  );
}
