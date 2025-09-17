import React, { createContext, useState } from "react";

export const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const initialTrip = {
    name: "",
    startLocation: "",
    endLocation: "",
    startDate: "",
    endDate: "",
    guests: {
      adults: 1,
      children: 0,
      infants: 0,
    },
    assistance: "",
  };

  const [trip, setTrip] = useState(initialTrip);
  const [tripHistory, setTripHistory] = useState([]);

  const addTrip = (newTrip) => {
    if (!newTrip) return;
    setTripHistory((prev) => [...prev, newTrip]);
  };

  const removeTrip = (index) => {
    setTripHistory((prev) => prev.filter((_, i) => i !== index));
  };

  const resetTrip = () => {
    setTrip({ ...initialTrip });
  };

  return (
    <TripContext.Provider
      value={{ trip, setTrip, addTrip, tripHistory, removeTrip, resetTrip }}
    >
      {children}
    </TripContext.Provider>
  );
};
