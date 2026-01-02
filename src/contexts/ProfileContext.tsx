import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Profile, profilePermissions } from '@/data/mockData';

interface ProfileContextType {
  currentProfile: Profile;
  setCurrentProfile: (profile: Profile) => void;
  hasPermission: (action: 'create' | 'edit' | 'delete' | 'view', resource: string) => boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [currentProfile, setCurrentProfile] = useState<Profile>('secretaria');

  const hasPermission = (action: 'create' | 'edit' | 'delete' | 'view', resource: string): boolean => {
    const permissions = profilePermissions[currentProfile];
    const actionKey = `can${action.charAt(0).toUpperCase() + action.slice(1)}` as keyof typeof permissions;
    const allowed = permissions[actionKey];
    return allowed.includes('*') || allowed.includes(resource);
  };

  return (
    <ProfileContext.Provider value={{ currentProfile, setCurrentProfile, hasPermission }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
