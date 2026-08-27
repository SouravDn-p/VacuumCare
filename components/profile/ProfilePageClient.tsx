"use client";

import { useState } from "react";

import ProfileHeader from "./ProfileHeader";
import PersonalInfo from "./PersonalInfo";
import SavedAddresses from "./SavedAddresses";
import EditProfileModal from "./EditProfileModal";
import AddressModal from "./AddressModal";

import {
  useAddAddressMutation,
  useDeleteAddressMutation,
  useGetProfileQuery,
  useUpdateAddressMutation,
  useUpdateProfileMutation,
} from "@/redux/features/api/customer/profile/profileApi";

import type {
  CreateAddressRequest,
  CustomerAddress,
  UpdateProfileRequest,
} from "@/types/customer/profile/profileTypes";

export default function ProfilePageClient() {
  const { data: profile, isLoading, isFetching, error } = useGetProfileQuery();

  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation();

  const [addAddress, { isLoading: isAddingAddress }] = useAddAddressMutation();

  const [updateAddress, { isLoading: isUpdatingAddress }] =
    useUpdateAddressMutation();

  const [deleteAddress, { isLoading: isDeletingAddress }] =
    useDeleteAddressMutation();

  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const [addressModalOpen, setAddressModalOpen] = useState(false);

  const [editingAddress, setEditingAddress] = useState<CustomerAddress | null>(
    null,
  );

  /* =========================
     Update Profile
  ========================= */

  const handleUpdateProfile = async (data: UpdateProfileRequest) => {
    await updateProfile(data).unwrap();

    setProfileModalOpen(false);
  };

  /* =========================
     Add Address
  ========================= */

  const handleAddAddress = () => {
    setEditingAddress(null);
    setAddressModalOpen(true);
  };

  /* =========================
     Edit Address
  ========================= */

  const handleEditAddress = (address: CustomerAddress) => {
    setEditingAddress(address);
    setAddressModalOpen(true);
  };

  /* =========================
     Save Address
  ========================= */

  const handleSaveAddress = async (data: CreateAddressRequest) => {
    if (editingAddress) {
      await updateAddress({
        id: editingAddress.id,
        data,
      }).unwrap();
    } else {
      await addAddress(data).unwrap();
    }

    setAddressModalOpen(false);
    setEditingAddress(null);
  };

  /* =========================
     Delete Address
  ========================= */

  const handleDeleteAddress = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?",
    );

    if (!confirmed) return;

    await deleteAddress(id).unwrap();
  };

  /* =========================
     Loading
  ========================= */

  if (isLoading) {
    return (
      <div className="rounded-[18px] border border-[#dceafd] bg-[#f7fbff] p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-[130px] rounded-[16px] bg-white" />
          <div className="h-[150px] rounded-[16px] bg-white" />
          <div className="h-[240px] rounded-[16px] bg-white" />
        </div>
      </div>
    );
  }

  /* =========================
     Error
  ========================= */

  if (error || !profile) {
    return (
      <div className="rounded-[16px] border border-red-100 bg-red-50 p-6 text-center">
        <p className="text-[14px] text-red-600">Unable to load your profile.</p>
      </div>
    );
  }

  const fullName = `${profile.firstName} ${profile.lastName}`.trim();

  return (
    <>
      <div className="rounded-[18px] border border-[#dceafd] bg-[#f7fbff] p-4 sm:p-5 lg:p-6">
        <div className="space-y-7">
          <ProfileHeader
            name={fullName}
            email={profile.email}
            image={profile.avatarUrl}
            isFetching={isFetching}
            onEdit={() => setProfileModalOpen(true)}
          />

          <PersonalInfo
            name={fullName}
            email={profile.email}
            phone={profile.phone}
            company={profile.company}
          />

          <SavedAddresses
            addresses={profile.addresses}
            onAdd={handleAddAddress}
            onEdit={handleEditAddress}
            onDelete={handleDeleteAddress}
            isDeleting={isDeletingAddress}
          />
        </div>
      </div>

      {/* Edit Profile */}
      <EditProfileModal
        open={profileModalOpen}
        profile={profile}
        isLoading={isUpdatingProfile}
        onClose={() => setProfileModalOpen(false)}
        onSave={handleUpdateProfile}
      />

      {/* Add / Edit Address */}
      <AddressModal
        open={addressModalOpen}
        address={editingAddress}
        isLoading={isAddingAddress || isUpdatingAddress}
        onClose={() => {
          setAddressModalOpen(false);
          setEditingAddress(null);
        }}
        onSave={handleSaveAddress}
      />
    </>
  );
}
