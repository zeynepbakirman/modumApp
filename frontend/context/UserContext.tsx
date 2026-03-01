import React, { createContext, useContext, useState } from 'react';

export type SurveyResult = {
  id: string;
  name: string;
  score: number;
  status: string;
  date: string;
};

type UserData = {
  studentNo: string;
  age: string;
  gender: string;
  height?: string;
  weight?: string;
};

type MoodHistory = {
  date: string;
  mood: string;
};

type UserContextType = {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  updateUserData: (data: Partial<UserData>) => void;
  surveyResults: SurveyResult[];
  addSurveyResult: (result: Omit<SurveyResult, 'id'>) => void;
  moodHistory: MoodHistory[];
  addMoodSelection: (mood: string) => void;
  currentMood: string | null;
  setCurrentMood: (mood: string | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserDataState] = useState<UserData | null>(null);
  const [surveyResults, setSurveyResults] = useState<SurveyResult[]>([]);
  const [moodHistory, setMoodHistory] = useState<MoodHistory[]>([]);
  const [currentMood, setCurrentMood] = useState<string | null>(null);

  const setUserData = (data: UserData) => {
    setUserDataState(data);
  };

  const updateUserData = (data: Partial<UserData>) => {
    setUserDataState((prev) => (prev ? { ...prev, ...data } : null));
  };

  const addSurveyResult = (result: any) => {
    const newResult = {
      ...result,
      id: Math.random().toString(36).substr(2, 9),
    };
    setSurveyResults((prev) => [newResult, ...prev]);
  };

  const addMoodSelection = (mood: string) => {
    const today = new Date().toISOString().split('T')[0];
    const newEntry = { date: today, mood };
    setMoodHistory((prev) => [...prev, newEntry]);
    setCurrentMood(mood);
  };

  return (
    <UserContext.Provider
        value={{
          userData,
          setUserData,
          updateUserData,
          surveyResults,
          addSurveyResult,
          moodHistory,
          addMoodSelection,
          currentMood,
          setCurrentMood,
        }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
