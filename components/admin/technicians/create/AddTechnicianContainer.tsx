"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import AddTechnicianHeader from "./AddTechnicianHeader";
import PersonalInformationCard from "./PersonalInformationCard";
import CredentialsCertificationsCard from "./CredentialsCertificationsCard";
import AvailabilityCard from "./AvailabilityCard";
import EmergencyContactCard from "./EmergencyContactCard";
import InternalNotesCard from "./InternalNotesCard";
import TechnicianProfilePreviewSidebar from "./TechnicianProfilePreviewSidebar";
import {
  useGetAdminTechnicianByIdQuery,
  useUpdateAdminTechnicianMutation,
} from "@/redux/features/api/admin/techniciansApi";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import AdminSubmitOverlay from "@/components/admin/ui/AdminSubmitOverlay";

export default function AddTechnicianContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const technicianId = searchParams.get("id") ?? "";
  const isEditing = Boolean(technicianId);

  // Personal Info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("Field Technician");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Credentials & Certifications
  const [certifications, setCertifications] = useState("");
  const [skills, setSkills] = useState<string[]>(["Inlet valve repair"]);

  // Availability
  const [availableDays, setAvailableDays] = useState<string[]>([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
  ]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Emergency Contact
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  // Internal Notes
  const [notes, setNotes] = useState("");

  // Account Access Switches
  const [mobileAppAccess, setMobileAppAccess] = useState(true);
  const [viewCustomerInfo, setViewCustomerInfo] = useState(true);
  const [submitJobReports, setSubmitJobReports] = useState(true);
  const [viewOtherSchedules, setViewOtherSchedules] = useState(false);

  // Status state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleSkill = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const toggleDay = (day: string) => {
    setAvailableDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const displayName = [firstName, lastName].filter(Boolean).join(" ");
  const { data: technician } = useGetAdminTechnicianByIdQuery(
    { id: technicianId, timezone: "America/Toronto" },
    { skip: !technicianId },
  );
  const [updateTechnician] = useUpdateAdminTechnicianMutation();

  useEffect(() => {
    if (!technician) return;
    setFirstName(technician.firstName);
    setLastName(technician.lastName);
    setPhone(technician.phone ?? "");
    setEmail(technician.email);
    setRole(technician.skills[0] || "Field Technician");
    setSkills(technician.skills.length ? technician.skills : ["Inlet valve repair"]);
    setNotes(technician.bio ?? "");
    setCertifications(technician.licenseNumber ?? technician.serviceArea);
  }, [technician]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEditing) {
      toast(
        "Technicians register through technician signup. Open Edit from the technicians list to update a profile.",
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await updateTechnician({
        id: technicianId,
        body: {
          firstName,
          lastName,
          phone,
          skills,
          serviceArea: role,
          bio: notes || undefined,
        },
      }).unwrap();
      toast.success("Technician updated.");
      router.push("/admin/technicians");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not update this technician."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="at-page" onSubmit={handleSubmit}>
      {/* Header */}
      <AddTechnicianHeader
        title={isEditing ? "Edit Technician" : "Add Technician"}
        subtitle={
          isEditing
            ? "Update the technician profile used by scheduling and assignments."
            : "Technicians register through signup. Use Edit from the list to update an existing profile."
        }
      />

      {/* 2-Column Content Layout */}
      <div className="at-main-layout">
        {/* Left Column */}
        <div className="at-left-col">
          <PersonalInformationCard
            firstName={firstName}
            onFirstNameChange={setFirstName}
            lastName={lastName}
            onLastNameChange={setLastName}
            role={role}
            onRoleChange={setRole}
            phone={phone}
            onPhoneChange={setPhone}
            email={email}
            onEmailChange={setEmail}
            emailReadOnly={isEditing}
          />

          <CredentialsCertificationsCard
            certifications={certifications}
            onCertificationsChange={setCertifications}
            skills={skills}
            onToggleSkill={toggleSkill}
          />

          <AvailabilityCard
            availableDays={availableDays}
            onToggleDay={toggleDay}
            startTime={startTime}
            onStartTimeChange={setStartTime}
            endTime={endTime}
            onEndTimeChange={setEndTime}
          />

          <EmergencyContactCard
            contactName={contactName}
            onContactNameChange={setContactName}
            contactPhone={contactPhone}
            onContactPhoneChange={setContactPhone}
          />

          <InternalNotesCard
            notes={notes}
            onNotesChange={setNotes}
          />
        </div>

        {/* Right Sidebar Column */}
        <div className="at-right-col">
          <TechnicianProfilePreviewSidebar
            displayName={displayName}
            displayRole={role}
            mobileAppAccess={mobileAppAccess}
            onToggleMobileAppAccess={() => setMobileAppAccess((v) => !v)}
            viewCustomerInfo={viewCustomerInfo}
            onToggleViewCustomerInfo={() => setViewCustomerInfo((v) => !v)}
            submitJobReports={submitJobReports}
            onToggleSubmitJobReports={() => setSubmitJobReports((v) => !v)}
            viewOtherSchedules={viewOtherSchedules}
            onToggleViewOtherSchedules={() => setViewOtherSchedules((v) => !v)}
            isSubmitting={isSubmitting}
            submitLabel={isEditing ? "Save technician" : "Add technician"}
            submittingLabel={isEditing ? "Saving technician..." : "Adding technician..."}
          />
        </div>
      </div>
      <AdminSubmitOverlay
        open={isSubmitting}
        message={isEditing ? "Saving technician..." : "Adding technician..."}
      />
    </form>
  );
}
