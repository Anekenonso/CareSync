"use client";

import React, { createContext, useContext, useState } from "react";
import { Patient } from "@/types";
import { patientEleanorVance } from "@/data/mockClinicalData";

interface CaregiverContextType {
  currentPatient: Patient | null;
  loadDemoPatient: () => void;
  clearPatient: () => void;
  setCurrentPatient: (patient: Patient | null) => void;
}

const CaregiverContext = createContext<CaregiverContextType>({
  currentPatient: null,
  loadDemoPatient: () => {},
  clearPatient: () => {},
  setCurrentPatient: () => {},
});

export function CaregiverProvider({ children }: { children: React.ReactNode }) {
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);

  const loadDemoPatient = () => {
    setCurrentPatient(patientEleanorVance);
  };

  const clearPatient = () => {
    setCurrentPatient(null);
  };

  return (
    <CaregiverContext.Provider
      value={{
        currentPatient,
        loadDemoPatient,
        clearPatient,
        setCurrentPatient,
      }}
    >
      {children}
    </CaregiverContext.Provider>
  );
}

export function useCaregiver() {
  return useContext(CaregiverContext);
}
